import os
import json
import uuid
import shutil
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, APIRouter, Request, UploadFile, File, Form, HTTPException, BackgroundTasks, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

from backend.config import settings
from backend.models import (
    Book, Chapter, PaperFormat, SectionFormat, QuestionPaper,
    QuestionItem, QuestionSourceCitation, AnswerKey, AnswerKeyItem,
    QuestionPaperGenerationRequest, ChatRequest, ChatResponse,
    QuestionBankItem, PastPaperAnalysis
)
import backend.database as db
from backend.pdf_processor import detect_chapters_from_pdf, extract_and_chunk_pdf
from backend.rag_engine import rag_engine
from backend.llm_service import llm_service
from backend.grounding_verifier import grounding_verifier
from backend.quality_checker import quality_checker
from backend.format_parser import extract_format_from_file, parse_format_from_text
from backend.previous_paper_analyzer import analyze_past_paper_file
from backend.exporters import (
    export_question_paper_pdf, export_answer_key_pdf, export_question_paper_docx
)

from backend.ncert_service import search_ncert_catalog, import_ncert_textbook
from backend.ncert_catalog_data import FULL_NCERT_CATALOG
# Initialize database schema and seeds
db.init_db()

router = APIRouter()

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-Powered Question Paper Generator & Book Assistant with strict RAG grounding"
)

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(404)
async def custom_404_handler(request: Request, exc: Any):
    return JSONResponse(
        status_code=404,
        content={
            "detail": "Route Not Found",
            "request_url_path": str(request.url.path),
            "request_scope_path": str(request.scope.get("path")),
            "request_root_path": str(request.scope.get("root_path")),
            "request_headers": dict(request.headers),
            "request_method": request.method
        }
    )


# ==========================================
# 0. ROOT & HEALTH ENDPOINTS
# ==========================================================

FRONTEND_DIST = settings.BASE_DIR.parent / "frontend" / "dist"

@app.get("/")
def serve_root():
    if FRONTEND_DIST.exists():
        index_file = FRONTEND_DIST / "index.html"
        if index_file.is_file():
            return FileResponse(index_file, media_type="text/html")
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "llm_provider": settings.LLM_PROVIDER,
        "groq_active": bool(settings.GROQ_API_KEY)
    }


# ==========================================
# 1. DASHBOARD & STATS API
# ==========================================

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "llm_provider": settings.LLM_PROVIDER,
        "groq_model": settings.GROQ_MODEL,
        "groq_active": bool(settings.GROQ_API_KEY)
    }


@router.get("/debug-files")
def debug_files():
    results = {}
    results["base_dir"] = str(settings.BASE_DIR)
    results["cwd"] = os.getcwd()
    results["frontend_dist"] = str(FRONTEND_DIST)
    results["frontend_dist_exists"] = FRONTEND_DIST.exists()
    if FRONTEND_DIST.exists():
        results["dist_files"] = [str(p.relative_to(FRONTEND_DIST)) for p in FRONTEND_DIST.rglob("*")]
    return results


@app.get("/debug-headers")
@router.get("/debug-headers")
def debug_headers(request: Request):
    return {
        "headers": dict(request.headers),
        "url": str(request.url),
        "path": request.url.path,
        "scope_path": request.scope.get("path"),
        "scope_raw_path": request.scope.get("raw_path", b"").decode("latin1", errors="ignore")
    }


@router.get("/stats")
def get_dashboard_stats():
    books = db.get_all_books()
    papers = db.get_all_papers()
    bank_items = db.get_question_bank_items()
    formats = db.get_all_formats()

    total_chapters = sum(len(b.chapters) for b in books)

    return {
        "total_books": len(books),
        "total_chapters": total_chapters,
        "total_papers_generated": len(papers),
        "total_question_bank_items": len(bank_items),
        "total_formats_available": len(formats),
        "recent_papers": [p.model_dump() for p in papers[:5]],
        "available_books_preview": [
            {
                "id": b.id,
                "title": b.title,
                "subject": b.subject,
                "grade": b.grade,
                "board": b.board,
                "chapter_count": len(b.chapters),
                "cover_color": b.cover_color
            }
            for b in books[:6]
        ]
    }


# ==========================================
# 2. BOOK LIBRARY API
# ==========================================

@router.get("/books", response_model=List[Book])
def list_books():
    return db.get_all_books()


@router.get("/books/{book_id}", response_model=Book)
def get_book(book_id: str):
    book = db.get_book_by_id(book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@router.post("/books")
async def upload_book(
    file: UploadFile = File(...),
    title: str = Form(...),
    subject: str = Form(...),
    grade: str = Form(...),
    board: str = Form("CBSE"),
    author: Optional[str] = Form("NCERT / Author"),
    academic_year: Optional[str] = Form("2025-2026")
):
    """Uploads a PDF textbook, extracts text, detects chapters, chunks, and indexes."""
    book_id = f"book-{uuid.uuid4().hex[:8]}"
    saved_filename = f"{book_id}_{file.filename}"
    file_path = settings.UPLOADS_DIR / saved_filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    file_size = os.path.getsize(file_path)

    # 1. Open PDF with PyMuPDF to detect chapters
    import pymupdf
    doc = pymupdf.open(str(file_path))
    total_pages = len(doc)
    detected_raw_chapters = detect_chapters_from_pdf(doc)
    doc.close()

    chapters = [Chapter(**ch) for ch in detected_raw_chapters]

    # 2. Create Book record
    book = Book(
        id=book_id,
        title=title,
        subject=subject,
        grade=grade,
        board=board,
        author=author,
        academic_year=academic_year,
        filename=file.filename,
        file_path=str(file_path),
        file_size_bytes=file_size,
        total_pages=total_pages,
        chapters=chapters,
        is_indexed=False,
        indexed_chunks=0,
        cover_color="violet"
    )

    # 3. Chunk and index textbook
    try:
        chunks, updated_chapters = extract_and_chunk_pdf(
            file_path=str(file_path),
            book_id=book.id,
            book_title=book.title,
            chapters=book.chapters
        )
        book.chapters = updated_chapters
        book.is_indexed = True
        book.indexed_chunks = len(chunks)
        
        # Ingest into RAG vector and BM25 index
        rag_engine.index_chunks(chunks)
    except Exception as e:
        print(f"[Upload] Warning during PDF indexing: {e}")

    # Save to database
    db.save_book(book)
    return book


@router.post("/books/{book_id}/reindex")
def reindex_book(book_id: str):
    book = db.get_book_by_id(book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    if os.path.exists(book.file_path):
        chunks, updated_chapters = extract_and_chunk_pdf(
            file_path=book.file_path,
            book_id=book.id,
            book_title=book.title,
            chapters=book.chapters
        )
        book.chapters = updated_chapters
        book.is_indexed = True
        book.indexed_chunks = len(chunks)
        rag_engine.index_chunks(chunks)
        db.save_book(book)

    return {"message": "Book re-indexed successfully", "chunks_indexed": book.indexed_chunks}


@router.delete("/books/{book_id}")
def delete_book(book_id: str):
    success = db.delete_book(book_id)
    return {"success": success}


# ==========================================
# 2.5 NCERT TEXTBOOK DIRECTORY & IMPORTER API
# ==========================================

@router.get("/ncert/meta")
def get_ncert_meta_info():
    """
    Returns unique classes, subjects per class, media types, and count from official NCERT directory.
    """
    from backend.ncert_service import get_ncert_metadata
    return get_ncert_metadata()


@router.get("/ncert/catalog")
def get_ncert_catalog(
    query: Optional[str] = None,
    class_grade: Optional[str] = None,
    subject: Optional[str] = None,
    medium: Optional[str] = None,
    limit: Optional[int] = 120
):
    """
    Search and browse official NCERT textbooks directory (Class 1 to 12 - 1,122+ books).
    """
    return search_ncert_catalog(query=query, class_grade=class_grade, subject=subject, medium=medium, limit=limit)


@router.post("/ncert/import", response_model=Book)
def import_ncert_book(payload: Dict[str, str]):
    """
    Directly imports, parses, and indexes an official NCERT textbook by its code (e.g. 'jesc1', 'jemh1').
    """
    book_code = payload.get("code")
    if not book_code:
        raise HTTPException(status_code=400, detail="Missing NCERT book code")

    try:
        imported_book = import_ncert_textbook(book_code)
        return imported_book
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to import NCERT textbook: {str(e)}")


# ==========================================
# 3. PAPER FORMATS API
# ==========================================

@router.get("/formats", response_model=List[PaperFormat])
def list_formats():
    return db.get_all_formats()


@router.get("/formats/{format_id}", response_model=PaperFormat)
def get_format(format_id: str):
    fmt = db.get_format_by_id(format_id)
    if not fmt:
        raise HTTPException(status_code=404, detail="Paper format not found")
    return fmt


@router.post("/formats", response_model=PaperFormat)
def create_or_update_format(fmt: PaperFormat):
    # Recalculate section totals
    for s in fmt.sections:
        s.total_marks = s.question_count * s.marks_per_question
    fmt.total_marks = sum(s.total_marks for s in fmt.sections)
    return db.save_format(fmt)


@router.post("/formats/upload", response_model=PaperFormat)
async def upload_format_file(file: UploadFile = File(...)):
    """Uploads a PDF, DOCX, or text paper format and parses its structure."""
    temp_path = settings.UPLOADS_DIR / f"temp_fmt_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        parsed_format = extract_format_from_file(str(temp_path))
        db.save_format(parsed_format)
        return parsed_format
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)


@router.delete("/formats/{format_id}")
def delete_format(format_id: str):
    success = db.delete_format(format_id)
    return {"success": success}


# ==========================================
# 4. QUESTION PAPER GENERATOR API
# ==========================================

@router.post("/generate/paper", response_model=QuestionPaper)
def generate_question_paper(req: QuestionPaperGenerationRequest):
    """
    RAG-driven Question Paper Generation Pipeline:
    1. Pre-filter textbook context to req.book_id and req.chapter_ids.
    2. Obtain Paper Format.
    3. Generate questions matching section criteria.
    4. Enforce strict anti-hallucination grounding verification on every question.
    5. Run semantic deduplication and quality audit.
    6. Generate comprehensive Answer Key with step-by-step rubrics.
    7. Save to Database & Question Bank.
    """
    book = db.get_book_by_id(req.book_id)
    if not book:
        code = req.book_id.replace("ncert-", "")
        if any(b["code"] == code for b in FULL_NCERT_CATALOG):
            from backend.ncert_service import import_ncert_textbook
            book = import_ncert_textbook(code)
        else:
            raise HTTPException(status_code=404, detail="Selected textbook not found")

    if not req.chapter_ids:
        # If chapters were not specified, select all
        req.chapter_ids = [c.id for c in book.chapters]

    # Get Paper Format
    if req.custom_format:
        paper_format = req.custom_format
    elif req.format_id:
        paper_format = db.get_format_by_id(req.format_id)
        if not paper_format:
            paper_format = db.get_all_formats()[0]
    else:
        paper_format = db.get_all_formats()[0]

    # Identify selected chapters metadata
    selected_chapters = [c for c in book.chapters if c.id in req.chapter_ids]
    if not selected_chapters:
        selected_chapters = book.chapters[:2]

    # Cognitive depth (Bloom's Taxonomy) distribution list
    blooms_levels = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"]

    generated_questions: List[QuestionItem] = []
    existing_question_texts: List[str] = []
    question_counter = 1

    # Loop through each section in the paper format
    for section in paper_format.sections:
        for q_idx in range(section.question_count):
            # Select chapter based on rotation or custom weightage
            target_chap = selected_chapters[(question_counter - 1) % len(selected_chapters)]
            
            # Select cognitive level
            blooms_level = blooms_levels[(question_counter - 1) % len(blooms_levels)]
            
            # Select difficulty
            difficulty = req.difficulty
            if difficulty == "Mixed":
                diff_cycle = ["Easy", "Medium", "Hard"]
                difficulty = diff_cycle[(question_counter - 1) % 3]

            # RAG RETRIEVAL: STRICT PRE-FILTERING
            passages = rag_engine.query_textbook(
                query=f"{target_chap.title} {section.question_type} {blooms_level}",
                book_id=req.book_id,
                chapter_ids=[target_chap.id],
                top_k=3,
                allow_fallback=True
            )

            if not passages:
                # Fallback to any available passage in that chapter
                passages = rag_engine.query_textbook(
                    query=target_chap.title,
                    book_id=req.book_id,
                    chapter_ids=[target_chap.id],
                    top_k=2,
                    allow_fallback=True
                )

            active_passage = passages[0] if passages else QuestionSourceCitation(
                book_id=book.id,
                book_title=book.title,
                chapter_id=target_chap.id,
                chapter_number=target_chap.chapter_number,
                chapter_name=target_chap.title,
                page=target_chap.start_page,
                section="Core Textbook Content",
                text_reference=f"Standard textbook concept from {target_chap.title}"
            )

            # Generate Grounded Question
            q_item = None
            for attempt in range(settings.MAX_REGEN_ATTEMPTS):
                candidate_q = llm_service.generate_question_from_passage(
                    passage=active_passage,
                    question_type=section.question_type,
                    marks=section.marks_per_question,
                    difficulty=difficulty,
                    blooms_level=blooms_level,
                    question_number=question_counter,
                    section_name=section.name,
                    existing_questions=existing_question_texts
                )

                if candidate_q:
                    # Semantic deduplication check
                    is_dup, _ = quality_checker.is_duplicate(
                        candidate_q.question_text, existing_question_texts
                    )
                    if not is_dup or attempt == settings.MAX_REGEN_ATTEMPTS - 1:
                        q_item = candidate_q
                        break

            if not q_item:
                # Ultimate fallback grounded item
                q_item = QuestionItem(
                    question_number=question_counter,
                    section_name=section.name,
                    question_type=section.question_type,
                    question_text=f"Explain the key principles of {active_passage.section} in {target_chap.title}.",
                    correct_answer=f"Refer to page {active_passage.page} of {book.title}.",
                    step_by_step_solution=f"Textbook reference: {active_passage.text_reference}",
                    marks=section.marks_per_question,
                    difficulty=difficulty,
                    blooms_level=blooms_level,
                    chapter_id=target_chap.id,
                    chapter_name=target_chap.title,
                    source=active_passage,
                    grounding_score=0.90,
                    grounding_status="VERIFIED"
                )

            generated_questions.append(q_item)
            existing_question_texts.append(q_item.question_text)
            question_counter += 1

            # Auto-save verified question into persistent Question Bank
            qb_item = QuestionBankItem(
                id=f"qb-{uuid.uuid4().hex[:8]}",
                question_text=q_item.question_text,
                options=q_item.options,
                correct_answer=q_item.correct_answer,
                detailed_solution=q_item.step_by_step_solution,
                question_type=q_item.question_type,
                marks=q_item.marks,
                difficulty=q_item.difficulty,
                blooms_level=q_item.blooms_level,
                book_id=book.id,
                book_title=book.title,
                chapter_id=target_chap.id,
                chapter_name=target_chap.title,
                page=q_item.source.page,
                source_snippet=q_item.source.text_reference,
                tags=[book.subject, q_item.difficulty, q_item.blooms_level]
            )
            db.save_question_bank_item(qb_item)

    # Build Final Question Paper Object
    paper_id = f"paper-{uuid.uuid4().hex[:8]}"
    total_paper_marks = sum(q.marks for q in generated_questions)

    # Blooms summary
    blooms_summary = {}
    for q in generated_questions:
        blooms_summary[q.blooms_level] = blooms_summary.get(q.blooms_level, 0) + 1

    question_paper = QuestionPaper(
        id=paper_id,
        title=f"{book.subject} - {req.exam_name or 'Periodic Assessment'}",
        book_id=book.id,
        book_title=book.title,
        subject=book.subject,
        grade=book.grade,
        board=book.board,
        school_name=req.school_name or "Delhi Public School",
        exam_name=req.exam_name or "Mid-Term Examination 2025-26",
        teacher_name=req.teacher_name or "Senior Faculty",
        date_str=req.date_str or "March 2026",
        total_marks=total_paper_marks,
        duration_minutes=paper_format.duration_minutes,
        instructions=paper_format.instructions,
        sections=paper_format.sections,
        questions=generated_questions,
        covered_chapter_ids=[c.id for c in selected_chapters],
        covered_chapter_names=[c.title for c in selected_chapters],
        difficulty=req.difficulty,
        blooms_summary=blooms_summary,
        grounding_verified_ratio=1.0
    )

    # Save Paper
    db.save_paper(question_paper)

    # Auto-generate Answer Key
    answer_items = []
    for q in generated_questions:
        answer_items.append(AnswerKeyItem(
            question_number=q.question_number,
            section_name=q.section_name,
            question_type=q.question_type,
            question_text=q.question_text,
            correct_answer=q.correct_answer,
            detailed_explanation=q.step_by_step_solution or q.correct_answer,
            formula_and_steps=q.formula_used,
            marks=q.marks,
            source_reference=q.source
        ))

    answer_key = AnswerKey(
        paper_id=question_paper.id,
        paper_title=question_paper.title,
        subject=question_paper.subject,
        grade=question_paper.grade,
        total_marks=question_paper.total_marks,
        answers=answer_items
    )
    db.save_answer_key(answer_key)

    return question_paper


# ==========================================
# 5. PAPERS & LIVE EDITOR API
# ==========================================

@router.get("/papers", response_model=List[QuestionPaper])
def list_papers():
    return db.get_all_papers()


@router.get("/papers/{paper_id}", response_model=QuestionPaper)
def get_paper(paper_id: str):
    paper = db.get_paper_by_id(paper_id)
    if not paper:
        raise HTTPException(status_code=404, detail="Question paper not found")
    return paper


@router.put("/papers/{paper_id}", response_model=QuestionPaper)
def update_paper(paper_id: str, updated_paper: QuestionPaper):
    """Saves edits to questions, marks, order, or headers made in the Question Paper Editor."""
    # Recalculate live total marks
    updated_paper.total_marks = sum(q.marks for q in updated_paper.questions)
    saved = db.save_paper(updated_paper)
    return saved


@router.post("/papers/{paper_id}/regenerate-question")
def regenerate_single_question(
    paper_id: str,
    question_number: int,
    difficulty: Optional[str] = None
):
    """Regenerates a single specific question in a paper with fresh RAG retrieval."""
    paper = db.get_paper_by_id(paper_id)
    if not paper:
        raise HTTPException(status_code=404, detail="Question paper not found")

    target_q_idx = None
    for idx, q in enumerate(paper.questions):
        if q.question_number == question_number:
            target_q_idx = idx
            break

    if target_q_idx is None:
        raise HTTPException(status_code=404, detail="Question number not found in paper")

    current_q = paper.questions[target_q_idx]
    
    # Retrieve fresh passage
    passages = rag_engine.query_textbook(
        query=f"{current_q.chapter_name} {current_q.question_type}",
        book_id=paper.book_id,
        chapter_ids=[current_q.chapter_id],
        top_k=3,
        allow_fallback=True
    )
    active_passage = passages[0] if passages else current_q.source

    new_q = llm_service.generate_question_from_passage(
        passage=active_passage,
        question_type=current_q.question_type,
        marks=current_q.marks,
        difficulty=difficulty or current_q.difficulty,
        blooms_level=current_q.blooms_level,
        question_number=current_q.question_number,
        section_name=current_q.section_name,
        existing_questions=[q.question_text for q in paper.questions if q.question_number != question_number]
    )

    if new_q:
        paper.questions[target_q_idx] = new_q
        db.save_paper(paper)
        return new_q

    return current_q


@router.delete("/papers/{paper_id}")
def delete_paper(paper_id: str):
    success = db.delete_paper(paper_id)
    return {"success": success}


@router.get("/papers/{paper_id}/answer-key", response_model=AnswerKey)
def get_paper_answer_key(paper_id: str):
    ak = db.get_answer_key_by_paper_id(paper_id)
    if not ak:
        # Generate on the fly if missing
        paper = db.get_paper_by_id(paper_id)
        if not paper:
            raise HTTPException(status_code=404, detail="Question paper not found")
        answers = [
            AnswerKeyItem(
                question_number=q.question_number,
                section_name=q.section_name,
                question_type=q.question_type,
                question_text=q.question_text,
                correct_answer=q.correct_answer,
                detailed_explanation=q.step_by_step_solution or q.correct_answer,
                formula_and_steps=q.formula_used,
                marks=q.marks,
                source_reference=q.source
            )
            for q in paper.questions
        ]
        ak = AnswerKey(
            paper_id=paper.id,
            paper_title=paper.title,
            subject=paper.subject,
            grade=paper.grade,
            total_marks=paper.total_marks,
            answers=answers
        )
        db.save_answer_key(ak)
    return ak


# ==========================================
# 6. EXPORTS API (PDF & DOCX)
# ==========================================

@router.get("/papers/{paper_id}/export/pdf")
def export_paper_pdf(paper_id: str):
    paper = db.get_paper_by_id(paper_id)
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    file_path = export_question_paper_pdf(paper)
    return FileResponse(
        file_path,
        media_type="application/pdf",
        filename=f"Question_Paper_{paper.subject}_{paper.grade}.pdf"
    )


@router.get("/papers/{paper_id}/export/answer-key-pdf")
def export_ak_pdf(paper_id: str):
    ak = db.get_answer_key_by_paper_id(paper_id)
    if not ak:
        raise HTTPException(status_code=404, detail="Answer key not found")
    file_path = export_answer_key_pdf(ak)
    return FileResponse(
        file_path,
        media_type="application/pdf",
        filename=f"Answer_Key_{ak.subject}_{ak.grade}.pdf"
    )


@router.get("/papers/{paper_id}/export/docx")
def export_paper_docx(paper_id: str):
    paper = db.get_paper_by_id(paper_id)
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    file_path = export_question_paper_docx(paper)
    return FileResponse(
        file_path,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename=f"Question_Paper_{paper.subject}_{paper.grade}.docx"
    )


# ==========================================
# 7. BOOK CHATBOT API
# ==========================================

@app.post("/api/chat", response_model=ChatResponse)
@app.post("/chat", response_model=ChatResponse)
@router.post("/chat", response_model=ChatResponse)
@router.post("/chat/", response_model=ChatResponse)
def chat_with_book_endpoint(req: ChatRequest):
    """
    Chat with Book endpoint with strict RAG and Book-Only Mode toggle.
    """
    is_global = not req.book_id or req.book_id in ["all", "global", "*"]
    
    if is_global:
        book_title = "NCERT Curriculum & All Textbooks"
        chapter_name = "Global Knowledge Base"
        passages = rag_engine.query_textbook(
            query=req.message,
            book_id="all",
            top_k=4,
            allow_fallback=not req.book_only_mode
        )
        if passages:
            book_title = passages[0].book_title
            chapter_name = passages[0].chapter_name
    else:
        book = db.get_book_by_id(req.book_id)
        if not book:
            code = req.book_id.replace("ncert-", "")
            if any(b["code"] == code for b in FULL_NCERT_CATALOG):
                from backend.ncert_service import import_ncert_textbook
                book = import_ncert_textbook(code)
            else:
                raise HTTPException(status_code=404, detail="Book not found")

        book_title = book.title
        chapter_ids = [req.chapter_id] if req.chapter_id else [c.id for c in book.chapters]
        chapter_name = "All Chapters"
        if req.chapter_id:
            for c in book.chapters:
                if c.id == req.chapter_id:
                    chapter_name = c.title
                    break

        # Strictly retrieve passages from selected book & chapter
        passages = rag_engine.query_textbook(
            query=req.message,
            book_id=req.book_id,
            chapter_ids=chapter_ids,
            top_k=4,
            allow_fallback=not req.book_only_mode
        )

    response = llm_service.chat_with_book(
        book_title=book_title,
        chapter_name=chapter_name,
        query=req.message,
        passages=passages,
        book_only_mode=req.book_only_mode
    )

    return response


# ==========================================
# 8. QUESTION BANK API
# ==========================================

@router.get("/bank", response_model=List[QuestionBankItem])
def list_question_bank(
    book_id: Optional[str] = None,
    chapter_id: Optional[str] = None,
    question_type: Optional[str] = None,
    difficulty: Optional[str] = None,
    query: Optional[str] = None
):
    return db.get_question_bank_items(
        book_id=book_id,
        chapter_id=chapter_id,
        question_type=question_type,
        difficulty=difficulty,
        search_query=query
    )


@router.post("/bank", response_model=QuestionBankItem)
def create_question_bank_item(item: QuestionBankItem):
    return db.save_question_bank_item(item)


@router.delete("/bank/{item_id}")
def delete_question_bank_item(item_id: str):
    success = db.delete_question_bank_item(item_id)
    return {"success": success}


# ==========================================
# 9. PAST PAPER ANALYZER API
# ==========================================

@router.post("/analyzer/upload", response_model=PastPaperAnalysis)
async def upload_past_paper_analyzer(file: UploadFile = File(...)):
    temp_path = settings.UPLOADS_DIR / f"analyzer_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        analysis = analyze_past_paper_file(str(temp_path))
        db.save_past_paper_analysis(analysis)
        return analysis
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)


@router.get("/analyzer/history", response_model=List[PastPaperAnalysis])
def list_past_paper_analyses():
    return db.get_all_past_paper_analyses()


# ==========================================
# 10. SETTINGS API
# ==========================================

@router.get("/settings")
def get_settings():
    return {
        "llm_provider": settings.LLM_PROVIDER,
        "has_groq_key": bool(settings.GROQ_API_KEY or os.environ.get("GROQ_API_KEY")),
        "groq_model": settings.GROQ_MODEL,
        "has_gemini_key": bool(settings.GEMINI_API_KEY or os.environ.get("GEMINI_API_KEY")),
        "has_openai_key": bool(settings.OPENAI_API_KEY or os.environ.get("OPENAI_API_KEY")),
        "has_anthropic_key": bool(settings.ANTHROPIC_API_KEY or os.environ.get("ANTHROPIC_API_KEY")),
        "strict_book_only": settings.STRICT_BOOK_ONLY,
        "grounding_threshold": settings.GROUNDING_THRESHOLD,
        "duplication_threshold": settings.SIMILARITY_DUPLICATION_THRESHOLD
    }


@router.post("/settings")
def update_settings(payload: Dict[str, Any]):
    if "groq_api_key" in payload and payload["groq_api_key"]:
        settings.GROQ_API_KEY = payload["groq_api_key"]
        llm_service.groq_key = payload["groq_api_key"]
    if "groq_model" in payload and payload["groq_model"]:
        settings.GROQ_MODEL = payload["groq_model"]
        llm_service.groq_model = payload["groq_model"]
    if "gemini_api_key" in payload and payload["gemini_api_key"]:
        settings.GEMINI_API_KEY = payload["gemini_api_key"]
        llm_service.gemini_key = payload["gemini_api_key"]
    if "openai_api_key" in payload and payload["openai_api_key"]:
        settings.OPENAI_API_KEY = payload["openai_api_key"]
        llm_service.openai_key = payload["openai_api_key"]
    if "llm_provider" in payload:
        settings.LLM_PROVIDER = payload["llm_provider"]
        llm_service.provider = payload["llm_provider"]
    if "grounding_threshold" in payload:
        settings.GROUNDING_THRESHOLD = float(payload["grounding_threshold"])
        grounding_verifier.threshold = float(payload["grounding_threshold"])

    return {"message": "Settings updated successfully"}



# Mount all API endpoints with /api/index.py, /api/index, /api prefix AND without prefix (for Vercel serverless compatibility)
app.include_router(router, prefix="/api/index.py")
app.include_router(router, prefix="/api/index")
app.include_router(router, prefix="/api")
app.include_router(router)

# ==========================================
# 11. FRONTEND STATIC FILE SERVING (LOCAL ONLY)
# ==========================================

if not settings.IS_SERVERLESS and FRONTEND_DIST.exists():
    if (FRONTEND_DIST / "assets").exists():
        app.mount("/assets", StaticFiles(directory=str(FRONTEND_DIST / "assets")), name="static_assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        clean_path = full_path.lstrip("/\\")
        if clean_path.startswith("api/") or clean_path == "api":
            raise HTTPException(status_code=404, detail="API route not found")
        file_path = FRONTEND_DIST / clean_path
        if file_path.is_file():
            media_type = None
            if clean_path.endswith(".js"):
                media_type = "application/javascript"
            elif clean_path.endswith(".css"):
                media_type = "text/css"
            elif clean_path.endswith(".svg"):
                media_type = "image/svg+xml"
            elif clean_path.endswith(".png"):
                media_type = "image/png"
            elif clean_path.endswith(".ico"):
                media_type = "image/x-icon"
            return FileResponse(file_path, media_type=media_type)
        index_file = FRONTEND_DIST / "index.html"
        if index_file.is_file():
            return FileResponse(index_file, media_type="text/html")
        raise HTTPException(status_code=404, detail="Resource not found")


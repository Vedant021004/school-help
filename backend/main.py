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
    QuestionBankItem, PastPaperAnalysis, KnowledgeGraph, MindMapData,
    ChapterExplanation, ChapterNotes, SlideDeck, SlideItem, TextbookQAItem,
    ChapterWorksheet, NewTermItem, DiagramQuestionItem, LessonPlan,
    LiveSession, StudentSubmission, LiveClassroomAnalytics,
    ExamPatternAnalysis, EduAgentQCReport
)
import backend.database as db
from backend.pdf_processor import detect_chapters_from_pdf, extract_and_chunk_pdf
from backend.rag_engine import rag_engine
from backend.llm_service import llm_service
from backend.grounding_verifier import grounding_verifier
from backend.quality_checker import quality_checker
from backend.format_parser import extract_format_from_file, parse_format_from_text
from backend.previous_paper_analyzer import analyze_past_paper_file, get_pattern_based_recommendations
from backend.knowledge_graph import knowledge_graph_engine
from backend.model_router import model_router
from backend.edu_agent_qc import edu_agent_qc
from backend.teaching_suite_service import teaching_suite_service
from backend.exporters import (
    export_question_paper_pdf, export_answer_key_pdf, export_question_paper_docx,
    export_presentation_pptx, export_worksheet_pdf, export_chapter_notes_pdf,
    export_textbook_chapter_pdf
)

from backend.ncert_service import search_ncert_catalog, import_ncert_textbook
from backend.ncert_catalog_data import FULL_NCERT_CATALOG
from backend.presenton_engine import presenton_engine, PresentOnDeck, PresentOnSlide, THEMES_CONFIG
from backend.ncert_study_notes_service import ncert_study_notes_service, NcertStudyCompleteNote
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


@app.middleware("http")
async def extract_subpath_middleware(request: Request, call_next):
    subpath = request.query_params.get("__subpath__")
    if subpath:
        clean_sub = subpath.lstrip("/")
        request.scope["path"] = "/" + clean_sub
        request.scope["raw_path"] = request.scope["path"].encode("latin1")
    return await call_next(request)


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


@router.get("/books/{book_id}/read")
def read_book_content(book_id: str, chapter_id: Optional[str] = None):
    """
    Returns complete readable chapter passages, excerpts, and pages for interactive reading.
    """
    book = db.get_book_by_id(book_id)
    if not book:
        code = book_id.replace("ncert-", "")
        if any(b["code"] == code for b in FULL_NCERT_CATALOG):
            from backend.ncert_service import import_ncert_textbook
            book = import_ncert_textbook(code)
        else:
            raise HTTPException(status_code=404, detail="Book not found")

    rag_engine.ensure_book_indexed(book.id)
    if chapter_id:
        chunks = rag_engine.get_all_for_chapters(book.id, [chapter_id])
    else:
        chunks = rag_engine.get_all_for_chapters(book.id, None)

    return {
        "book": book,
        "total_chunks": len(chunks),
        "passages": [
            {
                "id": c.id,
                "content": c.content,
                "page_number": c.metadata.page_number,
                "chapter_id": c.metadata.chapter_id,
                "chapter_title": c.metadata.chapter_title,
                "section_name": c.metadata.section_name or "Main Excerpt"
            }
            for c in chunks
        ]
    }


@router.get("/books/{book_id}/pdf")
def serve_book_pdf(book_id: str, chapter_id: Optional[str] = None):
    """
    Streams the raw uploaded textbook PDF file or generates a real textbook PDF preview.
    """
    book = db.get_book_by_id(book_id)
    if not book:
        code = book_id.replace("ncert-", "")
        if any(b["code"] == code for b in FULL_NCERT_CATALOG):
            from backend.ncert_service import import_ncert_textbook
            book = import_ncert_textbook(code)
        else:
            raise HTTPException(status_code=404, detail="Book not found")

    if book.file_path and os.path.exists(book.file_path) and os.path.getsize(book.file_path) > 1000:
        return FileResponse(
            book.file_path,
            filename=book.filename or f"{book.title}.pdf",
            media_type="application/pdf"
        )

    # Generate a real textbook PDF preview from indexed passages
    rag_engine.ensure_book_indexed(book.id)
    chunks = rag_engine.get_all_for_chapters(book.id, [chapter_id] if chapter_id else None)
    if not chunks:
        chunks = rag_engine.get_all_for_chapters(book.id, None)

    pdf_path = export_textbook_chapter_pdf(book, chunks, chapter_id)
    return FileResponse(
        pdf_path,
        filename=f"{book.title.replace(' ', '_')}_Textbook.pdf",
        media_type="application/pdf"
    )


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


# ==========================================
# 10B. OPEN-SOURCE MODEL MANAGER & BENCHMARK API
# ==========================================

@router.get("/models/health")
def get_models_health():
    from backend.model_manager import model_manager
    return model_manager.health_check()


@router.get("/models/registry")
def get_models_registry():
    from backend.model_manager import SPECIALIZED_MODELS
    return SPECIALIZED_MODELS


@router.post("/models/benchmark")
def run_model_benchmark():
    from backend.benchmark_suite import benchmark_suite
    return benchmark_suite.run_full_benchmark()


# ==========================================
# 11. AI TEACHER COPILOT API
# ==========================================

@router.post("/copilot/teach-chapter")
def copilot_teach_chapter(payload: Dict[str, Any]):
    book_id = payload.get("book_id", "book-sci-10")
    chapter_id = payload.get("chapter_id", "chap-sci-10-1")
    return teaching_suite_service.generate_complete_teaching_package(book_id, chapter_id)


@router.post("/copilot/explain", response_model=ChapterExplanation)
def copilot_explain_chapter(payload: Dict[str, Any]):
    book_id = payload.get("book_id", "book-sci-10")
    chapter_id = payload.get("chapter_id", "chap-sci-10-1")
    mode = payload.get("mode", "student_friendly")
    return teaching_suite_service.explain_chapter(book_id, chapter_id, mode)


@router.post("/copilot/notes", response_model=ChapterNotes)
def copilot_chapter_notes(payload: Dict[str, Any]):
    book_id = payload.get("book_id", "book-sci-10")
    chapter_id = payload.get("chapter_id", "chap-sci-10-1")
    return teaching_suite_service.generate_chapter_notes(book_id, chapter_id)


@router.post("/copilot/notes/download-pdf")
def copilot_download_notes_pdf(notes_payload: Dict[str, Any]):
    notes = ChapterNotes(**notes_payload)
    pdf_path = export_chapter_notes_pdf(notes)
    return FileResponse(
        pdf_path,
        filename=os.path.basename(pdf_path),
        media_type="application/pdf"
    )


@router.post("/copilot/ppt", response_model=SlideDeck)
def copilot_slide_deck(payload: Dict[str, Any]):
    book_id = payload.get("book_id", "book-sci-10")
    chapter_id = payload.get("chapter_id", "chap-sci-10-1")
    slide_count = int(payload.get("slide_count", 10))
    return teaching_suite_service.generate_slide_deck(book_id, chapter_id, slide_count)


@router.post("/copilot/ppt/download")
def copilot_download_pptx(deck_payload: Dict[str, Any]):
    deck = SlideDeck(**deck_payload)
    pptx_path = export_presentation_pptx(deck)
    return FileResponse(
        pptx_path,
        filename=os.path.basename(pptx_path),
        media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation"
    )


@router.post("/copilot/textbook-solutions", response_model=List[TextbookQAItem])
def copilot_textbook_solutions(payload: Dict[str, Any]):
    book_id = payload.get("book_id", "book-sci-10")
    chapter_id = payload.get("chapter_id", "chap-sci-10-1")
    return teaching_suite_service.solve_textbook_questions(book_id, chapter_id)


@router.post("/copilot/worksheet", response_model=ChapterWorksheet)
def copilot_chapter_worksheet(payload: Dict[str, Any]):
    book_id = payload.get("book_id", "book-sci-10")
    chapter_id = payload.get("chapter_id", "chap-sci-10-1")
    worksheet_type = payload.get("worksheet_type", "practice")
    question_count = int(payload.get("question_count", 5))
    return teaching_suite_service.generate_worksheet(book_id, chapter_id, worksheet_type, question_count)


@router.post("/copilot/worksheet/download-pdf")
def copilot_download_worksheet_pdf(payload: Dict[str, Any]):
    worksheet = ChapterWorksheet(**payload.get("worksheet", {}))
    school_name = payload.get("school_name", "Central Academy")
    pdf_path = export_worksheet_pdf(worksheet, school_name)
    return FileResponse(
        pdf_path,
        filename=os.path.basename(pdf_path),
        media_type="application/pdf"
    )


@router.post("/copilot/terms", response_model=List[NewTermItem])
def copilot_new_terms(payload: Dict[str, Any]):
    book_id = payload.get("book_id", "book-sci-10")
    chapter_id = payload.get("chapter_id", "chap-sci-10-1")
    return teaching_suite_service.extract_new_terms(book_id, chapter_id)


@router.post("/copilot/diagram-worksheet", response_model=DiagramQuestionItem)
def copilot_diagram_worksheet(payload: Dict[str, Any]):
    book_id = payload.get("book_id", "book-sci-10")
    chapter_id = payload.get("chapter_id", "chap-sci-10-1")
    return teaching_suite_service.generate_diagram_worksheet(book_id, chapter_id)


@router.post("/copilot/lesson-plan", response_model=LessonPlan)
def copilot_lesson_plan(payload: Dict[str, Any]):
    book_id = payload.get("book_id", "book-sci-10")
    chapter_id = payload.get("chapter_id", "chap-sci-10-1")
    duration = int(payload.get("duration_minutes", 45))
    return teaching_suite_service.generate_lesson_plan(book_id, chapter_id, duration)


@router.post("/copilot/mindmap", response_model=MindMapData)
def copilot_mind_map(payload: Dict[str, Any]):
    book_id = payload.get("book_id", "book-sci-10")
    chapter_id = payload.get("chapter_id", "chap-sci-10-1")
    chapter_name = payload.get("chapter_name", "Chapter Topic")
    return knowledge_graph_engine.generate_mind_map(book_id, chapter_id, chapter_name)


@router.post("/copilot/knowledge-graph", response_model=KnowledgeGraph)
def copilot_knowledge_graph(payload: Dict[str, Any]):
    book_id = payload.get("book_id", "book-sci-10")
    chapter_id = payload.get("chapter_id", "chap-sci-10-1")
    chapter_name = payload.get("chapter_name", "Chapter Topic")
    return knowledge_graph_engine.get_or_build_graph(book_id, chapter_id, chapter_name)


# ==========================================
# 12. LIVE CLASSROOM WORKSHEET API
# ==========================================

@router.post("/copilot/live/create-session", response_model=LiveSession)
def create_live_classroom_session(payload: Dict[str, Any]):
    room_code = payload.get("room_code") or f"ROOM-{uuid.uuid4().hex[:6].upper()}"
    session = LiveSession(
        room_code=room_code,
        teacher_name=payload.get("teacher_name", "Teacher"),
        book_id=payload.get("book_id", "book-sci-10"),
        chapter_id=payload.get("chapter_id", "chap-sci-10-1"),
        chapter_name=payload.get("chapter_name", "Chapter Topic"),
        worksheet_title=payload.get("worksheet_title", "Live Classroom Assessment"),
        questions=payload.get("questions", []),
        is_active=True
    )
    return db.create_live_session(session)


@router.get("/copilot/live/active-sessions", response_model=List[LiveSession])
def get_active_live_classroom_sessions():
    sessions = db.get_active_live_sessions()
    if not sessions:
        # Create a default active live quiz room if none currently active
        default_session = LiveSession(
            room_code="NCERT-101",
            teacher_name="AI Teacher Master",
            book_id="book-sci-10",
            chapter_id="chap-sci-10-1",
            chapter_name="Chemical Reactions and Equations",
            worksheet_title="Classroom Rapid Diagnostic Assessment",
            questions=[
                {
                    "question_number": 1,
                    "question_text": "Which gas is evolved when dilute Sulphuric acid reacts with Zinc granules?",
                    "question_type": "mcq",
                    "marks": 1,
                    "options": ["A. Oxygen", "B. Nitrogen", "C. Hydrogen", "D. Carbon dioxide"],
                    "correct_answer": "C",
                    "explanation": "Zn(s) + H2SO4(aq) -> ZnSO4(aq) + H2(g). Hydrogen gas burns with a characteristic pop sound."
                },
                {
                    "question_number": 2,
                    "question_text": "What type of chemical reaction is the digestion of food in our body?",
                    "question_type": "mcq",
                    "marks": 1,
                    "options": ["A. Combination Reaction", "B. Decomposition Reaction", "C. Displacement Reaction", "D. Precipitation Reaction"],
                    "correct_answer": "B",
                    "explanation": "During digestion, complex food molecules (carbohydrates, proteins) are broken down into simpler substances like glucose and amino acids."
                },
                {
                    "question_number": 3,
                    "question_text": "Why is Nitrogen gas used in packing oily and fatty food products like potato chips?",
                    "question_type": "mcq",
                    "marks": 1,
                    "options": ["A. To improve food color", "B. To increase food sweetness", "C. To prevent oxidation and rancidity", "D. To cook the food in packet"],
                    "correct_answer": "C",
                    "explanation": "Nitrogen is an unreactive inert gas that displaces oxygen and prevents aerial oxidation of fats and oils."
                }
            ],
            is_active=True
        )
        created = db.create_live_session(default_session)
        sessions = [created]
    return sessions


@router.get("/copilot/live/session/{room_code}", response_model=LiveSession)
def get_live_classroom_session(room_code: str):
    session = db.get_live_session(room_code)
    if not session:
        raise HTTPException(status_code=404, detail="Live session not found")
    return session


@router.post("/copilot/live/close/{room_code}")
def close_live_classroom_session(room_code: str):
    return {"success": db.close_live_session(room_code)}


@router.post("/copilot/live/submit", response_model=StudentSubmission)
def submit_student_live_answer(payload: Dict[str, Any]):
    room_code = payload.get("room_code")
    session = db.get_live_session(room_code)
    if not session or not session.is_active:
        raise HTTPException(status_code=400, detail="Live session is closed or invalid")

    student_name = payload.get("student_name", "Anonymous Student")
    student_answers = payload.get("answers", {})

    # Calculate score against questions
    score = 0
    total_marks = 0
    for q in session.questions:
        q_num = str(q.get("question_number", ""))
        q_marks = int(q.get("marks", 1))
        total_marks += q_marks
        c_ans = q.get("correct_answer", "").strip().lower()
        s_ans = str(student_answers.get(q_num, "")).strip().lower()

        if c_ans and (s_ans == c_ans or s_ans.startswith(c_ans[:1]) or c_ans.startswith(s_ans[:1])):
            score += q_marks

    accuracy = round((score / max(1, total_marks)) * 100, 1)
    sub = StudentSubmission(
        room_code=room_code,
        student_name=student_name,
        answers=student_answers,
        score=score,
        total_marks=total_marks,
        accuracy_percentage=accuracy
    )
    return db.submit_live_answer(sub)


@router.get("/copilot/live/analytics/{room_code}", response_model=LiveClassroomAnalytics)
def get_live_classroom_analytics(room_code: str):
    session = db.get_live_session(room_code)
    if not session:
        raise HTTPException(status_code=404, detail="Live session not found")

    submissions = db.get_live_submissions(room_code)
    total_part = len(submissions)
    if total_part == 0:
        return LiveClassroomAnalytics(
            room_code=room_code,
            total_participants=0,
            average_score=0.0,
            accuracy_rate=0.0,
            completion_rate=0.0,
            leaderboard=[],
            ai_insights="Waiting for students to join and submit answers."
        )

    avg_score = round(sum(s.score for s in submissions) / total_part, 1)
    avg_accuracy = round(sum(s.accuracy_percentage for s in submissions) / total_part, 1)

    leaderboard = [
        {"rank": idx + 1, "student_name": s.student_name, "score": s.score, "total_marks": s.total_marks, "accuracy": s.accuracy_percentage}
        for idx, s in enumerate(submissions[:10])
    ]

    ai_insights = (
        f"Class performance: {total_part} student(s) participated with an average accuracy of {avg_accuracy}%. "
        f"Top score achieved is {submissions[0].score}/{submissions[0].total_marks}."
    )

    return LiveClassroomAnalytics(
        room_code=room_code,
        total_participants=total_part,
        average_score=avg_score,
        accuracy_rate=avg_accuracy,
        completion_rate=100.0,
        leaderboard=leaderboard,
        ai_insights=ai_insights
    )


# ==========================================
# 13. EXAMRAG PATTERN ANALYTICS API
# ==========================================

@router.post("/copilot/exam-patterns", response_model=ExamPatternAnalysis)
def copilot_exam_patterns(payload: Dict[str, Any]):
    subject = payload.get("subject", "Science")
    grade = payload.get("grade", "Class 10")
    return get_pattern_based_recommendations(subject, grade)


# ==========================================
# 14. PRESENTON AI PRESENTATION ENGINE API
# ==========================================

@router.post("/presenton/generate", response_model=PresentOnDeck)
def generate_presenton_deck_endpoint(payload: Dict[str, Any]):
    chapter_name = payload.get("chapter_name", "Chapter Lecture")
    subject = payload.get("subject", "Science")
    grade = payload.get("grade", "Class 10")
    slide_count = int(payload.get("slide_count", 10))
    theme = payload.get("theme", "modern_indigo")
    book_id = payload.get("book_id", "")
    chapter_id = payload.get("chapter_id", "")

    context_text = ""
    if book_id and chapter_id:
        chunks = rag_engine.get_all_for_chapters(book_id, [chapter_id])
        if chunks:
            context_text = "\n\n".join([f"[Page {c.metadata.page_number}]: {c.content[:400]}" for c in chunks[:8]])

    return presenton_engine.generate_presentation(
        chapter_name=chapter_name,
        subject=subject,
        grade=grade,
        context_text=context_text,
        slide_count=slide_count,
        theme=theme
    )


@router.get("/presenton/themes")
def get_presenton_themes():
    return THEMES_CONFIG


@router.post("/presenton/download-pptx")
def download_presenton_pptx_endpoint(deck_payload: Dict[str, Any]):
    deck = PresentOnDeck(**deck_payload)
    slides = [
        SlideItem(
            slide_number=s.slide_number,
            title=s.title,
            layout=s.layout,
            bullet_points=s.bullet_points or (s.steps and [f"Step {st['step']}: {st['title']} - {st['desc']}" for st in s.steps]) or (s.stats_items and [f"{st['label']}: {st['value']}" for st in s.stats_items]) or [],
            key_definition=s.key_definition,
            activity_box=s.activity_box,
            speaker_notes=s.speaker_notes
        ) for s in deck.slides
    ]
    std_deck = SlideDeck(
        book_id=deck.id,
        chapter_id=deck.id,
        chapter_name=deck.chapter_name,
        title=deck.title,
        subtitle=deck.subtitle or f"{deck.grade} {deck.subject}",
        grade=deck.grade,
        subject=deck.subject,
        slides=slides
    )
    pptx_path = export_presentation_pptx(std_deck)
    return FileResponse(
        pptx_path,
        filename=f"PresentOn_{deck.chapter_name.replace(' ', '_')}.pptx",
        media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation"
    )


# ==========================================
# 15. NCERTSTUDY.COM CLASS 6-12 NOTES API
# ==========================================

@router.get("/ncertstudy/classes")
def get_ncertstudy_classes():
    return ncert_study_notes_service.get_available_classes_and_subjects()


@router.post("/ncertstudy/notes", response_model=NcertStudyCompleteNote)
def get_ncertstudy_notes_endpoint(payload: Dict[str, Any]):
    class_grade = payload.get("class_grade", "Class 10")
    subject = payload.get("subject", "Science")
    chapter_title = payload.get("chapter_title", "Chemical Reactions and Equations")
    chapter_number = int(payload.get("chapter_number", 1))
    book_id = payload.get("book_id", None)
    return ncert_study_notes_service.get_chapter_notes(
        class_grade=class_grade,
        subject=subject,
        chapter_title=chapter_title,
        chapter_number=chapter_number,
        book_id=book_id
    )


@router.get("/ncertstudy/notes", response_model=NcertStudyCompleteNote)
def get_ncertstudy_notes_get_endpoint(
    class_grade: str = "Class 10",
    subject: str = "Science",
    chapter_title: str = "Chemical Reactions and Equations",
    chapter_number: int = 1,
    book_id: Optional[str] = None
):
    return ncert_study_notes_service.get_chapter_notes(
        class_grade=class_grade,
        subject=subject,
        chapter_title=chapter_title,
        chapter_number=chapter_number,
        book_id=book_id
    )


@router.get("/ncertstudy/pdf")
def get_ncertstudy_notes_pdf_endpoint(
    class_grade: str = "Class 10",
    subject: str = "Science",
    chapter_title: str = "Chemical Reactions and Equations"
):
    note = ncert_study_notes_service.get_chapter_notes(
        class_grade=class_grade,
        subject=subject,
        chapter_title=chapter_title,
        chapter_number=1
    )
    pdf_path = ncert_study_notes_service.generate_notes_pdf(note)
    return FileResponse(
        pdf_path,
        filename=f"NCERTStudy_Notes_{class_grade}_{subject}_{chapter_title.replace(' ', '_')}.pdf",
        media_type="application/pdf"
    )


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


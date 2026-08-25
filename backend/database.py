import json
import sqlite3
from pathlib import Path
from typing import List, Optional, Dict, Any
from backend.config import settings
from backend.models import (
    Book, Chapter, PaperFormat, QuestionPaper, AnswerKey,
    QuestionBankItem, PastPaperAnalysis
)
from backend.sample_data import SAMPLE_BOOKS, SAMPLE_FORMAT_TEMPLATES

DB_FILE = settings.DB_PATH


def get_db_connection():
    db_path = Path(settings.DB_PATH)
    db_path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(db_path))
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Books Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS books (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        subject TEXT NOT NULL,
        grade TEXT NOT NULL,
        board TEXT NOT NULL,
        author TEXT,
        academic_year TEXT,
        filename TEXT NOT NULL,
        file_path TEXT NOT NULL,
        file_size_bytes INTEGER DEFAULT 0,
        total_pages INTEGER DEFAULT 0,
        chapters_json TEXT NOT NULL,
        is_indexed INTEGER DEFAULT 0,
        indexed_chunks INTEGER DEFAULT 0,
        created_at TEXT NOT NULL,
        cover_color TEXT DEFAULT 'indigo'
    )
    """)

    # Paper Formats Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS paper_formats (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        subject TEXT,
        grade TEXT,
        total_marks INTEGER NOT NULL,
        duration_minutes INTEGER NOT NULL,
        instructions_json TEXT NOT NULL,
        sections_json TEXT NOT NULL,
        created_at TEXT NOT NULL,
        is_template INTEGER DEFAULT 0
    )
    """)

    # Generated Question Papers Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS question_papers (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        book_id TEXT NOT NULL,
        book_title TEXT NOT NULL,
        subject TEXT NOT NULL,
        grade TEXT NOT NULL,
        board TEXT NOT NULL,
        school_name TEXT,
        exam_name TEXT,
        teacher_name TEXT,
        date_str TEXT,
        total_marks INTEGER NOT NULL,
        duration_minutes INTEGER NOT NULL,
        instructions_json TEXT NOT NULL,
        sections_json TEXT NOT NULL,
        questions_json TEXT NOT NULL,
        covered_chapter_ids_json TEXT NOT NULL,
        covered_chapter_names_json TEXT NOT NULL,
        difficulty TEXT,
        blooms_summary_json TEXT,
        grounding_verified_ratio REAL DEFAULT 1.0,
        created_at TEXT NOT NULL
    )
    """)

    # Answer Keys Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS answer_keys (
        paper_id TEXT PRIMARY KEY,
        paper_title TEXT NOT NULL,
        subject TEXT NOT NULL,
        grade TEXT NOT NULL,
        total_marks INTEGER NOT NULL,
        answers_json TEXT NOT NULL,
        generated_at TEXT NOT NULL
    )
    """)

    # Question Bank Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS question_bank (
        id TEXT PRIMARY KEY,
        question_text TEXT NOT NULL,
        options_json TEXT,
        correct_answer TEXT NOT NULL,
        detailed_solution TEXT,
        question_type TEXT NOT NULL,
        marks INTEGER NOT NULL,
        difficulty TEXT NOT NULL,
        blooms_level TEXT NOT NULL,
        book_id TEXT NOT NULL,
        book_title TEXT NOT NULL,
        chapter_id TEXT NOT NULL,
        chapter_name TEXT NOT NULL,
        page INTEGER NOT NULL,
        source_snippet TEXT NOT NULL,
        tags_json TEXT,
        created_at TEXT NOT NULL
    )
    """)

    # Past Paper Analyses Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS past_paper_analyses (
        id TEXT PRIMARY KEY,
        filename TEXT NOT NULL,
        detected_total_marks INTEGER NOT NULL,
        detected_duration_minutes INTEGER NOT NULL,
        chapter_topic_distribution_json TEXT,
        question_type_distribution_json TEXT,
        difficulty_estimation_json TEXT,
        extracted_concepts_json TEXT,
        suggested_format_json TEXT,
        uploaded_at TEXT NOT NULL
    )
    """)

    conn.commit()

    # Seed Sample Data if empty
    cursor.execute("SELECT COUNT(*) FROM books")
    book_count = cursor.fetchone()[0]
    if book_count == 0:
        seed_sample_data(cursor, conn)

    conn.close()


def seed_sample_data(cursor, conn):
    # Seed Books
    for b in SAMPLE_BOOKS:
        cursor.execute("""
        INSERT INTO books (
            id, title, subject, grade, board, author, academic_year,
            filename, file_path, file_size_bytes, total_pages,
            chapters_json, is_indexed, indexed_chunks, created_at, cover_color
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), ?)
        """, (
            b["id"], b["title"], b["subject"], b["grade"], b["board"],
            b["author"], b["academic_year"], b["filename"], b["file_path"],
            b["file_size_bytes"], b["total_pages"], json.dumps(b["chapters"]),
            1, len(b["chapters"]) * 4, b.get("cover_color", "indigo")
        ))

    # Seed Formats
    for f in SAMPLE_FORMAT_TEMPLATES:
        cursor.execute("""
        INSERT INTO paper_formats (
            id, name, description, subject, grade, total_marks,
            duration_minutes, instructions_json, sections_json,
            created_at, is_template
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), ?)
        """, (
            f["id"], f["name"], f["description"], f["subject"], f["grade"],
            f["total_marks"], f["duration_minutes"], json.dumps(f["instructions"]),
            json.dumps(f["sections"]), 1 if f.get("is_template", False) else 0
        ))

    conn.commit()


# ==========================================
# BOOKS CRUD
# ==========================================

def get_all_books() -> List[Book]:
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM books ORDER BY created_at DESC").fetchall()
    conn.close()
    books = []
    for r in rows:
        d = dict(r)
        d["chapters"] = json.loads(d["chapters_json"])
        d["is_indexed"] = bool(d["is_indexed"])
        books.append(Book(**d))
    return books


def get_book_by_id(book_id: str) -> Optional[Book]:
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM books WHERE id = ?", (book_id,)).fetchone()
    conn.close()
    if not row:
        return None
    d = dict(row)
    d["chapters"] = json.loads(d["chapters_json"])
    d["is_indexed"] = bool(d["is_indexed"])
    return Book(**d)


def save_book(book: Book) -> Book:
    conn = get_db_connection()
    chapters_json = json.dumps([c.model_dump() for c in book.chapters])
    conn.execute("""
    INSERT OR REPLACE INTO books (
        id, title, subject, grade, board, author, academic_year,
        filename, file_path, file_size_bytes, total_pages,
        chapters_json, is_indexed, indexed_chunks, created_at, cover_color
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        book.id, book.title, book.subject, book.grade, book.board,
        book.author, book.academic_year, book.filename, book.file_path,
        book.file_size_bytes, book.total_pages, chapters_json,
        1 if book.is_indexed else 0, book.indexed_chunks,
        book.created_at, book.cover_color
    ))
    conn.commit()
    conn.close()
    return book


def delete_book(book_id: str) -> bool:
    conn = get_db_connection()
    conn.execute("DELETE FROM books WHERE id = ?", (book_id,))
    conn.commit()
    conn.close()
    return True


# ==========================================
# PAPER FORMATS CRUD
# ==========================================

def get_all_formats() -> List[PaperFormat]:
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM paper_formats ORDER BY is_template DESC, created_at DESC").fetchall()
    conn.close()
    formats = []
    for r in rows:
        d = dict(r)
        d["instructions"] = json.loads(d["instructions_json"])
        d["sections"] = json.loads(d["sections_json"])
        d["is_template"] = bool(d["is_template"])
        formats.append(PaperFormat(**d))
    return formats


def get_format_by_id(format_id: str) -> Optional[PaperFormat]:
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM paper_formats WHERE id = ?", (format_id,)).fetchone()
    conn.close()
    if not row:
        return None
    d = dict(row)
    d["instructions"] = json.loads(d["instructions_json"])
    d["sections"] = json.loads(d["sections_json"])
    d["is_template"] = bool(d["is_template"])
    return PaperFormat(**d)


def save_format(fmt: PaperFormat) -> PaperFormat:
    conn = get_db_connection()
    conn.execute("""
    INSERT OR REPLACE INTO paper_formats (
        id, name, description, subject, grade, total_marks,
        duration_minutes, instructions_json, sections_json,
        created_at, is_template
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        fmt.id, fmt.name, fmt.description, fmt.subject, fmt.grade,
        fmt.total_marks, fmt.duration_minutes, json.dumps(fmt.instructions),
        json.dumps([s.model_dump() for s in fmt.sections]), fmt.created_at,
        1 if fmt.is_template else 0
    ))
    conn.commit()
    conn.close()
    return fmt


def delete_format(format_id: str) -> bool:
    conn = get_db_connection()
    conn.execute("DELETE FROM paper_formats WHERE id = ?", (format_id,))
    conn.commit()
    conn.close()
    return True


# ==========================================
# QUESTION PAPERS CRUD
# ==========================================

def get_all_papers() -> List[QuestionPaper]:
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM question_papers ORDER BY created_at DESC").fetchall()
    conn.close()
    papers = []
    for r in rows:
        d = dict(r)
        d["instructions"] = json.loads(d["instructions_json"])
        d["sections"] = json.loads(d["sections_json"])
        d["questions"] = json.loads(d["questions_json"])
        d["covered_chapter_ids"] = json.loads(d["covered_chapter_ids_json"])
        d["covered_chapter_names"] = json.loads(d["covered_chapter_names_json"])
        d["blooms_summary"] = json.loads(d["blooms_summary_json"] or "{}")
        papers.append(QuestionPaper(**d))
    return papers


def get_paper_by_id(paper_id: str) -> Optional[QuestionPaper]:
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM question_papers WHERE id = ?", (paper_id,)).fetchone()
    conn.close()
    if not row:
        return None
    d = dict(row)
    d["instructions"] = json.loads(d["instructions_json"])
    d["sections"] = json.loads(d["sections_json"])
    d["questions"] = json.loads(d["questions_json"])
    d["covered_chapter_ids"] = json.loads(d["covered_chapter_ids_json"])
    d["covered_chapter_names"] = json.loads(d["covered_chapter_names_json"])
    d["blooms_summary"] = json.loads(d["blooms_summary_json"] or "{}")
    return QuestionPaper(**d)


def save_paper(paper: QuestionPaper) -> QuestionPaper:
    conn = get_db_connection()
    conn.execute("""
    INSERT OR REPLACE INTO question_papers (
        id, title, book_id, book_title, subject, grade, board,
        school_name, exam_name, teacher_name, date_str,
        total_marks, duration_minutes, instructions_json,
        sections_json, questions_json, covered_chapter_ids_json,
        covered_chapter_names_json, difficulty, blooms_summary_json,
        grounding_verified_ratio, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        paper.id, paper.title, paper.book_id, paper.book_title, paper.subject,
        paper.grade, paper.board, paper.school_name, paper.exam_name,
        paper.teacher_name, paper.date_str, paper.total_marks,
        paper.duration_minutes, json.dumps(paper.instructions),
        json.dumps([s.model_dump() for s in paper.sections]),
        json.dumps([q.model_dump() for q in paper.questions]),
        json.dumps(paper.covered_chapter_ids),
        json.dumps(paper.covered_chapter_names),
        paper.difficulty, json.dumps(paper.blooms_summary),
        paper.grounding_verified_ratio, paper.created_at
    ))
    conn.commit()
    conn.close()
    return paper


def delete_paper(paper_id: str) -> bool:
    conn = get_db_connection()
    conn.execute("DELETE FROM question_papers WHERE id = ?", (paper_id,))
    conn.execute("DELETE FROM answer_keys WHERE paper_id = ?", (paper_id,))
    conn.commit()
    conn.close()
    return True


# ==========================================
# ANSWER KEY CRUD
# ==========================================

def get_answer_key_by_paper_id(paper_id: str) -> Optional[AnswerKey]:
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM answer_keys WHERE paper_id = ?", (paper_id,)).fetchone()
    conn.close()
    if not row:
        return None
    d = dict(row)
    d["answers"] = json.loads(d["answers_json"])
    return AnswerKey(**d)


def save_answer_key(ak: AnswerKey) -> AnswerKey:
    conn = get_db_connection()
    conn.execute("""
    INSERT OR REPLACE INTO answer_keys (
        paper_id, paper_title, subject, grade, total_marks,
        answers_json, generated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        ak.paper_id, ak.paper_title, ak.subject, ak.grade, ak.total_marks,
        json.dumps([a.model_dump() for a in ak.answers]), ak.generated_at
    ))
    conn.commit()
    conn.close()
    return ak


# ==========================================
# QUESTION BANK CRUD
# ==========================================

def get_question_bank_items(
    book_id: Optional[str] = None,
    chapter_id: Optional[str] = None,
    question_type: Optional[str] = None,
    difficulty: Optional[str] = None,
    search_query: Optional[str] = None
) -> List[QuestionBankItem]:
    conn = get_db_connection()
    query = "SELECT * FROM question_bank WHERE 1=1"
    params = []

    if book_id:
        query += " AND book_id = ?"
        params.append(book_id)
    if chapter_id:
        query += " AND chapter_id = ?"
        params.append(chapter_id)
    if question_type:
        query += " AND question_type = ?"
        params.append(question_type)
    if difficulty:
        query += " AND difficulty = ?"
        params.append(difficulty)
    if search_query:
        query += " AND (question_text LIKE ? OR correct_answer LIKE ? OR chapter_name LIKE ?)"
        term = f"%{search_query}%"
        params.extend([term, term, term])

    query += " ORDER BY created_at DESC"
    rows = conn.execute(query, params).fetchall()
    conn.close()

    items = []
    for r in rows:
        d = dict(r)
        d["options"] = json.loads(d["options_json"]) if d["options_json"] else None
        d["tags"] = json.loads(d["tags_json"]) if d["tags_json"] else []
        items.append(QuestionBankItem(**d))
    return items


def save_question_bank_item(item: QuestionBankItem) -> QuestionBankItem:
    conn = get_db_connection()
    conn.execute("""
    INSERT OR REPLACE INTO question_bank (
        id, question_text, options_json, correct_answer, detailed_solution,
        question_type, marks, difficulty, blooms_level, book_id, book_title,
        chapter_id, chapter_name, page, source_snippet, tags_json, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        item.id, item.question_text, json.dumps(item.options) if item.options else None,
        item.correct_answer, item.detailed_solution, item.question_type,
        item.marks, item.difficulty, item.blooms_level, item.book_id,
        item.book_title, item.chapter_id, item.chapter_name, item.page,
        item.source_snippet, json.dumps(item.tags), item.created_at
    ))
    conn.commit()
    conn.close()
    return item


def delete_question_bank_item(item_id: str) -> bool:
    conn = get_db_connection()
    conn.execute("DELETE FROM question_bank WHERE id = ?", (item_id,))
    conn.commit()
    conn.close()
    return True


# ==========================================
# PAST PAPER ANALYSES CRUD
# ==========================================

def get_all_past_paper_analyses() -> List[PastPaperAnalysis]:
    conn = get_db_connection()
    rows = conn.execute("SELECT * FROM past_paper_analyses ORDER BY uploaded_at DESC").fetchall()
    conn.close()
    analyses = []
    for r in rows:
        d = dict(r)
        d["chapter_topic_distribution"] = json.loads(d["chapter_topic_distribution_json"] or "{}")
        d["question_type_distribution"] = json.loads(d["question_type_distribution_json"] or "{}")
        d["difficulty_estimation"] = json.loads(d["difficulty_estimation_json"] or "{}")
        d["extracted_concepts"] = json.loads(d["extracted_concepts_json"] or "[]")
        d["suggested_format"] = json.loads(d["suggested_format_json"])
        analyses.append(PastPaperAnalysis(**d))
    return analyses


def save_past_paper_analysis(ppa: PastPaperAnalysis) -> PastPaperAnalysis:
    conn = get_db_connection()
    conn.execute("""
    INSERT OR REPLACE INTO past_paper_analyses (
        id, filename, detected_total_marks, detected_duration_minutes,
        chapter_topic_distribution_json, question_type_distribution_json,
        difficulty_estimation_json, extracted_concepts_json,
        suggested_format_json, uploaded_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        ppa.id, ppa.filename, ppa.detected_total_marks, ppa.detected_duration_minutes,
        json.dumps(ppa.chapter_topic_distribution), json.dumps(ppa.question_type_distribution),
        json.dumps(ppa.difficulty_estimation), json.dumps(ppa.extracted_concepts),
        json.dumps(ppa.suggested_format.dict()), ppa.uploaded_at
    ))
    conn.commit()
    conn.close()
    return ppa

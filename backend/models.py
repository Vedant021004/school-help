from typing import List, Optional, Dict, Any, Union
from pydantic import BaseModel, Field
import uuid
from datetime import datetime


# ==========================================
# 1. BOOK & CHAPTER MODELS
# ==========================================

class Chapter(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    chapter_number: int
    title: str
    start_page: int
    end_page: int
    summary: Optional[str] = ""
    sections: List[str] = Field(default_factory=list)
    chunk_count: int = 0


class Book(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    subject: str
    grade: str
    board: str = "CBSE"
    author: Optional[str] = "NCERT / Educational Board"
    academic_year: Optional[str] = "2025-2026"
    filename: Optional[str] = "textbook.pdf"
    file_path: Optional[str] = ""
    file_size_bytes: int = 0
    total_pages: int = 0
    chapters: List[Chapter] = Field(default_factory=list)
    is_indexed: bool = False
    indexed_chunks: int = 0
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    cover_color: Optional[str] = "indigo"


class ChunkMetadata(BaseModel):
    chunk_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    book_id: str
    book_title: str
    chapter_id: str
    chapter_number: int
    chapter_title: str
    page_number: int
    section_name: Optional[str] = "General"
    token_count: Optional[int] = 0


class TextChunk(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    content: str
    metadata: ChunkMetadata


# ==========================================
# 2. PAPER FORMAT MODELS
# ==========================================

class SectionFormat(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str  # e.g., "Section A", "Section B"
    title: Optional[str] = ""  # e.g., "Multiple Choice Questions"
    question_count: int = 5
    marks_per_question: int = 1
    total_marks: int = 5
    question_type: str = "MCQ"  # MCQ, Fill in blanks, True/False, Very Short Answer, Short Answer, Long Answer, Case Study, Assertion & Reason, Numerical, Application-based, Competency-based
    internal_choices_count: int = 0  # Number of questions that have an internal "OR" choice
    instructions: Optional[str] = ""


class PaperFormat(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: Optional[str] = ""
    subject: Optional[str] = "General"
    grade: Optional[str] = "All"
    total_marks: int = 50
    duration_minutes: int = 120  # 2 Hours
    instructions: List[str] = Field(default_factory=lambda: [
        "All questions are compulsory.",
        "The question paper consists of designated sections.",
        "Marks are indicated against each question.",
        "Use of calculators is not permitted."
    ])
    sections: List[SectionFormat] = Field(default_factory=list)
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    is_template: bool = False


# ==========================================
# 3. QUESTION & GENERATION MODELS
# ==========================================

class QuestionSourceCitation(BaseModel):
    book_id: str
    book_title: str
    chapter_id: str
    chapter_number: int
    chapter_name: str
    page: int
    section: Optional[str] = "Section Text"
    text_reference: str  # Exact text snippet from textbook
    similarity_score: Optional[float] = 1.0


class QuestionItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    question_number: int
    section_name: str  # e.g. "Section A"
    question_type: str  # MCQ, Short Answer, Long Answer, etc.
    question_text: str
    options: Optional[List[str]] = None  # For MCQs: ["A. ...", "B. ...", "C. ...", "D. ..."]
    correct_answer: str
    step_by_step_solution: Optional[str] = None
    formula_used: Optional[str] = None
    marks: int = 1
    difficulty: str = "Medium"  # Easy, Medium, Hard
    blooms_level: str = "Understand"  # Remember, Understand, Apply, Analyze, Evaluate, Create
    chapter_id: str
    chapter_name: str
    source: QuestionSourceCitation
    grounding_score: float = 1.0  # 0.0 - 1.0
    grounding_status: str = "VERIFIED"  # "VERIFIED", "WARNING", "REJECTED"
    internal_choice_question: Optional['QuestionItem'] = None  # Internal 'OR' question if any


class BloomsDistribution(BaseModel):
    remember: int = 20    # %
    understand: int = 30  # %
    apply: int = 25       # %
    analyze: int = 15     # %
    evaluate: int = 5     # %
    create: int = 5       # %


class ChapterDistributionItem(BaseModel):
    chapter_id: str
    chapter_name: str
    weight_percentage: float  # e.g., 33.3%


class QuestionPaperGenerationRequest(BaseModel):
    book_id: str
    chapter_ids: List[str]
    format_id: Optional[str] = None
    custom_format: Optional[PaperFormat] = None
    difficulty: str = "Mixed"  # Easy, Medium, Hard, Mixed
    chapter_distribution_mode: str = "equal"  # "equal" or "custom"
    chapter_distributions: Optional[List[ChapterDistributionItem]] = None
    blooms_distribution: Optional[BloomsDistribution] = Field(default_factory=BloomsDistribution)
    allowed_question_types: Optional[List[str]] = None
    school_name: Optional[str] = "Delhi Public School"
    exam_name: Optional[str] = "Mid-Term Examination 2025-26"
    teacher_name: Optional[str] = "Department of Examination"
    date_str: Optional[str] = "March 2026"
    strict_mode: bool = True


class QuestionPaper(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    book_id: str
    book_title: str
    subject: str
    grade: str
    board: str
    school_name: str = "Central Academy"
    exam_name: str = "Annual Examination"
    teacher_name: str = "Subject Teacher"
    date_str: str = ""
    total_marks: int = 50
    duration_minutes: int = 120
    instructions: List[str] = Field(default_factory=list)
    sections: List[SectionFormat] = Field(default_factory=list)
    questions: List[QuestionItem] = Field(default_factory=list)
    covered_chapter_ids: List[str] = Field(default_factory=list)
    covered_chapter_names: List[str] = Field(default_factory=list)
    difficulty: str = "Mixed"
    blooms_summary: Dict[str, int] = Field(default_factory=dict)
    grounding_verified_ratio: float = 1.0
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


# ==========================================
# 4. ANSWER KEY MODELS
# ==========================================

class AnswerKeyItem(BaseModel):
    question_number: int
    section_name: str
    question_type: str
    question_text: str
    correct_answer: str
    detailed_explanation: str
    formula_and_steps: Optional[str] = None
    marks: int
    source_reference: QuestionSourceCitation


class AnswerKey(BaseModel):
    paper_id: str
    paper_title: str
    subject: str
    grade: str
    total_marks: int
    answers: List[AnswerKeyItem] = Field(default_factory=list)
    generated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


# ==========================================
# 5. CHATBOT MODELS
# ==========================================

class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    sources: Optional[List[QuestionSourceCitation]] = None
    is_grounded: bool = True
    suggested_followups: Optional[List[str]] = None


class ChatRequest(BaseModel):
    book_id: str
    chapter_id: Optional[str] = None  # None means entire book
    message: str
    conversation_history: List[ChatMessage] = Field(default_factory=list)
    book_only_mode: bool = True


class ChatResponse(BaseModel):
    message: str
    sources: List[QuestionSourceCitation] = Field(default_factory=list)
    is_grounded: bool = True
    book_id: Optional[str] = "global"
    chapter_name: Optional[str] = "All Chapters"
    suggested_followups: List[str] = Field(default_factory=list)


# ==========================================
# 6. QUESTION BANK & ANALYZER MODELS
# ==========================================

class QuestionBankItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    question_text: str
    options: Optional[List[str]] = None
    correct_answer: str
    detailed_solution: Optional[str] = None
    question_type: str
    marks: int
    difficulty: str
    blooms_level: str
    book_id: str
    book_title: str
    chapter_id: str
    chapter_name: str
    page: int
    source_snippet: str
    tags: List[str] = Field(default_factory=list)
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class PastPaperAnalysis(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    filename: str
    detected_total_marks: int
    detected_duration_minutes: int
    chapter_topic_distribution: Dict[str, float] = Field(default_factory=dict)
    question_type_distribution: Dict[str, int] = Field(default_factory=dict)
    difficulty_estimation: Dict[str, float] = Field(default_factory=dict)
    extracted_concepts: List[str] = Field(default_factory=list)
    suggested_format: PaperFormat
    uploaded_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

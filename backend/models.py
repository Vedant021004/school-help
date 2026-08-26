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
    question_type: str = "MCQ"
    internal_choices_count: int = 0
    instructions: Optional[str] = ""


class PaperFormat(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: Optional[str] = ""
    subject: Optional[str] = "General"
    grade: Optional[str] = "All"
    total_marks: int = 50
    duration_minutes: int = 120
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
    text_reference: str
    similarity_score: Optional[float] = 1.0


class QuestionItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    question_number: int
    section_name: str
    question_type: str  # MCQ, Short Answer, Long Answer, True/False, Fill Blank, Match, Assertion Reason, Case Study, Application, Numerical, Diagram Based
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
    grounding_score: float = 1.0
    grounding_status: str = "VERIFIED"
    internal_choice_question: Optional['QuestionItem'] = None


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
    weight_percentage: float


class QuestionPaperGenerationRequest(BaseModel):
    book_id: str
    chapter_ids: List[str]
    format_id: Optional[str] = None
    custom_format: Optional[PaperFormat] = None
    difficulty: str = "Mixed"
    chapter_distribution_mode: str = "equal"
    chapter_distributions: Optional[List[ChapterDistributionItem]] = None
    blooms_distribution: Optional[BloomsDistribution] = Field(default_factory=BloomsDistribution)
    allowed_question_types: Optional[List[str]] = None
    school_name: Optional[str] = "Central Academy"
    exam_name: Optional[str] = "Periodic Assessment 2025-26"
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
# 4. ANSWER KEY & CHAT MODELS
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


class ChatMessage(BaseModel):
    role: str
    content: str
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    sources: Optional[List[QuestionSourceCitation]] = None
    is_grounded: bool = True
    suggested_followups: Optional[List[str]] = None


class ChatRequest(BaseModel):
    book_id: str
    chapter_id: Optional[str] = None
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
# 5. QUESTION BANK & ANALYZER MODELS
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


# ==========================================
# 6. KNOWLEDGE GRAPH & MIND MAP (KAQG)
# ==========================================

class GraphNode(BaseModel):
    id: str
    label: str
    category: str = "core_concept"  # core_concept, subtopic, prerequisite, application, formula
    importance: int = 3  # 1 to 5
    page: int = 1
    section: str = "General"
    description: str = ""


class GraphEdge(BaseModel):
    source: str
    target: str
    relation: str = "relates_to"  # requires, produces, relates_to, is_part_of, causes, defined_by
    weight: float = 1.0


class ConceptTriple(BaseModel):
    subject: str
    predicate: str
    object: str
    page: int = 1
    evidence: str = ""


class KnowledgeGraph(BaseModel):
    book_id: str
    chapter_id: str
    chapter_name: str
    nodes: List[GraphNode] = Field(default_factory=list)
    edges: List[GraphEdge] = Field(default_factory=list)
    triples: List[ConceptTriple] = Field(default_factory=list)
    prerequisites: List[str] = Field(default_factory=list)
    learning_path: List[str] = Field(default_factory=list)
    weak_topic_cues: List[str] = Field(default_factory=list)
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class MindMapNode(BaseModel):
    id: str
    text: str
    category: str = "concept"
    children: List['MindMapNode'] = Field(default_factory=list)
    notes: Optional[str] = None
    expanded: bool = True


class MindMapData(BaseModel):
    root_topic: str
    chapter_name: str
    nodes: List[MindMapNode] = Field(default_factory=list)
    learning_objective: str = ""


# ==========================================
# 7. CHAPTER TEACHING SUITE MODELS
# ==========================================

class ChapterExplanation(BaseModel):
    book_id: str
    chapter_id: str
    chapter_name: str
    mode: str = "student_friendly"  # very_simple, student_friendly, detailed, teacher_mode, exam_mode, real_life_examples
    title: str
    key_takeaway: str
    sections: List[Dict[str, Any]] = Field(default_factory=list)
    real_life_analogies: List[str] = Field(default_factory=list)
    key_formulas: List[str] = Field(default_factory=list)
    board_exam_tips: List[str] = Field(default_factory=list)
    sources: List[QuestionSourceCitation] = Field(default_factory=list)


class ChapterNotes(BaseModel):
    book_id: str
    chapter_id: str
    chapter_name: str
    title: str
    summary: str
    definitions: List[Dict[str, str]] = Field(default_factory=list)
    core_principles: List[Dict[str, Any]] = Field(default_factory=list)
    formulas: List[Dict[str, str]] = Field(default_factory=list)
    diagram_notes: List[str] = Field(default_factory=list)
    common_misconceptions: List[Dict[str, str]] = Field(default_factory=list)
    revision_points: List[str] = Field(default_factory=list)
    sources: List[QuestionSourceCitation] = Field(default_factory=list)


class SlideItem(BaseModel):
    slide_number: int
    title: str
    layout: str = "content"  # title, content, two_column, diagram, activity, summary
    bullet_points: List[str] = Field(default_factory=list)
    speaker_notes: str = ""
    key_definition: Optional[str] = None
    diagram_prompt: Optional[str] = None
    activity_box: Optional[str] = None


class SlideDeck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    book_id: str
    chapter_id: str
    chapter_name: str
    title: str
    subtitle: str
    grade: str
    subject: str
    slides: List[SlideItem] = Field(default_factory=list)
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class TextbookQAItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    question_number: int
    question_text: str
    is_original_textbook: bool = True
    given_data: Optional[str] = None
    governing_formula: Optional[str] = None
    step_by_step_solution: str
    final_answer: str
    page_reference: int
    source_snippet: str


class ChapterWorksheet(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    worksheet_type: str = "practice"  # practice, revision, exam, activity, homework, basic, advanced
    book_id: str
    chapter_id: str
    chapter_name: str
    grade: str
    subject: str
    total_marks: int = 25
    estimated_time_minutes: int = 45
    instructions: List[str] = Field(default_factory=list)
    questions: List[QuestionItem] = Field(default_factory=list)
    answer_key: List[Dict[str, Any]] = Field(default_factory=list)
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class NewTermItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    term: str
    textbook_meaning: str
    simple_meaning: str
    example_sentence: str
    section: str = "General"
    page: int = 1
    category: str = "Definition"


class DiagramQuestionItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    diagram_name: str
    diagram_description: str
    diagram_ascii_or_svg: Optional[str] = None
    page_reference: int = 1
    labeling_parts: List[Dict[str, str]] = Field(default_factory=list)
    questions: List[QuestionItem] = Field(default_factory=list)


class LessonPlan(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    grade: str
    subject: str
    chapter_name: str
    duration_minutes: int = 45  # 30, 45, 60, 90
    learning_objectives: List[str] = Field(default_factory=list)
    prerequisites: List[str] = Field(default_factory=list)
    materials_required: List[str] = Field(default_factory=list)
    phases: List[Dict[str, Any]] = Field(default_factory=list)  # Introduction, Core Concept, Guided Practice, Independent Activity, Assessment, Recap
    differentiation_strategies: List[str] = Field(default_factory=list)
    assessment_questions: List[str] = Field(default_factory=list)
    homework_assignment: str = ""
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


# ==========================================
# 8. LIVE CLASSROOM WORKSHEET
# ==========================================

class LiveSession(BaseModel):
    room_code: str
    teacher_name: str
    book_id: str
    chapter_id: str
    chapter_name: str
    worksheet_title: str
    questions: List[Dict[str, Any]] = Field(default_factory=list)
    is_active: bool = True
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class StudentSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    room_code: str
    student_name: str
    answers: Dict[str, Any] = Field(default_factory=dict)
    score: int = 0
    total_marks: int = 0
    accuracy_percentage: float = 0.0
    submitted_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class LiveClassroomAnalytics(BaseModel):
    room_code: str
    total_participants: int = 0
    average_score: float = 0.0
    accuracy_rate: float = 0.0
    hardest_question_index: Optional[int] = None
    completion_rate: float = 0.0
    leaderboard: List[Dict[str, Any]] = Field(default_factory=list)
    ai_insights: str = ""


# ==========================================
# 9. EXAMRAG & BLUEPRINT ANALYTICS
# ==========================================

class ExamTopicFrequency(BaseModel):
    topic_name: str
    frequency_count: int = 1
    marks_weightage_percentage: float = 10.0
    difficulty_trend: str = "Medium"
    bloom_trend: str = "Understand"
    sample_questions: List[str] = Field(default_factory=list)


class ExamPatternAnalysis(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    subject: str
    grade: str
    board: str = "CBSE"
    analyzed_papers_count: int = 1
    top_frequent_topics: List[ExamTopicFrequency] = Field(default_factory=list)
    repeated_concepts: List[str] = Field(default_factory=list)
    under_tested_topics: List[str] = Field(default_factory=list)
    recommended_practice_distribution: Dict[str, Any] = Field(default_factory=dict)
    summary: str = ""
    analyzed_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


# ==========================================
# 10. EDUAGENTQG QUALITY ASSURANCE
# ==========================================

class EduAgentQCReport(BaseModel):
    question_id: str
    planner_approval: bool = True
    writer_quality_score: float = 1.0
    solver_verified: bool = True
    solver_solution: Optional[str] = None
    educator_bloom_matched: bool = True
    teacher_final_score: float = 1.0
    is_accepted: bool = True
    rejection_reason: Optional[str] = None

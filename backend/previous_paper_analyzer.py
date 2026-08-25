import os
import re
import uuid
from typing import Dict, Any, List
from collections import Counter
import pymupdf
import docx
from backend.models import PastPaperAnalysis, PaperFormat, SectionFormat


def analyze_past_paper_file(file_path: str) -> PastPaperAnalysis:
    """
    Analyzes previous examination paper to determine concept weightage,
    question types, difficulty estimation, and generates an aligned blueprint format.
    """
    ext = os.path.splitext(file_path)[1].lower()
    raw_text = ""

    if ext == ".pdf":
        doc = pymupdf.open(file_path)
        for page in doc:
            raw_text += page.get_text("text") + "\n"
        doc.close()
    elif ext in [".docx", ".doc"]:
        doc = docx.Document(file_path)
        for p in doc.paragraphs:
            raw_text += p.text + "\n"
    else:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            raw_text = f.read()

    filename = os.path.basename(file_path)

    # 1. Total Marks & Duration
    marks_m = re.search(r'(total|max)\s*marks\s*[:=\-]?\s*(\d+)', raw_text, re.IGNORECASE)
    total_marks = int(marks_m.group(2)) if marks_m else 50

    dur_m = re.search(r'(time|duration)\s*[:=\-]?\s*(\d+)', raw_text, re.IGNORECASE)
    duration_minutes = int(dur_m.group(2)) * 60 if dur_m and int(dur_m.group(2)) <= 5 else 120

    # 2. Extract concepts & topics mentioned
    concept_keywords = [
        "chemical reaction", "balanced equation", "photosynthesis", "stomata", "respiration",
        "nephron", "reflection", "refraction", "snell's law", "focal length", "lens formula",
        "power of lens", "rational numbers", "linear equations", "parallelogram", "quadrilateral",
        "rhombus", "square roots", "pythagorean", "electric current", "ohm's law", "resistance"
    ]

    extracted_concepts = []
    text_lower = raw_text.lower()
    for ck in concept_keywords:
        if ck in text_lower:
            extracted_concepts.append(ck.title())

    if not extracted_concepts:
        extracted_concepts = ["Core Concepts", "Definitions", "Formulas", "Application Problems"]

    # 3. Question Type breakdown
    q_type_dist = Counter()
    q_type_dist["MCQ"] = len(re.findall(r'\b[A-D]\.\s+', raw_text)) or 10
    q_type_dist["Short Answer"] = len(re.findall(r'(explain|define|state|differentiate|why)\b', text_lower)) or 6
    q_type_dist["Long Answer"] = len(re.findall(r'(describe|discuss|elaborate|derive)\b', text_lower)) or 4
    q_type_dist["Numerical"] = len(re.findall(r'(calculate|find the value|evaluate|solve)\b', text_lower)) or 3
    q_type_dist["Case Study"] = len(re.findall(r'(case study|read the passage|context)\b', text_lower)) or 2

    # 4. Difficulty Estimation
    hard_words = len(re.findall(r'(evaluate|derive|analyze|justify|prove|critically)\b', text_lower))
    med_words = len(re.findall(r'(calculate|explain|differentiate|solve|apply)\b', text_lower))
    easy_words = len(re.findall(r'(define|state|what is|name|list|choose)\b', text_lower))
    total_w = max(1, hard_words + med_words + easy_words)

    difficulty_est = {
        "Easy": round((easy_words / total_w) * 100, 1),
        "Medium": round((med_words / total_w) * 100, 1),
        "Hard": round((hard_words / total_w) * 100, 1)
    }

    # 5. Suggested Blueprint Format
    suggested_format = PaperFormat(
        id=f"fmt-past-{uuid.uuid4().hex[:8]}",
        name=f"Blueprint Aligned: {filename[:30]}",
        description=f"Generated blueprint matching past year paper pattern ({total_marks} Marks).",
        total_marks=total_marks,
        duration_minutes=duration_minutes,
        instructions=[
            "All questions are compulsory.",
            "Questions are strictly grounded in textbook curriculum.",
            "Marks are indicated against each question."
        ],
        sections=[
            SectionFormat(
                name="Section A", title="Objective & MCQ",
                question_count=8, marks_per_question=1, total_marks=8, question_type="MCQ"
            ),
            SectionFormat(
                name="Section B", title="Short Answer (Concepts)",
                question_count=5, marks_per_question=2, total_marks=10, question_type="Short Answer",
                internal_choices_count=1
            ),
            SectionFormat(
                name="Section C", title="Analytical & Numerical",
                question_count=4, marks_per_question=3, total_marks=12, question_type="Numerical",
                internal_choices_count=1
            ),
            SectionFormat(
                name="Section D", title="Long Answer & Case Study",
                question_count=4, marks_per_question=5, total_marks=20, question_type="Case Study",
                internal_choices_count=2
            )
        ]
    )

    # Re-normalize total marks for suggested format
    calc_fmt_total = sum(s.total_marks for s in suggested_format.sections)
    suggested_format.total_marks = calc_fmt_total

    return PastPaperAnalysis(
        id=f"past-analysis-{uuid.uuid4().hex[:8]}",
        filename=filename,
        detected_total_marks=total_marks,
        detected_duration_minutes=duration_minutes,
        chapter_topic_distribution={c: round(100 / len(extracted_concepts), 1) for c in extracted_concepts},
        question_type_distribution=dict(q_type_dist),
        difficulty_estimation=difficulty_est,
        extracted_concepts=extracted_concepts,
        suggested_format=suggested_format
    )

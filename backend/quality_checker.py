import re
from typing import List, Dict, Any, Tuple, Optional
from collections import Counter
from backend.models import QuestionItem, SectionFormat, PaperFormat, QuestionPaper


class QualityChecker:
    """
    Automated validation and quality audit for generated examination papers:
    - Semantic deduplication across questions.
    - Format and MCQ option integrity.
    - Marks and total score reconciliation.
    - Bloom's taxonomy balance.
    """
    def __init__(self, duplication_threshold: float = 0.80):
        self.duplication_threshold = duplication_threshold

    def _jaccard_similarity(self, text1: str, text2: str) -> float:
        w1 = set(re.findall(r'\b\w{3,}\b', text1.lower()))
        w2 = set(re.findall(r'\b\w{3,}\b', text2.lower()))
        if not w1 or not w2:
            return 0.0
        intersection = len(w1.intersection(w2))
        union = len(w1.union(w2))
        return intersection / union if union > 0 else 0.0

    def is_duplicate(self, candidate_question: str, existing_questions: List[str]) -> Tuple[bool, float]:
        """
        Checks if candidate question is too semantically similar to any question already in the paper.
        """
        for eq in existing_questions:
            sim = self._jaccard_similarity(candidate_question, eq)
            if sim >= self.duplication_threshold:
                return True, sim
        return False, 0.0

    def validate_question_format(self, question: QuestionItem) -> Tuple[bool, str]:
        """
        Ensures question conforms to its type specifications.
        """
        q_type = question.question_type.upper()

        # MCQ validation: must have options and correct option tag
        if "MCQ" in q_type or "MULTIPLE CHOICE" in q_type:
            if not question.options or len(question.options) < 2:
                return False, "MCQ question missing multiple choice options (A, B, C, D)"
            if not question.correct_answer:
                return False, "MCQ question missing correct answer key"

        # Case Study validation: must contain a passage or sub-parts
        if "CASE" in q_type:
            if len(question.question_text.split()) < 30:
                return False, "Case study question too brief to contain sufficient context"

        # Numerical validation: must have steps or formula
        if "NUMERICAL" in q_type:
            if not question.formula_used and not question.step_by_step_solution:
                return False, "Numerical question missing formula or step-by-step calculation"

        return True, "Valid"

    def audit_paper(self, paper: QuestionPaper) -> Dict[str, Any]:
        """
        Audits an entire question paper for compliance with required format,
        total marks, chapter distribution, and grounding ratio.
        """
        total_calculated_marks = sum(q.marks for q in paper.questions)
        is_marks_exact = (total_calculated_marks == paper.total_marks)
        marks_difference = paper.total_marks - total_calculated_marks

        # Check Bloom's breakdown
        blooms_counts: Counter = Counter()
        for q in paper.questions:
            blooms_counts[q.blooms_level] += 1

        # Check chapter distribution
        chapter_counts: Counter = Counter()
        for q in paper.questions:
            chapter_counts[q.chapter_name] += 1

        # Check grounding stats
        verified_count = sum(1 for q in paper.questions if q.grounding_status == "VERIFIED")
        total_q = len(paper.questions)
        grounding_ratio = verified_count / total_q if total_q > 0 else 1.0

        # Check for duplicates
        duplicate_warnings = []
        for i in range(len(paper.questions)):
            for j in range(i + 1, len(paper.questions)):
                sim = self._jaccard_similarity(
                    paper.questions[i].question_text,
                    paper.questions[j].question_text
                )
                if sim > 0.75:
                    duplicate_warnings.append(
                        f"Q{paper.questions[i].question_number} and Q{paper.questions[j].question_number} are very similar ({int(sim*100)}% match)"
                    )

        return {
            "is_valid": is_marks_exact and (len(duplicate_warnings) == 0),
            "total_marks_requested": paper.total_marks,
            "total_marks_calculated": total_calculated_marks,
            "is_marks_exact": is_marks_exact,
            "marks_difference": marks_difference,
            "grounding_ratio": round(grounding_ratio, 2),
            "chapter_distribution": dict(chapter_counts),
            "blooms_distribution": dict(blooms_counts),
            "duplicate_warnings": duplicate_warnings,
            "total_questions": total_q
        }


# Global quality checker instance
quality_checker = QualityChecker()

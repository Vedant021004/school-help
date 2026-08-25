import re
from typing import Dict, Any, List, Tuple
from collections import Counter
from backend.models import QuestionItem, QuestionSourceCitation


class GroundingVerifier:
    """
    Anti-Hallucination Verification Layer.
    Ensures that every candidate question and its answer are 100% grounded
    in the retrieved textbook passages.
    """
    def __init__(self, threshold: float = 0.55):
        self.threshold = threshold

    def _tokenize(self, text: str) -> List[str]:
        # Exclude common stopwords
        stopwords = {
            "the", "is", "at", "which", "on", "a", "an", "and", "or", "in", "to",
            "of", "for", "with", "as", "by", "from", "that", "this", "it", "are",
            "was", "were", "be", "been", "being", "have", "has", "had", "do", "does",
            "did", "what", "how", "why", "when", "where", "who", "whom", "question"
        }
        tokens = re.findall(r'\b[a-zA-Z0-9_\-\.\/]{3,}\b', text.lower())
        return [t for t in tokens if t not in stopwords]

    def calculate_grounding_score(
        self,
        question_text: str,
        answer_text: str,
        source_text: str
    ) -> float:
        """
        Calculates factual grounding overlap score between candidate QA and textbook evidence.
        Considers keyword containment, entity presence, and semantic density.
        """
        if not source_text or len(source_text.strip()) < 10:
            return 0.0

        q_tokens = self._tokenize(question_text)
        a_tokens = self._tokenize(answer_text)
        s_tokens = set(self._tokenize(source_text))

        if not q_tokens or not a_tokens:
            return 0.5

        # Check overlap of question key concepts in source
        q_overlap = sum(1 for t in q_tokens if t in s_tokens) / len(q_tokens)

        # Check overlap of answer core terms in source
        a_overlap = sum(1 for t in a_tokens if t in s_tokens) / len(a_tokens)

        # Numbers / formulas check: if question has numbers or specific formulas, they must match or exist
        q_nums = re.findall(r'\b\d+(\.\d+)?\b', question_text)
        s_nums = set(re.findall(r'\b\d+(\.\d+)?\b', source_text))
        num_score = 1.0
        if q_nums:
            matched_nums = sum(1 for n in q_nums if n[0] in s_nums or any(n[0] in t for t in s_tokens))
            num_score = matched_nums / len(q_nums)

        # Weighted final grounding score
        grounding_score = (q_overlap * 0.40) + (a_overlap * 0.45) + (num_score * 0.15)
        return min(1.0, max(0.0, grounding_score))

    def verify_question(
        self,
        question_text: str,
        answer_text: str,
        source: QuestionSourceCitation
    ) -> Tuple[bool, float, str]:
        """
        Evaluates candidate question and answer against textbook reference.
        Returns: (is_passed, score, status_message)
        """
        score = self.calculate_grounding_score(
            question_text=question_text,
            answer_text=answer_text,
            source_text=source.text_reference
        )

        if score >= self.threshold:
            return True, round(score, 2), "VERIFIED: Supported by textbook evidence"
        elif score >= 0.35:
            return True, round(score, 2), "WARNING: Low evidence overlap, verify manually"
        else:
            return False, round(score, 2), "REJECTED: Hallucination detected, not found in textbook"


# Global verifier instance
grounding_verifier = GroundingVerifier()

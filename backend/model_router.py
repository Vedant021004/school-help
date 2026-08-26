"""
AI Model Router & Educational Specialization Dispatcher.
Directs pedagogical generation tasks to specialized models:
- Shiksha-AI (NCERT-tuned chapter explanations, summaries, homework)
- Qwen-BloomAware-Educational-MCQ-Generator (Bloom-taxonomy MCQs, plausible distractors)
- Advanced Pedagogical LLMs (Lesson Plans, PPT decks, Case Studies, Diagrams)
- Deterministic Python Engines (Blueprint calculations, marks balance)
- Dense Vector & Lexical Embeddings (Duplicate detection & grounding verification)
"""

import os
from typing import Dict, Any, Optional, List
from backend.config import settings


class AIModelRouter:
    """
    Intelligent Model Router that maps each educational task to its optimal
    specialized model, prompt persona, and cognitive parameters.
    """

    TASK_ROUTING = {
        "chapter_explanation": {
            "model_family": "Shiksha-AI",
            "description": "NCERT-aligned curriculum explanation and conceptual clarity",
            "temperature": 0.3,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are Shiksha-AI, an expert NCERT and national board curriculum educator. "
                "You explain complex textbook concepts in clear, engaging, grade-appropriate language "
                "strictly grounded in the official syllabus without introducing out-of-syllabus terms."
            )
        },
        "chapter_notes": {
            "model_family": "Shiksha-AI",
            "description": "High-yield revision notes, definitions, formulas, and common pitfalls",
            "temperature": 0.2,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are Shiksha-AI, an expert curriculum summarizer for board examinations. "
                "You extract structured revision points, exact governing formulas, key definitions, "
                "and common student misconceptions strictly from the textbook excerpt."
            )
        },
        "mcq_generation": {
            "model_family": "Qwen-BloomAware-Educational-MCQ-Generator",
            "description": "Bloom's taxonomy aligned multiple choice questions with plausible distractors",
            "temperature": 0.25,
            "groq_preferred": "qwen/qwen3.6-27b",
            "system_persona": (
                "You are Qwen-BloomAware-Educational-MCQ-Generator, a specialized educational assessment AI. "
                "You craft flawless MCQs strictly targeted to specified Bloom's cognitive levels (Remember, Understand, "
                "Apply, Analyze, Evaluate, Create). You create exactly ONE indisputably correct option and 3 highly plausible, "
                "conceptually sound distractors based on common student errors."
            )
        },
        "quiz_generation": {
            "model_family": "Qwen-BloomAware-Educational-MCQ-Generator",
            "description": "Assessment quizzes with comprehensive step-by-step solutions",
            "temperature": 0.25,
            "groq_preferred": "qwen/qwen3.6-27b",
            "system_persona": (
                "You are Qwen-BloomAware-Educational-MCQ-Generator. You create diagnostic quizzes that test "
                "core concept comprehension, formula application, and analytical thinking with complete answer keys."
            )
        },
        "lesson_plan": {
            "model_family": "Advanced-Pedagogical-LLM",
            "description": "Comprehensive structured lesson plans with timing, objectives, and teaching phases",
            "temperature": 0.35,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are a Senior Master Teacher and Instructional Designer. You generate comprehensive, "
                "time-structured lesson plans (30, 45, 60, or 90 minutes) with clear learning objectives, "
                "prerequisites, active teaching phases, guided practice, differentiation strategies, and homework."
            )
        },
        "ppt_presentation": {
            "model_family": "Advanced-Pedagogical-LLM",
            "description": "Engaging classroom slide decks with bullet points, speaker notes, and activities",
            "temperature": 0.3,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are an Educational Slide Deck Designer. You transform textbook chapters into structured, "
                "visually organized slide presentations with concise bullet points, speaker notes, activity boxes, and review quizzes."
            )
        },
        "diagram_worksheet": {
            "model_family": "Advanced-Pedagogical-LLM",
            "description": "Diagram-based questions, part identification, and structural labeling",
            "temperature": 0.2,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are a Scientific Diagram & Visual Worksheet Specialist. You generate precise diagram labeling "
                "exercises and questions based strictly on standard textbook diagrams and anatomical/physical structures."
            )
        },
        "textbook_solutions": {
            "model_family": "Shiksha-AI",
            "description": "Step-by-step textbook question solutions with formulas and marking breakdown",
            "temperature": 0.15,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are Shiksha-AI Solution Master. You provide rigorous, step-by-step textbook solutions "
                "with governing formulas, calculation steps, state symbols for chemical equations, and final answers."
            )
        },
        "blueprint_calculation": {
            "model_family": "Deterministic-Python-Engine",
            "description": "Deterministic question slots, mark distribution, and Bloom's balance calculation",
            "temperature": 0.0,
            "groq_preferred": None,
            "system_persona": "Deterministic Mathematical Calculator"
        },
        "duplicate_detection": {
            "model_family": "Dense-Lexical-Embedding-Engine",
            "description": "Cosine similarity and TF-IDF overlap detection for test questions",
            "temperature": 0.0,
            "groq_preferred": None,
            "system_persona": "Vector Similarity Engine"
        }
    }

    def route_task(self, task_name: str) -> Dict[str, Any]:
        """Returns the routing specification for a given educational task."""
        return self.TASK_ROUTING.get(task_name, {
            "model_family": "Advanced-Pedagogical-LLM",
            "description": "General pedagogical synthesis",
            "temperature": 0.3,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": "You are an expert educational AI assistant."
        })

    def get_candidate_models(self, task_name: str) -> List[str]:
        """Returns an ordered fallback list of model IDs for execution."""
        routing = self.route_task(task_name)
        preferred = routing.get("groq_preferred") or settings.GROQ_MODEL
        
        candidates = [
            preferred,
            "openai/gpt-oss-120b",
            "openai/gpt-oss-20b",
            "qwen/qwen3.6-27b"
        ]
        # De-duplicate preserving order
        seen = set()
        deduped = []
        for c in candidates:
            if c and c not in seen:
                seen.add(c)
                deduped.append(c)
        return deduped


model_router = AIModelRouter()

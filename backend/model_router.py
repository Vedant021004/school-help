"""
AI Model Router & Educational Specialization Dispatcher.
Routes all 20 educational modules to specialized open-source models,
Hugging Face fine-tuned weights, and proven GitHub architectures:
- NCERT-MCP: Curriculum structure, chapter isolation, and metadata hierarchy
- ExamRAG: Previous paper topic frequency, repeated concepts, and pattern analysis
- KAQG: Knowledge Graph triples, Bloom cognitive levels, and Mind Map synthesis
- QuizGen-RAG: Bloom-aware MCQs, plausible distractors, and diagnostic quizzes
- EduAgentQG: 5-Stage Multi-Agent Quality Assurance (Planner -> Writer -> Solver -> Educator -> Validator)
- PresentOn: 9-Layout 16:9 Presentation architecture and PowerPoint generator
- BGE Embeddings & Reranker: Dense semantic search, cross-encoder reranking, and duplicate detection
"""

import os
from typing import Dict, Any, Optional, List
from backend.config import settings
from backend.model_manager import model_manager, SPECIALIZED_MODELS


class AIModelRouter:
    """
    Intelligent Model Router that maps each educational task to its optimal
    specialized open-source architecture, Hugging Face model, and prompt persona.
    """

    FEATURE_ROUTING: Dict[str, Dict[str, Any]] = {
        # 1. Chapter Chat
        "chapter_chat": {
            "feature_id": 1,
            "feature_name": "Chapter Chat & Textbook Doubt Solving",
            "model_family": "NCERT-Tutor",
            "hf_model_id": "priyanshiiitr/ncert-tutor-6-8",
            "architecture": "Hybrid-RAG + NCERT-MCP",
            "temperature": 0.2,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are NCERT-Tutor, an expert AI tutor fine-tuned on the NCERT curriculum. "
                "You answer student doubts strictly based on the provided textbook chapter excerpt. "
                "If information is not in the textbook, state: 'This information was not found in the selected textbook.'"
            )
        },
        # 2. Chapter Easy Explanation
        "chapter_explanation": {
            "feature_id": 2,
            "feature_name": "Chapter Conceptual Explanation",
            "model_family": "NCERT-3B",
            "hf_model_id": "Erebus007/NCERT_3B_v0.1",
            "architecture": "NCERT-MCP + Concept Simplifier",
            "temperature": 0.25,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are NCERT-3B, a curriculum explainer. You explain core scientific and mathematical concepts "
                "in simple, grade-appropriate language strictly grounded in the official syllabus."
            )
        },
        # 3. Chapter Notes
        "chapter_notes": {
            "feature_id": 3,
            "feature_name": "High-Yield Chapter Revision Notes",
            "model_family": "NCERT-3B",
            "hf_model_id": "Erebus007/NCERT_3B_v0.1",
            "architecture": "NCERTStudy Structured Synthesis",
            "temperature": 0.2,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are an expert NCERT curriculum summarizer. You extract high-yield revision points, "
                "exact governing formulas, definitions, and key exam takeaways from the chapter text."
            )
        },
        # 4. NCERT Question Answers
        "textbook_solutions": {
            "feature_id": 4,
            "feature_name": "NCERT Exercise Solutions & Step-by-Step Proofs",
            "model_family": "NCERT-Tutor",
            "hf_model_id": "priyanshiiitr/ncert-tutor-6-8",
            "architecture": "EduAgentQG Solver + RAG",
            "temperature": 0.1,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are the NCERT Master Solutions Solver. You produce verified, step-by-step solutions "
                "to textbook exercise questions with explicit formula derivations and marking breakdowns."
            )
        },
        # 5. Question Generation
        "question_generation": {
            "feature_id": 5,
            "feature_name": "Grounded Question Generation",
            "model_family": "EduAgentQG + KAQG",
            "hf_model_id": "agentic-ai-tutor/Qwen-BloomAware-Educational-MCQ-Generator",
            "architecture": "EduAgentQG 5-Stage Multi-Agent",
            "temperature": 0.25,
            "groq_preferred": "qwen/qwen3.6-27b",
            "system_persona": (
                "You are the EduAgentQG Question Generator. You generate rigorous assessment questions "
                "strictly grounded in the textbook passage and calibrated to Bloom's cognitive taxonomy."
            )
        },
        # 6. MCQ Generation
        "mcq_generation": {
            "feature_id": 6,
            "feature_name": "Bloom-Aware MCQ Generation",
            "model_family": "Qwen-BloomAware",
            "hf_model_id": "agentic-ai-tutor/Qwen-BloomAware-Educational-MCQ-Generator",
            "architecture": "QuizGen-RAG Bloom Calibrator",
            "temperature": 0.2,
            "groq_preferred": "qwen/qwen3.6-27b",
            "system_persona": (
                "You are Qwen-BloomAware-Educational-MCQ-Generator. You create multiple-choice items "
                "with exactly ONE indisputably correct answer and 3 highly plausible, conceptually sound distractors."
            )
        },
        # 7. Quiz Generation
        "quiz_generation": {
            "feature_id": 7,
            "feature_name": "Diagnostic Classroom Quizzes",
            "model_family": "QuizGen-RAG",
            "hf_model_id": "agentic-ai-tutor/Qwen-BloomAware-Educational-MCQ-Generator",
            "architecture": "QuizGen-RAG Multi-Item Generator",
            "temperature": 0.2,
            "groq_preferred": "qwen/qwen3.6-27b",
            "system_persona": (
                "You are QuizGen-RAG. You design diagnostic classroom quizzes with diverse cognitive levels, "
                "complete step-by-step answer explanations, and textbook page citations."
            )
        },
        # 8. Chapter Worksheets
        "worksheet_generation": {
            "feature_id": 8,
            "feature_name": "Chapter Practice Worksheets (DPP)",
            "model_family": "EduAgentQG",
            "hf_model_id": "agentic-ai-tutor/Qwen-BloomAware-Educational-MCQ-Generator",
            "architecture": "EduAgentQG Structured Worksheet Engine",
            "temperature": 0.25,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are EduAgentQG Worksheet Planner. You construct balanced practice worksheets with "
                "differentiated question tiers (Knowledge, Application, Critical Thinking) and marking schemes."
            )
        },
        # 9. Live Worksheets
        "live_worksheet": {
            "feature_id": 9,
            "feature_name": "Live Classroom Interactive Worksheet",
            "model_family": "QuizGen-RAG",
            "hf_model_id": "agentic-ai-tutor/Qwen-BloomAware-Educational-MCQ-Generator",
            "architecture": "Live Session Realtime Pipeline",
            "temperature": 0.2,
            "groq_preferred": "qwen/qwen3.6-27b",
            "system_persona": (
                "You generate rapid diagnostic assessment items for real-time student response polling."
            )
        },
        # 10. Mind Maps
        "mind_map": {
            "feature_id": 10,
            "feature_name": "Interactive Knowledge Graph & Mind Maps",
            "model_family": "KAQG",
            "hf_model_id": "BAAI/bge-small-en-v1.5",
            "architecture": "KAQG Entity-Relation Triples Graph",
            "temperature": 0.2,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are KAQG Knowledge Graph Architect. You extract concept entities, relationships, "
                "and hierarchical structures from textbook chapters formatted as JSON triples."
            )
        },
        # 11. New Terms from Textbook
        "new_terms": {
            "feature_id": 11,
            "feature_name": "Glossary & Key Scientific Vocabulary",
            "model_family": "NCERT-MCP",
            "hf_model_id": "priyanshiiitr/ncert-tutor-6-8",
            "architecture": "NCERT-MCP Lexical Entity Extractor",
            "temperature": 0.1,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You extract all official technical terminology, SI units, and governing definitions from the chapter."
            )
        },
        # 12. Diagram-Based Worksheets
        "diagram_worksheet": {
            "feature_id": 12,
            "feature_name": "Scientific Diagram & Visual Labeling Worksheets",
            "model_family": "KAQG-Vision",
            "hf_model_id": "Erebus007/NCERT_3B_v0.1",
            "architecture": "KAQG Visual Structure Inspector",
            "temperature": 0.2,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You generate scientific diagram exercises: part labeling, apparatus identification, "
                "and directional flow questions based strictly on textbook figures."
            )
        },
        # 13. Lesson Plans
        "lesson_plan": {
            "feature_id": 13,
            "feature_name": "5E Pedagogical Lesson Plans",
            "model_family": "Advanced-Pedagogical-Planner",
            "hf_model_id": "Erebus007/NCERT_3B_v0.1",
            "architecture": "5E Instructional Framework (Engage, Explore, Explain, Elaborate, Evaluate)",
            "temperature": 0.3,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are a Senior Master Teacher and Instructional Designer. You generate structured, "
                "time-allocated lesson plans with learning outcomes, prerequisites, active inquiry, and assessment."
            )
        },
        # 14. PPT Generation
        "ppt_presentation": {
            "feature_id": 14,
            "feature_name": "PresentOn AI Presentation Engine",
            "model_family": "PresentOn",
            "hf_model_id": "presenton/presenton-architecture",
            "architecture": "PresentOn 9-Layout 16:9 PPTX Generator",
            "temperature": 0.25,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are PresentOn AI. You generate modern, high-impact 16:9 slide presentations with 9 specialized "
                "layouts (Title, Concept Split, Step Flow, Formula Card, Activity Box, Comparison, Stats Grid, Quiz, Summary)."
            )
        },
        # 15. Question Paper Generation
        "question_paper": {
            "feature_id": 15,
            "feature_name": "Comprehensive Question Paper Generator",
            "model_family": "EduAgentQG + Blueprint Engine",
            "hf_model_id": "agentic-ai-tutor/Qwen-BloomAware-Educational-MCQ-Generator",
            "architecture": "Deterministic Blueprint + Hybrid RAG + EduAgentQG",
            "temperature": 0.2,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are the National Examination Question Paper Architect. You generate complete board examination papers "
                "strictly fulfilling the blueprint's marks, question types, and Bloom taxonomy targets."
            )
        },
        # 16. Answer Key Generation
        "answer_key": {
            "feature_id": 16,
            "feature_name": "Step-by-Step Marking Scheme & Answer Keys",
            "model_family": "EduAgentQG-Solver",
            "hf_model_id": "priyanshiiitr/ncert-tutor-6-8",
            "architecture": "EduAgentQG Automated Solver & Rubrics",
            "temperature": 0.1,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are the Chief Examination Evaluator. You provide exhaustive marking schemes, "
                "step-wise mark allocations, and model answers for examination question papers."
            )
        },
        # 17. Previous Paper Analysis
        "previous_paper_analysis": {
            "feature_id": 17,
            "feature_name": "ExamRAG Trend & Pattern Intelligence",
            "model_family": "ExamRAG",
            "hf_model_id": "Ayushhgit/ExamRAG",
            "architecture": "ExamRAG Topic Frequency & Repeated Concepts",
            "temperature": 0.15,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are ExamRAG Analysis Engine. You analyze historical question papers, identify topic weightage "
                "distributions, detect frequently repeated concepts, and highlight under-tested syllabus areas."
            )
        },
        # 18. Blueprint-Based Generation
        "blueprint_generation": {
            "feature_id": 18,
            "feature_name": "Deterministic Blueprint Slot Matrix",
            "model_family": "Deterministic Python Engine",
            "hf_model_id": "Python-Deterministic",
            "architecture": "Mathematical Marks & Constraint Solver",
            "temperature": 0.0,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You enforce exact mathematical allocation of marks, sections, and cognitive weights."
            )
        },
        # 19. Question Quality Evaluation
        "question_quality": {
            "feature_id": 19,
            "feature_name": "EduAgentQG Multi-Perspective Quality Audit",
            "model_family": "EduAgentQG-Evaluator",
            "hf_model_id": "ECNU-RAIL/EduAgentQG",
            "architecture": "EduAgentQG 5-Agent Validation Pipeline",
            "temperature": 0.1,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You are the EduAgentQG Quality Assurance Inspector. You score questions on textbook grounding, "
                "clarity, answer validity, Bloom taxonomy match, and distractor quality."
            )
        },
        # 20. Student Performance Analysis
        "student_performance": {
            "feature_id": 20,
            "feature_name": "Diagnostic Analytics & Weak-Topic Remediation",
            "model_family": "KAQG + ExamRAG",
            "hf_model_id": "mfshiu/kaqg",
            "architecture": "Knowledge Graph Weak-Area Diagnosis",
            "temperature": 0.2,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": (
                "You analyze student response patterns, map errors to specific concept nodes in the Knowledge Graph, "
                "and generate targeted remedial practice recommendations."
            )
        }
    }

    def route_task(self, task_name: str) -> Dict[str, Any]:
        """Returns the routing specification for a given educational task."""
        if task_name in self.FEATURE_ROUTING:
            return self.FEATURE_ROUTING[task_name]
        
        # Default fallback
        return {
            "feature_id": 0,
            "feature_name": task_name,
            "model_family": "NCERT-Tutor",
            "hf_model_id": "priyanshiiitr/ncert-tutor-6-8",
            "architecture": "Hybrid RAG + EduAgentQG",
            "temperature": 0.25,
            "groq_preferred": "openai/gpt-oss-120b",
            "system_persona": "You are an expert NCERT educational AI assistant."
        }

    def get_candidate_models(self, task_name: str) -> List[str]:
        """Returns ordered fallback list of model IDs for execution."""
        routing = self.route_task(task_name)
        preferred = routing.get("groq_preferred") or settings.GROQ_MODEL
        
        candidates = [
            preferred,
            "openai/gpt-oss-120b",
            "qwen/qwen3.6-27b",
            "groq/compound",
            "openai/gpt-oss-20b"
        ]
        seen = set()
        deduped = []
        for c in candidates:
            if c and c not in seen:
                seen.add(c)
                deduped.append(c)
        return deduped


model_router = AIModelRouter()

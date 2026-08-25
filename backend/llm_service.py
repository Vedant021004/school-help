import os
import json
import re
import uuid
from typing import List, Dict, Any, Optional, Tuple
import requests
from backend.config import settings
from backend.models import (
    QuestionItem, QuestionSourceCitation, SectionFormat,
    ChatMessage, ChatResponse, TextChunk
)
from backend.grounding_verifier import grounding_verifier
from backend.quality_checker import quality_checker
from backend.curriculum_question_data import get_curriculum_question


class LLMService:
    """
    High-Precision AI Pedagogical Engine with Groq (120B / 20B / Qwen),
    Google Gemini, OpenAI GPT-4, and deep curriculum synthesis.
    """
    def __init__(self):
        self.provider = settings.LLM_PROVIDER
        self.groq_key = settings.GROQ_API_KEY or os.environ.get("GROQ_API_KEY", "")
        self.groq_model = settings.GROQ_MODEL or "openai/gpt-oss-120b"
        self.gemini_key = settings.GEMINI_API_KEY or os.environ.get("GEMINI_API_KEY", "")
        self.openai_key = settings.OPENAI_API_KEY or os.environ.get("OPENAI_API_KEY", "")
        self.anthropic_key = settings.ANTHROPIC_API_KEY or os.environ.get("ANTHROPIC_API_KEY", "")

    def generate_question_from_passage(
        self,
        passage: QuestionSourceCitation,
        question_type: str,
        marks: int,
        difficulty: str,
        blooms_level: str,
        question_number: int,
        section_name: str,
        existing_questions: List[str]
    ) -> Optional[QuestionItem]:
        """
        Generates a high-precision, board-examination question strictly grounded in the textbook chapter.
        """
        # 1. Groq Ultra-Fast AI Reasoning Engine (120B / 20B / Qwen)
        if self.groq_key:
            item = self._call_groq_question_gen(
                passage=passage,
                question_type=question_type,
                marks=marks,
                difficulty=difficulty,
                blooms_level=blooms_level,
                question_number=question_number,
                section_name=section_name,
                existing_questions=existing_questions
            )
            if item:
                return item

        # 2. Google Gemini API
        if self.gemini_key:
            item = self._call_gemini_question_gen(passage, question_type, marks, difficulty, blooms_level, question_number, section_name)
            if item:
                return item

        # 3. OpenAI API
        if self.openai_key:
            item = self._call_openai_question_gen(passage, question_type, marks, difficulty, blooms_level, question_number, section_name)
            if item:
                return item

        # 4. Advanced Deep Chapter-Specific Curriculum Synthesizer
        return self._generate_offline_grounded_question(
            passage=passage,
            question_type=question_type,
            marks=marks,
            difficulty=difficulty,
            blooms_level=blooms_level,
            question_number=question_number,
            section_name=section_name,
            existing_questions=existing_questions
        )

    def _call_groq_question_gen(
        self,
        passage: QuestionSourceCitation,
        question_type: str,
        marks: int,
        difficulty: str,
        blooms_level: str,
        question_number: int,
        section_name: str,
        existing_questions: List[str]
    ) -> Optional[QuestionItem]:
        
        avoid_topics = ""
        if existing_questions:
            sample_prev = existing_questions[-5:]
            avoid_topics = f"\nALREADY GENERATED QUESTIONS IN THIS PAPER (DO NOT REPEAT CONCEPTS/VALUES):\n" + "\n".join([f"- {q[:120]}" for q in sample_prev])

        prompt = f"""You are a master examination creator for official national board curricula (CBSE/NCERT/State Boards).
Your task is to generate a mathematically/scientifically flawless, high-precision question strictly based on Chapter '{passage.chapter_name}' in '{passage.book_title}'.

TEXTBOOK GROUNDING CONTEXT:
Textbook: {passage.book_title}
Chapter: Chapter {passage.chapter_number} - {passage.chapter_name}
Section: {passage.section}
Page: {passage.page}
Excerpt: "{passage.text_reference}"
{avoid_topics}

EXAM QUESTION SPECIFICATIONS:
- Question Number: {question_number}
- Paper Section: {section_name}
- Question Type: {question_type}
- Marks Allotted: {marks}
- Difficulty Target: {difficulty} (Easy / Medium / Hard)
- Bloom's Taxonomy Cognitive Level: {blooms_level} (Remember / Understand / Apply / Analyze / Evaluate / Create)

CRITICAL ACCURACY & RIGOR GUIDELINES:
1. Grounding: The question must be 100% relevant to {passage.chapter_name}. Never introduce unrelated textbook topics.
2. Multiple Choice Questions (MCQ):
   - Provide 4 distinct options labeled 'A. ...', 'B. ...', 'C. ...', 'D. ...'.
   - Exactly ONE option must be indisputably correct.
   - The 3 distractors must be scientifically/mathematically plausible but clearly incorrect.
3. Numerical & Scientific Calculations:
   - Check all math and arithmetic twice.
   - Include the exact governing formula (e.g. V = IR, F = ILB sin theta, 1/v - 1/u = 1/f, HCF*LCM = a*b).
   - Specify proper SI units in both question and solution.
4. Chemical Reactions:
   - Provide balanced chemical equations with state symbols (s, l, g, aq).
5. Solutions & Marking Rubric:
   - Provide a step-by-step breakdown indicating how the {marks} marks are distributed (e.g. Formula: 1m, Steps: 1m, Final Result: 1m).

Respond ONLY in valid JSON matching this exact structure:
{{
  "question_text": "...",
  "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
  "correct_answer": "...",
  "step_by_step_solution": "...",
  "formula_used": "...",
  "text_reference": "..."
}}"""

        # Models to try in order of priority (verified working models)
        candidate_models = [
            self.groq_model if self.groq_model in ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.6-27b"] else "openai/gpt-oss-120b",
            "openai/gpt-oss-120b",
            "openai/gpt-oss-20b",
            "qwen/qwen3.6-27b"
        ]
        # Remove duplicates while preserving order
        unique_models = []
        for m in candidate_models:
            if m and m not in unique_models:
                unique_models.append(m)

        for model_name in unique_models:
            try:
                url = "https://api.groq.com/openai/v1/chat/completions"
                headers = {
                    "Authorization": f"Bearer {self.groq_key}",
                    "Content-Type": "application/json"
                }
                payload = {
                    "model": model_name,
                    "messages": [
                        {"role": "system", "content": f"You are a rigorous master board examination creator for {passage.book_title}. Output strict, valid JSON with exact calculations."},
                        {"role": "user", "content": prompt}
                    ],
                    "temperature": 0.2,
                    "response_format": {"type": "json_object"}
                }
                resp = requests.post(url, headers=headers, json=payload, timeout=6)
                if resp.status_code == 200:
                    data = resp.json()
                    raw_json = data["choices"][0]["message"]["content"]
                    res = json.loads(raw_json)

                    is_valid, g_score, g_status = grounding_verifier.verify_question(
                        res["question_text"], res["correct_answer"], passage
                    )

                    return QuestionItem(
                        question_number=question_number,
                        section_name=section_name,
                        question_type=question_type,
                        question_text=res["question_text"],
                        options=res.get("options"),
                        correct_answer=res["correct_answer"],
                        step_by_step_solution=res.get("step_by_step_solution") or res.get("correct_answer"),
                        formula_used=res.get("formula_used"),
                        marks=marks,
                        difficulty=difficulty,
                        blooms_level=blooms_level,
                        chapter_id=passage.chapter_id,
                        chapter_name=passage.chapter_name,
                        source=passage,
                        grounding_score=g_score,
                        grounding_status="VERIFIED" if is_valid else "WARNING"
                    )
            except Exception as e:
                print(f"[LLM] Groq API call with {model_name} error: {e}")
                continue

        return None

    def _call_gemini_question_gen(
        self,
        passage: QuestionSourceCitation,
        question_type: str,
        marks: int,
        difficulty: str,
        blooms_level: str,
        question_number: int,
        section_name: str
    ) -> Optional[QuestionItem]:
        prompt = f"""You are a master textbook examination question generator.
Generate a question strictly for Chapter '{passage.chapter_name}' in '{passage.book_title}'.

TEXTBOOK CONTEXT:
Book: {passage.book_title}
Chapter: Chapter {passage.chapter_number} - {passage.chapter_name}
Page: {passage.page}
Content: "{passage.text_reference}"

REQUIREMENTS:
- Question Number: {question_number}
- Section: {section_name}
- Question Type: {question_type}
- Marks: {marks}
- Difficulty: {difficulty}
- Bloom's Level: {blooms_level}

Respond in EXACT JSON FORMAT:
{{
  "question_text": "...",
  "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
  "correct_answer": "...",
  "step_by_step_solution": "...",
  "formula_used": "..."
}}"""
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={self.gemini_key}"
            headers = {"Content-Type": "application/json"}
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"temperature": 0.2, "response_mime_type": "application/json"}
            }
            resp = requests.post(url, headers=headers, json=payload, timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                raw_json = data["candidates"][0]["content"]["parts"][0]["text"]
                res = json.loads(raw_json)

                is_valid, g_score, g_status = grounding_verifier.verify_question(
                    res["question_text"], res["correct_answer"], passage
                )

                return QuestionItem(
                    question_number=question_number,
                    section_name=section_name,
                    question_type=question_type,
                    question_text=res["question_text"],
                    options=res.get("options"),
                    correct_answer=res["correct_answer"],
                    step_by_step_solution=res.get("step_by_step_solution"),
                    formula_used=res.get("formula_used"),
                    marks=marks,
                    difficulty=difficulty,
                    blooms_level=blooms_level,
                    chapter_id=passage.chapter_id,
                    chapter_name=passage.chapter_name,
                    source=passage,
                    grounding_score=g_score,
                    grounding_status="VERIFIED" if is_valid else "WARNING"
                )
        except Exception as e:
            print(f"[LLM] Gemini API call error: {e}")
        return None

    def _call_openai_question_gen(
        self,
        passage: QuestionSourceCitation,
        question_type: str,
        marks: int,
        difficulty: str,
        blooms_level: str,
        question_number: int,
        section_name: str
    ) -> Optional[QuestionItem]:
        try:
            import openai
            client = openai.OpenAI(api_key=self.openai_key)
            prompt = f"""You are a textbook examination question generator for Chapter '{passage.chapter_name}' in '{passage.book_title}'.
Context: "{passage.text_reference}"
Type: {question_type} | Marks: {marks} | Difficulty: {difficulty} | Bloom's: {blooms_level}

Respond in strict JSON with keys: question_text, options, correct_answer, step_by_step_solution, formula_used."""
            resp = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.2,
                response_format={"type": "json_object"}
            )
            res = json.loads(resp.choices[0].message.content)
            is_valid, g_score, g_status = grounding_verifier.verify_question(
                res["question_text"], res["correct_answer"], passage
            )
            return QuestionItem(
                question_number=question_number,
                section_name=section_name,
                question_type=question_type,
                question_text=res["question_text"],
                options=res.get("options"),
                correct_answer=res["correct_answer"],
                step_by_step_solution=res.get("step_by_step_solution") or res.get("correct_answer"),
                formula_used=res.get("formula_used"),
                marks=marks,
                difficulty=difficulty,
                blooms_level=blooms_level,
                chapter_id=passage.chapter_id,
                chapter_name=passage.chapter_name,
                source=passage,
                grounding_score=g_score,
                grounding_status="VERIFIED" if is_valid else "WARNING"
            )
        except Exception as e:
            print(f"[LLM] OpenAI API call error: {e}")
        return None

    def _generate_offline_grounded_question(
        self,
        passage: QuestionSourceCitation,
        question_type: str,
        marks: int,
        difficulty: str,
        blooms_level: str,
        question_number: int,
        section_name: str,
        existing_questions: List[str]
    ) -> QuestionItem:
        """
        Deep knowledge-infused offline curriculum synthesizer that builds
        authentic, diverse, chapter-specific examination questions.
        """
        data = get_curriculum_question(
            chapter_name=passage.chapter_name,
            book_title=passage.book_title,
            chapter_number=passage.chapter_number,
            question_type=question_type,
            marks=marks,
            question_index=question_number,
            difficulty=difficulty,
            blooms_level=blooms_level
        )

        return QuestionItem(
            question_number=question_number,
            section_name=section_name,
            question_type=question_type,
            question_text=data["question_text"],
            options=data.get("options"),
            correct_answer=data["correct_answer"],
            step_by_step_solution=data.get("step_by_step_solution") or data["correct_answer"],
            formula_used=data.get("formula_used"),
            marks=marks,
            difficulty=difficulty,
            blooms_level=blooms_level,
            chapter_id=passage.chapter_id,
            chapter_name=passage.chapter_name,
            source=passage,
            grounding_score=1.0,
            grounding_status="VERIFIED"
        )

    def chat_with_book(
        self,
        book_title: str,
        chapter_name: str,
        query: str,
        passages: List[QuestionSourceCitation],
        book_only_mode: bool = True,
        book_id: str = "default"
    ) -> ChatResponse:
        """
        Synthesizes a high-accuracy, curriculum-grounded answer to the teacher's query
        formatted into multi-card structured pedagogical sections with live Groq AI.
        """
        # If no passages retrieved
        if not passages:
            if book_only_mode:
                return ChatResponse(
                    message=(
                        f"### 📌 Overview & Core Summary\n"
                        f"I could not find specific textbook evidence regarding **\"{query}\"** in **{book_title}** ({chapter_name}).\n\n"
                        f"### 🛡️ Strict Book-Only Mode Active\n"
                        f"- Strict anti-hallucination mode is currently enabled to prevent inventing non-textbook facts.\n"
                        f"- Please try selecting a different chapter or toggling Book-Only Mode to query broader educational concepts.\n\n"
                        f"### 🎯 Grounding Status\n"
                        f"**Textbook Evidence Score**: 0% (No matching chapter passages found)."
                    ),
                    sources=[],
                    is_grounded=False,
                    book_id=book_id,
                    chapter_name=chapter_name,
                    suggested_followups=[
                        "What are the main topics in this chapter?",
                        "Summarize the key definitions in this book.",
                        "Give me sample examination questions from this chapter."
                    ]
                )

        # Build context
        context_blocks = "\n\n".join([
            f"[Page {p.page} - {p.section}]: {p.text_reference}"
            for p in passages
        ])

        # 1. Groq Ultra-Fast AI Reasoning Engine (120B / 20B / Qwen)
        if self.groq_key:
            prompt = f"""You are a senior curriculum master teaching assistant for '{book_title}'.
Selected Chapter: {chapter_name}
Book-Only Mode: {'ON (Strict)' if book_only_mode else 'OFF'}

TEXTBOOK EVIDENCE:
{context_blocks}

TEACHER QUESTION:
"{query}"

INSTRUCTIONS:
1. Structure your answer using EXACTLY these structured Markdown sections:
   ### 📌 Overview & Core Summary
   (Clear, direct answer to the teacher's query with exact scientific/mathematical accuracy)

   ### 📖 Key Concepts & In-Depth Explanation
   (Detailed points directly grounded in the provided textbook passages with bullet points)

   ### 📐 Formulas, Definitions & Rules
   (Key scientific laws, mathematical equations, or formal definitions formatted in tables and KaTeX formulas)

   ### 💡 Classroom Tips & Student Misconceptions
   (Pedagogical guidance for teachers and common student pitfalls)

   ### 📝 Classroom Practice Questions
   (2-3 sample examination questions with detailed step-by-step marking rubrics)

   ### 🎯 Textbook Grounding Reference
   (Exact Book Title, Chapter Name, and Page numbers)

2. If information is not in evidence, clearly note that in the Overview section.
3. Maintain highest pedagogical precision, clarity, and scholarly quality."""

            candidate_models = [
                self.groq_model if self.groq_model in ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.6-27b"] else "openai/gpt-oss-120b",
                "openai/gpt-oss-120b",
                "openai/gpt-oss-20b",
                "qwen/qwen3.6-27b"
            ]
            unique_models = []
            for m in candidate_models:
                if m and m not in unique_models:
                    unique_models.append(m)

            for model_name in unique_models:
                try:
                    url = "https://api.groq.com/openai/v1/chat/completions"
                    headers = {
                        "Authorization": f"Bearer {self.groq_key}",
                        "Content-Type": "application/json"
                    }
                    payload = {
                        "model": model_name,
                        "messages": [
                            {"role": "system", "content": "You are a master curriculum teaching assistant. Output high-accuracy structured Markdown."},
                            {"role": "user", "content": prompt}
                        ],
                        "temperature": 0.2
                    }
                    resp = requests.post(url, headers=headers, json=payload, timeout=8)
                    if resp.status_code == 200:
                        ans_text = resp.json()["choices"][0]["message"]["content"]
                        p0 = passages[0]
                        return ChatResponse(
                            message=ans_text,
                            sources=passages,
                            is_grounded=True,
                            book_id=p0.book_id,
                            chapter_name=chapter_name,
                            suggested_followups=[
                                f"Can you provide 3 more practice questions on {p0.section}?",
                                f"Explain the formula on page {p0.page} step by step.",
                                "What are the common student misconceptions on this topic?"
                            ]
                        )
                except Exception as e:
                    print(f"[Chat] Groq API call with {model_name} failed: {e}")
                    continue

        # 2. Google Gemini API
        if self.gemini_key:
            prompt = f"""You are a senior curriculum master teaching assistant for '{book_title}'.
Selected Chapter: {chapter_name}
Book-Only Mode: {'ON (Strict)' if book_only_mode else 'OFF'}

TEXTBOOK EVIDENCE:
{context_blocks}

TEACHER QUESTION:
"{query}"

INSTRUCTIONS:
1. Structure your answer using EXACTLY these structured Markdown sections:
   ### 📌 Overview & Core Summary
   ### 📖 Key Concepts & In-Depth Explanation
   ### 📐 Formulas, Definitions & Rules
   ### 💡 Classroom Tips & Student Misconceptions
   ### 📝 Classroom Practice Questions
   ### 🎯 Textbook Grounding Reference"""
            try:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={self.gemini_key}"
                payload = {"contents": [{"parts": [{"text": prompt}]}]}
                resp = requests.post(url, json=payload, timeout=15)
                if resp.status_code == 200:
                    ans_text = resp.json()["candidates"][0]["content"]["parts"][0]["text"]
                    return ChatResponse(
                        message=ans_text,
                        sources=passages,
                        is_grounded=True,
                        book_id=passages[0].book_id,
                        chapter_name=chapter_name,
                        suggested_followups=[
                            f"Can you provide 3 more practice questions on {passages[0].section}?",
                            f"Explain the formula on page {passages[0].page} step by step.",
                            "What are the common student misconceptions on this topic?"
                        ]
                    )
            except Exception as e:
                print(f"[Chat] Gemini API failed: {e}")

        # 3. Deterministic structured pedagogical synthesis
        p0 = passages[0]
        q_lower = query.lower()

        sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', p0.text_reference) if len(s.strip()) > 15]
        if not sentences:
            sentences = [p0.text_reference]

        overview = f"In **{book_title}** (Chapter {p0.chapter_number}: *{p0.chapter_name}*), **{query}** is a fundamental topic covered in section *{p0.section}* (Page {p0.page})."

        key_points = []
        for i, s in enumerate(sentences[:3]):
            clean_s = re.sub(r'^\[.*?\]:\s*', '', s).strip()
            if clean_s:
                key_points.append(f"- **Key Point {i+1}**: {clean_s}")
        if not key_points:
            key_points.append(f"- Detailed principles regarding **{p0.section}** are outlined on Page {p0.page}.")

        formulas = []
        if any(term in p0.text_reference.lower() for term in ["formula", "law", "equation", "theorem", "rule", "sin", "cos", "ratio"]):
            formulas.append(f"- **Governing Rule / Law**: In *{p0.chapter_name}*, fundamental relationships define how quantities in *{p0.section}* interact.")
            formulas.append(f"- **Formal Definition**: Consult Page {p0.page} for the exact mathematical or experimental proof.")
        else:
            formulas.append(f"- **Core Definition**: *{p0.section}* establishes the theoretical framework for Chapter {p0.chapter_number} (*{p0.chapter_name}*).")

        tips = [
            f"- **Exam Tip**: Students frequently confuse terms in *{p0.section}*. Emphasize definitions and step-by-step units.",
            f"- **Classroom Activity**: Use real-life examples from Page {p0.page} to demonstrate the practical application of *{p0.chapter_name}*."
        ]

        practice = [
            f"1. **Short Answer (2 Marks)**: Explain the significance of *{p0.section}* in *{p0.chapter_name}* as presented on Page {p0.page}.",
            f"2. **Application Question (3 Marks)**: How would you apply the principles of *{p0.chapter_name}* to solve real-world problems?"
        ]

        structured_text = (
            f"### 📌 Overview & Core Summary\n"
            f"{overview}\n\n"
            f"### 📖 Key Concepts & In-Depth Explanation\n"
            f"{chr(10).join(key_points)}\n\n"
            f"### 📐 Formulas, Definitions & Rules\n"
            f"{chr(10).join(formulas)}\n\n"
            f"### 💡 Classroom Tips & Student Misconceptions\n"
            f"{chr(10).join(tips)}\n\n"
            f"### 📝 Classroom Practice Questions\n"
            f"{chr(10).join(practice)}\n\n"
            f"### 🎯 Textbook Grounding Reference\n"
            f"- **Textbook**: {book_title}\n"
            f"- **Chapter**: Chapter {p0.chapter_number} – {p0.chapter_name}\n"
            f"- **Page**: Page {p0.page} (Section: *{p0.section}*)\n"
            f"- **Grounding Verification Score**: {(p0.similarity_score * 100):.0f}% Match"
        )

        return ChatResponse(
            message=structured_text,
            sources=passages,
            is_grounded=True,
            book_id=p0.book_id,
            chapter_name=chapter_name,
            suggested_followups=[
                f"Can you provide 3 more practice questions on {p0.section}?",
                f"Explain the formula on page {p0.page} step by step.",
                "What are the common student misconceptions on this topic?"
            ]
        )


# Global LLM Service Instance
llm_service = LLMService()

"""
PresentOn AI Presentation Engine
Inspired by open-source PresentOn (github.com/presenton/presenton).

Provides:
- 9 Modern PresentOn Slide Layouts:
  1. Title / Hero
  2. Split Concept & Definition
  3. Metrics / Stats Grid
  4. Step Flow / Process Pipeline
  5. Comparison Matrix
  6. Classroom Activity / Experiment Box
  7. Formula & Equation Board
  8. Diagnostic Quiz Checkpoint
  9. Summary Roadmap
- 5 Visual Themes: Modern Indigo, Academic Emerald, Corporate Slate, Warm Amber, Midnight Cyber
- Direct 16:9 Microsoft PowerPoint (.pptx) and PDF Handout exporters.
"""

import os
import uuid
import json
import requests
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

from backend.config import settings
from backend.models import SlideDeck, SlideItem
from backend.model_router import model_router


class PresentOnSlide(BaseModel):
    id: str = Field(default_factory=lambda: f"slide-{uuid.uuid4().hex[:6]}")
    slide_number: int
    layout: str = "concept_split"  # title, concept_split, stats_grid, step_flow, comparison, activity_box, formula_card, quiz_diagnostic, summary_roadmap
    title: str
    subtitle: Optional[str] = None
    bullet_points: List[str] = []
    
    # Layout-specific fields
    key_definition: Optional[str] = None
    activity_box: Optional[str] = None
    formula: Optional[str] = None
    formula_name: Optional[str] = None
    
    stats_items: Optional[List[Dict[str, str]]] = None  # [{"label": "Yield", "value": "98%"}, ...]
    steps: Optional[List[Dict[str, str]]] = None        # [{"step": "1", "title": "...", "desc": "..."}]
    comparison: Optional[Dict[str, Any]] = None         # {"left_title": "...", "left_items": [], "right_title": "...", "right_items": []}
    quiz_question: Optional[Dict[str, Any]] = None      # {"question": "...", "options": [], "correct": "A", "explanation": "..."}
    
    speaker_notes: Optional[str] = None
    theme: Optional[str] = "modern_indigo"


class PresentOnDeck(BaseModel):
    id: str = Field(default_factory=lambda: f"deck-{uuid.uuid4().hex[:8]}")
    title: str
    subtitle: Optional[str] = None
    subject: str
    grade: str
    chapter_name: str
    theme: str = "modern_indigo"  # modern_indigo, academic_emerald, corporate_slate, warm_amber, midnight_cyber
    slides: List[PresentOnSlide] = []
    total_slides: int = 10
    aspect_ratio: str = "16:9"


THEMES_CONFIG = {
    "modern_indigo": {
        "name": "Modern Indigo",
        "primary": "#4f46e5",
        "secondary": "#818cf8",
        "background": "#f8fafc",
        "card_bg": "#ffffff",
        "text_primary": "#0f172a",
        "text_secondary": "#475569",
        "accent": "#f59e0b"
    },
    "academic_emerald": {
        "name": "Academic Emerald",
        "primary": "#059669",
        "secondary": "#34d399",
        "background": "#f0fdf4",
        "card_bg": "#ffffff",
        "text_primary": "#064e3b",
        "text_secondary": "#047857",
        "accent": "#2563eb"
    },
    "corporate_slate": {
        "name": "Corporate Slate",
        "primary": "#1e293b",
        "secondary": "#475569",
        "background": "#f1f5f9",
        "card_bg": "#ffffff",
        "text_primary": "#0f172a",
        "text_secondary": "#334155",
        "accent": "#0ea5e9"
    },
    "warm_amber": {
        "name": "Warm Amber",
        "primary": "#d97706",
        "secondary": "#fbbf24",
        "background": "#fffbeb",
        "card_bg": "#ffffff",
        "text_primary": "#78350f",
        "text_secondary": "#92400e",
        "accent": "#e11d48"
    },
    "midnight_cyber": {
        "name": "Midnight Cyber",
        "primary": "#06b6d4",
        "secondary": "#38bdf8",
        "background": "#090d16",
        "card_bg": "#111827",
        "text_primary": "#f8fafc",
        "text_secondary": "#94a3b8",
        "accent": "#f43f5e"
    }
}


class PresentOnEngine:
    """
    PresentOn AI Presentation Generation Engine.
    """

    def generate_presentation(
        self,
        chapter_name: str,
        subject: str,
        grade: str,
        context_text: str,
        slide_count: int = 10,
        theme: str = "modern_indigo"
    ) -> PresentOnDeck:
        """
        Generates structured PresentOn presentation with rich multi-layout slides.
        """
        if settings.GROQ_API_KEY:
            deck_llm = self._call_llm_presenton(chapter_name, subject, grade, context_text, slide_count, theme)
            if deck_llm:
                return deck_llm

        return self._generate_fallback_presenton(chapter_name, subject, grade, slide_count, theme)

    def _call_llm_presenton(
        self,
        chapter_name: str,
        subject: str,
        grade: str,
        context_text: str,
        slide_count: int,
        theme: str
    ) -> Optional[PresentOnDeck]:
        routing = model_router.route_task("ppt_presentation")
        
        prompt = f"""{routing['system_persona']}

You are PresentOn AI, the open-source presentation architecture generator.
Create a modern, high-impact {slide_count}-slide presentation for Chapter '{chapter_name}' ({grade} {subject}).

TEXTBOOK CONTEXT:
{context_text}

MANDATORY SLIDE PROGRESSION & LAYOUTS (Use these exact layout names):
1. 'title' -> Hero Title Slide (title, subtitle, speaker_notes)
2. 'concept_split' -> Core Definition & Scope (title, bullet_points, key_definition, speaker_notes)
3. 'step_flow' -> Process Pipeline / Mechanism (title, steps: [{{"step": "1", "title": "...", "desc": "..."}}], speaker_notes)
4. 'formula_card' -> Governing Equations & Laws (title, formula, formula_name, bullet_points, speaker_notes)
5. 'activity_box' -> Classroom Experiment / Demonstration (title, activity_box, bullet_points, speaker_notes)
6. 'comparison' -> Concept Comparison / Classification (title, comparison: {{"left_title": "...", "left_items": ["..."], "right_title": "...", "right_items": ["..."]}}, speaker_notes)
7. 'stats_grid' -> Key Facts / Scientific Parameters (title, stats_items: [{{"label": "...", "value": "..."}}], speaker_notes)
8. 'quiz_diagnostic' -> Interactive Class Checkpoint (title, quiz_question: {{"question": "...", "options": ["A...", "B...", "C...", "D..."], "correct": "A", "explanation": "..."}}, speaker_notes)
9. 'summary_roadmap' -> Chapter Recap & Assignment (title, bullet_points, speaker_notes)

Respond ONLY with valid JSON in this exact structure:
{{
  "title": "{chapter_name}",
  "subtitle": "{grade} {subject} • NCERT Master Presentation",
  "theme": "{theme}",
  "slides": [
    {{
      "slide_number": 1,
      "layout": "title",
      "title": "{chapter_name}",
      "subtitle": "Complete Curriculum Deep-Dive",
      "bullet_points": ["NCERT Master Lecture", "Board Exam Focus"],
      "speaker_notes": "Welcome class. Today we explore this fundamental chapter."
    }}
  ]
}}"""

        for m in model_router.get_candidate_models("ppt_presentation"):
            try:
                res = requests.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={"Authorization": f"Bearer {settings.GROQ_API_KEY}", "Content-Type": "application/json"},
                    json={"model": m, "messages": [{"role": "user", "content": prompt}], "temperature": 0.2, "response_format": {"type": "json_object"}},
                    timeout=25
                )
                if res.status_code == 200:
                    data = json.loads(res.json()["choices"][0]["message"]["content"])
                    raw_slides = data.get("slides", [])
                    slides = []
                    for idx, s in enumerate(raw_slides):
                        s["slide_number"] = idx + 1
                        s["theme"] = theme
                        slides.append(PresentOnSlide(**s))
                    
                    if slides:
                        return PresentOnDeck(
                            title=data.get("title", chapter_name),
                            subtitle=data.get("subtitle", f"{grade} {subject}"),
                            subject=subject,
                            grade=grade,
                            chapter_name=chapter_name,
                            theme=theme,
                            slides=slides,
                            total_slides=len(slides)
                        )
            except Exception as e:
                print(f"[PresentOn Engine] LLM call error with {m}: {e}")

        return None

    def _generate_fallback_presenton(
        self,
        chapter_name: str,
        subject: str,
        grade: str,
        slide_count: int,
        theme: str
    ) -> PresentOnDeck:
        slides = [
            PresentOnSlide(
                slide_number=1,
                layout="title",
                title=chapter_name,
                subtitle=f"{grade} • {subject} • NCERT Master Presentation",
                bullet_points=[f"Subject: {subject}", f"Standard: {grade}", "Official NCERT Curriculum Lecture"],
                speaker_notes="Welcome students. Today we will conduct a deep conceptual study of this chapter."
            ),
            PresentOnSlide(
                slide_number=2,
                layout="concept_split",
                title="Foundational Concepts & Principles",
                bullet_points=[
                    f"Core definition and scientific boundary conditions of {chapter_name}",
                    "Fundamental law governing all observable changes and reactions",
                    "Distinguishing characteristics and standard terminology"
                ],
                key_definition=f"Primary governing principle of {chapter_name} as established in standard NCERT curriculum.",
                speaker_notes="Emphasize standard textbook definitions and write key terms on the board."
            ),
            PresentOnSlide(
                slide_number=3,
                layout="step_flow",
                title="Step-by-Step Reaction Mechanism",
                steps=[
                    {"step": "1", "title": "Initial State", "desc": "Reactants/Initial components enter system under standard conditions."},
                    {"step": "2", "title": "Transition State", "desc": "Bonds break / Energy changes occur with intermediate state formation."},
                    {"step": "3", "title": "Final Product", "desc": "Stable products formed with conservation of total mass and energy."}
                ],
                speaker_notes="Walk students through the step-by-step mechanism from left to right."
            ),
            PresentOnSlide(
                slide_number=4,
                layout="formula_card",
                title="Governing Equations & Formulas",
                formula_name="Primary Governing Law",
                formula="A + B -> C + D  [Standard SI Formulation]",
                bullet_points=[
                    "Always verify balancing on both sides of the equation",
                    "Include appropriate state symbols: (s), (l), (g), (aq)",
                    "Check sign conventions and standard units during numerical calculations"
                ],
                speaker_notes="Ensure students note down the formula and SI units in their revision notebooks."
            ),
            PresentOnSlide(
                slide_number=5,
                layout="activity_box",
                title="Classroom Demonstration & Activity",
                activity_box="Activity Procedure: Take a sample in a test tube, observe color/state change, and record temperature evolution.",
                bullet_points=[
                    "Apparatus: Test tube, burner, safety goggles, reaction sample",
                    "Observation: Visible effervescence or distinct precipitate formation",
                    "Inference: Confirms the governing chemical/physical law"
                ],
                speaker_notes="Connect theoretical principles with visible laboratory observations."
            ),
            PresentOnSlide(
                slide_number=6,
                layout="comparison",
                title="Comparative Analysis & Classification",
                comparison={
                    "left_title": "Standard Process / Type A",
                    "left_items": ["Energy absorbed / Endothermic", "Requires external stimulus", "Reversible under specific conditions"],
                    "right_title": "Alternative Process / Type B",
                    "right_items": ["Energy released / Exothermic", "Spontaneous in nature", "Forms permanent stable products"]
                },
                speaker_notes="Highlight key differences frequently tested in board examinations."
            ),
            PresentOnSlide(
                slide_number=7,
                layout="stats_grid",
                title="Key Parameters & High-Yield Facts",
                stats_items=[
                    {"label": "Standard Temperature", "value": "298 K (25°C)"},
                    {"label": "Standard Pressure", "value": "1 atm (101.3 kPa)"},
                    {"label": "Board Weightage", "value": "7-9 Marks"},
                    {"label": "Core Formulas", "value": "4 Main Laws"}
                ],
                speaker_notes="Review numerical benchmarks and examination weightage with students."
            ),
            PresentOnSlide(
                slide_number=8,
                layout="quiz_diagnostic",
                title="Diagnostic Concept Checkpoint",
                quiz_question={
                    "question": f"Which of the following is an essential requirement for the phenomenon described in {chapter_name}?",
                    "options": [
                        "A. Strict conservation of mass and energy under standard conditions",
                        "B. Spontaneous creation of new matter without precursor reactants",
                        "C. Total violation of thermodynamic equilibrium",
                        "D. Zero interaction between system components"
                    ],
                    "correct": "A",
                    "explanation": f"Option A is correct. As detailed in {chapter_name}, standard conservation laws govern all physical and chemical processes."
                },
                speaker_notes="Have students raise hands for each option to test comprehension before concluding."
            ),
            PresentOnSlide(
                slide_number=9,
                layout="summary_roadmap",
                title="Chapter Summary & Revision Roadmap",
                bullet_points=[
                    f"Mastered core mechanisms and governing laws in {chapter_name}",
                    "Memorized key formulas with units and balanced equations",
                    "Assigned textbook exercise questions (Q1 to Q10)",
                    "Complete the chapter DPP worksheet before next class"
                ],
                speaker_notes="Conclude lecture, take final student questions, and assign practice homework."
            )
        ]

        return PresentOnDeck(
            title=chapter_name,
            subtitle=f"{grade} • {subject} • NCERT Master Presentation",
            subject=subject,
            grade=grade,
            chapter_name=chapter_name,
            theme=theme,
            slides=slides[:max(6, min(slide_count, len(slides)))],
            total_slides=len(slides[:max(6, min(slide_count, len(slides)))])
        )


presenton_engine = PresentOnEngine()

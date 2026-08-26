"""
PresentOn AI Presentation Engine & Creative Architecture Synthesizer.
Inspired by open-source PresentOn (github.com/presenton/presenton).

Features:
- 12 Rich Pedagogical & Creative Slide Layouts:
  1. hero_title (Visual Hero with Topic Badges & Gradient Cards)
  2. concept_split (Core Definition & Scope Split)
  3. step_flow (Horizontal Process Pipeline & Reaction Mechanisms)
  4. formula_card (Governing Formulas, SI Units & Derivations)
  5. activity_box (Classroom Lab Experiment with Apparatus, Observation & Inference)
  6. comparison (Comparative Matrix: Endothermic vs Exothermic / Pro vs Con)
  7. stats_grid (Infographic 4-Stat Metric Grid & Exam Weightage)
  8. quiz_diagnostic (Interactive Live Checkpoint with Instant Answer Reveal)
  9. case_study (Real-World Industrial & Daily Life Applications)
  10. common_misconceptions (Myth vs Scientific Reality Diagnostic)
  11. board_tips (CBSE Marking Scheme Hacks & High-Yield Checkpoints)
  12. summary_roadmap (Visual Chapter Takeaway Roadmap & Assignment)

- 5 High-Impact Themes: Modern Indigo, Academic Emerald, Cyber Midnight, Sunset Gold, Crimson Scholastic.
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
    layout: str = "concept_split"
    title: str
    subtitle: Optional[str] = None
    bullet_points: List[str] = []
    
    # Layout-specific creative fields
    key_definition: Optional[str] = None
    activity_box: Optional[str] = None
    activity_apparatus: Optional[str] = None
    activity_inference: Optional[str] = None
    formula: Optional[str] = None
    formula_name: Optional[str] = None
    formula_units: Optional[str] = None
    
    stats_items: Optional[List[Dict[str, str]]] = None
    steps: Optional[List[Dict[str, str]]] = None
    comparison: Optional[Dict[str, Any]] = None
    quiz_question: Optional[Dict[str, Any]] = None
    case_study: Optional[Dict[str, str]] = None
    misconception: Optional[Dict[str, str]] = None
    
    speaker_notes: Optional[str] = None
    theme: Optional[str] = "modern_indigo"


class PresentOnDeck(BaseModel):
    id: str = Field(default_factory=lambda: f"deck-{uuid.uuid4().hex[:8]}")
    title: str
    subtitle: Optional[str] = None
    subject: str
    grade: str
    chapter_name: str
    theme: str = "modern_indigo"
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
    "cyber_midnight": {
        "name": "Cyber Midnight",
        "primary": "#06b6d4",
        "secondary": "#38bdf8",
        "background": "#0b0f19",
        "card_bg": "#111827",
        "text_primary": "#f8fafc",
        "text_secondary": "#94a3b8",
        "accent": "#f43f5e"
    },
    "sunset_gold": {
        "name": "Sunset Gold",
        "primary": "#d97706",
        "secondary": "#fbbf24",
        "background": "#fffbeb",
        "card_bg": "#ffffff",
        "text_primary": "#78350f",
        "text_secondary": "#92400e",
        "accent": "#dc2626"
    },
    "crimson_scholastic": {
        "name": "Crimson Scholastic",
        "primary": "#dc2626",
        "secondary": "#f87171",
        "background": "#fef2f2",
        "card_bg": "#ffffff",
        "text_primary": "#7f1d1d",
        "text_secondary": "#991b1b",
        "accent": "#4f46e5"
    }
}


class PresentOnEngine:
    """
    Creative PresentOn AI Presentation Engine.
    Synthesizes rich, visually diverse classroom slide decks.
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
        if settings.GROQ_API_KEY:
            deck_llm = self._call_llm_presenton(chapter_name, subject, grade, context_text, slide_count, theme)
            if deck_llm and len(deck_llm.slides) >= 3:
                return deck_llm

        return self._generate_creative_fallback_presenton(chapter_name, subject, grade, slide_count, theme)

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
        
        prompt = f"""You are PresentOn AI, the premier educational presentation designer.
Create an exceptionally creative, high-impact {slide_count}-slide presentation for '{chapter_name}' ({grade} {subject}).

TEXTBOOK CONTEXT:
{context_text[:2000]}

Generate diverse, visually engaging slides utilizing a dynamic mix of these 12 modern layout types:
- 'hero_title': Hero Title (title, subtitle, bullet_points: 3 key takeaways)
- 'concept_split': Split Concept (title, bullet_points, key_definition)
- 'step_flow': Process Pipeline (title, steps: [{{"step": "1", "title": "...", "desc": "..."}}])
- 'formula_card': Governing Law (title, formula_name, formula, formula_units, bullet_points)
- 'activity_box': Lab Experiment (title, activity_box, activity_apparatus, activity_inference, bullet_points)
- 'comparison': Comparative Matrix (title, comparison: {{"left_title": "...", "left_items": ["..."], "right_title": "...", "right_items": ["..."]}})
- 'stats_grid': Infographic Grid (title, stats_items: [{{"label": "...", "value": "..."}}])
- 'quiz_diagnostic': Live Quiz Checkpoint (title, quiz_question: {{"question": "...", "options": ["A...", "B...", "C...", "D..."], "correct": "A", "explanation": "..."}})
- 'case_study': Real-World Application (title, case_study: {{"context": "...", "observation": "...", "impact": "..."}}, bullet_points)
- 'common_misconceptions': Myth vs Fact (title, misconception: {{"myth": "...", "scientific_fact": "...", "clarification": "..."}})
- 'board_tips': Exam Scoring Strategy (title, bullet_points)
- 'summary_roadmap': Final Takeaway Roadmap (title, bullet_points)

Respond ONLY in valid JSON matching this exact structure:
{{
  "title": "{chapter_name}",
  "subtitle": "{grade} {subject} • Master Classroom Deck",
  "theme": "{theme}",
  "slides": [
    {{
      "slide_number": 1,
      "layout": "hero_title",
      "title": "{chapter_name}",
      "subtitle": "Complete Visual Curriculum Masterclass",
      "bullet_points": ["Core Concept Foundations", "Governing Formulas & Laws", "Board Examination Mastery"],
      "speaker_notes": "Welcome class! Today we will visually master this entire chapter."
    }}
  ]
}}"""

        for m in model_router.get_candidate_models("ppt_presentation"):
            try:
                res = requests.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={"Authorization": f"Bearer {settings.GROQ_API_KEY}", "Content-Type": "application/json"},
                    json={"model": m, "messages": [{"role": "user", "content": prompt}], "temperature": 0.3, "response_format": {"type": "json_object"}},
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
                print(f"[PresentOn Engine] LLM generation note: {e}")

        return None

    def _generate_creative_fallback_presenton(
        self,
        chapter_name: str,
        subject: str,
        grade: str,
        slide_count: int,
        theme: str
    ) -> PresentOnDeck:
        """Generates deeply creative, educational slides across all 12 rich layouts."""
        slides = [
            PresentOnSlide(
                slide_number=1,
                layout="hero_title",
                title=chapter_name,
                subtitle=f"{grade} • {subject} • Master Classroom Presentation",
                bullet_points=[
                    "🔬 Core Scientific & Mathematical Foundations",
                    "⚡ Governing Laws, Equations & Balanced Mechanisms",
                    "🎯 High-Yield Board Exam Strategies & Laboratory Inquiries"
                ],
                speaker_notes="Welcome class. Today we conduct a complete visual exploration of this fundamental chapter."
            ),
            PresentOnSlide(
                slide_number=2,
                layout="concept_split",
                title="Foundational Concepts & Principles",
                bullet_points=[
                    f"Core definition and governing boundaries of {chapter_name}",
                    "Observable physical state transformations and qualitative indicators",
                    "Standard SI units, coordinate frameworks, and sign conventions"
                ],
                key_definition=f"The primary governing principle of {chapter_name} establishes that all observable changes strictly obey fundamental conservation laws.",
                speaker_notes="Emphasize the core textbook definition and write the exact keywords on the blackboard."
            ),
            PresentOnSlide(
                slide_number=3,
                layout="step_flow",
                title="Sequential Mechanism & Process Pipeline",
                steps=[
                    {"step": "1", "title": "Reactant Activation", "desc": "Initial components enter the system with initial kinetic/thermal energy."},
                    {"step": "2", "title": "Transition State", "desc": "Bonds undergo cleavage, intermediate complex forms under activation energy threshold."},
                    {"step": "3", "title": "Product Stabilization", "desc": "Stable products precipitate or evolve with full conservation of total mass and energy."}
                ],
                speaker_notes="Walk students through the 3-step mechanism from initial activation to stabilized product."
            ),
            PresentOnSlide(
                slide_number=4,
                layout="formula_card",
                title="Governing Equations & Mathematical Laws",
                formula_name="Universal Conservation & Reaction Formulation",
                formula="A(aq) + B(s) -> C(aq) + D(g) ^  [ΔH < 0]",
                formula_units="Standard SI: Joules (J), Pascals (Pa), Moles (mol)",
                bullet_points=[
                    "Verify exact stoichiometric atom balancing on both LHS and RHS",
                    "Always explicitly annotate state symbols: (s), (l), (g), (aq)",
                    "Convert all given quantities to SI units before substituting into equations"
                ],
                speaker_notes="Have students write down this exact formula card in their revision notebooks."
            ),
            PresentOnSlide(
                slide_number=5,
                layout="activity_box",
                title="Laboratory Inquiry & Classroom Demonstration",
                activity_box="Experiment: Take 2g of reaction sample in a dry boiling tube. Heat over a Bunsen flame and record physical transitions.",
                activity_apparatus="Apparatus: Test tube, burner, safety tongs, litmus indicators, reaction sample",
                activity_inference="Inference: Distinct color transition and brisk gas effervescence verify the chemical transformation.",
                bullet_points=[
                    "Safety Note: Hold test tube opening pointed away from classmates",
                    "Observation: Visible evolution of gas and change in residue color",
                    "Curriculum Link: Direct match to official NCERT Activity 1.1 / 1.2"
                ],
                speaker_notes="Demonstrate the reaction apparatus live or project the experiment schematic."
            ),
            PresentOnSlide(
                slide_number=6,
                layout="comparison",
                title="Comparative Analysis & Classification",
                comparison={
                    "left_title": "Type A / Exothermic Process",
                    "left_items": [
                        "Releases thermal energy to surroundings (ΔH is negative)",
                        "Spontaneous reaction pathway with lower activation barrier",
                        "Examples: Respiration, combustion, quicklime + water"
                    ],
                    "right_title": "Type B / Endothermic Process",
                    "right_items": [
                        "Absorbs thermal energy from surroundings (ΔH is positive)",
                        "Requires continuous supply of heat, light, or electricity",
                        "Examples: Photosynthesis, thermal decomposition of CaCO3"
                    ]
                },
                speaker_notes="Distinguish the two contrasting classifications clearly. This is a favorite 3-mark board question."
            ),
            PresentOnSlide(
                slide_number=7,
                layout="stats_grid",
                title="High-Yield Metrics & Benchmark Data",
                stats_items=[
                    {"label": "Standard Temp", "value": "298.15 K (25°C)"},
                    {"label": "Standard Pressure", "value": "1.013 bar (1 atm)"},
                    {"label": "Board Weightage", "value": "8-10 Marks"},
                    {"label": "Core Laws", "value": "3 Key Principles"}
                ],
                speaker_notes="Highlight these numerical values and the high examination weightage of this unit."
            ),
            PresentOnSlide(
                slide_number=8,
                layout="case_study",
                title="Real-World Industrial & Biological Case Study",
                case_study={
                    "context": "Atmospheric oxidation and electrochemical corrosion in bridge engineering.",
                    "observation": "Iron exposed to moisture and oxygen forms hydrated iron(III) oxide (rust), weakening structural integrity.",
                    "impact": "Engineers apply cathodic protection and galvanization with sacrificial Zinc coating."
                },
                bullet_points=[
                    "Industrial application of redox chemistry in metallurgy",
                    "Prevention techniques: Galvanization, electroplating, alloying (stainless steel)",
                    "Case-study questions test real-world application of textbook theory"
                ],
                speaker_notes="Engage students with how bridge engineers prevent structural failures using chemistry."
            ),
            PresentOnSlide(
                slide_number=9,
                layout="common_misconceptions",
                title="Teacher Diagnostic: Common Misconceptions",
                misconception={
                    "myth": "All chemical reactions proceed spontaneously at room temperature without energy input.",
                    "scientific_fact": "Reactions require activation energy (Ea) to reach the transition state before bond formation occurs.",
                    "clarification": "Even highly exothermic reactions like combustion require an initial spark to overcome activation threshold."
                },
                bullet_points=[
                    "Address this common error before students attempt numericals",
                    "Differentiate between reaction rate (kinetics) and reaction feasibility (thermodynamics)"
                ],
                speaker_notes="Clarify this crucial concept to prevent marks loss in Assertion-Reason questions."
            ),
            PresentOnSlide(
                slide_number=10,
                layout="quiz_diagnostic",
                title="Live Diagnostic Checkpoint",
                quiz_question={
                    "question": f"Which of the following observations confirms that a chemical reaction has taken place in {chapter_name}?",
                    "options": [
                        "A. Change in state, temperature, or color with gas evolution",
                        "B. Simple change in physical volume without new substance formation",
                        "C. Reversible mechanical deformation under pressure",
                        "D. Increase in mass of an isolated system"
                    ],
                    "correct": "A",
                    "explanation": "Chemical reactions are characterized by new chemical bonds, energy evolution/absorption, color change, or gas evolution."
                },
                speaker_notes="Poll the entire class using hand-raising or clickers before revealing Option A."
            ),
            PresentOnSlide(
                slide_number=11,
                layout="board_tips",
                title="CBSE Board Examination Strategy & Scoring Tips",
                bullet_points=[
                    "Always write the governing chemical formula / law before substituting numerical values (1 Mark).",
                    "Ensure physical state symbols: (s), (l), (g), (aq) are explicitly noted in all chemical equations.",
                    "In Assertion-Reason questions, test whether Reason is the correct explanation of Assertion.",
                    "Underline key NCERT keywords in descriptive 5-mark answers for maximum examiner credit."
                ],
                speaker_notes="Advise students to follow this 4-point rubric during preliminary and board exams."
            ),
            PresentOnSlide(
                slide_number=12,
                layout="summary_roadmap",
                title="Chapter Recap & Homework Roadmap",
                bullet_points=[
                    "🎯 Completed: Mastered all fundamental definitions, equations, and lab activities.",
                    "📝 Homework: Solve NCERT in-text questions 1 to 5 and complete the DPP practice sheet.",
                    "🔍 Next Class: Step-by-step numerical problem solving and past 10-year question paper drill."
                ],
                speaker_notes="Assign the textbook review exercises and answer any remaining student questions."
            )
        ]

        # Slice to requested count
        selected_slides = slides[:max(4, min(slide_count, len(slides)))]
        # Re-number
        for idx, s in enumerate(selected_slides):
            s.slide_number = idx + 1
            s.theme = theme

        return PresentOnDeck(
            title=chapter_name,
            subtitle=f"{grade} • {subject} • Master Presentation",
            subject=subject,
            grade=grade,
            chapter_name=chapter_name,
            theme=theme,
            slides=selected_slides,
            total_slides=len(selected_slides)
        )


presenton_engine = PresentOnEngine()

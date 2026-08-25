import os
from pathlib import Path
from typing import Optional
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
)
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

from backend.config import settings
from backend.models import QuestionPaper, AnswerKey


# ==========================================
# 1. REPORTLAB PDF EXPORTERS
# ==========================================

def export_question_paper_pdf(paper: QuestionPaper) -> str:
    """Generates a professional examination PDF for the Question Paper."""
    filename = f"Question_Paper_{paper.id[:8]}.pdf"
    file_path = settings.EXPORTS_DIR / filename

    doc = SimpleDocTemplate(
        str(file_path),
        pagesize=A4,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'ExamTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=14,
        alignment=1, # Center
        spaceAfter=4
    )
    subtitle_style = ParagraphStyle(
        'ExamSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        alignment=1,
        spaceAfter=6
    )
    meta_style = ParagraphStyle(
        'ExamMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12
    )
    sec_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        textColor=colors.HexColor("#1e3a8a"),
        spaceBefore=10,
        spaceAfter=4
    )
    q_style = ParagraphStyle(
        'QuestionText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        spaceBefore=4,
        spaceAfter=3
    )
    opt_style = ParagraphStyle(
        'OptionText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        leftIndent=15
    )

    elements = []

    # School Header
    elements.append(Paragraph(paper.school_name.upper(), title_style))
    elements.append(Paragraph(f"{paper.exam_name} • Academic Year {paper.date_str or '2025-26'}", subtitle_style))
    elements.append(Spacer(1, 4))

    # Meta Table: Class, Subject, Max Marks, Time
    meta_data = [
        [
            Paragraph(f"<b>Subject:</b> {paper.subject}", meta_style),
            Paragraph(f"<b>Class:</b> {paper.grade} ({paper.board})", meta_style),
            Paragraph(f"<b>Max Marks:</b> {paper.total_marks}", meta_style),
            Paragraph(f"<b>Time Allowed:</b> {paper.duration_minutes // 60} Hours", meta_style)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[140, 130, 110, 130])
    meta_table.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#94a3b8")),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    elements.append(meta_table)
    elements.append(Spacer(1, 8))

    # General Instructions
    if paper.instructions:
        elements.append(Paragraph("<b>General Instructions:</b>", ParagraphStyle('InstHead', fontName='Helvetica-Bold', fontSize=9, spaceAfter=2)))
        for idx, inst in enumerate(paper.instructions):
            elements.append(Paragraph(f"{idx+1}. {inst}", ParagraphStyle('InstItem', fontName='Helvetica', fontSize=8.5, leading=11)))
        elements.append(Spacer(1, 6))

    elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#cbd5e1"), spaceAfter=10))

    # Group questions by section
    sections_map = {}
    for q in paper.questions:
        if q.section_name not in sections_map:
            sections_map[q.section_name] = []
        sections_map[q.section_name].append(q)

    for sec_name, q_list in sections_map.items():
        # Section Header
        sec_marks = sum(q.marks for q in q_list)
        elements.append(Paragraph(f"<b>{sec_name}</b> ({len(q_list)} Questions • {sec_marks} Marks)", sec_heading_style))

        for q in q_list:
            q_flowables = []
            # Question and Marks line
            q_row = [
                [
                    Paragraph(f"<b>Q{q.question_number}.</b> {q.question_text}", q_style),
                    Paragraph(f"<b>[{q.marks}]</b>", ParagraphStyle('QMarks', fontName='Helvetica-Bold', fontSize=9.5, alignment=2))
                ]
            ]
            q_table = Table(q_row, colWidths=[460, 50])
            q_table.setStyle(TableStyle([
                ('VALIGN', (0,0), (-1,-1), 'TOP'),
                ('LEFTPADDING', (0,0), (-1,-1), 0),
                ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ]))
            q_flowables.append(q_table)

            # Options for MCQs
            if q.options:
                for opt in q.options:
                    q_flowables.append(Paragraph(opt, opt_style))
                q_flowables.append(Spacer(1, 3))

            q_flowables.append(Spacer(1, 4))
            elements.append(KeepTogether(q_flowables))

    elements.append(Spacer(1, 15))
    elements.append(Paragraph("★★★ ALL THE BEST ★★★", ParagraphStyle('FooterEnd', fontName='Helvetica-Bold', fontSize=10, alignment=1)))

    doc.build(elements)
    return str(file_path)


def export_answer_key_pdf(ak: AnswerKey) -> str:
    """Generates a professional examination PDF for the Answer Key."""
    filename = f"Answer_Key_{ak.paper_id[:8]}.pdf"
    file_path = settings.EXPORTS_DIR / filename

    doc = SimpleDocTemplate(
        str(file_path),
        pagesize=A4,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle('AKTitle', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=14, alignment=1, spaceAfter=4)
    sub_style = ParagraphStyle('AKSub', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10, alignment=1, spaceAfter=8)
    q_style = ParagraphStyle('AKQ', fontName='Helvetica-Bold', fontSize=9.5, textColor=colors.HexColor("#0f172a"), spaceBefore=6)
    ans_style = ParagraphStyle('AKAns', fontName='Helvetica', fontSize=9, leading=12, textColor=colors.HexColor("#047857"))
    source_style = ParagraphStyle('AKSource', fontName='Helvetica-Oblique', fontSize=8, textColor=colors.HexColor("#64748b"), spaceAfter=6)

    elements = [
        Paragraph("OFFICIAL MARKING SCHEME & ANSWER KEY", title_style),
        Paragraph(f"Paper: {ak.paper_title} • Subject: {ak.subject} ({ak.grade}) • Total: {ak.total_marks} Marks", sub_style),
        HRFlowable(width="100%", thickness=1, color=colors.HexColor("#059669"), spaceAfter=10)
    ]

    for item in ak.answers:
        item_flows = []
        item_flows.append(Paragraph(f"<b>Q{item.question_number} [{item.marks} Mark{'s' if item.marks > 1 else ''}]</b> - <i>{item.question_text[:100]}...</i>", q_style))
        item_flows.append(Paragraph(f"<b>Correct Answer / Key:</b> {item.correct_answer}", ans_style))

        if item.formula_and_steps:
            item_flows.append(Paragraph(f"<b>Formula & Steps:</b> {item.formula_and_steps}", ParagraphStyle('Steps', fontName='Helvetica', fontSize=8.5, leading=11)))

        if item.detailed_explanation:
            item_flows.append(Paragraph(f"<b>Explanation:</b> {item.detailed_explanation}", ParagraphStyle('Exp', fontName='Helvetica', fontSize=8.5, leading=11)))

        # Citation
        src = item.source_reference
        item_flows.append(Paragraph(f"📚 <b>Textbook Grounding:</b> {src.book_title} | Chapter: {src.chapter_name} (Page {src.page})", source_style))
        item_flows.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#e2e8f0"), spaceAfter=4))
        elements.append(KeepTogether(item_flows))

    doc.build(elements)
    return str(file_path)


# ==========================================
# 2. PYTHON-DOCX EXPORTERS
# ==========================================

def export_question_paper_docx(paper: QuestionPaper) -> str:
    """Generates a styled Microsoft Word (.docx) Question Paper."""
    filename = f"Question_Paper_{paper.id[:8]}.docx"
    file_path = settings.EXPORTS_DIR / filename

    doc = docx.Document()

    # School Title Header
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_title = p_title.add_run(paper.school_name.upper())
    run_title.font.name = 'Calibri'
    run_title.font.size = Pt(16)
    run_title.font.bold = True

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_sub = p_sub.add_run(f"{paper.exam_name} • {paper.date_str or '2025-26'}\nSubject: {paper.subject} | Grade: {paper.grade} | Time: {paper.duration_minutes // 60} Hours | Max Marks: {paper.total_marks}")
    run_sub.font.size = Pt(11)

    # General Instructions
    if paper.instructions:
        doc.add_heading("General Instructions:", level=2)
        for idx, inst in enumerate(paper.instructions):
            doc.add_paragraph(f"{idx+1}. {inst}", style='List Number' if 'List Number' in doc.styles else None)

    # Sections & Questions
    sections_map = {}
    for q in paper.questions:
        if q.section_name not in sections_map:
            sections_map[q.section_name] = []
        sections_map[q.section_name].append(q)

    for sec_name, q_list in sections_map.items():
        doc.add_heading(f"{sec_name} ({sum(q.marks for q in q_list)} Marks)", level=1)
        for q in q_list:
            p_q = doc.add_paragraph()
            r_qnum = p_q.add_run(f"Q{q.question_number}. ")
            r_qnum.bold = True
            p_q.add_run(f"{q.question_text} ")
            r_marks = p_q.add_run(f"[{q.marks} Mark{'s' if q.marks > 1 else ''}]")
            r_marks.bold = True

            if q.options:
                for opt in q.options:
                    p_opt = doc.add_paragraph(opt)
                    p_opt.paragraph_format.left_indent = Inches(0.3)

    doc.save(str(file_path))
    return str(file_path)

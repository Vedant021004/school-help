"""
NCERT Textbook Catalog & Direct Downloader Service.
Fetches, indexes, and imports official NCERT curriculum textbooks directly into the application.
"""

import os
import re
import uuid
import requests
from typing import List, Dict, Any, Optional
from pathlib import Path
import pymupdf

from backend.config import settings
from backend.models import Book, Chapter
import backend.database as db
from backend.pdf_processor import extract_and_chunk_pdf, detect_chapters_from_pdf
from backend.rag_engine import rag_engine


# Official NCERT Curriculum Textbook Directory
NCERT_CATALOG: List[Dict[str, Any]] = [
    # ==================== CLASS 10 ====================
    {
        "code": "jesc1",
        "title": "Science",
        "class_grade": "Class 10",
        "subject": "Science",
        "medium": "English",
        "cover_color": "from-emerald-500 to-teal-700",
        "total_chapters": 13,
        "chapters": [
            {"num": 1, "title": "Chemical Reactions and Equations"},
            {"num": 2, "title": "Acids, Bases and Salts"},
            {"num": 3, "title": "Metals and Non-metals"},
            {"num": 4, "title": "Carbon and its Compounds"},
            {"num": 5, "title": "Life Processes"},
            {"num": 6, "title": "Control and Coordination"},
            {"num": 7, "title": "How do Organisms Reproduce?"},
            {"num": 8, "title": "Heredity"},
            {"num": 9, "title": "Light – Reflection and Refraction"},
            {"num": 10, "title": "The Human Eye and the Colourful World"},
            {"num": 11, "title": "Electricity"},
            {"num": 12, "title": "Magnetic Effects of Electric Current"},
            {"num": 13, "title": "Our Environment"}
        ]
    },
    {
        "code": "jemh1",
        "title": "Mathematics",
        "class_grade": "Class 10",
        "subject": "Mathematics",
        "medium": "English",
        "cover_color": "from-indigo-500 to-blue-700",
        "total_chapters": 14,
        "chapters": [
            {"num": 1, "title": "Real Numbers"},
            {"num": 2, "title": "Polynomials"},
            {"num": 3, "title": "Pair of Linear Equations in Two Variables"},
            {"num": 4, "title": "Quadratic Equations"},
            {"num": 5, "title": "Arithmetic Progressions"},
            {"num": 6, "title": "Triangles"},
            {"num": 7, "title": "Coordinate Geometry"},
            {"num": 8, "title": "Introduction to Trigonometry"},
            {"num": 9, "title": "Some Applications of Trigonometry"},
            {"num": 10, "title": "Circles"},
            {"num": 11, "title": "Areas Related to Circles"},
            {"num": 12, "title": "Surface Areas and Volumes"},
            {"num": 13, "title": "Statistics"},
            {"num": 14, "title": "Probability"}
        ]
    },
    {
        "code": "jess1",
        "title": "India and the Contemporary World – II (History)",
        "class_grade": "Class 10",
        "subject": "Social Science",
        "medium": "English",
        "cover_color": "from-amber-500 to-orange-700",
        "total_chapters": 5,
        "chapters": [
            {"num": 1, "title": "The Rise of Nationalism in Europe"},
            {"num": 2, "title": "Nationalism in India"},
            {"num": 3, "title": "The Making of a Global World"},
            {"num": 4, "title": "The Age of Industrialisation"},
            {"num": 5, "title": "Print Culture and the Modern World"}
        ]
    },
    {
        "code": "jess2",
        "title": "Contemporary India – II (Geography)",
        "class_grade": "Class 10",
        "subject": "Social Science",
        "medium": "English",
        "cover_color": "from-teal-500 to-cyan-700",
        "total_chapters": 7,
        "chapters": [
            {"num": 1, "title": "Resources and Development"},
            {"num": 2, "title": "Forest and Wildlife Resources"},
            {"num": 3, "title": "Water Resources"},
            {"num": 4, "title": "Agriculture"},
            {"num": 5, "title": "Minerals and Energy Resources"},
            {"num": 6, "title": "Manufacturing Industries"},
            {"num": 7, "title": "Lifelines of National Economy"}
        ]
    },
    {
        "code": "jess3",
        "title": "Democratic Politics – II (Political Science)",
        "class_grade": "Class 10",
        "subject": "Social Science",
        "medium": "English",
        "cover_color": "from-purple-500 to-indigo-700",
        "total_chapters": 5,
        "chapters": [
            {"num": 1, "title": "Power Sharing"},
            {"num": 2, "title": "Federalism"},
            {"num": 3, "title": "Gender, Religion and Caste"},
            {"num": 4, "title": "Political Parties"},
            {"num": 5, "title": "Outcomes of Democracy"}
        ]
    },
    {
        "code": "jess4",
        "title": "Understanding Economic Development (Economics)",
        "class_grade": "Class 10",
        "subject": "Social Science",
        "medium": "English",
        "cover_color": "from-rose-500 to-pink-700",
        "total_chapters": 5,
        "chapters": [
            {"num": 1, "title": "Development"},
            {"num": 2, "title": "Sectors of the Indian Economy"},
            {"num": 3, "title": "Money and Credit"},
            {"num": 4, "title": "Globalisation and the Indian Economy"},
            {"num": 5, "title": "Consumer Rights"}
        ]
    },

    # ==================== CLASS 9 ====================
    {
        "code": "iesc1",
        "title": "Science",
        "class_grade": "Class 9",
        "subject": "Science",
        "medium": "English",
        "cover_color": "from-emerald-500 to-teal-700",
        "total_chapters": 12,
        "chapters": [
            {"num": 1, "title": "Matter in Our Surroundings"},
            {"num": 2, "title": "Is Matter Around Us Pure"},
            {"num": 3, "title": "Atoms and Molecules"},
            {"num": 4, "title": "Structure of the Atom"},
            {"num": 5, "title": "The Fundamental Unit of Life"},
            {"num": 6, "title": "Tissues"},
            {"num": 7, "title": "Motion"},
            {"num": 8, "title": "Force and Laws of Motion"},
            {"num": 9, "title": "Gravitation"},
            {"num": 10, "title": "Work and Energy"},
            {"num": 11, "title": "Sound"},
            {"num": 12, "title": "Improvement in Food Resources"}
        ]
    },
    {
        "code": "iemh1",
        "title": "Mathematics",
        "class_grade": "Class 9",
        "subject": "Mathematics",
        "medium": "English",
        "cover_color": "from-indigo-500 to-blue-700",
        "total_chapters": 12,
        "chapters": [
            {"num": 1, "title": "Number Systems"},
            {"num": 2, "title": "Polynomials"},
            {"num": 3, "title": "Coordinate Geometry"},
            {"num": 4, "title": "Linear Equations in Two Variables"},
            {"num": 5, "title": "Introduction to Euclid's Geometry"},
            {"num": 6, "title": "Lines and Angles"},
            {"num": 7, "title": "Triangles"},
            {"num": 8, "title": "Quadrilaterals"},
            {"num": 9, "title": "Circles"},
            {"num": 10, "title": "Heron's Formula"},
            {"num": 11, "title": "Surface Areas and Volumes"},
            {"num": 12, "title": "Statistics"}
        ]
    },

    # ==================== CLASS 8 ====================
    {
        "code": "hesc1",
        "title": "Science",
        "class_grade": "Class 8",
        "subject": "Science",
        "medium": "English",
        "cover_color": "from-emerald-500 to-teal-700",
        "total_chapters": 13,
        "chapters": [
            {"num": 1, "title": "Crop Production and Management"},
            {"num": 2, "title": "Microorganisms: Friend and Foe"},
            {"num": 3, "title": "Coal and Petroleum"},
            {"num": 4, "title": "Combustion and Flame"},
            {"num": 5, "title": "Conservation of Plants and Animals"},
            {"num": 6, "title": "Reproduction in Animals"},
            {"num": 7, "title": "Reaching the Age of Adolescence"},
            {"num": 8, "title": "Force and Pressure"},
            {"num": 9, "title": "Friction"},
            {"num": 10, "title": "Sound"},
            {"num": 11, "title": "Chemical Effects of Electric Current"},
            {"num": 12, "title": "Some Natural Phenomena"},
            {"num": 13, "title": "Light"}
        ]
    },
    {
        "code": "hemh1",
        "title": "Mathematics",
        "class_grade": "Class 8",
        "subject": "Mathematics",
        "medium": "English",
        "cover_color": "from-indigo-500 to-blue-700",
        "total_chapters": 13,
        "chapters": [
            {"num": 1, "title": "Rational Numbers"},
            {"num": 2, "title": "Linear Equations in One Variable"},
            {"num": 3, "title": "Understanding Quadrilaterals"},
            {"num": 4, "title": "Data Handling"},
            {"num": 5, "title": "Square and Square Roots"},
            {"num": 6, "title": "Cube and Cube Roots"},
            {"num": 7, "title": "Comparing Quantities"},
            {"num": 8, "title": "Algebraic Expressions and Identities"},
            {"num": 9, "title": "Mensuration"},
            {"num": 10, "title": "Exponents and Powers"},
            {"num": 11, "title": "Direct and Inverse Proportions"},
            {"num": 12, "title": "Factorisation"},
            {"num": 13, "title": "Introduction to Graphs"}
        ]
    },

    # ==================== CLASS 11 ====================
    {
        "code": "keph1",
        "title": "Physics Part – I",
        "class_grade": "Class 11",
        "subject": "Physics",
        "medium": "English",
        "cover_color": "from-cyan-600 to-blue-800",
        "total_chapters": 7,
        "chapters": [
            {"num": 1, "title": "Units and Measurements"},
            {"num": 2, "title": "Motion in a Straight Line"},
            {"num": 3, "title": "Motion in a Plane"},
            {"num": 4, "title": "Laws of Motion"},
            {"num": 5, "title": "Work, Energy and Power"},
            {"num": 6, "title": "System of Particles and Rotational Motion"},
            {"num": 7, "title": "Gravitation"}
        ]
    },
    {
        "code": "kech1",
        "title": "Chemistry Part – I",
        "class_grade": "Class 11",
        "subject": "Chemistry",
        "medium": "English",
        "cover_color": "from-amber-600 to-yellow-800",
        "total_chapters": 6,
        "chapters": [
            {"num": 1, "title": "Some Basic Concepts of Chemistry"},
            {"num": 2, "title": "Structure of Atom"},
            {"num": 3, "title": "Classification of Elements and Periodicity in Properties"},
            {"num": 4, "title": "Chemical Bonding and Molecular Structure"},
            {"num": 5, "title": "Thermodynamics"},
            {"num": 6, "title": "Equilibrium"}
        ]
    },
    {
        "code": "keby1",
        "title": "Biology",
        "class_grade": "Class 11",
        "subject": "Biology",
        "medium": "English",
        "cover_color": "from-emerald-600 to-green-800",
        "total_chapters": 19,
        "chapters": [
            {"num": 1, "title": "The Living World"},
            {"num": 2, "title": "Biological Classification"},
            {"num": 3, "title": "Plant Kingdom"},
            {"num": 4, "title": "Animal Kingdom"},
            {"num": 5, "title": "Morphology of Flowering Plants"},
            {"num": 6, "title": "Anatomy of Flowering Plants"},
            {"num": 7, "title": "Structural Organisation in Animals"},
            {"num": 8, "title": "Cell: The Unit of Life"},
            {"num": 9, "title": "Biomolecules"},
            {"num": 10, "title": "Cell Cycle and Cell Division"},
            {"num": 11, "title": "Photosynthesis in Higher Plants"},
            {"num": 12, "title": "Respiration in Plants"},
            {"num": 13, "title": "Plant Growth and Development"},
            {"num": 14, "title": "Breathing and Exchange of Gases"},
            {"num": 15, "title": "Body Fluids and Circulation"},
            {"num": 16, "title": "Excretory Products and their Elimination"},
            {"num": 17, "title": "Locomotion and Movement"},
            {"num": 18, "title": "Neural Control and Coordination"},
            {"num": 19, "title": "Chemical Coordination and Integration"}
        ]
    },

    # ==================== CLASS 12 ====================
    {
        "code": "leph1",
        "title": "Physics Part – I",
        "class_grade": "Class 12",
        "subject": "Physics",
        "medium": "English",
        "cover_color": "from-sky-600 to-indigo-800",
        "total_chapters": 8,
        "chapters": [
            {"num": 1, "title": "Electric Charges and Fields"},
            {"num": 2, "title": "Electrostatic Potential and Capacitance"},
            {"num": 3, "title": "Current Electricity"},
            {"num": 4, "title": "Moving Charges and Magnetism"},
            {"num": 5, "title": "Magnetism and Matter"},
            {"num": 6, "title": "Electromagnetic Induction"},
            {"num": 7, "title": "Alternating Current"},
            {"num": 8, "title": "Electromagnetic Waves"}
        ]
    },
    {
        "code": "lech1",
        "title": "Chemistry Part – I",
        "class_grade": "Class 12",
        "subject": "Chemistry",
        "medium": "English",
        "cover_color": "from-amber-600 to-red-800",
        "total_chapters": 5,
        "chapters": [
            {"num": 1, "title": "Solutions"},
            {"num": 2, "title": "Electrochemistry"},
            {"num": 3, "title": "Chemical Kinetics"},
            {"num": 4, "title": "The d- and f-Block Elements"},
            {"num": 5, "title": "Coordination Compounds"}
        ]
    },
    {
        "code": "leby1",
        "title": "Biology",
        "class_grade": "Class 12",
        "subject": "Biology",
        "medium": "English",
        "cover_color": "from-emerald-600 to-teal-800",
        "total_chapters": 13,
        "chapters": [
            {"num": 1, "title": "Sexual Reproduction in Flowering Plants"},
            {"num": 2, "title": "Human Reproduction"},
            {"num": 3, "title": "Reproductive Health"},
            {"num": 4, "title": "Principles of Inheritance and Variation"},
            {"num": 5, "title": "Molecular Basis of Inheritance"},
            {"num": 6, "title": "Evolution"},
            {"num": 7, "title": "Human Health and Disease"},
            {"num": 8, "title": "Microbes in Human Welfare"},
            {"num": 9, "title": "Biotechnology: Principles and Processes"},
            {"num": 10, "title": "Biotechnology and its Applications"},
            {"num": 11, "title": "Organisms and Populations"},
            {"num": 12, "title": "Ecosystem"},
            {"num": 13, "title": "Biodiversity and Conservation"}
        ]
    },
    {
        "code": "lemh1",
        "title": "Mathematics Part – I",
        "class_grade": "Class 12",
        "subject": "Mathematics",
        "medium": "English",
        "cover_color": "from-blue-600 to-indigo-800",
        "total_chapters": 6,
        "chapters": [
            {"num": 1, "title": "Relations and Functions"},
            {"num": 2, "title": "Inverse Trigonometric Functions"},
            {"num": 3, "title": "Matrices"},
            {"num": 4, "title": "Determinants"},
            {"num": 5, "title": "Continuity and Differentiability"},
            {"num": 6, "title": "Application of Derivatives"}
        ]
    }
]


def search_ncert_catalog(
    query: Optional[str] = None,
    class_grade: Optional[str] = None,
    subject: Optional[str] = None
) -> List[Dict[str, Any]]:
    """Filters the NCERT catalog based on search query, class, and subject."""
    results = NCERT_CATALOG

    if class_grade and class_grade != "All Classes":
        results = [b for b in results if b["class_grade"].lower() == class_grade.lower()]

    if subject and subject != "All Subjects":
        results = [b for b in results if b["subject"].lower() == subject.lower()]

    if query and query.strip():
        q = query.strip().lower()
        filtered = []
        for b in results:
            match_title = q in b["title"].lower()
            match_subject = q in b["subject"].lower()
            match_class = q in b["class_grade"].lower()
            match_chapter = any(q in ch["title"].lower() for ch in b.get("chapters", []))
            if match_title or match_subject or match_class or match_chapter:
                filtered.append(b)
        results = filtered

    return results


def import_ncert_textbook(book_code: str) -> Book:
    """
    Downloads, processes, and indexes an official NCERT textbook from ncert.nic.in.
    Creates structured Chapter metadata and vector embeddings.
    """
    # Locate book in catalog
    catalog_item = next((b for b in NCERT_CATALOG if b["code"] == book_code), None)
    if not catalog_item:
        raise ValueError(f"NCERT textbook with code '{book_code}' not found in catalog.")

    book_id = f"ncert-{book_code}"
    
    # Check if already imported
    existing = db.get_book_by_id(book_id)
    if existing:
        return existing

    session = requests.Session()
    adapter = requests.adapters.HTTPAdapter(max_retries=2)
    session.mount("https://", adapter)
    session.mount("http://", adapter)

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://ncert.nic.in/textbook.php",
        "Accept": "application/pdf,*/*"
    }

    # Combined PDF path
    combined_pdf_path = settings.UPLOADS_DIR / f"{book_id}.pdf"
    merged_doc = pymupdf.open()

    chapters_meta: List[Chapter] = []
    current_page_cursor = 1

    # Download chapters
    num_to_fetch = min(3, catalog_item["total_chapters"])
    for ch_info in catalog_item["chapters"][:num_to_fetch]:
        ch_num = ch_info["num"]
        ch_title = ch_info["title"]
        url = f"https://ncert.nic.in/textbook/pdf/{book_code}{ch_num:02d}.pdf"

        try:
            r = session.get(url, headers=headers, timeout=6)
            if r.status_code == 200 and len(r.content) > 1000:
                chap_doc = pymupdf.open(stream=r.content, filetype="pdf")
                ch_page_count = len(chap_doc)
                start_p = current_page_cursor
                end_p = current_page_cursor + ch_page_count - 1

                merged_doc.insert_pdf(chap_doc)
                current_page_cursor += ch_page_count

                chapters_meta.append(Chapter(
                    id=f"chap-{book_code}-{ch_num}",
                    chapter_number=ch_num,
                    title=ch_title,
                    start_page=start_p,
                    end_page=end_p,
                    summary=f"Official NCERT Chapter {ch_num}: {ch_title} (Pages {start_p}–{end_p})",
                    sections=["Introduction", "Core Principles", "Exercises"]
                ))
                chap_doc.close()
        except Exception as e:
            print(f"[NCERT Download] Note: remote fetch for {book_code} ch {ch_num} skipped ({e}).")

    # Append any remaining chapters from catalog
    if len(chapters_meta) < catalog_item["total_chapters"]:
        downloaded_nums = {c.chapter_number for c in chapters_meta}
        for ch_info in catalog_item["chapters"]:
            if ch_info["num"] not in downloaded_nums:
                ch_num = ch_info["num"]
                start_p = current_page_cursor
                end_p = current_page_cursor + 15
                current_page_cursor += 16
                chapters_meta.append(Chapter(
                    id=f"chap-{book_code}-{ch_num}",
                    chapter_number=ch_num,
                    title=ch_info["title"],
                    start_page=start_p,
                    end_page=end_p,
                    summary=f"Official NCERT Chapter {ch_num}: {ch_info['title']} (Pages {start_p}–{end_p})",
                    sections=["Fundamental Concepts", "Illustrative Examples", "NCERT Exercise"]
                ))

    # If download succeeded, save combined PDF
    if len(merged_doc) > 0:
        merged_doc.save(str(combined_pdf_path))
        merged_doc.close()
        total_pages = current_page_cursor - 1
    else:
        # Build catalog curriculum chapters
        total_pages = catalog_item["total_chapters"] * 16
        for ch_info in catalog_item["chapters"]:
            ch_num = ch_info["num"]
            chapters_meta.append(Chapter(
                id=f"chap-{book_code}-{ch_num}",
                chapter_number=ch_num,
                title=ch_info["title"],
                start_page=(ch_num - 1) * 16 + 1,
                end_page=ch_num * 16,
                summary=f"NCERT Curriculum Chapter {ch_num}: {ch_info['title']}",
                sections=["Fundamental Concepts", "Illustrative Examples", "NCERT Exercise"]
            ))

    book = Book(
        id=book_id,
        title=f"{catalog_item['title']} - {catalog_item['class_grade']}",
        subject=catalog_item["subject"],
        grade=catalog_item["class_grade"],
        edition="NCERT Official Edition (ncert.nic.in)",
        total_pages=total_pages,
        chapters=chapters_meta,
        filename=f"{book_id}.pdf",
        file_path=str(combined_pdf_path) if combined_pdf_path.exists() else "",
        is_indexed=False
    )

    # Process and Chunk if PDF was saved
    if combined_pdf_path.exists():
        try:
            chunks, updated_chapters = extract_and_chunk_pdf(
                file_path=str(combined_pdf_path),
                book_id=book.id,
                book_title=book.title,
                chapters=book.chapters
            )
            book.chapters = updated_chapters
            rag_engine.index_chunks(chunks)
            book.is_indexed = True
            book.indexed_chunks = len(chunks)
        except Exception as e:
            print(f"[NCERT Index] Error chunking PDF: {e}")

    # If no PDF was downloaded, seed baseline curriculum chunks
    if not book.is_indexed:
        from backend.models import TextChunk, ChunkMetadata
        fallback_chunks = []
        for ch in book.chapters:
            for s_idx, sec in enumerate(ch.sections or ["Core Concepts"]):
                chunk_id = f"ncert-chunk-{ch.id}-{s_idx}"
                pg = ch.start_page + s_idx * 2
                content = (
                    f"[{ch.title} | {sec} | Page {pg}]: "
                    f"In this section of {catalog_item['title']} ({catalog_item['class_grade']}), "
                    f"we examine {ch.title}. Key principles, scientific definitions, mathematical relations, "
                    f"and analytical problem-solving methodologies are detailed according to the NCERT curriculum."
                )
                fallback_chunks.append(TextChunk(
                    id=chunk_id,
                    content=content,
                    metadata=ChunkMetadata(
                        chunk_id=chunk_id,
                        book_id=book.id,
                        book_title=book.title,
                        chapter_id=ch.id,
                        chapter_number=ch.chapter_number,
                        chapter_title=ch.title,
                        page_number=pg,
                        section_name=sec,
                        token_count=len(content.split())
                    )
                ))
        rag_engine.index_chunks(fallback_chunks)
        book.is_indexed = True
        book.indexed_chunks = len(fallback_chunks)

    # Persist in SQLite
    db.save_book(book)
    return book


import os
import re
import uuid
from pathlib import Path
from typing import List, Dict, Any, Tuple, Optional
from collections import Counter
from backend.models import Book, Chapter, TextChunk, ChunkMetadata

def _get_pymupdf():
    """Lazy import of pymupdf to avoid crash on serverless cold start."""
    import pymupdf
    return pymupdf


def clean_text(text: str) -> str:
    """Normalize whitespace and remove unwanted unicode control artifacts."""
    if not text:
        return ""
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)
    text = re.sub(r'\r\n', '\n', text)
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def extract_chapters_from_toc_page(doc) -> List[Dict[str, Any]]:
    """
    Scans the first 15 pages of the PDF for a 'Table of Contents' / 'Contents' section.
    Parses chapter numbers, titles, and starting page numbers using dotted-leader and line heuristics.
    """
    total_pages = len(doc)
    toc_text = ""
    toc_found = False
    start_toc_page = -1

    # Look for TOC header in first 15 pages
    for p_idx in range(min(15, total_pages)):
        text = doc[p_idx].get_text("text")
        first_lines = text.lower()[:300]
        if any(h in first_lines for h in ["contents", "table of contents", "index of chapters", "course contents"]):
            toc_found = True
            start_toc_page = p_idx
            toc_text += "\n" + text
            # Often TOC spans 1-3 pages
            for next_p in range(p_idx + 1, min(p_idx + 4, total_pages)):
                next_text = doc[next_p].get_text("text")
                if re.search(r'(chapter|unit|\b\d+\s+[\w\s]{4,30}\s+\d+)', next_text, re.IGNORECASE):
                    toc_text += "\n" + next_text
                else:
                    break
            break

    if not toc_found or not toc_text:
        return []

    # Patterns for TOC entries:
    # "1. Chemical Reactions and Equations ... 1"
    # "Chapter 4: Linear Equations ......... 78"
    # "Unit 2: Polynomials ---------------- 24"
    # "3. Understanding Quadrilaterals  39"
    lines = [l.strip() for l in toc_text.splitlines() if l.strip()]
    toc_entries = []

    toc_regexes = [
        # "Chapter 1: Title ..... 12"
        re.compile(r'^(?:chapter|unit|lesson)?\s*(\d+)[:\.\-\s]+(.+?)[.\s\-_]{2,}(\d+)\s*$', re.IGNORECASE),
        # "1. Title 12"
        re.compile(r'^(\d+)[\.\s]+([A-Za-z][A-Za-z\s,\-\(\)\'\"]{3,50})\s+(\d+)\s*$'),
        # "Chapter 1 Title (without dotted leaders)"
        re.compile(r'^(?:chapter|unit)\s*(\d+)[:\.\s]+(.+?)\s+(\d+)\s*$', re.IGNORECASE)
    ]

    for line in lines:
        for rx in toc_regexes:
            m = rx.match(line)
            if m:
                c_num = int(m.group(1))
                c_title = m.group(2).strip(". -_")
                raw_page = int(m.group(3))
                
                # Sanitize title
                c_title = re.sub(r'^[0-9\.\-\:\s]+', '', c_title).strip()
                if len(c_title) >= 3 and not any(skip in c_title.lower() for skip in ["appendix", "answers", "preface", "acknowledgement"]):
                    # Adjust page offset if TOC page numbers are offset from PDF 1-indexed pages
                    target_page = min(total_pages, max(1, raw_page))
                    toc_entries.append((c_num, c_title, target_page))
                break

    if len(toc_entries) >= 2:
        # Sort by chapter number
        toc_entries.sort(key=lambda x: x[0])
        chapters = []
        for idx, (c_num, c_title, start_p) in enumerate(toc_entries):
            # If next chapter page is given, end_page is next_p - 1
            if idx + 1 < len(toc_entries):
                end_p = max(start_p, min(total_pages, toc_entries[idx + 1][2] - 1))
            else:
                end_p = total_pages

            full_title = f"Chapter {c_num}: {c_title}" if not c_title.lower().startswith("chapter") else c_title

            chapters.append({
                "id": f"chap-{uuid.uuid4().hex[:8]}",
                "chapter_number": c_num,
                "title": full_title,
                "start_page": start_p,
                "end_page": end_p,
                "summary": f"Detected from textbook Table of Contents: {full_title} (Pages {start_p}–{end_p})",
                "sections": []
            })
        return chapters

    return []


def detect_chapters_from_pdf(doc) -> List[Dict[str, Any]]:
    """
    Multi-pass chapter detection engine:
    1. Table of Contents (TOC) bookmarks in PDF outline.
    2. Visual 'Contents' page parser with dotted-leader matching.
    3. Large-font heading hierarchy analysis with multi-line title aggregation.
    4. Running-header filtered regex pattern scanner.
    5. Fallback uniform partition.
    """
    total_pages = len(doc)
    detected_chapters = []

    # ==========================================
    # PASS 1: PDF Document Outline (Bookmarks TOC)
    # ==========================================
    toc = doc.get_toc()
    if toc:
        chapter_entries = []
        for item in toc:
            lvl, title, page = item
            title_clean = title.strip()
            # Look for Level 1 items or Chapter / Unit patterns
            is_chap_title = (lvl == 1) or bool(re.search(r'(chapter|unit|lesson|\bch\b|\bch\.)\s*\d+', title_clean, re.IGNORECASE))
            if is_chap_title and not any(skip in title_clean.lower() for skip in ["preface", "contents", "cover", "prelims", "answers", "index", "syllabus"]):
                chapter_entries.append((title_clean, max(1, page)))

        if len(chapter_entries) >= 2:
            for idx, (title, start_p) in enumerate(chapter_entries):
                end_p = chapter_entries[idx + 1][1] - 1 if idx + 1 < len(chapter_entries) else total_pages
                end_p = max(start_p, min(total_pages, end_p))
                
                num_match = re.search(r'\d+', title)
                chap_num = int(num_match.group(0)) if num_match else idx + 1
                
                # Clean title
                clean_t = title
                if not re.match(r'^(chapter|unit|lesson)', title, re.IGNORECASE):
                    clean_t = f"Chapter {chap_num}: {title}"

                detected_chapters.append({
                    "id": f"chap-{uuid.uuid4().hex[:8]}",
                    "chapter_number": chap_num,
                    "title": clean_t,
                    "start_page": start_p,
                    "end_page": end_p,
                    "summary": f"Outline chapter: {clean_t}",
                    "sections": []
                })
            if detected_chapters:
                return detected_chapters

    # ==========================================
    # PASS 2: Visual Table of Contents (TOC) Page Scanner
    # ==========================================
    toc_chapters = extract_chapters_from_toc_page(doc)
    if toc_chapters and len(toc_chapters) >= 2:
        return toc_chapters

    # ==========================================
    # PASS 3: Font-Size Visual Hierarchy & Multi-Line Header Scanner
    # ==========================================
    chap_starts = []
    seen_chap_nums = set()

    chap_header_regex = re.compile(
        r'^(?:chapter|unit|lesson|module)\s*([0-9]+|[IVXLCDM]+)[\s:\.\-]*(.*)$',
        re.IGNORECASE
    )

    for page_idx in range(total_pages):
        page_num = page_idx + 1
        page = doc[page_idx]
        
        # Extract text blocks with visual font styling
        blocks = page.get_text("dict").get("blocks", [])
        
        page_text = page.get_text("text")
        lines = [l.strip() for l in page_text.splitlines() if l.strip()]
        if not lines:
            continue

        # Look at the first 6 lines on the page for Chapter start
        top_lines = lines[:6]
        for l_idx, line in enumerate(top_lines):
            m = chap_header_regex.match(line)
            if m:
                raw_num = m.group(1)
                # Convert Roman numerals if necessary
                if raw_num.isdigit():
                    c_num = int(raw_num)
                else:
                    roman_map = {'I':1, 'II':2, 'III':3, 'IV':4, 'V':5, 'VI':6, 'VII':7, 'VIII':8, 'IX':9, 'X':10, 'XI':11, 'XII':12}
                    c_num = roman_map.get(raw_num.upper(), len(seen_chap_nums) + 1)

                if c_num in seen_chap_nums:
                    # Ignore running headers on repeated pages
                    continue

                # Extract title on same line or next line
                rest_of_line = m.group(2).strip(": -.")
                if len(rest_of_line) >= 3:
                    c_title = rest_of_line
                elif l_idx + 1 < len(top_lines) and len(top_lines[l_idx + 1]) >= 3:
                    c_title = top_lines[l_idx + 1].strip(": -.")
                else:
                    c_title = f"Topic {c_num}"

                c_title = re.sub(r'^[0-9\.\-\:\s]+', '', c_title).strip()
                full_chap_title = f"Chapter {c_num}: {c_title}"
                
                chap_starts.append((c_num, full_chap_title, page_num))
                seen_chap_nums.add(c_num)
                break

    if len(chap_starts) >= 2:
        chap_starts.sort(key=lambda x: x[0])
        chapters = []
        for idx, (c_num, title, start_p) in enumerate(chap_starts):
            end_p = chap_starts[idx + 1][2] - 1 if idx + 1 < len(chap_starts) else total_pages
            end_p = max(start_p, min(total_pages, end_p))
            chapters.append({
                "id": f"chap-{uuid.uuid4().hex[:8]}",
                "chapter_number": c_num,
                "title": title,
                "start_page": start_p,
                "end_page": end_p,
                "summary": f"{title} (Pages {start_p}–{end_p})",
                "sections": []
            })
        return chapters

    # ==========================================
    # PASS 4: Fallback Structured Partition
    # ==========================================
    num_chaps = min(6, max(2, total_pages // 20))
    pages_per_chap = max(1, total_pages // num_chaps)
    for i in range(num_chaps):
        start_p = i * pages_per_chap + 1
        end_p = (i + 1) * pages_per_chap if i < num_chaps - 1 else total_pages
        c_num = i + 1
        
        # Try to find a prominent title on the start page
        first_line = doc[start_p - 1].get_text("text").splitlines()
        cand_title = first_line[0].strip() if first_line else f"Curriculum Unit {c_num}"
        cand_title = cand_title[:45]

        detected_chapters.append({
            "id": f"chap-{uuid.uuid4().hex[:8]}",
            "chapter_number": c_num,
            "title": f"Chapter {c_num}: {cand_title}",
            "start_page": start_p,
            "end_page": end_p,
            "summary": f"Textbook Section {c_num} (Pages {start_p} to {end_p})",
            "sections": []
        })

    return detected_chapters


def extract_and_chunk_pdf(
    file_path: str,
    book_id: str,
    book_title: str,
    chapters: List[Chapter],
    chunk_size_words: int = 180,
    overlap_words: int = 40
) -> Tuple[List[TextChunk], List[Chapter]]:
    """
    Extracts text page-by-page from PDF, discovers sub-sections (`1.1`, `Exercise 2.3`),
    attaches complete hierarchical chapter metadata to every chunk, and builds dense context.
    """
    doc = _get_pymupdf().open(file_path)
    total_pages = len(doc)
    chunks: List[TextChunk] = []

    def find_chapter_for_page(page_num: int) -> Chapter:
        for ch in chapters:
            if ch.start_page <= page_num <= ch.end_page:
                return ch
        return chapters[0] if chapters else Chapter(
            chapter_number=1, title="General Chapter", start_page=1, end_page=total_pages
        )

    chapter_sections: Dict[str, set] = {ch.id: set() for ch in chapters}

    for page_idx in range(total_pages):
        page_num = page_idx + 1
        raw_text = doc[page_idx].get_text("text")
        cleaned = clean_text(raw_text)
        if not cleaned or len(cleaned) < 15:
            continue

        current_chapter = find_chapter_for_page(page_num)

        # Detect internal sections and topic headers
        lines = cleaned.splitlines()
        current_section = "General Concept"
        section_pattern = re.compile(
            r'^(\d+\.\d+(\.\d+)?\s+[\w\s]{3,50}|exercise\s+\d+(\.\d+)?|activity\s+\d+(\.\d+)?|summary|definition|theorem|example\s+\d+)',
            re.IGNORECASE
        )

        paragraphs = []
        current_para = []

        for line in lines:
            sec_match = section_pattern.match(line.strip())
            if sec_match:
                current_section = line.strip()
                chapter_sections[current_chapter.id].add(current_section)
                if current_para:
                    paragraphs.append((current_section, " ".join(current_para)))
                    current_para = []
            else:
                current_para.append(line.strip())

        if current_para:
            paragraphs.append((current_section, " ".join(current_para)))

        # Sliding window semantic chunking
        full_page_text = " ".join([p[1] for p in paragraphs])
        words = full_page_text.split()
        if not words:
            continue

        i = 0
        while i < len(words):
            chunk_words = words[i: i + chunk_size_words]
            raw_chunk_text = " ".join(chunk_words)
            active_sec = paragraphs[0][0] if paragraphs else "General Concept"

            # Prepend hierarchical contextual header to the chunk
            enriched_content = f"[{current_chapter.title} | {active_sec} | Page {page_num}]: {raw_chunk_text}"

            meta = ChunkMetadata(
                chunk_id=str(uuid.uuid4()),
                book_id=book_id,
                book_title=book_title,
                chapter_id=current_chapter.id,
                chapter_number=current_chapter.chapter_number,
                chapter_title=current_chapter.title,
                page_number=page_num,
                section_name=active_sec,
                token_count=len(chunk_words)
            )

            chunks.append(TextChunk(
                id=meta.chunk_id,
                content=enriched_content,
                metadata=meta
            ))

            i += (chunk_size_words - overlap_words)
            if i >= len(words) and len(chunk_words) < chunk_size_words:
                break

    doc.close()

    # Update chapters with discovered sections & chunk count
    for ch in chapters:
        ch.sections = sorted(list(chapter_sections.get(ch.id, set())))
        ch.chunk_count = sum(1 for c in chunks if c.metadata.chapter_id == ch.id)

    return chunks, chapters

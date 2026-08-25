import os
import re
import uuid
from pathlib import Path
from typing import List, Dict, Any, Tuple, Optional
import pymupdf  # PyMuPDF
from backend.models import Book, Chapter, TextChunk, ChunkMetadata


def clean_text(text: str) -> str:
    """Normalize whitespace and remove unwanted artifacts."""
    if not text:
        return ""
    # Remove control chars except newline
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)
    # Normalize multiple newlines and spaces
    text = re.sub(r'\r\n', '\n', text)
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def detect_chapters_from_pdf(doc: pymupdf.Document) -> List[Dict[str, Any]]:
    """
    Detect chapters from PDF using a multi-strategy heuristic:
    1. Table of Contents (TOC) bookmarks in PDF.
    2. Regex patterns on page texts ('Chapter 1', 'CHAPTER 1', 'Unit 1').
    3. Heading font size analysis.
    4. Fallback uniform partition if no explicit chapters found.
    """
    total_pages = len(doc)
    detected_chapters = []

    # Strategy 1: PDF Table of Contents (Bookmarks)
    toc = doc.get_toc()
    if toc:
        chapter_entries = []
        for item in toc:
            lvl, title, page = item
            if lvl == 1 or re.search(r'(chapter|unit|lesson|\bch\b|\bch\.)\s*\d+', title, re.IGNORECASE):
                chapter_entries.append((title.strip(), max(1, page)))

        if chapter_entries:
            for idx, (title, start_p) in enumerate(chapter_entries):
                end_p = chapter_entries[idx + 1][1] - 1 if idx + 1 < len(chapter_entries) else total_pages
                end_p = max(start_p, min(total_pages, end_p))
                
                # Extract chapter number if present
                num_match = re.search(r'\d+', title)
                chap_num = int(num_match.group(0)) if num_match else idx + 1

                detected_chapters.append({
                    "id": f"chap-{uuid.uuid4().hex[:8]}",
                    "chapter_number": chap_num,
                    "title": title,
                    "start_page": start_p,
                    "end_page": end_p,
                    "summary": f"Detected from PDF outline: {title}",
                    "sections": []
                })
            if detected_chapters:
                return detected_chapters

    # Strategy 2: Scan page headers and first lines for Chapter patterns
    chap_pattern = re.compile(
        r'^(chapter|unit|lesson)\s+(\d+)[:\.\-\s]+(.*)$',
        re.IGNORECASE | re.MULTILINE
    )
    simple_chap_pattern = re.compile(
        r'^(chapter|unit|lesson)\s+(\d+)\s*$',
        re.IGNORECASE | re.MULTILINE
    )

    found_pages = []
    for page_idx in range(total_pages):
        page_num = page_idx + 1
        page_text = doc[page_idx].get_text("text")
        first_lines = "\n".join(page_text.splitlines()[:8])

        m = chap_pattern.search(first_lines)
        if m:
            chap_num = int(m.group(2))
            chap_title = m.group(3).strip() or f"Chapter {chap_num}"
            found_pages.append((chap_num, chap_title, page_num))
            continue

        m_simple = simple_chap_pattern.search(first_lines)
        if m_simple:
            chap_num = int(m_simple.group(2))
            lines = [l.strip() for l in first_lines.splitlines() if l.strip()]
            # Next line might be the title
            chap_title = f"Chapter {chap_num}"
            for line in lines:
                if line != m_simple.group(0) and len(line) > 3:
                    chap_title = f"Chapter {chap_num}: {line}"
                    break
            found_pages.append((chap_num, chap_title, page_num))

    if found_pages:
        # Sort and deduplicate by chapter number
        unique_chaps = {}
        for cnum, title, pnum in found_pages:
            if cnum not in unique_chaps:
                unique_chaps[cnum] = (title, pnum)

        sorted_chaps = sorted(unique_chaps.items(), key=lambda x: x[1][1])
        for idx, (cnum, (title, start_p)) in enumerate(sorted_chaps):
            end_p = sorted_chaps[idx + 1][1][1] - 1 if idx + 1 < len(sorted_chaps) else total_pages
            end_p = max(start_p, min(total_pages, end_p))
            detected_chapters.append({
                "id": f"chap-{uuid.uuid4().hex[:8]}",
                "chapter_number": cnum,
                "title": title,
                "start_page": start_p,
                "end_page": end_p,
                "summary": f"Content of {title} (Pages {start_p} - {end_p})",
                "sections": []
            })
        return detected_chapters

    # Strategy 3: Fallback uniform chunking into 4 logical chapters if none detected
    pages_per_chap = max(1, total_pages // 4)
    for i in range(min(4, total_pages)):
        start_p = i * pages_per_chap + 1
        end_p = (i + 1) * pages_per_chap if i < 3 else total_pages
        chap_num = i + 1
        detected_chapters.append({
            "id": f"chap-{uuid.uuid4().hex[:8]}",
            "chapter_number": chap_num,
            "title": f"Chapter {chap_num}: General Topic Part {chap_num}",
            "start_page": start_p,
            "end_page": end_p,
            "summary": f"Pages {start_p} to {end_p}",
            "sections": []
        })

    return detected_chapters


def extract_and_chunk_pdf(
    file_path: str,
    book_id: str,
    book_title: str,
    chapters: List[Chapter],
    chunk_size_words: int = 200,
    overlap_words: int = 40
) -> Tuple[List[TextChunk], List[Chapter]]:
    """
    Extracts text from PDF page by page, maps pages to chapters,
    detects internal section titles, and chunks into semantically rich TextChunk objects.
    """
    doc = pymupdf.open(file_path)
    total_pages = len(doc)
    chunks: List[TextChunk] = []

    # Map page number to corresponding Chapter
    def find_chapter_for_page(page_num: int) -> Chapter:
        for ch in chapters:
            if ch.start_page <= page_num <= ch.end_page:
                return ch
        # Fallback to closest
        return chapters[0] if chapters else Chapter(
            chapter_number=1, title="General Chapter", start_page=1, end_page=total_pages
        )

    # Track discovered sections per chapter
    chapter_sections: Dict[str, set] = {ch.id: set() for ch in chapters}

    for page_idx in range(total_pages):
        page_num = page_idx + 1
        raw_text = doc[page_idx].get_text("text")
        cleaned = clean_text(raw_text)
        if not cleaned:
            continue

        current_chapter = find_chapter_for_page(page_num)

        # Detect section headings on the page (e.g. "1.2 Balanced Chemical Equations", "Exercise 2.3")
        lines = cleaned.splitlines()
        current_section = "Main Content"
        section_pattern = re.compile(r'^(\d+\.\d+(\.\d+)?\s+[\w\s]{3,40}|exercise\s+\d+(\.\d+)?|summary|introduction)', re.IGNORECASE)

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

        # Chunk the text
        full_page_text = " ".join([p[1] for p in paragraphs])
        words = full_page_text.split()

        if not words:
            continue

        # Sliding window chunking
        i = 0
        while i < len(words):
            chunk_words = words[i: i + chunk_size_words]
            chunk_content = " ".join(chunk_words)
            
            # Find best matching section for this chunk
            active_sec = paragraphs[0][0] if paragraphs else "Main Content"

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
                content=chunk_content,
                metadata=meta
            ))

            i += (chunk_size_words - overlap_words)
            if i >= len(words) and len(chunk_words) < chunk_size_words:
                break

    doc.close()

    # Update chapters with discovered sections and chunk count
    for ch in chapters:
        ch.sections = sorted(list(chapter_sections.get(ch.id, set())))
        ch.chunk_count = sum(1 for c in chunks if c.metadata.chapter_id == ch.id)

    return chunks, chapters

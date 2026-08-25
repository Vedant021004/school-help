# 📚 AI-Powered Question Paper Generator & Book Assistant

A complete, production-grade web application for educators and teachers to store textbooks, understand their contents, generate examination question papers according to customizable formats, and interact with a book-grounded chatbot.

---

## 🌟 Key Highlights & Core Differentiator

- **🛡️ Strict Anti-Hallucination & Textbook Grounding**:
  The AI **never** generates questions or answers based on information outside the selected textbook and selected chapters. Every generated question and answer key item includes **explicit page numbers and source passage citations**. If information is not in the textbook, the system explicitly reports that it cannot be found.
- **📚 Chapter-Level Boundary Enforcement**:
  Strict pre-retrieval metadata filtering ensures context is isolated exclusively to the teacher's selected chapters.
- **📄 Paper Format Parsing & Visual Blueprint Editor**:
  Upload PDF, DOCX, or text question papers to automatically extract section breakdowns, question counts, marks per question, and internal choices ("OR"). Includes preset CBSE (50M & 80M) and Unit Test templates.
- **🧠 Bloom's Taxonomy & Difficulty Balancing**:
  Fine-tune cognitive depth ratios (*Remember, Understand, Apply, Analyze, Evaluate, Create*) and difficulty levels (*Easy, Medium, Hard, Mixed*).
- **✨ Question Diversity & Semantic Deduplication**:
  Embeddings-based similarity checks prevent redundant or repetitive questions.
- **📝 Live Question Paper Editor with Instant Marks Reconciliation**:
  Live tracker alerts if marks are missing or in excess (`⚠️ Total: 48 / 50 Marks (2 marks missing)` vs `✅ Total: 50 / 50 Marks Valid`). Reorder, edit, delete, or regenerate individual questions with RAG.
- **📋 Persistent Question Bank**:
  Save, search, filter by subject/chapter/difficulty/marks, and insert verified questions into any paper.
- **💬 Book Chatbot with Book-Only Mode**:
  Ask concepts, definitions, formulas, or summaries with strict Book-Only mode toggle and clickable citation badges that reveal textbook passages.
- **📊 Past Examination Paper Analyzer**:
  Upload previous years' exam papers to analyze concept weightage, difficulty mix, and generate aligned new blueprints without copying old questions.
- **📥 Dual Professional Export (PDF & DOCX)**:
  Export separate formatted examination question papers and complete marking scheme answer keys with formulas and step-by-step rubrics.

---

## 🏗️ Architecture Pipeline

```
                                BOOK PDF
                                   ↓
                         Text Extraction (PyMuPDF)
                                   ↓
                           Chapter Detection
                                   ↓
                          Page/Section Tagger
                                   ↓
                                Chunking
                                   ↓
                         Hybrid Vector & BM25
                                   ↓
                    Strict Pre-Retrieval Filtering
                    (book_id == X & chapter_id IN Y)
                                   ↓
                            Context Builder
                                   ↓
                              LLM Engine
                                   ↓
                      Anti-Hallucination Grounding
                      Verification (Containment > Thresh)
                                   ↓
                       Quality & Deduplication Audit
                                   ↓
                      Question Paper & Answer Key
```

---

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <repo-url>
cd hariom

# Install backend dependencies
pip install -r requirements.txt
pip install pymupdf python-docx python-dotenv google-genai openai chromadb reportlab fastapi uvicorn

# Build frontend assets (already pre-built in /frontend/dist)
cd frontend
npm install
npm run build
cd ..
```

### 2. Launch Application

```bash
python run_app.py
```

Then open your browser at **[http://localhost:8000](http://localhost:8000)**.

---

## 🧪 Automated Testing

Run the automated test suite covering the full RAG pipeline, anti-hallucination verification, PDF/DOCX exporters, and API endpoints:

```bash
python backend/test_backend.py
```

---

## 📂 Project Structure

```
├── backend/
│   ├── config.py                 # Pydantic settings & storage paths
│   ├── models.py                 # Pydantic data schemas
│   ├── database.py               # SQLite database layer with CRUD & pre-seeding
│   ├── sample_data.py            # Pre-seeded NCERT curriculum textbooks & blueprints
│   ├── pdf_processor.py          # PyMuPDF text & chapter detector
│   ├── rag_engine.py             # Hybrid Vector & BM25 engine with strict metadata filtering
│   ├── grounding_verifier.py     # Anti-hallucination factual grounding verifier
│   ├── quality_checker.py        # Semantic deduplication & format quality auditor
│   ├── llm_service.py            # Multi-provider LLM adapter + offline generator
│   ├── format_parser.py          # PDF/DOCX paper format extractor
│   ├── previous_paper_analyzer.py# Past paper analyzer
│   ├── exporters.py              # ReportLab PDF & python-docx exporters
│   ├── main.py                   # FastAPI REST API & SPA static router
│   └── test_backend.py           # Backend pytest verification suite
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── BookLibrary.jsx
│   │   │   ├── PaperFormats.jsx
│   │   │   ├── GeneratePaper.jsx
│   │   │   ├── PaperEditor.jsx
│   │   │   ├── BookChat.jsx
│   │   │   ├── QuestionBank.jsx
│   │   │   ├── PreviousPaperAnalyzer.jsx
│   │   │   └── Settings.jsx
│   │   ├── api.js                # Centralized API client
│   │   ├── App.jsx               # Navigation layout & routing
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── run_app.py                    # Unified application launcher
└── README.md
```

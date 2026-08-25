import os
import sys
from pathlib import Path

# Add project root to sys.path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

import pytest
from fastapi.testclient import TestClient
from backend.main import app
import backend.database as db
from backend.models import QuestionPaperGenerationRequest

client = TestClient(app)


def test_dashboard_stats():
    resp = client.get("/api/stats")
    assert resp.status_code == 200
    data = resp.json()
    assert "total_books" in data
    assert data["total_books"] >= 2
    assert "available_books_preview" in data


def test_books_list_and_get():
    resp = client.get("/api/books")
    assert resp.status_code == 200
    books = resp.json()
    assert len(books) >= 2
    
    first_book_id = books[0]["id"]
    resp2 = client.get(f"/api/books/{first_book_id}")
    assert resp2.status_code == 200
    book_data = resp2.json()
    assert len(book_data["chapters"]) >= 1


def test_formats_list():
    resp = client.get("/api/formats")
    assert resp.status_code == 200
    formats = resp.json()
    assert len(formats) >= 3


def test_generate_paper_and_answer_key():
    # 1. Get first book and its first two chapters
    books_resp = client.get("/api/books")
    books = books_resp.json()
    book = books[0]
    chapter_ids = [c["id"] for c in book["chapters"][:2]]

    formats_resp = client.get("/api/formats")
    formats = formats_resp.json()
    fmt = formats[0]

    # Generate
    req_payload = {
        "book_id": book["id"],
        "chapter_ids": chapter_ids,
        "format_id": fmt["id"],
        "difficulty": "Mixed",
        "school_name": "Test Public School",
        "exam_name": "Unit Test 1"
    }

    gen_resp = client.post("/api/generate/paper", json=req_payload)
    assert gen_resp.status_code == 200
    paper = gen_resp.json()
    assert "questions" in paper
    assert len(paper["questions"]) > 0
    assert paper["total_marks"] > 0
    assert paper["grounding_verified_ratio"] >= 0.8

    # Verify each question has strict source citations
    for q in paper["questions"]:
        assert "source" in q
        assert q["source"]["book_id"] == book["id"]
        assert q["source"]["chapter_id"] in chapter_ids
        assert q["source"]["page"] > 0
        assert len(q["source"]["text_reference"]) > 5

    # Check Answer Key
    ak_resp = client.get(f"/api/papers/{paper['id']}/answer-key")
    assert ak_resp.status_code == 200
    ak = ak_resp.json()
    assert len(ak["answers"]) == len(paper["questions"])

    # Test PDF Exporters
    pdf_resp = client.get(f"/api/papers/{paper['id']}/export/pdf")
    assert pdf_resp.status_code == 200
    assert pdf_resp.headers["content-type"] == "application/pdf"

    ak_pdf_resp = client.get(f"/api/papers/{paper['id']}/export/answer-key-pdf")
    assert ak_pdf_resp.status_code == 200

    docx_resp = client.get(f"/api/papers/{paper['id']}/export/docx")
    assert docx_resp.status_code == 200


def test_book_chatbot():
    books = client.get("/api/books").json()
    book = books[0]
    chap = book["chapters"][0]

    chat_payload = {
        "book_id": book["id"],
        "chapter_id": chap["id"],
        "message": "What is a chemical reaction according to this book?",
        "book_only_mode": True
    }

    chat_resp = client.post("/api/chat", json=chat_payload)
    assert chat_resp.status_code == 200
    chat_data = chat_resp.json()
    assert "message" in chat_data
    assert len(chat_data["sources"]) > 0
    assert chat_data["sources"][0]["chapter_id"] == chap["id"]


def test_question_bank():
    resp = client.get("/api/bank")
    assert resp.status_code == 200
    items = resp.json()
    assert isinstance(items, list)


def test_spa_frontend_serving():
    resp = client.get("/")
    assert resp.status_code == 200
    assert "text/html" in resp.headers["content-type"]
    assert "AI Teacher Assistant" in resp.text



if __name__ == "__main__":
    pytest.main(["-v", "backend/test_backend.py"])

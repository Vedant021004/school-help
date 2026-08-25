"""
Main launcher for AI Teacher Assistant.
Runs the FastAPI server which also serves the built React frontend at http://localhost:8000
"""

import os
import sys
from pathlib import Path

# Force UTF-8 on Windows consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Ensure project root is in sys.path
BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))

import uvicorn

if __name__ == "__main__":
    print("=" * 70)
    print("[STARTING] AI Teacher Assistant - Question Paper Generator & Book Assistant")
    print("[URL] http://localhost:8000")
    print("[API DOCS] http://localhost:8000/docs")
    print("[STATUS] Anti-Hallucination RAG Grounding Layer: ACTIVE")
    print("=" * 70)
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=False)

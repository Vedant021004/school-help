import os
from pathlib import Path
from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
UPLOADS_DIR = DATA_DIR / "uploads"
EXPORTS_DIR = DATA_DIR / "exports"
CHROMA_DIR = DATA_DIR / "chroma_db"
DB_PATH = DATA_DIR / "teacher_assistant.db"

# Ensure runtime directories exist
for d in [DATA_DIR, UPLOADS_DIR, EXPORTS_DIR, CHROMA_DIR]:
    d.mkdir(parents=True, exist_ok=True)


class Settings(BaseSettings):
    APP_NAME: str = "AI Teacher Assistant - Question Paper Generator"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # Storage paths
    BASE_DIR: Path = BASE_DIR
    DATA_DIR: Path = DATA_DIR
    UPLOADS_DIR: Path = UPLOADS_DIR
    EXPORTS_DIR: Path = EXPORTS_DIR
    CHROMA_DIR: Path = CHROMA_DIR
    DB_PATH: Path = DB_PATH
    
    # LLM Settings
    LLM_PROVIDER: str = "gemini"  # "gemini", "openai", "claude", "ollama", "mock"
    GEMINI_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "llama3:8b"
    
    # Anti-Hallucination & Quality Thresholds
    STRICT_BOOK_ONLY: bool = True
    GROUNDING_THRESHOLD: float = 0.65  # Minimum factual alignment score
    SIMILARITY_DUPLICATION_THRESHOLD: float = 0.82  # Cosine threshold to reject duplicate questions
    MAX_REGEN_ATTEMPTS: int = 3
    
    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()

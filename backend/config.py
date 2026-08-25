import os
import tempfile
from pathlib import Path
from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent

# Check if running in Vercel / serverless environment (read-only filesystem)
IS_SERVERLESS = bool(os.environ.get("VERCEL") or os.environ.get("AWS_LAMBDA_FUNCTION_NAME"))

if IS_SERVERLESS:
    DATA_DIR = Path(tempfile.gettempdir()) / "school_help_data"
else:
    DATA_DIR = BASE_DIR / "data"

UPLOADS_DIR = DATA_DIR / "uploads"
EXPORTS_DIR = DATA_DIR / "exports"
CHROMA_DIR = DATA_DIR / "chroma_db"
DB_PATH = DATA_DIR / "teacher_assistant.db"

# Ensure runtime directories exist safely
try:
    for d in [DATA_DIR, UPLOADS_DIR, EXPORTS_DIR, CHROMA_DIR]:
        d.mkdir(parents=True, exist_ok=True)
except Exception:
    # If BASE_DIR is read-only, fallback to temp directory
    DATA_DIR = Path(tempfile.gettempdir()) / "school_help_data"
    UPLOADS_DIR = DATA_DIR / "uploads"
    EXPORTS_DIR = DATA_DIR / "exports"
    CHROMA_DIR = DATA_DIR / "chroma_db"
    DB_PATH = DATA_DIR / "teacher_assistant.db"
    for d in [DATA_DIR, UPLOADS_DIR, EXPORTS_DIR, CHROMA_DIR]:
        d.mkdir(parents=True, exist_ok=True)


class Settings(BaseSettings):
    APP_NAME: str = "AI Teacher Assistant - Question Paper Generator"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    IS_SERVERLESS: bool = IS_SERVERLESS
    
    # Storage paths
    BASE_DIR: Path = BASE_DIR
    DATA_DIR: Path = DATA_DIR
    UPLOADS_DIR: Path = UPLOADS_DIR
    EXPORTS_DIR: Path = EXPORTS_DIR
    CHROMA_DIR: Path = CHROMA_DIR
    DB_PATH: Path = DB_PATH
    
    # LLM Settings & Ultra-Fast Groq / Gemini / OpenAI Engine
    LLM_PROVIDER: str = "groq"  # "groq", "gemini", "openai", "claude", "ollama", "offline"
    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "openai/gpt-oss-120b"  # "openai/gpt-oss-120b", "qwen/qwen3.6-27b", "openai/gpt-oss-20b"
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


# Global Settings Instance
settings = Settings()

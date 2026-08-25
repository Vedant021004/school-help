"""
Vercel Serverless Entry Point - Diagnostic Version
Step 1: Confirm Python works at all on Vercel
Step 2: Test each backend import individually
Step 3: Load the full app if everything works
"""
import os
import sys
import json
import traceback

# Add project root to sys.path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

# Set VERCEL env flag
os.environ.setdefault("VERCEL", "1")

# ---- Try importing the full app ----
_import_error = None
_app = None

try:
    from backend.main import app as _app
except Exception as exc:
    _import_error = traceback.format_exc()

if _app is not None:
    # Full app loaded successfully
    app = _app
else:
    # Full app failed to import — serve a diagnostic API
    from fastapi import FastAPI, Request
    from fastapi.responses import JSONResponse
    from fastapi.middleware.cors import CORSMiddleware

    app = FastAPI(title="Diagnostic Mode")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
    async def diagnostic(request: Request, path: str):
        # Try importing each backend module individually to find the culprit
        import_results = {}
        modules_to_test = [
            "backend.config",
            "backend.models",
            "backend.database",
            "backend.sample_data",
            "backend.pdf_processor",
            "backend.rag_engine",
            "backend.llm_service",
            "backend.grounding_verifier",
            "backend.quality_checker",
            "backend.format_parser",
            "backend.previous_paper_analyzer",
            "backend.exporters",
            "backend.ncert_service",
            "backend.ncert_catalog_data",
            "backend.curriculum_question_data",
        ]
        for mod_name in modules_to_test:
            try:
                __import__(mod_name)
                import_results[mod_name] = "OK"
            except Exception as e:
                import_results[mod_name] = f"FAILED: {e}"

        return JSONResponse(
            status_code=500,
            content={
                "status": "DIAGNOSTIC_MODE",
                "error": "Backend failed to initialize",
                "main_import_error": _import_error,
                "python_version": sys.version,
                "module_tests": import_results,
                "cwd": os.getcwd(),
                "root_dir": root_dir,
                "path_requested": path,
            },
        )

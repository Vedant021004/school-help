"""
Vercel Serverless Function Entry Point.
Exports the FastAPI ASGI app for Vercel's Python runtime.
"""
import os
import sys
import traceback

# Add project root to sys.path so 'backend' package is importable
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

# Set VERCEL env flag if not already set (safety net)
os.environ.setdefault("VERCEL", "1")

try:
    from backend.main import app
    handler = app
except Exception as e:
    # If the main app fails to import, create a minimal diagnostic app
    from fastapi import FastAPI
    from fastapi.responses import JSONResponse

    app = FastAPI()
    import_error = traceback.format_exc()

    @app.get("/api/{path:path}")
    @app.post("/api/{path:path}")
    async def error_handler(path: str):
        return JSONResponse(
            status_code=500,
            content={
                "error": "Backend failed to initialize",
                "detail": str(e),
                "traceback": import_error,
                "python_version": sys.version,
                "sys_path": sys.path[:5],
            }
        )

    @app.get("/{path:path}")
    async def fallback(path: str):
        return JSONResponse(
            status_code=500,
            content={"error": "Backend failed to initialize", "detail": str(e)}
        )

    handler = app

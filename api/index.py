import os
import sys

# Ensure root directory is in sys.path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

os.environ.setdefault("VERCEL", "1")

from backend.main import app as _fastapi_app

async def app(scope, receive, send):
    """
    ASGI entry point for Vercel Serverless Functions.
    Restores the real request path from Vercel's x-forwarded-uri / x-vercel-matched-path headers.
    """
    if scope["type"] == "http":
        headers = dict(scope.get("headers", []))

        real_path = None
        for header_name in [b"x-forwarded-uri", b"x-vercel-matched-path", b"x-matched-path"]:
            val = headers.get(header_name, b"").decode("utf-8", errors="ignore")
            if val and not val.endswith("index.py") and not val.endswith(".py"):
                real_path = val.split("?")[0]
                break

        if real_path:
            scope["path"] = real_path
        elif scope.get("path", "") in ("/api/index.py", "/api/index", "/api"):
            scope["path"] = "/"

        if "raw_path" in scope:
            scope["raw_path"] = scope["path"].encode("utf-8")

    await _fastapi_app(scope, receive, send)

handler = app

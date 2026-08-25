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
    Restores the real request path from Vercel's x-matched-path / x-forwarded-uri headers.
    """
    if scope["type"] == "http":
        headers = dict(scope.get("headers", []))
        matched_path = headers.get(b"x-matched-path", b"").decode("utf-8", errors="ignore")
        forwarded_uri = headers.get(b"x-forwarded-uri", b"").decode("utf-8", errors="ignore")

        if matched_path and not matched_path.endswith("index.py") and not matched_path.endswith(".py"):
            scope["path"] = matched_path
        elif forwarded_uri:
            scope["path"] = forwarded_uri.split("?")[0]
        elif scope.get("path", "").endswith("index.py"):
            scope["path"] = "/"

        if "raw_path" in scope:
            scope["raw_path"] = scope["path"].encode("utf-8")

    await _fastapi_app(scope, receive, send)

handler = app

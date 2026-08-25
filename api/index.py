import os
import sys

# Ensure root directory is in sys.path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

os.environ.setdefault("VERCEL", "1")

from backend.main import app as _fastapi_app

async def app(scope, receive, send):
    if scope["type"] == "http":
        headers = dict(scope.get("headers", []))

        # Restore original requested path from Vercel proxy headers
        for h in (b"x-forwarded-uri", b"x-matched-path", b"x-vercel-matched-path"):
            val = headers.get(h, b"").decode("latin1", errors="ignore")
            if val and not val.endswith("index.py") and not val.endswith(".py"):
                scope["path"] = val.split("?")[0]
                break

        if "raw_path" in scope:
            scope["raw_path"] = scope["path"].encode("latin1")

    await _fastapi_app(scope, receive, send)

handler = app

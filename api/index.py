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

        found_path = None
        for h in (b"x-forwarded-uri", b"x-matched-path", b"x-vercel-matched-path"):
            raw_val = headers.get(h, b"").decode("latin1", errors="ignore").strip()
            if raw_val:
                p = raw_val.split("?")[0]
                if not p.endswith("index.py") and not p.endswith(".py"):
                    found_path = p
                    if "?" in raw_val:
                        scope["query_string"] = raw_val.split("?", 1)[1].encode("latin1")
                    break

        if found_path:
            scope["path"] = found_path
        else:
            curr_path = scope.get("path", "")
            if curr_path.startswith("/api/index.py"):
                scope["path"] = curr_path[len("/api/index.py"):] or "/"
            elif curr_path.startswith("/api/index"):
                scope["path"] = curr_path[len("/api/index"):] or "/"
            elif curr_path in ("/api", "/api/"):
                scope["path"] = "/"

        if "raw_path" in scope:
            scope["raw_path"] = scope["path"].encode("latin1")

    await _fastapi_app(scope, receive, send)

handler = app

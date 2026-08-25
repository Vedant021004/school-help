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
        p = scope.get("path", "")
        if p.startswith("/api/index.py/"):
            scope["path"] = p[len("/api/index.py"):]
        elif p.startswith("/api/index/"):
            scope["path"] = p[len("/api/index"):]
        elif p in ("/api/index.py", "/api/index.py/", "/api/index", "/api/index/"):
            scope["path"] = "/"

        if "raw_path" in scope:
            scope["raw_path"] = scope["path"].encode("latin1")

    await _fastapi_app(scope, receive, send)

handler = app

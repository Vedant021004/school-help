import os
import sys
import urllib.parse

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

os.environ.setdefault("VERCEL", "1")

from backend.main import app as _fastapi_app

async def app(scope, receive, send):
    if scope["type"] == "http":
        qs = scope.get("query_string", b"").decode("latin1", errors="ignore")
        params = urllib.parse.parse_qs(qs, keep_blank_values=True)

        if "__path__" in params:
            real_subpath = params.pop("__path__")[0]
            if not real_subpath.startswith("/"):
                real_subpath = "/" + real_subpath
            scope["path"] = real_subpath
            scope["query_string"] = urllib.parse.urlencode(params, doseq=True).encode("latin1")
        else:
            headers = dict(scope.get("headers", []))
            for h in (b"x-forwarded-uri", b"x-matched-path", b"x-vercel-matched-path"):
                val = headers.get(h, b"").decode("latin1", errors="ignore")
                if val and not val.endswith("index.py") and not val.endswith(".py"):
                    scope["path"] = val.split("?")[0]
                    break

        if "raw_path" in scope:
            scope["raw_path"] = scope["path"].encode("latin1")

    await _fastapi_app(scope, receive, send)

handler = app

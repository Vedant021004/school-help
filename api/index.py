import os
import sys
import json

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

os.environ.setdefault("VERCEL", "1")

from backend.main import app as _fastapi_app

async def app(scope, receive, send):
    if scope["type"] == "http":
        headers = dict(scope.get("headers", []))
        raw_headers = {k.decode("latin1"): v.decode("latin1") for k, v in headers.items()}

        if "debug-scope" in str(scope.get("path", "")) or "debug-scope" in str(raw_headers):
            body = json.dumps({
                "path": scope.get("path"),
                "raw_path": scope.get("raw_path", b"").decode("latin1", errors="ignore"),
                "root_path": scope.get("root_path"),
                "query_string": scope.get("query_string", b"").decode("latin1", errors="ignore"),
                "headers": raw_headers
            }, indent=2).encode("utf-8")

            await send({
                "type": "http.response.start",
                "status": 200,
                "headers": [(b"content-type", b"application/json"), (b"content-length", str(len(body)).encode("latin1"))],
            })
            await send({"type": "http.response.body", "body": body})
            return

    await _fastapi_app(scope, receive, send)

handler = app

from urllib.parse import parse_qsl, urlencode

from apps.api.main import app as fastapi_app


class VercelPathMiddleware:
    def __init__(self, asgi_app):
        self.asgi_app = asgi_app

    async def __call__(self, scope, receive, send):
        if scope["type"] == "http":
            original_path = None
            query = scope.get("query_string", b"").decode("latin-1")
            kept_query = []
            for key, value in parse_qsl(query, keep_blank_values=True):
                if key == "realpath" and original_path is None:
                    original_path = value
                else:
                    kept_query.append((key, value))

            if original_path and original_path.startswith("/"):
                scope = dict(scope)
                scope["path"] = original_path
                scope["raw_path"] = original_path.encode("utf-8")
                scope["root_path"] = ""
                scope["query_string"] = urlencode(kept_query).encode("latin-1")

        await self.asgi_app(scope, receive, send)


app = VercelPathMiddleware(fastapi_app)

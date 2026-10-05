import unittest

from fastapi import FastAPI
from fastapi.testclient import TestClient

from api.index import VercelPathMiddleware


class VercelRoutingTests(unittest.TestCase):
    def test_rewritten_health_path_reaches_fastapi(self):
        app = FastAPI()

        @app.get("/api/health")
        def health():
            return {"ok": True}

        client = TestClient(VercelPathMiddleware(app))
        response = client.get("/api/index.py?realpath=%2Fapi%2Fhealth")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"ok": True})

    def test_rewrite_parameter_is_removed_without_dropping_query(self):
        app = FastAPI()

        @app.get("/api/jobs")
        def jobs(role: str):
            return {"role": role}

        client = TestClient(VercelPathMiddleware(app))
        response = client.get("/api/index.py?realpath=%2Fapi%2Fjobs&role=developer")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"role": "developer"})


if __name__ == "__main__":
    unittest.main()

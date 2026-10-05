import os
import unittest
from unittest.mock import patch

import apps.api.main as api


class VercelStoreTests(unittest.TestCase):
    def test_vercel_rejects_the_development_jwt_secret(self):
        with (
            patch.dict(os.environ, {"VERCEL": "1"}),
            patch.object(api, "JWT_SECRET", "career-copilot-local-dev-secret"),
        ):
            with self.assertRaisesRegex(RuntimeError, "JWT_SECRET"):
                api.Store()

    def test_vercel_requires_persistent_mongodb(self):
        with (
            patch.dict(os.environ, {"VERCEL": "1"}),
            patch.object(api, "MONGO_URI", ""),
            patch.object(api, "MongoClient", None),
            patch.object(api, "JWT_SECRET", "vercel-test-secret"),
        ):
            with self.assertRaisesRegex(RuntimeError, "MONGO_URI"):
                api.Store()


if __name__ == "__main__":
    unittest.main()

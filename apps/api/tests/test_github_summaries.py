import unittest

from apps.api.main import REPOSITORY_DEVELOPMENT_SUMMARY, professional_repository_summary, readme_summary


class GitHubSummaryTests(unittest.TestCase):
    def test_readme_summary_has_priority(self):
        readme = "# Resume Analyzer\n\nA resume intelligence platform that evaluates ATS compatibility, identifies skill gaps, and recommends focused career improvements for candidates.\n\n## Installation\nRun pip install."
        summary = readme_summary(readme)
        self.assertIn("resume intelligence platform", summary.lower())
        self.assertNotIn("installation", summary.lower())

    def test_repository_signals_create_professional_summary(self):
        repo = {"name": "career-copilot", "language": "Python", "topics": ["fastapi", "career"]}
        summary = professional_repository_summary(repo, "", {"manifests": ["requirements.txt"], "files": [], "source_files": []})
        self.assertIn("Career Copilot", summary)
        self.assertIn("Python", summary)

    def test_empty_repository_uses_product_safe_message(self):
        summary = professional_repository_summary({"name": "new-project"}, "", {"manifests": [], "files": [], "source_files": []})
        self.assertEqual(summary, REPOSITORY_DEVELOPMENT_SUMMARY)


if __name__ == "__main__":
    unittest.main()

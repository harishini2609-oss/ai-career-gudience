import unittest
from unittest.mock import patch

import apps.api.main as api


class InterviewEngineTests(unittest.TestCase):
    def test_nine_unique_progressive_role_specific_rounds(self):
        user = {"mock_interviews": []}
        session = {
            "session_id": "test",
            "role": "AI/ML Engineer",
            "language": "Python",
            "experience_level": "Fresher",
            "company": "Google",
            "questions": [],
            "answers": [],
        }
        with patch.object(api, "GROQ_API_KEY", ""), patch.object(api, "GROQ_AUTH_FAILED", False):
            for number, (_, difficulty) in enumerate(api.INTERVIEW_ROUNDS, 1):
                for question_number in range(1, api.QUESTIONS_PER_ROUND + 1):
                    question = api.generate_interview_question(user, session, number, question_number)
                    self.assertEqual(question["difficulty"], difficulty)
                    self.assertFalse(api.duplicate_question(question, session["questions"]))
                    session["questions"].append(question)

        self.assertEqual(len({question["text"] for question in session["questions"]}), 90)
        self.assertTrue(all(question["type"] == "coding" for question in session["questions"][20:30]))
        combined = " ".join(question["text"].lower() for question in session["questions"])
        self.assertNotIn("html", combined)
        self.assertNotIn("css", combined)

    def test_scoreboard_status_invariant(self):
        session = {"answers": [{"status": "CORRECT", "score": 90}, {"status": "WRONG", "score": 30}, {"status": "SKIPPED", "score": 0}, {"status": "TIMEOUT", "score": 0}]}
        scoreboard = api.interview_scoreboard(session)
        self.assertEqual(scoreboard["answered"], 4)
        self.assertEqual(scoreboard["correct"] + scoreboard["wrong"] + scoreboard["skipped"] + scoreboard["timeout"], scoreboard["answered"])

    def test_exact_and_same_concept_duplicates_are_rejected(self):
        old = {"text": "Explain React rendering behavior", "focus_area": "React", "embedding": api.question_embedding("Explain React rendering behavior")}
        exact = dict(old)
        similar = {"text": "Explain how React rendering behaves", "focus_area": "React", "embedding": api.question_embedding("Explain how React rendering behaves")}
        self.assertTrue(api.duplicate_question(exact, [old]))
        self.assertTrue(api.duplicate_question(similar, [old]))


if __name__ == "__main__":
    unittest.main()

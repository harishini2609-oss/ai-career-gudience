import unittest

from apps.api.resume_parser import detect_candidate_name, extract_profile


class ResumeNameParserTests(unittest.TestCase):
    def test_name_at_top_from_largest_text(self):
        result = detect_candidate_name("HARSHINI K S\nharshiniks@gmail.com\nSkills", [{"text": "Software Engineer", "font_size": 28, "top": 20}, {"text": "HARSHINI K S", "font_size": 24, "top": 30}])
        self.assertEqual(result["name"], "Harshini K S")
        self.assertGreaterEqual(result["confidence"], 0.75)

    def test_name_below_contact_details(self):
        result = detect_candidate_name("harshini@example.com\n+91 98765 43210\nHarshini K S\nExperience")
        self.assertEqual(result["name"], "Harshini K S")

    def test_two_page_resume_uses_first_header(self):
        text = "Aarav Mehta\naarav@example.com\nExperience\nDeveloper\n\fReferences\nPriya Shah"
        self.assertEqual(detect_candidate_name(text)["name"], "Aarav Mehta")

    def test_image_resume_ocr_text(self):
        # OCR output enters the same deterministic parser.
        self.assertEqual(detect_candidate_name("MEERA NAIR\nmeera@example.com\nEDUCATION")["name"], "Meera Nair")

    def test_resume_with_initials(self):
        self.assertEqual(detect_candidate_name("R K Narayan\nWriter and Developer")["name"], "R K Narayan")

    def test_without_labels_uses_header(self):
        self.assertEqual(detect_candidate_name("Sanjana Rao\nsanjana.rao@example.com\nSummary")["name"], "Sanjana Rao")

    def test_email_fallback(self):
        profile = extract_profile("Email: harshiniks@gmail.com\nSkills: Python")
        self.assertEqual(profile["name"], "Harshini K S")
        self.assertEqual(profile["confidence"], 0.63)


if __name__ == "__main__":
    unittest.main()

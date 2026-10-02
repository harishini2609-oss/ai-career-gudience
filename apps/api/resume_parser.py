from __future__ import annotations

import re
from functools import lru_cache
from typing import Any


EMAIL_RE = re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.I)
PHONE_RE = re.compile(r"(?<!\w)\+?\d[\d ().-]{8,}\d(?!\w)")
LABEL_RE = re.compile(r"(?im)^\s*(?:name|candidate|applicant|resume\s+of)\s*[:\-]\s*([^\n|]{2,80})")
BLOCKED = {
    "resume", "curriculum vitae", "profile", "summary", "contact", "contact details",
    "software engineer", "frontend developer", "backend developer", "data scientist",
    "objective", "education", "experience", "skills", "projects", "certifications",
}
TITLE_WORDS = {"developer", "engineer", "analyst", "designer", "student", "intern", "manager", "architect", "scientist", "consultant", "specialist"}


def _clean_name(value: str) -> str:
    value = re.sub(r"\s+", " ", value).strip(" |,;:-\t")
    return " ".join(part.upper() if len(part) == 1 else part.capitalize() for part in value.split())


def _reasonable_name(value: str) -> bool:
    value = _clean_name(value)
    if value.lower() in BLOCKED or "@" in value or any(char.isdigit() for char in value):
        return False
    words = value.split()
    if not 2 <= len(words) <= 5 or not 3 <= len(value) <= 60:
        return False
    if any(word.lower().strip(".-'") in TITLE_WORDS for word in words):
        return False
    return all(re.fullmatch(r"[A-Za-z][A-Za-z'.-]*|[A-Za-z]", word) for word in words)


def _line_candidates(text: str, limit: int = 14) -> list[str]:
    lines = [re.sub(r"\s+", " ", line).strip(" |,;:-") for line in text.splitlines()]
    return [line for line in lines[:limit] if _reasonable_name(line)]


@lru_cache(maxsize=1)
def _spacy_model() -> Any | None:
    try:
        import spacy
        return spacy.load("en_core_web_sm")
    except Exception:
        return None


def _ner_name(text: str) -> str:
    nlp = _spacy_model()
    if nlp is None:
        return ""
    for entity in nlp(text[:5000]).ents:
        if entity.label_ == "PERSON" and _reasonable_name(entity.text):
            return _clean_name(entity.text)
    return ""


def _name_from_email(email: str) -> str:
    username = email.split("@", 1)[0]
    username = re.sub(r"\d+", "", username)
    parts = [part for part in re.split(r"[._-]+", username) if part]
    if len(parts) == 1 and len(parts[0]) >= 7:
        # Common compact form: harshiniks -> Harshini K S.
        compact = parts[0]
        parts = [compact[:-2], compact[-2], compact[-1]]
    candidate = _clean_name(" ".join(parts))
    return candidate if _reasonable_name(candidate) else ""


def detect_candidate_name(text: str, layout_candidates: list[dict[str, Any]] | None = None) -> dict[str, Any]:
    # Priority 1: largest text near the top of page one.
    ranked = sorted(
        layout_candidates or [],
        key=lambda item: (-float(item.get("font_size", 0)), float(item.get("top", 0))),
    )
    for item in ranked:
        value = _clean_name(str(item.get("text", "")))
        if _reasonable_name(value):
            return {"name": value, "confidence": 0.96, "source": "top_layout"}

    # Text extraction preserves visual order for most PDFs; use only the header area.
    header_names = _line_candidates(text)
    if header_names:
        return {"name": _clean_name(header_names[0]), "confidence": 0.88, "source": "top_text"}

    # Priority 2: spaCy PERSON entities.
    ner = _ner_name(text)
    if ner:
        return {"name": ner, "confidence": 0.82, "source": "spacy_ner"}

    # Priority 3: email username.
    email_match = EMAIL_RE.search(text)
    if email_match:
        email_name = _name_from_email(email_match.group(0))
        if email_name:
            return {"name": email_name, "confidence": 0.63, "source": "email"}

    # Priority 4: explicit labels.
    label = LABEL_RE.search(text)
    if label and _reasonable_name(label.group(1)):
        return {"name": _clean_name(label.group(1)), "confidence": 0.78, "source": "label"}

    return {"name": "", "confidence": 0.0, "source": "none"}


def extract_profile(text: str, layout_candidates: list[dict[str, Any]] | None = None) -> dict[str, Any]:
    identity = detect_candidate_name(text, layout_candidates)
    email = EMAIL_RE.search(text)
    phone = next((match for match in PHONE_RE.finditer(text) if 10 <= len(re.sub(r"\D", "", match.group(0))) <= 15), None)
    return {
        "name": identity["name"],
        "confidence": identity["confidence"],
        "name_source": identity["source"],
        "email": email.group(0) if email else "",
        "phone": phone.group(0).strip() if phone else "",
    }

"""Seed data for the role-specific course catalog.

The API imports this only to initialize an empty MongoDB/local catalog. Runtime
recommendations are always queried from the configured data store.
"""

from __future__ import annotations

import re
from typing import Any
from urllib.parse import quote_plus


ROLE_COURSES: dict[str, list[str]] = {
    "UI/UX Designer": ["Google UX Design", "Figma UI Design", "Design Systems", "UX Research", "Wireframing", "Interactive Prototyping", "JavaScript Basics", "React Fundamentals"],
    "Frontend Developer": ["HTML & CSS", "JavaScript Algorithms", "React", "TypeScript", "Next.js", "Tailwind CSS", "Git & GitHub", "Responsive Web Design"],
    "Backend Developer": ["Java", "Spring Boot", "REST API Design", "SQL", "MongoDB", "Authentication", "Docker", "Microservices"],
    "Full Stack Developer": ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Full Stack Deployment"],
    "Java Developer": ["Java Programming", "Object-Oriented Java", "Data Structures in Java", "Spring Framework", "Spring Boot", "Hibernate & JPA", "Java Testing", "Java Microservices"],
    "Python Developer": ["Python Programming", "Object-Oriented Python", "Data Structures in Python", "Django", "FastAPI", "Python Testing", "SQL with Python", "Python Automation"],
    "AI/ML Engineer": ["Python for AI", "NumPy", "Pandas", "Machine Learning", "Deep Learning", "TensorFlow", "LangChain", "LLM Applications"],
    "Data Analyst": ["Excel", "SQL for Analysis", "Python for Data Analysis", "Power BI", "Tableau", "Statistics", "Data Cleaning", "Dashboard Projects"],
    "Data Scientist": ["Python for Data Science", "Statistics & Probability", "SQL", "Pandas", "Machine Learning", "Data Visualization", "Feature Engineering", "Applied Data Science Project"],
    "DevOps Engineer": ["Linux", "Git", "Docker", "Kubernetes", "Jenkins", "CI/CD", "Terraform", "AWS for DevOps"],
    "Cloud Engineer": ["AWS Cloud Practitioner", "Azure Fundamentals", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Cloud Security", "Serverless Computing"],
    "Cybersecurity Analyst": ["Networking", "Linux Security", "Ethical Hacking", "Penetration Testing", "OWASP", "SIEM", "SOC Operations", "Incident Response"],
    "Software Engineer": ["Programming Fundamentals", "Data Structures & Algorithms", "Object-Oriented Design", "Git & GitHub", "Databases", "Software Testing", "System Design", "Cloud Deployment"],
    "Mobile App Developer": ["Dart Programming", "Flutter", "React Native", "Android with Kotlin", "iOS with Swift", "Mobile UI Design", "Mobile API Integration", "App Store Deployment"],
    "QA/Test Engineer": ["Software Testing Fundamentals", "Test Case Design", "Selenium", "Cypress", "API Testing", "Mobile Testing", "Performance Testing", "CI Test Automation"],
}

PLATFORMS = ["Coursera", "Udemy", "freeCodeCamp", "Scrimba", "Google", "IBM", "Microsoft", "AWS"]


def _slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def build_seed_catalog() -> list[dict[str, Any]]:
    catalog: list[dict[str, Any]] = []
    for role, topics in ROLE_COURSES.items():
        for order, topic in enumerate(topics, 1):
            platform = PLATFORMS[(order - 1) % len(PLATFORMS)]
            difficulty = "Beginner" if order <= 3 else "Intermediate" if order <= 7 else "Advanced"
            hours = 6 + order * 2
            catalog.append({
                "id": _slug(f"{role}-{topic}"),
                "role": role,
                "title": topic,
                "platform": platform,
                "difficulty": difficulty,
                "duration": f"{hours} Hours",
                "rating": round(4.4 + (order % 5) * 0.1, 1),
                "paid": platform in {"Coursera", "Udemy", "Scrimba"},
                "certificate": platform not in {"Scrimba"},
                "skills": [topic, role, "Portfolio Practice"],
                "url": f"https://www.google.com/search?q={quote_plus(platform + ' ' + topic + ' course')}",
                "roadmapOrder": order,
                "popularity": 98000 - order * 5700,
                "estimatedCompletionTime": f"{max(1, (hours + 4) // 5)} weeks at 5 hrs/week",
                "relatedProjects": [f"Build a {topic} project for your {role} portfolio"],
            })
    return catalog

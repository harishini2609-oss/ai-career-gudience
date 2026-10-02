# AI Career Copilot

Premium full-stack SaaS-style career platform.

## Stack

- Frontend: React 18, TypeScript, Tailwind CSS, Framer Motion, Recharts, Lucide icons
- Backend: FastAPI
- Database: MongoDB via `MONGO_URI`, with durable local JSON fallback for machines without MongoDB
- Authentication: JWT
- AI Mentor: Groq API via `GROQ_API_KEY`, with local deterministic mentor fallback when no key is configured

## Run

Install dependencies:

```powershell
$env:NODE_OPTIONS="--use-system-ca"
npm.cmd install
npm.cmd --prefix apps/web install
python -m pip install --user -r apps/api/requirements.txt
```

Start backend:

```powershell
python -m uvicorn apps.api.main:app --host 127.0.0.1 --port 8000
```

Start frontend:

```powershell
npm.cmd --prefix apps/web run dev
```

Open:

```text
http://127.0.0.1:5173
```

Demo login:

```text
demo@careercopilot.ai
Demo@1234
```

## Environment

Create environment variables before starting the backend:

```powershell
$env:JWT_SECRET="replace-with-a-long-random-secret"
$env:MONGO_URI="mongodb://127.0.0.1:27017/career_copilot"
$env:GROQ_API_KEY="your-groq-api-key"
```

If `MONGO_URI` is not set or MongoDB is unavailable, the backend stores data in:

```text
apps/api/local_store.json
```

## Features

- JWT login/register/logout
- Dashboard with animated SaaS UI and readiness charts
- Resume ATS upload and scoring
- Career GPS skill-gap roadmap
- Mock Interview with non-repeating questions, scoring, and reports
- GitHub analytics using GitHub public API
- Role-aware jobs with match scoring and official apply links
- AI mentor using Groq when configured
- Profile and settings pages
- Dark mode

## API

Backend docs:

```text
http://127.0.0.1:8000/docs
```

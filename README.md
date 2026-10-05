# AI Career Copilot

Premium full-stack SaaS-style career platform.

## Project structure

- `apps/web/` - React, TypeScript, and Vite frontend used by the main app and deployment.
- `apps/api/` - FastAPI backend and its tests.
- `api/[...path].py` - Vercel serverless entry point for the FastAPI routes.
- `requirements.txt` - Vercel Python dependencies, shared with `apps/api/requirements.txt`.
- `apps/legacy-web/` - standalone static prototype, kept separate from the main frontend.
- `start-server.ps1` - runs the static prototype at `http://127.0.0.1:3000`.
- Root `package.json` - workspace commands for the frontend and backend.

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

To run the standalone static prototype instead:

```powershell
.\start-server.ps1
```

## Deploy to Vercel

Push this repository to GitHub, then import it from the Vercel dashboard. Use the repository root (`./`) as the Vercel project root, select the **Vite** framework preset, and set the build command to `npm run build`. The checked-in `vercel.json` serves the production frontend from `apps/web/dist` and gives API functions up to 60 seconds; Vercel routes requests under `/api/` to `api/[...path].py`. The root `requirements.txt` installs the Python dependencies.

Add these environment variables in **Project Settings → Environment Variables** before deploying:

- `MONGO_URI` - connection string for a reachable MongoDB database. Vercel instances cannot keep user data in the local JSON fallback.
- `JWT_SECRET` - a long, randomly generated secret used to sign login tokens.
- `GROQ_API_KEY` - optional; enables Groq-powered AI features.
- `GITHUB_TOKEN` - optional; enables authenticated GitHub API requests.

Allow the deployed Vercel function to connect to your MongoDB provider, and use a database user with only the permissions the app needs. After deployment, verify the API at `https://<your-domain>/api/health`.

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

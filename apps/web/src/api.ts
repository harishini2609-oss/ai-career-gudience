export type User = {
  name: string;
  email: string;
  target_role: string;
  skills: string[];
  github_username?: string;
  career_interests?: string;
  resume_score?: number;
  database?: string;
};

// Keep browser requests on the same origin. In development Vite proxies /api to
// the FastAPI server (see vite.config.ts); in production the web server can do
// the same. A relative URL also avoids CORS/host mismatches such as
// localhost vs 127.0.0.1.
const API_BASE = "/api";

let token = localStorage.getItem("career_token") || "";

export function setToken(nextToken: string) {
  token = nextToken;
  localStorage.setItem("career_token", nextToken);
}

export function clearToken() {
  token = "";
  localStorage.removeItem("career_token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch {
    throw new Error("Cannot reach the API. Start the app with `npm run dev` and try again.");
  }
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    const detail = error?.detail;
    const message = Array.isArray(detail)
      ? detail.map((item: any) => {
          const field = Array.isArray(item?.loc) ? item.loc.filter((part: unknown) => part !== "body").join(".") : "request";
          return `${field || "request"}: ${item?.msg || "Invalid value"}`;
        }).join("; ")
      : typeof detail === "string" ? detail
      : detail?.msg || error?.message || error?.error?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}

export const api = {
  login: (email: string, password: string) =>
    request<{ token: string; user: User }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (name: string, email: string, password: string) =>
    request<{ token: string; user: User }>("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) }),
  me: () => request<User>("/me"),
  updateProfile: (profile: Pick<User, "name" | "target_role" | "skills" | "github_username" | "career_interests">) =>
    request<User>("/profile", { method: "PUT", body: JSON.stringify(profile) }),
  dashboard: () => request<any>("/dashboard"),
  courses: (role: string) => request<any>(`/v1/course-recommendations?role=${encodeURIComponent(role)}`),
  updateCourseProgress: (course_id: string, progress: number) =>
    request<any>("/courses/progress", { method: "POST", body: JSON.stringify({ course_id, progress }) }),
  gps: (skills: string[], career_interests = "", target_roles: string[] = []) =>
    request<any>("/gps", { method: "POST", body: JSON.stringify({ skills, career_interests, target_roles }) }),
  skillGap: (current_skills: string[], target_career: string, resume_text = "") =>
    request<any>("/skills/gap", { method: "POST", body: JSON.stringify({ current_skills, target_career, resume_text }) }),
  jobs: (params: Record<string, string | number> = {}) => {
    const search = new URLSearchParams(Object.entries(params).map(([key, value]) => [key, String(value)]));
    return request<any>(`/jobs${search.toString() ? `?${search}` : ""}`);
  },
  savedJobs: () => request<any>("/jobs/saved"),
  saveJob: (job: any) => request<any>("/jobs/save", { method: "POST", body: JSON.stringify({ job }) }),
  removeSavedJob: (jobId: string) => request<any>(`/jobs/save/${encodeURIComponent(jobId)}`, { method: "DELETE" }),
  appliedJobs: () => request<any>("/jobs/applied"),
  trackJob: (job: any, status = "Applied", note = "") =>
    request<any>("/jobs/apply", { method: "POST", body: JSON.stringify({ job, status, note }) }),
  updateAppliedJob: (jobId: string, status: string, note = "") =>
    request<any>(`/jobs/applied/${encodeURIComponent(jobId)}`, { method: "PUT", body: JSON.stringify({ status, note }) }),
  resume: (file?: File, target_role = "") => {
    const data = new FormData();
    if (file) data.append("file", file);
    if (target_role) data.append("target_role", target_role);
    return request<any>("/resume/analyze", { method: "POST", body: data });
  },
  startInterview: (payload: any) =>
    request<any>("/interview/start", { method: "POST", body: JSON.stringify(payload) }),
  answerInterview: (payload: any) => request<any>("/interview/answer", { method: "POST", body: JSON.stringify(payload) }),
  interviewReport: () => request<any>("/interview/report"),
  github: (identifier: string, target_role = "") =>
    request<any>("/github/analyze", { method: "POST", body: JSON.stringify({ identifier, target_role }) }),
  mentor: (message: string, target_role = "") => request<any>("/mentor", { method: "POST", body: JSON.stringify({ message, target_role }) }),
  health: () => request<any>("/health"),
};

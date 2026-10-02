import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  Bot,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Code2,
  ExternalLink,
  Eye,
  FileText,
  Github,
  Globe2,
  GraduationCap,
  LogOut,
  Map,
  MapPin,
  Mic,
  Moon,
  PlayCircle,
  Search,
  Settings,
  Share2,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Trash2,
  TerminalSquare,
  Volume2,
  X,
  UserRound,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { api, clearToken, setToken, type User } from "./api";
import "./styles.css";

const roles = ["UI/UX Designer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Java Developer", "Python Developer", "AI/ML Engineer", "Data Analyst", "Data Scientist", "DevOps Engineer", "Cloud Engineer", "Cybersecurity Analyst", "Software Engineer", "Mobile App Developer", "QA/Test Engineer"];
const nav = [
  ["Dashboard", BarChart3],
  ["Career GPS", Map],
  ["Course Recommendations", GraduationCap],
  ["Resume ATS", FileText],
  ["Mock Interview", Code2],
  ["GitHub Analytics", Github],
  ["Jobs", BriefcaseBusiness],
  ["AI Mentor", Bot],
  ["Profile", UserRound],
  ["Settings", Settings],
] as const;

function cn(...items: Array<string | false | undefined>) {
  return items.filter(Boolean).join(" ");
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className={cn("card", className)}>{children}</motion.section>;
}

function Skeleton() {
  return <div className="h-28 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-white/10" />;
}

function Toast({ message }: { message: string }) {
  if (!message) return null;
  return <div className="fixed right-5 top-5 z-50 rounded-2xl border border-emerald-500/30 bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-glow">{message}</div>;
}

function Auth({ onLogin }: { onLogin: (user: User) => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("demo@careercopilot.ai");
  const [password, setPassword] = useState("Demo@1234");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const result = mode === "login" ? await api.login(email, password) : await api.register(name, email, password);
      setToken(result.token);
      onLogin(result.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    }
  }

  return (
    <main className="auth-bg">
      <form onSubmit={submit} className="auth-panel">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500 text-lg font-black text-white">AI</div>
          <div>
            <h1 className="text-xl font-black tracking-tight">Career Copilot</h1>
            <p className="text-sm text-slate-500">Premium career operating system</p>
          </div>
        </div>
        <div className="mb-5 grid grid-cols-2 rounded-2xl bg-slate-100 p-1 dark:bg-white/10">
          <button type="button" onClick={() => setMode("login")} className={cn("auth-tab", mode === "login" && "auth-tab-active")}>Login</button>
          <button type="button" onClick={() => setMode("register")} className={cn("auth-tab", mode === "register" && "auth-tab-active")}>Register</button>
        </div>
        {mode === "register" && <input className="input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />}
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="rounded-xl bg-rose-500/10 p-3 text-sm text-rose-600">{error}</p>}
        <button className="btn-primary mt-2 w-full">{mode === "login" ? "Enter workspace" : "Create workspace"}</button>
      </form>
    </main>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState("Dashboard");
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");
  const [toast, setToast] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    api.me().then(setUser).catch(() => clearToken());
  }, []);

  function notify(message: string) {
    setToast(typeof message === "string" ? message : "Something went wrong. Please try again.");
    setTimeout(() => setToast(""), 2200);
  }

  if (!user) return <Auth onLogin={(next) => setUser(next)} />;

  const ActiveIcon = nav.find(([item]) => item === page)?.[1] || BarChart3;
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 transition dark:bg-[#070a12] dark:text-white">
      <Toast message={toast} />
      <aside className="sidebar-premium">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-500 font-black text-white">AI</div>
          <div>
            <p className="font-black">Career Copilot</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Production SaaS</p>
          </div>
        </div>
        <nav className="space-y-1">
          {nav.map(([item, Icon]) => (
            <button key={item} onClick={() => setPage(item)} className={cn("nav-button", page === item && "nav-button-active")}>
              <Icon size={18} /> {item}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-3xl border border-slate-200 bg-white/70 p-4 text-sm dark:border-white/10 dark:bg-white/5">
          <p className="font-bold">{user.name}</p>
          <p className="truncate text-slate-500 dark:text-slate-400">{user.email}</p>
          <button className="mt-3 flex items-center gap-2 text-rose-500" onClick={() => { clearToken(); setUser(null); }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>
      <main className="pl-0 lg:pl-72">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/80 bg-white/75 px-5 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#070a12]/70">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 dark:bg-white/10"><ActiveIcon size={20} /></div>
            <div>
              <h1 className="text-xl font-black tracking-tight">{page}</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Connected to FastAPI Â· {user.database || "api"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select className="input !mb-0 w-48" value={user.target_role} onChange={async (e) => {
              const next = await api.updateProfile({ name: user.name, target_role: e.target.value, skills: user.skills, github_username: user.github_username || "", career_interests: user.career_interests || "" });
              setUser(next); notify("Target role updated");
            }}>
              {roles.map((role) => <option key={role}>{role}</option>)}
            </select>
            <button className="icon-btn" onClick={() => setDark(!dark)}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
          </div>
        </header>
        <section className="p-5 lg:p-8">
          {page === "Dashboard" && <Dashboard onNavigate={setPage} />}
          {page === "Career GPS" && <CareerGPS user={user} setUser={setUser} notify={notify} />}
          {page === "Course Recommendations" && <CourseRecommendations user={user} notify={notify} />}
          {page === "Resume ATS" && <ResumeATS user={user} notify={notify} />}
          {page === "Mock Interview" && <MockInterview user={user} notify={notify} />}
          {page === "GitHub Analytics" && <GitHubAnalyticsAI user={user} setUser={setUser} notify={notify} />}
          {page === "Jobs" && <JobsPremium targetRole={user.target_role} />}
          {page === "AI Mentor" && <Mentor user={user} />}
          {page === "Profile" && <Profile user={user} setUser={setUser} notify={notify} />}
          {page === "Settings" && <SettingsPage />}
        </section>
      </main>
    </div>
  );
}

function Dashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [data, setData] = useState<any>(null);
  useEffect(() => { api.dashboard().then(setData); }, []);
  const chart = useMemo(() => [
    { name: "Skills", value: data?.skill_score || 0 },
    { name: "Resume", value: data?.resume_score || 0 },
    { name: "GitHub", value: data?.github_score || 0 },
    { name: "Success", value: data?.success || 0 },
  ], [data]);
  if (!data) return <div className="grid gap-5 md:grid-cols-3"><Skeleton /><Skeleton /><Skeleton /></div>;
  return (
    <div className="space-y-6">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Career readiness</p>
          <h2 className="text-4xl font-black tracking-tight">Your path is getting sharper.</h2>
          <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-300">AI Career Copilot combines skills, ATS, GitHub and interviews into one production-ready career workspace.</p>
        </div>
        <CircularProgress value={data.success} />
      </div>
      <div className="grid gap-5 md:grid-cols-4">
        <Stat label="Skill readiness" value={`${data.skill_score}%`} icon={<Sparkles />} />
        <Stat label="Resume ATS" value={`${data.resume_score}%`} icon={<FileText />} />
        <Stat label="GitHub score" value={`${data.github_score}%`} icon={<Github />} />
        <Stat label="XP level" value={`Level ${data.level}`} icon={<Shield />} />
      </div>
      <Card>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">Course Progress</p>
            <h3 className="text-xl font-black">Continue your personalized learning plan</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Courses completed: <b>{data.course_progress?.completed || 0} / {data.course_progress?.total || 0}</b> - Certificates earned: <b>{data.course_progress?.certificates_earned || 0}</b></p>
          </div>
          <button className="btn-primary" type="button" onClick={() => onNavigate("Course Recommendations")}>Continue Learning</button>
        </div>
      </Card>
      <Card>
        <h3 className="mb-4 text-lg font-black">Readiness trend</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <AreaChart data={chart}>
              <defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#2388ff" stopOpacity={0.7} /><stop offset="100%" stopColor="#2388ff" stopOpacity={0.02} /></linearGradient></defs>
              <XAxis dataKey="name" /><YAxis /><Tooltip />
              <Area dataKey="value" stroke="#2388ff" fill="url(#g)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

function CircularProgress({ value }: { value: number }) {
  return <div className="relative grid h-44 w-44 place-items-center rounded-full bg-[conic-gradient(#2388ff_var(--v),#e2e8f0_0)] dark:bg-[conic-gradient(#2388ff_var(--v),rgba(255,255,255,.12)_0)]" style={{ "--v": `${value}%` } as React.CSSProperties}>
    <div className="grid h-32 w-32 place-items-center rounded-full bg-white text-4xl font-black text-brand-600 dark:bg-[#070a12]">{value}%</div>
  </div>;
}

interface SkillResources {
  official?: string;
  youtube?: string;
  course?: string;
  practice?: string;
}

interface MissingSkill {
  name: string;
  importance: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | string;
  duration: string;
  prerequisites: string[];
  priority?: string;
  resources: SkillResources;
}

interface RoadmapResource {
  title: string;
  type: "official" | "youtube" | "course" | "practice" | "cheat_sheet" | string;
  url: string;
  skill?: string;
  description?: string;
  provider?: string;
  badge?: string;
  estimated_time?: string;
  action_label?: string;
}

interface RecommendedCourse {
  id: string;
  title: string;
  platform: string;
  platformLogo: string;
  difficulty: string;
  duration: string;
  rating: number;
  certificate: boolean;
  certificateAvailable?: boolean;
  certificateEarned?: boolean;
  estimatedCompletionTime: string;
  skills: string[];
  progress: number;
  status: "Not Started" | "In Progress" | "Completed" | string;
  url: string;
  paid?: boolean;
  recommendationReason?: string;
  recommendedForYou?: boolean;
  roadmapOrder?: number;
  popularity?: number;
  relatedProjects?: string[];
}

function normalizeMissingSkill(item: any): MissingSkill {
  return {
    name: String(item?.name || item?.skill || item || "Missing skill"),
    importance: String(item?.importance || item?.why || "This skill supports the selected career path."),
    difficulty: String(item?.difficulty || "Beginner"),
    duration: String(item?.duration || "Time varies"),
    prerequisites: Array.isArray(item?.prerequisites) ? item.prerequisites : [],
    priority: item?.priority,
    resources: item?.resources || {},
  };
}

function MissingSkillCard({ skill, index, onOpen }: { skill: MissingSkill; index: number; onOpen: (skill: MissingSkill) => void }) {
  function open() { onOpen(skill); }
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ scale: 1.02, y: -3 }}
      role="button"
      tabIndex={0}
      title={`Learn ${skill.name}`}
      aria-label={`Learn ${skill.name}`}
      onClick={open}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } }}
      className="learning-skill-card"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-black">{skill.name}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="pill">{skill.difficulty}</span>
            <span className="pill"><Clock3 size={12} /> {skill.duration}</span>
            {skill.priority && <span className="pill">{skill.priority} priority</span>}
          </div>
        </div>
        <ExternalLink className="shrink-0 text-brand-500" size={19} aria-hidden="true" />
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-300">{skill.importance}</p>
      <button className="ripple-button btn-primary mt-4 w-full" type="button" onClick={(event) => { event.stopPropagation(); open(); }}>
        Learn <ExternalLink size={15} />
      </button>
    </motion.article>
  );
}

function resourceMeta(type: string) {
  const normalized = String(type || "resource").toLowerCase();
  if (normalized === "official") return { label: "Docs", icon: BookOpen, tone: "docs" };
  if (normalized === "youtube" || normalized === "video") return { label: "Video", icon: PlayCircle, tone: "video" };
  if (normalized === "course") return { label: "Course", icon: GraduationCap, tone: "course" };
  if (normalized === "practice") return { label: "Practice", icon: TerminalSquare, tone: "practice" };
  if (normalized === "cheat_sheet") return { label: "Cheat Sheet", icon: FileText, tone: "cheat" };
  return { label: "Resource", icon: Bookmark, tone: "default" };
}

function normalizeRoadmapResource(resource: RoadmapResource): RoadmapResource {
  const meta = resourceMeta(resource?.type);
  const skill = resource?.skill || String(resource?.title || "").split(" ")[0] || "Skill";
  return {
    ...resource,
    title: resource?.title || `${skill} ${meta.label}`,
    badge: resource?.badge || meta.label,
    provider: resource?.provider || (resource?.type === "youtube" ? "YouTube" : "Learning Resource"),
    description: resource?.description || `Use this ${meta.label.toLowerCase()} to make progress on ${skill} this week.`,
    estimated_time: resource?.estimated_time || "1 Hour",
    action_label: resource?.action_label || (resource?.type === "youtube" ? "Watch Video" : resource?.type === "practice" ? "Start Practice" : "Open Resource"),
  };
}

function RoadmapResourceCard({ resource, index = 0 }: { resource: RoadmapResource; index?: number }) {
  if (!resource?.url) return null;
  const item = normalizeRoadmapResource(resource);
  const meta = resourceMeta(item.type);
  const Icon = meta.icon;
  return (
    <motion.article
      className={cn("roadmap-resource-card", `roadmap-resource-${meta.tone}`)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.035, 0.25) }}
      whileHover={{ scale: 1.015, y: -2 }}
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="roadmap-resource-icon"><Icon size={18} /></div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h6 className="truncate text-sm font-black tracking-tight text-slate-950 dark:text-white">{item.title}</h6>
            <span className="roadmap-resource-badge">{item.badge || meta.label}</span>
          </div>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-300">{item.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
            <span>{item.provider}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span>{item.estimated_time}</span>
          </div>
        </div>
      </div>
      <a className="roadmap-resource-action ripple-button" href={item.url} target="_blank" rel="noopener noreferrer">
        {item.action_label}<ExternalLink size={14} />
      </a>
    </motion.article>
  );
}

function LearningResourcesModal({ skill, onClose }: { skill: MissingSkill | null; onClose: () => void }) {
  useEffect(() => {
    if (!skill) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function closeOnEscape(event: KeyboardEvent) { if (event.key === "Escape") onClose(); }
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [skill, onClose]);

  const links = skill ? [
    { key: "official", label: "Official Docs", url: skill.resources.official },
    { key: "youtube", label: "YouTube Tutorial", url: skill.resources.youtube },
    { key: "course", label: "Free Course", url: skill.resources.course },
    { key: "practice", label: "Practice Problems", url: skill.resources.practice },
  ].filter((item) => Boolean(item.url)) : [];

  return (
    <AnimatePresence>
      {skill && <motion.div className="learning-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
        <motion.section
          role="dialog"
          aria-modal="true"
          aria-labelledby="learning-modal-title"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ type: "spring", stiffness: 340, damping: 28 }}
          className="learning-modal"
        >
          <div className="flex items-start justify-between gap-4">
            <div><p className="eyebrow">Learning path</p><h3 id="learning-modal-title" className="text-2xl font-black">{skill.name}</h3></div>
            <button type="button" className="icon-btn shrink-0" onClick={onClose} aria-label="Close learning resources"><X size={19} /></button>
          </div>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{skill.importance}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="learning-modal-stat"><span>Difficulty</span><b>{skill.difficulty}</b></div>
            <div className="learning-modal-stat"><span>Estimated time</span><b>{skill.duration}</b></div>
          </div>
          <div className="mt-5">
            <h4 className="font-black">Recommended prerequisites</h4>
            {skill.prerequisites.length ? <ul className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-300">{skill.prerequisites.map((item) => <li className="flex gap-2" key={item}><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={16} />{item}</li>)}</ul> : <p className="mt-2 text-sm text-slate-500">No prerequisites specified.</p>}
          </div>
          {links.length ? <div className="mt-6 grid gap-3 sm:grid-cols-2">{links.map((item) => (
            <a key={item.key} className="ripple-button btn-secondary justify-between" href={item.url} target="_blank" rel="noopener noreferrer">
              {item.label}<ExternalLink size={16} />
            </a>
          ))}</div> : <p className="mt-6 rounded-2xl bg-amber-500/10 p-4 text-sm font-bold text-amber-600">No learning resources available currently.</p>}
        </motion.section>
      </motion.div>}
    </AnimatePresence>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return <Card><div className="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600">{icon}</div><p className="text-sm text-slate-500">{label}</p><p className="mt-1 text-3xl font-black">{value}</p></Card>;
}

function CareerGPS({ user, setUser, notify }: { user: User; setUser: (u: User) => void; notify: (m: string) => void }) {
  const [skills, setSkills] = useState(user.skills.join(", "));
  const [interests, setInterests] = useState(user.career_interests || "");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<MissingSkill | null>(null);
  async function analyze() {
    setLoading(true); setError("");
    try {
      const list = skills.split(/,|\n/).map((x) => x.trim()).filter(Boolean);
      const result = await api.gps(list, interests, [user.target_role]);
      const next = await api.me();
      setUser(next); setData(result); notify(result.cached ? "Loaded cached roadmap" : "Career GPS generated");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate roadmap");
    } finally {
      setLoading(false);
    }
  }
  const roles = data?.target_roles || [];
  return <div className="grid gap-5 lg:grid-cols-[420px_1fr]">
    <Card>
      <h3 className="text-xl font-black">Career signal</h3>
      <textarea className="input mt-4 min-h-36" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Skills, separated by commas" />
      <textarea className="input min-h-28" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="Career interests, preferred domain, work style" />
      {error && <ErrorBox text={error} />}
      <button className="btn-primary" onClick={analyze} disabled={loading}>{loading ? "Generating..." : "Analyze roadmap"}</button>
    </Card>
    <div className="space-y-5">
      {!data ? <Card><Empty text="Analyze your skills to generate an AI roadmap." /></Card> : roles.map((role: any) => (
        <Card key={role.role || user.target_role}>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div><p className="eyebrow">Personalized target</p><h3 className="text-2xl font-black">{role.role || user.target_role}</h3></div>
            <CircularProgress value={Number(role.job_readiness_percentage || data.overall_readiness || 0)} />
          </div>
          <h4 className="mt-5 font-black">Missing skills</h4>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Select any skill to view its personalized learning path and resources.</p>
          {(role.missing_skills || []).length ? <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{(role.missing_skills || []).map((item: any, index: number) => {
            const skill = normalizeMissingSkill(item);
            return <MissingSkillCard key={skill.name} skill={skill} index={index} onOpen={setSelectedSkill} />;
          })}</div> : <p className="mt-3 rounded-2xl bg-emerald-500/10 p-4 text-sm font-bold text-emerald-600">No missing skills detected for this role.</p>}
          <h4 className="mt-5 font-black">Roadmap</h4>
          <div className="mt-3 space-y-3">{(role.learning_roadmap || []).map((phase: any, i: number) => {
            const resources = (phase.resources || []).filter((resource: RoadmapResource) => resource?.url);
            return (
              <div className="route-node route-node-rich" key={`${phase.phase || phase.goal}-${i}`}>
                <span>{phase.week || i + 1}</span>
                <div className="min-w-0">
                  <b>{phase.phase || phase.goal || `Week ${i + 1}`}</b>
                  <p>{Array.isArray(phase.tasks) ? phase.tasks.join(" - ") : phase.tasks}</p>
                  {resources.length ? <div className="roadmap-resource-grid mt-3">{resources.map((resource: RoadmapResource, resourceIndex: number) => <RoadmapResourceCard key={`${resource.type}-${resource.title}-${resource.url}`} resource={resource} index={resourceIndex} />)}</div> : <p className="mt-3 rounded-2xl bg-amber-500/10 p-3 text-xs font-bold text-amber-600">No learning resources available for this topic.</p>}
                </div>
                <em>{phase.duration || `${phase.estimated_hours || 0} hrs`}</em>
              </div>
            );
          })}</div>
          <List title="Projects" items={role.recommended_projects} />
          <ResourceCards title="Free Resources" items={role.free_resources || []} />
        </Card>
      ))}
    </div>
    <LearningResourcesModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
  </div>;
}

function CourseRecommendations({ user, notify }: { user: User; notify: (m: string) => void }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [duration, setDuration] = useState("All");
  const [certificate, setCertificate] = useState("All");
  const [price, setPrice] = useState("All");
  const [skill, setSkill] = useState("All");
  const [error, setError] = useState("");
  const requestId = useRef(0);

  async function load(role: string) {
    const id = ++requestId.current;
    setLoading(true);
    setError("");
    try {
      const next = await api.courses(role);
      if (id === requestId.current) setData(next);
    } catch (reason) {
      if (id === requestId.current) setError(reason instanceof Error ? reason.message : "Unable to load courses");
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }

  useEffect(() => { load(user.target_role); }, [user.target_role]);

  async function setProgress(course: RecommendedCourse, progress: number) {
    const next = await api.updateCourseProgress(course.id, progress);
    setData(next);
    notify(progress >= 100 ? "Course completed. Certificate earned." : "Course progress updated");
  }

  const courses = (data?.courses || []) as RecommendedCourse[];
  const platforms = ["All", ...Array.from(new Set(courses.map((course) => course.platform)))];
  const skills = ["All", ...Array.from(new Set(courses.flatMap((course) => course.skills)))];
  const filtered = courses.filter((course) => {
    const haystack = `${course.title} ${course.platform} ${course.skills.join(" ")}`.toLowerCase();
    const hours = parseInt(course.duration, 10) || 0;
    return (!search || haystack.includes(search.toLowerCase()))
      && (platform === "All" || course.platform === platform)
      && (difficulty === "All" || course.difficulty === difficulty)
      && (certificate === "All" || (certificate === "Certificate" ? course.certificate : !course.certificate))
      && (price === "All" || (price === "Free" ? !course.paid : course.paid))
      && (skill === "All" || course.skills.includes(skill))
      && (duration === "All" || (duration === "Short" ? hours <= 8 : duration === "Medium" ? hours > 8 && hours <= 20 : hours > 20));
  });

  if (loading) return <div className="grid gap-5 md:grid-cols-3"><Skeleton /><Skeleton /><Skeleton /></div>;
  if (error) return <Card><Empty text={error} /><button className="btn-primary mx-auto mt-4" type="button" onClick={() => load(user.target_role)}>Try Again</button></Card>;

  return (
    <div className="space-y-5">
      <div className="course-hero">
        <div>
          <p className="eyebrow">AI Learning Hub</p>
          <h2 className="text-4xl font-black tracking-tight">Courses for {data?.targetRole || user.target_role}</h2>
          <p className="mt-3 max-w-3xl text-slate-500 dark:text-slate-300">Recommendations adapt to your target role, resume signals, missing skills, and latest skill gap analysis.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="course-stat"><span>Completed</span><b>{data?.completed || 0}/{courses.length}</b></div>
          <div className="course-stat"><span>Certificates</span><b>{data?.certificatesEarned || 0}</b></div>
        </div>
      </div>

      {data?.recommendedNextCourse && <Card>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">Recommended Next Course</p>
            <h3 className="text-2xl font-black">{data.recommendedNextCourse.title}</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{data.recommendedNextCourse.reason}</p>
          </div>
          <span className="pill">{data.recommendedNextCourse.platform}</span>
        </div>
      </Card>}

      <Card>
        <div className="grid gap-3 lg:grid-cols-[1.5fr_repeat(6,1fr)]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-3.5 text-slate-400" size={17} />
            <input className="input !mb-0 pl-10" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search courses or skills" />
          </div>
          <select className="input !mb-0" value={platform} onChange={(event) => setPlatform(event.target.value)}>{platforms.map((item) => <option key={item}>{item}</option>)}</select>
          <select className="input !mb-0" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>{["All", "Beginner", "Intermediate", "Advanced"].map((item) => <option key={item}>{item}</option>)}</select>
          <select className="input !mb-0" value={duration} onChange={(event) => setDuration(event.target.value)}>{["All", "Short", "Medium", "Long"].map((item) => <option key={item}>{item}</option>)}</select>
          <select className="input !mb-0" value={certificate} onChange={(event) => setCertificate(event.target.value)}>{["All", "Certificate", "No Certificate"].map((item) => <option key={item}>{item}</option>)}</select>
          <select className="input !mb-0" value={price} onChange={(event) => setPrice(event.target.value)}>{["All", "Free", "Paid"].map((item) => <option key={item}>{item}</option>)}</select>
          <select className="input !mb-0" value={skill} onChange={(event) => setSkill(event.target.value)}>{skills.map((item) => <option key={item}>{item}</option>)}</select>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        {filtered.length ? filtered.map((course, index) => <CourseCard course={course} onProgress={setProgress} index={index} key={course.id} />) : <Card><Empty text="No courses found for the current filters." /></Card>}
      </div>
    </div>
  );
}

function CourseCard({ course, onProgress, index }: { course: RecommendedCourse; onProgress: (course: RecommendedCourse, progress: number) => void; index: number }) {
  const complete = Number(course.progress || 0) >= 100;
  return (
    <motion.article className="course-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.05, 0.4) }} whileHover={{ y: -4, scale: 1.01 }}>
      <div className="flex min-w-0 items-start gap-4">
        <div className="course-logo"><img src={course.platformLogo} alt="" /></div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-xl font-black">{course.title}</h3>
            {course.recommendedForYou && <span className="rounded-full bg-brand-500/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-brand-500">Recommended for You</span>}
            {course.certificate && <span className="certificate-badge">Certificate Available</span>}
          </div>
          <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-300">{course.platform}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="pill">{course.difficulty}</span>
            <span className="pill"><Clock3 size={12} /> {course.duration}</span>
            <span className="pill">Rating {Number(course.rating || 4.7).toFixed(1)}</span>
            <span className="pill">{course.paid ? "Paid" : "Free"}</span>
            {!!course.roadmapOrder && <span className="pill">Roadmap #{course.roadmapOrder}</span>}
            {!!course.popularity && <span className="pill">{course.popularity.toLocaleString()} learners</span>}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">Skills Covered</p>
        <div className="mt-2 flex flex-wrap gap-2">{course.skills.map((skill) => <span className="pill" key={skill}>{skill}</span>)}</div>
      </div>

      <p className="mt-4 text-sm text-slate-500 dark:text-slate-300">Estimated completion: <b>{course.estimatedCompletionTime}</b></p>
      {!!course.relatedProjects?.length && <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">After completion: <b>{course.relatedProjects[0]}</b></p>}

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm font-bold"><span>{course.status}</span><span>{course.progress}%</span></div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"><div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${course.progress}%` }} /></div>
        {complete && <p className="mt-3 rounded-2xl bg-emerald-500/10 p-3 text-sm font-black text-emerald-600">Course Completed - Certificate Earned</p>}
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        <a className="btn-primary" href={course.url} target="_blank" rel="noopener noreferrer" onClick={() => { if (!course.progress) onProgress(course, 10); }}>Start Course <ExternalLink size={15} /></a>
        <button className="btn-secondary" type="button">{complete ? "View Certificate" : "View Certificate Details"}</button>
        <a className="btn-secondary" href={course.url} target="_blank" rel="noopener noreferrer">Open Website <ExternalLink size={15} /></a>
      </div>
      {!complete && <button className="mt-3 w-full rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-black text-emerald-600 transition hover:bg-emerald-500/15" type="button" onClick={() => onProgress(course, 100)}>Mark Completed</button>}
      {complete && <button className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white" type="button">Download Certificate</button>}
    </motion.article>
  );
}

function ResumeATS({ user, notify }: { user: User; notify: (m: string) => void }) {
  const [data, setData] = useState<any>(null);
  const [gap, setGap] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>();

  function isAllowedResume(file: File) {
    return file.name.toLowerCase().endsWith(".pdf") && (!file.type || file.type === "application/pdf");
  }

  async function runFullAnalysis(file?: File) {
    const result = await api.resume(file, user.target_role);
    setData(result);
    setGap({
      target_career: user.target_role,
      job_readiness_percentage: result.score_breakdown?.required_skills_matched || 0,
      missing_skills: result.missing_skills || [],
      required_skills: result.required_skills || [],
      current_skills: result.detected?.skills || [],
      priority_order: (result.missing_skills || []).map((skill: string) => ({ skill, priority: "Missing", reason: `${skill} is required for ${user.target_role} but was not found in this resume.` })),
    });
    notify("Resume ATS report generated");
  }

  async function upload(file?: File) {
    setError("");
    setData(null);
    setGap(null);
    if (!file || !isAllowedResume(file)) {
      setData(null);
      setGap(null);
      setFileName("");
      setSelectedFile(undefined);
      setError("Please upload a valid resume in PDF format.");
      return;
    }
    setFileName(file.name);
    setLoading(true);
    try {
      await runFullAnalysis(file);
    } catch (err) {
      setData(null);
      setGap(null);
      setError(err instanceof Error ? err.message : "Could not analyze resume");
    } finally {
      setLoading(false);
    }
  }
  const detectedProfile = data?.profile || data?.detected || {};
  const detectedName = String(detectedProfile.name || "").trim();
  const nameConfidence = Number(detectedProfile.confidence || 0);
  return <div className="space-y-5">
    <div className="grid gap-5 lg:grid-cols-[420px_1fr]">
      <Card>
        <h3 className="text-xl font-black">Upload resume</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Only readable resume PDFs are accepted. Other files are rejected before scoring.</p>
        <input className="input mt-4" type="file" accept=".pdf,application/pdf" onChange={(e) => {
          const file = e.target.files?.[0];
          setError("");
          setData(null);
          setGap(null);
          if (!file) {
            setSelectedFile(undefined);
            setFileName("");
            return;
          }
          if (!isAllowedResume(file)) {
            setSelectedFile(undefined);
            setFileName("");
            setError("Please upload a valid resume in PDF format.");
            return;
          }
          setSelectedFile(file);
          setFileName(file.name);
        }} />
        {fileName && <p className="mb-3 text-sm font-bold text-slate-500 dark:text-slate-300">Selected: {fileName}</p>}
        <button className="btn-primary" onClick={() => upload(selectedFile)} disabled={loading}>{loading ? "Analyzing..." : "Analyze PDF resume"}</button>
        {error && <ErrorBox text={error} />}
      </Card>
      <Card>
        <h3 className="text-xl font-black">Complete candidate result</h3>
        {!data ? <Empty text="Upload a valid resume PDF to see ATS score, detected skills, matched keywords, missing keywords, and resume-specific improvements." /> : <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-center"><CircularProgress value={Number(data.score || data.ats_score || 0)} /><div><p className="text-slate-500 dark:text-slate-300">{data.score_explanation}</p><div className="mt-3 flex flex-wrap gap-2"><span className="pill">ATS {Number(data.score || data.ats_score || 0)}%</span>{gap && <span className="pill">Skill match {Number(gap.job_readiness_percentage || 0)}%</span>}<span className="pill">{user.target_role}</span></div></div></div>}
      </Card>
    </div>
    {data && <div className="grid gap-5 lg:grid-cols-2">
      <Card><h3 className="text-xl font-black">Score breakdown</h3><div className="mt-4 grid gap-3">{Object.entries(data.score_breakdown || {}).map(([key, value]) => <ProgressRow key={key} label={key} value={Number(value)} />)}</div></Card>
      <Card><h3 className="text-xl font-black">Detected profile</h3><div className="mt-4 grid gap-3"><p>{detectedName ? <><b>{nameConfidence >= 0.75 ? "Name:" : "Possible Name:"}</b> {detectedName}{nameConfidence > 0 && nameConfidence < 0.75 ? ` (${Math.round(nameConfidence * 100)}%)` : ""}</> : <><b>Name:</b> Unable to detect from this resume</>}</p>{detectedProfile.email && <p><b>Email:</b> {detectedProfile.email}</p>}{detectedProfile.phone && <p><b>Phone:</b> {detectedProfile.phone}</p>}<List title="Skills" items={data.detected?.skills} compact /><List title="Education" items={data.detected?.education} compact /><List title="Experience" items={data.detected?.experience} compact /><List title="Projects" items={data.detected?.projects} compact /></div></Card>
      <Card><List title="Matched keywords" items={data.matched_keywords} /><List title="Missing keywords" items={data.missing_keywords} /></Card>
      {gap && <Card><div className="flex items-center justify-between gap-4"><div><p className="eyebrow">Resume-based skill gap</p><h3 className="text-xl font-black">{gap.target_career || user.target_role}</h3></div><CircularProgress value={Number(gap.job_readiness_percentage || 0)} /></div><List title="Missing skills" items={gap.missing_skills} /><List title="Priority order" items={(gap.priority_order || []).map((item: any) => `${item.skill} - ${item.priority}: ${item.reason}`)} /></Card>}
      {data.personalized_roadmap && <RoadmapTimeline roadmap={data.personalized_roadmap} />}
      <Card><List title="Strengths" items={data.strengths} /><List title="Weaknesses" items={data.weaknesses} /></Card>
      <Card><List title="Missing skills" items={data.missing_skills} /><List title="Missing keywords" items={data.missing_keywords} /></Card>
      <Card><List title="Suggestions" items={data.suggestions} /></Card>
      <Card><List title="Improved resume points" items={data.improved_resume_points || data.ats_friendly_bullets} /></Card>
    </div>}
  </div>;
}

function SkillGap({ user, notify }: { user: User; notify: (m: string) => void }) {
  const [skills, setSkills] = useState(user.skills.join(", "));
  const [target, setTarget] = useState(user.target_role);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function analyze() {
    setLoading(true); setError("");
    try {
      const list = skills.split(/,|\n/).map((x) => x.trim()).filter(Boolean);
      const result = await api.skillGap(list, target);
      setData(result); notify(result.cached ? "Loaded cached gap analysis" : "Skill gap analyzed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not analyze skill gap");
    } finally {
      setLoading(false);
    }
  }
  return <div className="grid gap-5 lg:grid-cols-[420px_1fr]">
    <Card><h3 className="text-xl font-black">Skill Gap Engine</h3><input className="input mt-4" value={target} onChange={(e) => setTarget(e.target.value)} /><textarea className="input min-h-40" value={skills} onChange={(e) => setSkills(e.target.value)} />{error && <ErrorBox text={error} />}<button className="btn-primary" onClick={analyze} disabled={loading}>{loading ? "Analyzing..." : "Analyze gaps"}</button></Card>
    <div className="space-y-5">{!data ? <Card><Empty text="Run the AI skill gap engine to see priorities." /></Card> : <><Card><div className="flex items-center justify-between gap-4"><div><p className="eyebrow">Target career</p><h3 className="text-2xl font-black">{data.target_career || target}</h3></div><CircularProgress value={Number(data.job_readiness_percentage || 0)} /></div><div className="mt-5 grid gap-3 md:grid-cols-3"><List title="Beginner" items={data.beginner_skills} compact /><List title="Intermediate" items={data.intermediate_skills} compact /><List title="Advanced" items={data.advanced_skills} compact /></div></Card><Card><h3 className="text-xl font-black">Priority order</h3><div className="mt-3 grid gap-3">{(data.priority_order || []).map((item: any) => <InfoCard key={item.skill} title={item.skill} meta={item.priority} text={item.reason} />)}</div></Card><Card><List title="Learning sequence" items={data.recommended_learning_sequence} /><List title="Projects" items={data.project_suggestions} /><List title="Interview topics" items={data.interview_topics} /><List title="Coding practice" items={data.coding_practice_suggestions} /><p className="mt-4 font-black">Timeline: {data.estimated_completion_timeline}</p></Card></>}</div>
  </div>;
}

function MockInterview({ user, notify }: { user: User; notify: (m: string) => void }) {
  const [targetRole, setTargetRole] = useState(user.target_role || "AI Engineer");
  const [experienceLevel, setExperienceLevel] = useState("Fresher");
  const [language, setLanguage] = useState("Python");
  const [session, setSession] = useState<any>(null);
  const [question, setQuestion] = useState<any>(null);
  const [answer, setAnswer] = useState("");
  const [code, setCode] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState<any>(null);
  const [report, setReport] = useState<any>(null);
  const [roundSummary, setRoundSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [mode, setMode] = useState<"text" | "voice">("text");
  const [listening, setListening] = useState(false);
  const [micStatus, setMicStatus] = useState("Ready");
  const [voiceError, setVoiceError] = useState("");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [activeScoreDetail, setActiveScoreDetail] = useState<string | null>(null);
  const [interviewSeconds, setInterviewSeconds] = useState(0);
  const [roundSeconds, setRoundSeconds] = useState(0);
  const [questionSeconds, setQuestionSeconds] = useState(0);
  const timeoutQuestionRef = useRef("");
  const recognitionRef = useRef<any>(null);
  const recordingTimerRef = useRef<number | null>(null);
  const answers = session?.answers || [];
  const progress = session?.progress || { percent: 0, answered: 0, total: 0, round: 1, round_total: 9, question: 1, round_question_total: 1, estimated_remaining_minutes: 0 };
  const currentRound = question?.round || "Interview Simulator";
  const isCoding = question?.type === "coding" || question?.type === "debugging";
  const isMcq = question?.type === "mcq";
  const criteriaWeights: Record<string, number> = { "Technical Accuracy": 40, "Problem Solving": 20, "Communication": 15, "Confidence": 10, "Best Practices": 10, "Clarity": 5 };

  function formatTime(total: number) {
    const safe = Math.max(0, Math.floor(total || 0));
    const hours = Math.floor(safe / 3600);
    const minutes = Math.floor((safe % 3600) / 60);
    const seconds = safe % 60;
    if (hours) return `${hours}h ${minutes}m`;
    if (minutes) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  }

  function speakQuestion() {
    if (!question?.text || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(question.text);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }

  function stopRecording(status = "Stopped") {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    if (recordingTimerRef.current) window.clearInterval(recordingTimerRef.current);
    recordingTimerRef.current = null;
    setListening(false);
    setMicStatus(status);
  }

  async function ensureMicPermission() {
    if (!navigator.mediaDevices?.getUserMedia) return true;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch {
      setMicStatus("Permission Denied");
      setVoiceError("Microphone permission denied. Allow microphone access in Chrome or Edge and try again.");
      return false;
    }
  }

  async function startVoiceAnswer() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicStatus("Stopped");
      notify("Speech recognition is not available in this browser.");
      setVoiceError("This browser does not support speech recognition. Use Google Chrome or Microsoft Edge.");
      return;
    }
    if (listening) return;
    const allowed = await ensureMicPermission();
    if (!allowed) return;
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch {}
    }
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;
    setVoiceError("");
    setLiveTranscript("");
    setRecordingSeconds(0);
    recognition.onstart = () => {
      setListening(true);
      setMicStatus("Listening");
      recordingTimerRef.current = window.setInterval(() => setRecordingSeconds((value) => value + 1), 1000);
    };
    recognition.onspeechend = () => {
      setMicStatus("Processing");
      stopRecording("Processing");
    };
    recognition.onend = () => {
      if (recordingTimerRef.current) window.clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
      setListening(false);
      setMicStatus((current) => current === "Processing" ? "Stopped" : current);
    };
    recognition.onerror = (event: any) => {
      const messages: Record<string, string> = {
        "no-speech": "No voice detected. Please speak again.",
        "audio-capture": "No microphone was found. Check your input device.",
        network: "Speech recognition network error. Try again in Chrome or Edge.",
        "not-allowed": "Microphone permission denied. Allow access and retry.",
      };
      setVoiceError(messages[event.error] || "Could not capture microphone input.");
      setMicStatus(event.error === "not-allowed" ? "Permission Denied" : "Stopped");
      setListening(false);
      if (recordingTimerRef.current) window.clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    };
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results).map((result: any) => result[0]?.transcript || "").join(" ").trim();
      setLiveTranscript(transcript);
      if (event.results[event.results.length - 1]?.isFinal) {
        setAnswer(transcript);
        setMicStatus("Stopped");
      }
    };
    try {
      recognition.start();
    } catch {
      setVoiceError("Recorder is already active. Stop it and retry.");
      setMicStatus("Stopped");
    }
  }

  function retryRecording() {
    stopRecording("Stopped");
    setAnswer("");
    setLiveTranscript("");
    setVoiceError("");
    window.setTimeout(() => startVoiceAnswer(), 250);
  }

  useEffect(() => {
    if (!session || !question) return;
    setInterviewSeconds(Number(session.progress?.interview_seconds_remaining || progress.interview_seconds_remaining || 0));
    setRoundSeconds(Number(session.progress?.round_seconds_remaining || progress.round_seconds_remaining || 0));
    setQuestionSeconds(Number(question.timer_seconds || progress.question_seconds_remaining || 0));
    timeoutQuestionRef.current = "";
    if (mode === "voice") window.setTimeout(speakQuestion, 250);
  }, [question?.id, session?.session_id]);

  useEffect(() => {
    if (!question || loading) return;
    const timer = window.setInterval(() => {
      setInterviewSeconds((value) => Math.max(0, value - 1));
      setRoundSeconds((value) => Math.max(0, value - 1));
      setQuestionSeconds((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [question?.id, loading]);

  useEffect(() => {
    if (!question || loading || Number(question.timer_seconds || 0) <= 0 || questionSeconds !== 0 || timeoutQuestionRef.current === question.id) return;
    timeoutQuestionRef.current = question.id;
    submit("timeout");
  }, [questionSeconds, question?.id, loading]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
      if (recordingTimerRef.current) window.clearInterval(recordingTimerRef.current);
      window.speechSynthesis?.cancel();
    };
  }, []);

  async function start() {
    setLoading(true); setReport(null); setRoundSummary(null); setFeedback(null); setAnswer(""); setCode(""); setSelectedOption("");
    try {
      const result = await api.startInterview({ round: "Full Interview", language, target_role: targetRole, experience_level: experienceLevel });
      setSession({ ...result, answers: [] });
      setQuestion(result.question);
      setCode(result.question?.starter_code || "");
      notify("AI interview simulator started");
    } catch (err) {
      notify(err instanceof Error ? err.message : "Could not start interview");
    } finally {
      setLoading(false);
    }
  }

  async function submit(action = "submit") {
    if (!session?.session_id || !question?.id) return;
    if (action === "submit" && !isMcq && !isCoding && answer.trim().length < 3) {
      notify("Enter an answer before submitting.");
      return;
    }
    if (action === "submit" && isMcq && !selectedOption) {
      notify("Select an option before submitting.");
      return;
    }
    if (action === "submit" && isCoding && !code.trim()) {
      notify("Enter code before submitting.");
      return;
    }
    if (mode === "voice" && action === "submit" && !answer.trim()) {
      setVoiceError("No voice detected. Please speak again.");
      notify("No voice detected. Please speak again.");
      return;
    }
    if (mode === "voice" && action === "submit" && listening) {
      stopRecording("Processing");
      setVoiceError("Recording is still processing. Submit after the transcript appears.");
      return;
    }
    setLoading(true);
    try {
      const response = await api.answerInterview({
        session_id: session.session_id,
        question_id: question.id,
        answer: (isMcq ? selectedOption : answer).trim() || (action === "timeout" ? "No answer before time expired." : action === "skip" ? "Question skipped by candidate." : action === "finish" ? "Interview finished by candidate." : code.trim()),
        code,
        round: question.round || currentRound,
        language,
        action,
        time_taken: Math.max(0, Number(question.timer_seconds || 120) - questionSeconds),
      });
      const nextAnswers = [...answers.filter((item: any) => item.question_id !== question.id), response];
      setFeedback(response);
      setReport(response.report || null);
      setSession({ ...session, answers: nextAnswers, progress: response.progress, scoreboard: response.scoreboard, rounds: response.session?.rounds || session.rounds, status: response.session?.status || session.status });
      setRoundSummary(response.round_summary || null);
      setQuestion(response.next_question);
      setAnswer("");
      setSelectedOption("");
      setCode(response.next_question?.starter_code || "");
      setHistoryIndex(nextAnswers.length);
      notify(response.report ? "Final interview report generated" : "Answer evaluated");
    } catch (err) {
      notify(err instanceof Error ? err.message : "Could not evaluate answer");
    } finally {
      setLoading(false);
    }
  }

  async function loadReport() {
    const result = await api.interviewReport();
    setReport(result);
    notify("Interview report loaded");
  }

  function showPrevious() {
    if (!answers.length) return;
    const nextIndex = Math.max(0, historyIndex - 1);
    setHistoryIndex(nextIndex);
    setFeedback(answers[nextIndex]);
  }

  function showNextFeedback() {
    if (!answers.length) return;
    const nextIndex = Math.min(answers.length - 1, historyIndex + 1);
    setHistoryIndex(nextIndex);
    setFeedback(answers[nextIndex]);
  }

  const activeAnswerValue = isMcq ? selectedOption : answer;
  return (
    <div className="space-y-5">
      <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5">
        <div className="grid gap-4 xl:grid-cols-[1.1fr_180px_170px_170px_auto] xl:items-end">
          <div>
            <p className="eyebrow">AI-powered mock interview</p>
            <h3 className="text-2xl font-black">Company-style interview simulator</h3>
            <input className="input mt-4 !mb-0" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="Target role" />
          </div>
          <label className="text-sm font-bold text-slate-500">Experience<select className="input mt-2 !mb-0" value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}><option>Fresher</option><option>1-2 years</option><option>3-5 years</option><option>Senior</option></select></label>
          <label className="text-sm font-bold text-slate-500">Language<select className="input mt-2 !mb-0" value={language} onChange={(e) => setLanguage(e.target.value)}><option>Python</option><option>Java</option><option>JavaScript</option><option>C++</option><option>C</option></select></label>
          <button className="btn-primary h-12" onClick={start} disabled={loading}>{loading ? "Preparing..." : "Start Interview"}</button>
          <button className="btn-secondary h-12" onClick={loadReport}>Report</button>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2 rounded-2xl bg-slate-100 p-1 dark:bg-white/10">
            <button className={cn("rounded-xl px-4 py-2 text-sm font-black", mode === "text" && "bg-white text-brand-600 shadow-soft dark:bg-slate-950")} onClick={() => setMode("text")}>Text Mode</button>
            <button className={cn("rounded-xl px-4 py-2 text-sm font-black", mode === "voice" && "bg-white text-brand-600 shadow-soft dark:bg-slate-950")} onClick={() => setMode("voice")}>Voice Mode</button>
          </div>
          <div className="grid gap-2 text-sm font-black sm:grid-cols-3">
            <span className="rounded-2xl bg-slate-100 px-4 py-2 dark:bg-white/10">Interview {formatTime(interviewSeconds)}</span>
            <span className="rounded-2xl bg-slate-100 px-4 py-2 dark:bg-white/10">Round {formatTime(roundSeconds)}</span>
            <span className={cn("rounded-2xl px-4 py-2", questionSeconds <= 10 && question ? "bg-rose-500 text-white" : "bg-slate-100 dark:bg-white/10")}>Question {formatTime(questionSeconds)}</span>
          </div>
        </div>
        {session?.company && <div className="mt-4 flex flex-wrap gap-2"><span className="pill">Today's Interview: {session.company}</span><span className="pill">{session.role}</span><span className="pill">{session.language}</span></div>}
        {session && <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5 xl:grid-cols-9">
          {[["Correct", session.scoreboard?.correct || 0], ["Wrong", session.scoreboard?.wrong || 0], ["Skipped", session.scoreboard?.skipped || 0], ["Timeout", session.scoreboard?.timeout || 0], ["Answered", session.scoreboard?.answered || 0], ["Remaining", session.scoreboard?.remaining ?? 90], ["Accuracy", `${session.scoreboard?.accuracy || 0}%`], ["Progress", `${session.scoreboard?.progress || 0}%`], ["Score", session.scoreboard?.score || 0]].map(([label, value]) => <div className="rounded-2xl bg-slate-100 p-3 text-center dark:bg-white/10" key={String(label)}><b className="block text-lg">{value}</b><span className="text-[10px] font-black uppercase tracking-wide text-slate-500">{label}</span></div>)}
        </div>}
        {session && <div className="mt-5">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3 text-sm font-bold text-slate-500">
            <span>Round {progress.round} / {progress.round_total}</span>
            <span>Question {progress.question} / {progress.round_question_total}</span>
            <span>{progress.estimated_remaining_minutes} min remaining</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${progress.percent}%` }} /></div>
        </div>}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_420px]">
        <div className="space-y-5">
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-slate-950/70">
            {!question ? <Empty text="Start a full interview to generate role-specific rounds, questions, coding tasks, and feedback." /> : <>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="eyebrow">{currentRound}</p>
                  <h3 className="text-2xl font-black">{question.text}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="pill">{question.difficulty}</span>
                    <span className="pill">{question.focus_area}</span>
                    <span className="pill">{question.timer_seconds}s</span>
                  </div>
                </div>
                <CircularProgress value={Number(progress.percent || 0)} />
              </div>
              {mode === "voice" && <div className="mt-5 flex flex-wrap gap-3 rounded-2xl bg-slate-100 p-3 dark:bg-white/10">
                <button className="btn-secondary !mb-0 inline-flex items-center gap-2" onClick={speakQuestion}><Volume2 size={18} /> Speak Question</button>
                <button className={cn("btn-primary !mb-0 inline-flex items-center gap-2", listening && "bg-rose-500")} onClick={startVoiceAnswer} disabled={listening}><Mic className={cn(listening && "animate-pulse")} size={18} /> Start Recording</button>
                <button className="btn-secondary !mb-0" onClick={() => stopRecording()}>Stop Recording</button>
                <button className="btn-secondary !mb-0" onClick={retryRecording}>Retry</button>
                <span className={cn("self-center rounded-2xl px-3 py-2 text-sm font-black", listening ? "bg-rose-500 text-white" : "bg-white dark:bg-slate-950")}>{micStatus} · {formatTime(recordingSeconds)}</span>
                <div className="w-full">
                  {listening && <div className="mb-3 flex h-10 items-end gap-1">
                    {[35, 60, 45, 80, 50, 70, 40, 65].map((height, index) => <span className="w-2 animate-pulse rounded-full bg-brand-500" style={{ height: `${height}%`, animationDelay: `${index * 70}ms` }} key={index} />)}
                  </div>}
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 dark:border-white/10 dark:bg-slate-950">
                    <b>Live transcript:</b> {liveTranscript || answer || "Waiting for speech..."}
                  </div>
                  {voiceError && <p className="mt-2 rounded-2xl bg-rose-500/10 p-3 text-sm font-bold text-rose-600">{voiceError}</p>}
                  {!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition) && <p className="mt-2 rounded-2xl bg-amber-500/10 p-3 text-sm font-bold text-amber-700">This browser does not support speech recognition. Use Google Chrome or Microsoft Edge.</p>}
                </div>
              </div>}

              {isMcq && <div className="mt-5 grid gap-3">{(question.options || []).map((option: string) => <button key={option} className={cn("rounded-2xl border p-4 text-left font-bold transition", selectedOption === option ? "border-brand-500 bg-brand-500/10 text-brand-600" : "border-slate-200 bg-slate-50 hover:border-brand-300 dark:border-white/10 dark:bg-white/5")} onClick={() => setSelectedOption(option)}>{option}</button>)}</div>}

              {isCoding && <div className="mt-5 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-4">
                  {question.problem_statement && <div><h4 className="font-black">Problem Statement</h4><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">{question.problem_statement}</p></div>}
                  {question.broken_code && <div><h4 className="font-black">Broken Code</h4><pre className="mt-2 overflow-auto rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">{question.broken_code}</pre></div>}
                  <List title="Constraints" items={question.constraints || question.test_cases} compact />
                  <List title="Hidden test cases" items={question.hidden_tests || question.test_cases} compact />
                </div>
                <div>
                  <textarea className="input min-h-80 font-mono text-sm" value={code} onChange={(e) => setCode(e.target.value)} />
                  <div className="grid gap-3 sm:grid-cols-3">
                    <span className="pill">Execution {feedback?.execution_time_ms || 0}ms</span>
                    <span className="pill">Memory {feedback?.memory_mb || 0}MB</span>
                    <button className="btn-secondary" onClick={() => notify("Code captured. Submit to run AI evaluation against visible and hidden cases.")}>Run Code</button>
                  </div>
                </div>
              </div>}

              {!isMcq && !isCoding && <textarea className="input mt-5 min-h-56" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Answer like a real interview: explain context, tradeoffs, examples, and result." />}

              <div className="mt-5 flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-4 dark:border-white/10">
                <div className="flex gap-3"><button className="btn-secondary" onClick={showPrevious} disabled={!answers.length}>Previous Feedback</button><button className="btn-secondary" onClick={showNextFeedback} disabled={!answers.length}>Next Feedback</button></div>
                <div className="flex gap-3"><button className="btn-secondary" onClick={() => submit("skip")} disabled={loading}>Skip</button><button className="btn-primary" onClick={() => submit()} disabled={loading || (!activeAnswerValue && !code)}>{loading ? "Evaluating..." : "Submit"}</button><button className="btn-secondary" onClick={() => submit("finish")} disabled={loading}>Finish Interview</button></div>
              </div>
            </>}
          </section>

          {roundSummary && <section className="rounded-[28px] border border-emerald-500/30 bg-emerald-500/5 p-5 shadow-soft"><p className="eyebrow">Round Completed</p><h3 className="text-2xl font-black">Round {roundSummary.round}: {roundSummary.title}</h3><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">{[["Questions", roundSummary.questions], ["Correct", roundSummary.correct], ["Wrong", roundSummary.wrong], ["Skipped", roundSummary.skipped], ["Timeout", roundSummary.timeout], ["Accuracy", `${roundSummary.accuracy}%`], ["Average Time", `${roundSummary.average_time}s`], ["Technical", roundSummary.technical_score], ["Communication", roundSummary.communication_score], ["Confidence", roundSummary.confidence_score]].map(([label, value]) => <div className="rounded-2xl bg-white p-3 dark:bg-white/10" key={String(label)}><b className="block text-xl">{value}</b><span className="text-xs font-bold text-slate-500">{label}</span></div>)}</div></section>}
          {report && <InterviewReport report={report} />}
        </div>

        <aside className="space-y-5">
          <section className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5">
            <h3 className="text-xl font-black">AI Feedback</h3>
            {!feedback ? <Empty text="Submit an answer to receive detailed AI scoring." /> : <>
              <div className="mt-4 flex items-center gap-4"><CircularProgress value={Number(feedback.overall || 0)} /><div><p className={cn("font-black", feedback.correctness === "Incorrect" && "text-rose-600", feedback.correctness === "Correct" && "text-emerald-600")}>{feedback.correctness === "Incorrect" ? "Incorrect Answer" : feedback.correctness || "Evaluated"}</p><p className="text-sm text-slate-500">Overall Score: {Number(feedback.overall || 0)}/100</p><p className="text-sm text-slate-500">Next difficulty: {feedback.next_difficulty}</p></div></div>
              {mode === "voice" && <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <span className="pill">Speaking speed: {recordingSeconds ? Math.round((answer.split(/\s+/).filter(Boolean).length / Math.max(1, recordingSeconds)) * 60) : 0} wpm</span>
                <span className="pill">Fluency: {answer.length > 80 ? "Steady" : "Needs more detail"}</span>
                <span className="pill">Grammar: Review transcript clarity</span>
                <span className="pill">Communication: {feedback.criteria?.Communication || 0}/15</span>
              </div>}
              <button className="btn-secondary mt-4" onClick={() => { setAnswer(""); setCode(question?.starter_code || ""); setSelectedOption(""); setFeedback(null); setActiveScoreDetail(null); }}>Practice Again</button>
              <div className="mt-4 grid gap-2">{Object.entries(feedback.criteria || {}).map(([key, value]) => {
                const max = criteriaWeights[key] || 100;
                const guide = feedback.score_guidance?.[key] || {};
                return <button className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-brand-400 dark:border-white/10 dark:bg-white/5" key={key} onClick={() => setActiveScoreDetail(key)}>
                  <div className="mb-2 flex justify-between gap-3 text-sm font-black"><span>{key}</span><span>{Number(value)}/{max}</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-white dark:bg-slate-950"><div className="h-full rounded-full bg-brand-500" style={{ width: `${Math.round((Number(value) / max) * 100)}%` }} /></div>
                  <p className="mt-2 text-xs text-slate-500">{guide.why_low || "Click for detailed improvement suggestions."}</p>
                </button>;
              })}</div>
              {activeScoreDetail && feedback.score_guidance?.[activeScoreDetail] && <div className="mt-4 rounded-2xl border border-brand-500/30 bg-brand-500/5 p-4">
                <div className="flex items-start justify-between gap-3"><div><p className="eyebrow">Score detail</p><h4 className="font-black">{activeScoreDetail}: {feedback.score_guidance[activeScoreDetail].score}/{criteriaWeights[activeScoreDetail] || 100}</h4></div><button className="btn-secondary !mb-0" onClick={() => setActiveScoreDetail(null)}>Close</button></div>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300"><b>Why marks were deducted:</b> {feedback.score_guidance[activeScoreDetail].why_low}</p>
                <List title="Mistakes" items={feedback.score_guidance[activeScoreDetail].mistakes} compact />
                <List title="Missing points" items={feedback.score_guidance[activeScoreDetail].missing_points} compact />
                <List title="How to improve" items={feedback.score_guidance[activeScoreDetail].improve} compact />
                <p className="mt-3 rounded-2xl bg-white p-3 text-sm leading-6 dark:bg-slate-950"><b>Sample answer:</b> {feedback.score_guidance[activeScoreDetail].sample_answer || feedback.example_answer}</p>
                <List title="Practice tips" items={feedback.score_guidance[activeScoreDetail].practice_tips} compact />
                <button className="btn-primary mt-3" onClick={() => { setAnswer(""); setCode(question?.starter_code || ""); setSelectedOption(""); setFeedback(null); setActiveScoreDetail(null); }}>Practice Again</button>
              </div>}
              {feedback.correctness === "Incorrect" || feedback.correctness === "Not Answered" ? <>
                <p className="mt-4 rounded-2xl bg-rose-500/10 p-4 text-sm leading-6 text-rose-700 dark:text-rose-200"><b>Reason:</b> {feedback.reason || feedback.mistakes?.[0]}</p>
                <p className="mt-3 rounded-2xl bg-slate-100 p-4 text-sm leading-6 text-slate-700 dark:bg-white/10 dark:text-slate-200"><b>Expected Answer:</b> {feedback.expected_answer || feedback.correct_answer || feedback.industry_expected_answer}</p>
                <List title="Key Points Missing" items={feedback.missing_points} compact />
                <List title="Study Recommendation" items={feedback.study_recommendation || feedback.practice_plan} compact />
              </> : feedback.correctness === "Partially Correct" ? <>
                <p className="mt-4 rounded-2xl bg-amber-500/10 p-4 text-sm leading-6 text-amber-700 dark:text-amber-200"><b>Partial:</b> {feedback.reason}</p>
                <List title="What is missing" items={feedback.missing_points} compact />
                <p className="mt-3 rounded-2xl bg-slate-100 p-4 text-sm leading-6 text-slate-700 dark:bg-white/10 dark:text-slate-200"><b>Expected Answer:</b> {feedback.expected_answer || feedback.industry_expected_answer}</p>
                <List title="Study Recommendation" items={feedback.study_recommendation || feedback.practice_plan} compact />
              </> : <>
                <List title="Strengths" items={feedback.strengths} compact />
                <List title="Missing Improvements" items={feedback.missing_points || feedback.weaknesses} compact />
                <p className="mt-4 rounded-2xl bg-slate-100 p-4 text-sm leading-6 text-slate-600 dark:bg-white/10 dark:text-slate-300"><b>Industry Standard Answer:</b> {feedback.industry_expected_answer || feedback.ideal_answer}</p>
                <List title="Optimization Suggestions" items={feedback.suggestions} compact />
                <List title="Professional Interview Tips" items={feedback.practice_plan} compact />
              </>}
            </>}
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5">
            <h3 className="text-xl font-black">Round Progress</h3>
            <div className="mt-4 grid gap-3">{(session?.rounds || []).map((item: any) => <div key={item.id}><div className="mb-1 flex justify-between text-sm font-bold"><span>{item.round_number}. {item.title}</span><span>{item.completed}/{item.count}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${(Number(item.completed || 0) / Number(item.count || 1)) * 100}%` }} /></div></div>)}</div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function InterviewReport({ report }: { report: any }) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-slate-950/70">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <p className="eyebrow">Final report</p>
          <h3 className="text-2xl font-black">{report.decision || "Interview Report"} - {report.hiring_recommendation || "Pending"}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">{report.decision_reason}</p>
        </div>
        <CircularProgress value={Number(report.overall || 0)} />
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {[
          ["Overall Questions", report.overall_questions],
          ["Questions Correct", report.questions_correct],
          ["Questions Wrong", report.questions_wrong],
          ["Questions Skipped", report.questions_skipped],
          ["Questions Timeout", report.questions_timeout],
          ["Accuracy", `${Number(report.accuracy || 0)}%`],
        ].map(([label, value]) => <div className="rounded-2xl bg-slate-100 p-4 dark:bg-white/10" key={String(label)}><p className="text-2xl font-black text-emerald-600">{value}</p><p className="text-xs font-bold text-slate-500">{label}</p></div>)}
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {["technical_score", "coding_score", "hr_score", "communication", "confidence", "problem_solving", "behavior", "role_readiness"].map((key) => <div className="rounded-2xl bg-slate-100 p-4 dark:bg-white/10" key={key}><p className="text-2xl font-black text-brand-600">{Number(report[key] || 0)}%</p><p className="text-xs font-bold capitalize text-slate-500">{key.replace(/_/g, " ")}</p></div>)}
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div><h4 className="font-black">Round Scores</h4><div className="mt-3 grid gap-3">{Object.entries(report.rounds || {}).map(([key, value]) => <ProgressRow key={key} label={key} value={Number(value)} />)}</div></div>
        <div><List title="Missing Skills" items={report.skill_gap?.missing_skills} compact /><List title="Strong Skills" items={report.skill_gap?.strong_skills} compact /><List title="Topics to Learn" items={report.skill_gap?.topics_to_learn} compact /></div>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-4">{(report.weekly_plan || []).map((week: any) => <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5" key={week.week}><p className="eyebrow">Week {week.week}</p><h4 className="font-black">{week.focus}</h4><List title="" items={week.tasks} compact /><p className="mt-3 text-sm text-slate-500">{week.project}</p></div>)}</div>
      <div className="mt-5"><h4 className="font-black">Company Readiness</h4><div className="mt-3 grid gap-3 md:grid-cols-3">{(report.company_readiness || []).map((company: any) => <div className="rounded-2xl bg-slate-100 p-4 dark:bg-white/10" key={company.company}><div className="flex items-center justify-between gap-3"><b>{company.company}</b><span className="pill">{company.readiness}%</span></div><p className="mt-2 text-xs text-slate-500">{company.likely_level}</p></div>)}</div></div>
      {!!(report.history || []).length && <div className="mt-5"><h4 className="font-black">Interview History</h4><div className="mt-3 grid gap-3 md:grid-cols-3">{report.history.map((item: any) => <div className="rounded-2xl bg-slate-100 p-4 dark:bg-white/10" key={item.session_id}><p className="font-black">{item.role}</p><p className="text-sm text-slate-500">{new Date(item.date).toLocaleString()}</p><p className="mt-2 text-2xl font-black text-brand-600">{item.score}%</p></div>)}</div></div>}
    </section>
  );
}

function GitHubAnalyticsAI({ user, setUser, notify }: { user: User; setUser: (u: User) => void; notify: (m: string) => void }) {
  const [username, setUsername] = useState(user.github_username || "");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function analyze() {
    setLoading(true); setError("");
    try {
      const result = await api.github(username, user.target_role);
      setData(result);
      const next = await api.updateProfile({ name: user.name, target_role: user.target_role, skills: user.skills, github_username: result.profile?.username || username, career_interests: user.career_interests || "" });
      setUser(next); notify("GitHub portfolio analyzed");
    } catch (err) {
      setError("We couldn't complete the portfolio analysis right now. Verify the GitHub username and try again shortly.");
    } finally {
      setLoading(false);
    }
  }
  return <div className="space-y-5">
    <div className="grid gap-5 lg:grid-cols-[420px_1fr]">
      <Card><h3 className="text-xl font-black">GitHub profile</h3><input className="input mt-4" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username or https://github.com/username" />{error && <ErrorBox text={error} />}<button className="btn-primary" onClick={analyze} disabled={loading}>{loading ? "Analyzing profile..." : "Analyze GitHub"}</button></Card>
      <Card><h3 className="text-xl font-black">Portfolio score</h3>{loading ? <Skeleton /> : !data ? <Empty text="Enter a GitHub username or profile URL." /> : <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-center"><CircularProgress value={Number(data.score || 0)} /><div><p className="text-2xl font-black">{data.score || 0} / 100</p><p className="text-slate-500 dark:text-slate-300">{data.rating}</p>{data.partial && <p className="mt-2 rounded-2xl bg-amber-500/10 p-3 text-sm font-bold text-amber-600">Some advanced portfolio metrics are temporarily limited. The available repository information has still been analyzed.</p>}<div className="mt-3 flex flex-wrap gap-2"><span className="pill">{data.totals?.repositories || 0} repos</span><span className="pill">{data.totals?.stars || 0} stars</span><span className="pill">{data.totals?.forks || 0} forks</span>{data.cached && <span className="pill">Cached</span>}</div></div></div>}</Card>
    </div>
    {data && <div className="grid gap-5 lg:grid-cols-2">
      <Card><h3 className="text-xl font-black">Profile</h3><div className="mt-4 flex gap-4">{data.profile?.avatar_url && <img className="h-16 w-16 rounded-2xl" src={data.profile.avatar_url} alt="" />}<div><p className="font-black">{data.profile?.name || data.profile?.username}</p>{data.profile?.url && <a className="text-sm font-bold text-brand-600" href={data.profile.url} target="_blank" rel="noopener noreferrer">{data.profile?.username}</a>}{data.profile?.bio && <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{data.profile.bio}</p>}</div></div><div className="mt-4 grid grid-cols-3 gap-2 text-center"><span className="pill">{data.profile?.followers || 0} followers</span><span className="pill">{data.profile?.following || 0} following</span><span className="pill">{data.profile?.public_repositories || 0} public repos</span></div><List title="Links" items={[data.profile?.portfolio_website, data.profile?.linkedin].filter(Boolean)} compact /></Card>
      <Card><h3 className="text-xl font-black">Career readiness</h3><div className="mt-4 flex items-center gap-5"><CircularProgress value={Number(data.career_readiness?.percentage || 0)} /><div><p className="font-black">{data.career_readiness?.target_role}</p><List title="Detected" items={data.career_readiness?.detected_skills} compact /><List title="Missing" items={data.career_readiness?.missing_skills} compact /></div></div><List title="Recommended before applying" items={data.career_readiness?.recommended_before_applying} /></Card>
      <Card><GitHubScoreBreakdown breakdown={data.score_breakdown} /></Card>
      {!!data.charts?.language_usage?.length && <Card><h3 className="text-xl font-black">Language usage</h3><div className="mt-4 h-72"><ResponsiveContainer><BarChart data={data.charts.language_usage}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#2388ff" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></div></Card>}
      {!!data.charts?.commit_frequency?.length && <Card><h3 className="text-xl font-black">Repository activity</h3><div className="mt-4 h-72"><ResponsiveContainer><BarChart data={data.charts.commit_frequency}><XAxis dataKey="name" hide /><YAxis /><Tooltip /><Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></div></Card>}
      {!!data.charts?.skill_distribution?.length && <Card><h3 className="text-xl font-black">Skill distribution</h3><div className="mt-4 h-72"><ResponsiveContainer><BarChart data={data.charts.skill_distribution}><XAxis dataKey="name" hide /><YAxis /><Tooltip /><Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></div></Card>}
      <Card><List title="Detected Skills" items={data.detected_skills} /><List title="Strengths" items={data.strengths} /><List title="Weaknesses" items={data.weaknesses} /></Card>
      <Card><List title="Recommendations" items={data.recommendations} /></Card>
      <Card className="lg:col-span-2"><h3 className="text-xl font-black">Best Projects</h3><div className="mt-4 grid gap-4 lg:grid-cols-2">{(data.best_projects || []).map((repo: any) => <RepositoryCard key={repo.name} repo={repo} />)}</div></Card>
      <Card className="lg:col-span-2"><h3 className="text-xl font-black">Repository Analysis</h3><div className="mt-4 grid gap-4">{(data.repository_analysis || []).map((repo: any) => <RepositoryCard key={repo.name} repo={repo} detailed />)}</div></Card>
    </div>}
  </div>;
}

function GitHubAnalytics({ user, setUser, notify }: { user: User; setUser: (u: User) => void; notify: (m: string) => void }) {
  const [username, setUsername] = useState(user.github_username || "");
  const [data, setData] = useState<any>(null);
  async function analyze() { const result = await api.github(username); setData(result); const next = await api.updateProfile({ name: user.name, target_role: user.target_role, skills: user.skills, github_username: username, career_interests: user.career_interests || "" }); setUser(next); notify("GitHub analyzed"); }
  return <div className="grid gap-5 lg:grid-cols-2"><Card><h3 className="text-xl font-black">GitHub username</h3><input className="input mt-4" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="octocat" /><button className="btn-primary" onClick={analyze}>Analyze GitHub</button></Card><Card><h3 className="text-xl font-black">Portfolio score</h3>{!data ? <Empty text="Enter a GitHub username." /> : <><p className="text-6xl font-black text-brand-600">{data.score}%</p><div className="mt-4 space-y-2">{data.repos.map((repo: any) => <p key={repo.name} className="rounded-xl bg-slate-100 p-3 dark:bg-white/10">{repo.name} Â· {repo.language || "Mixed"} Â· {repo.stars} stars</p>)}</div></>}</Card></div>;
}

const companyCatalog = [
  { name: "Google", url: "https://careers.google.com/", description: "Builds search, cloud, AI, Android, workspace, and large-scale web platforms.", roles: ["Full Stack Developer", "Software Engineer", "Frontend Developer", "Backend Developer", "AI Engineer", "Data Scientist", "DevOps Engineer", "Data Analyst"] },
  { name: "Microsoft", url: "https://jobs.careers.microsoft.com/", description: "Creates cloud, productivity, developer tools, gaming, security, and AI products.", roles: ["Full Stack Developer", "Software Engineer", "Backend Developer", "Frontend Developer", "AI Engineer", "Data Scientist", "DevOps Engineer", "Data Analyst"] },
  { name: "Amazon", url: "https://www.amazon.jobs/", description: "Operates ecommerce, AWS, logistics, devices, ads, streaming, and platform engineering teams.", roles: ["Full Stack Developer", "Software Engineer", "Backend Developer", "Frontend Developer", "Data Scientist", "DevOps Engineer", "Data Analyst"] },
  { name: "Meta", url: "https://www.metacareers.com/", description: "Works on social products, messaging, ads, infrastructure, AI, VR, and creator platforms.", roles: ["Full Stack Developer", "Software Engineer", "Frontend Developer", "Backend Developer", "AI Engineer", "Data Scientist", "UI/UX Designer"] },
  { name: "Apple", url: "https://jobs.apple.com/", description: "Designs hardware, software, services, developer platforms, commerce, and customer experiences.", roles: ["Full Stack Developer", "Software Engineer", "Frontend Developer", "Backend Developer", "AI Engineer", "UI/UX Designer", "Data Scientist"] },
  { name: "Netflix", url: "https://jobs.netflix.com/", description: "Builds streaming, studio technology, personalization, content operations, and platform tooling.", roles: ["Full Stack Developer", "Software Engineer", "Frontend Developer", "Backend Developer", "Data Scientist", "UI/UX Designer"] },
  { name: "Adobe", url: "https://careers.adobe.com/", description: "Creates design, document, marketing, media, web, and generative AI products.", roles: ["Full Stack Developer", "Software Engineer", "Frontend Developer", "Backend Developer", "AI Engineer", "UI/UX Designer", "Data Scientist"] },
  { name: "Oracle", url: "https://careers.oracle.com/", description: "Develops enterprise cloud, databases, applications, analytics, and infrastructure services.", roles: ["Full Stack Developer", "Software Engineer", "Backend Developer", "Frontend Developer", "Data Scientist", "DevOps Engineer", "Data Analyst"] },
  { name: "IBM", url: "https://www.ibm.com/careers/", description: "Works across hybrid cloud, consulting, automation, security, data, and enterprise AI.", roles: ["Full Stack Developer", "Software Engineer", "Backend Developer", "AI Engineer", "Data Scientist", "DevOps Engineer", "Data Analyst"] },
  { name: "NVIDIA", url: "https://www.nvidia.com/en-us/about-nvidia/careers/", description: "Builds accelerated computing, AI platforms, graphics, autonomous systems, and developer tooling.", roles: ["Software Engineer", "Backend Developer", "AI Engineer", "Data Scientist", "DevOps Engineer", "Full Stack Developer"] },
  { name: "Zoho", url: "https://careers.zohocorp.com/", description: "Creates SaaS products for CRM, finance, collaboration, support, analytics, and developer platforms.", roles: ["Full Stack Developer", "Software Engineer", "Frontend Developer", "Backend Developer", "Data Analyst", "UI/UX Designer"] },
  { name: "Freshworks", url: "https://www.freshworks.com/company/careers/", description: "Builds customer support, IT service, CRM, automation, and SaaS growth products.", roles: ["Full Stack Developer", "Software Engineer", "Frontend Developer", "Backend Developer", "Data Analyst", "UI/UX Designer"] },
  { name: "TCS", url: "https://www.tcs.com/careers", description: "Delivers enterprise engineering, consulting, cloud, product modernization, and digital transformation work.", roles: ["Full Stack Developer", "Software Engineer", "Backend Developer", "Frontend Developer", "Data Analyst", "DevOps Engineer"] },
  { name: "Infosys", url: "https://career.infosys.com/", description: "Provides technology consulting, software delivery, cloud modernization, data, and digital services.", roles: ["Full Stack Developer", "Software Engineer", "Backend Developer", "Frontend Developer", "Data Analyst", "DevOps Engineer"] },
  { name: "Wipro", url: "https://careers.wipro.com/", description: "Works on consulting, cloud, application development, cybersecurity, data, and enterprise transformation.", roles: ["Full Stack Developer", "Software Engineer", "Backend Developer", "Frontend Developer", "Data Analyst", "DevOps Engineer"] },
  { name: "HCLTech", url: "https://www.hcltech.com/careers", description: "Builds and supports engineering, cloud, digital workplace, data, security, and enterprise platforms.", roles: ["Full Stack Developer", "Software Engineer", "Backend Developer", "Frontend Developer", "Data Analyst", "DevOps Engineer"] },
  { name: "Cognizant", url: "https://careers.cognizant.com/", description: "Delivers software engineering, digital products, cloud, data, healthcare, and enterprise modernization.", roles: ["Full Stack Developer", "Software Engineer", "Backend Developer", "Frontend Developer", "Data Analyst", "DevOps Engineer"] },
  { name: "Accenture", url: "https://www.accenture.com/careers", description: "Runs consulting, technology, cloud, data, security, product, and digital engineering teams.", roles: ["Full Stack Developer", "Software Engineer", "Backend Developer", "Frontend Developer", "Data Analyst", "DevOps Engineer", "UI/UX Designer"] },
  { name: "Capgemini", url: "https://www.capgemini.com/careers/", description: "Works across application engineering, cloud, data, consulting, product design, and enterprise systems.", roles: ["Full Stack Developer", "Software Engineer", "Backend Developer", "Frontend Developer", "Data Analyst", "DevOps Engineer"] },
  { name: "Deloitte", url: "https://apply.deloitte.com/careers/SearchJobs", description: "Combines consulting, engineering, analytics, cyber, product delivery, and enterprise transformation.", roles: ["Full Stack Developer", "Software Engineer", "Backend Developer", "Frontend Developer", "Data Analyst", "DevOps Engineer", "UI/UX Designer"] },
  { name: "Salesforce", url: "https://careers.salesforce.com/", description: "Builds CRM, platform, automation, analytics, AI, and enterprise cloud products.", roles: ["Full Stack Developer", "Software Engineer", "Backend Developer", "Frontend Developer", "Data Scientist", "UI/UX Designer"] },
  { name: "Intel", url: "https://jobs.intel.com/", description: "Works on semiconductor platforms, developer tools, cloud infrastructure, AI, and edge systems.", roles: ["Software Engineer", "Backend Developer", "AI Engineer", "Data Scientist", "DevOps Engineer"] },
  { name: "PayPal", url: "https://paypal.eightfold.ai/careers", description: "Builds payments, risk, commerce, identity, platform, web, and financial technology systems.", roles: ["Full Stack Developer", "Software Engineer", "Backend Developer", "Frontend Developer", "Data Scientist", "Data Analyst"] },
  { name: "Cisco", url: "https://www.cisco.com/c/en/us/about/careers.html", description: "Creates networking, security, observability, collaboration, cloud, and infrastructure software.", roles: ["Software Engineer", "Backend Developer", "DevOps Engineer", "Full Stack Developer", "Data Analyst"] },
  { name: "VMware", url: "https://www.vmware.com/company/careers.html", description: "Works on virtualization, cloud infrastructure, platform engineering, networking, and developer services.", roles: ["Software Engineer", "Backend Developer", "DevOps Engineer", "Full Stack Developer"] },
  { name: "Atlassian", url: "https://www.atlassian.com/company/careers", description: "Builds collaboration, developer productivity, IT service, planning, and enterprise SaaS tools.", roles: ["Full Stack Developer", "Software Engineer", "Frontend Developer", "Backend Developer", "UI/UX Designer", "Data Analyst"] },
];

const roleCompanyOrder: Record<string, string[]> = {
  "full stack": ["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix", "Adobe", "Oracle", "IBM", "NVIDIA", "Zoho", "Freshworks", "TCS", "Infosys", "Wipro", "HCLTech", "Cognizant", "Accenture", "Capgemini", "Deloitte"],
  frontend: ["Google", "Microsoft", "Meta", "Apple", "Netflix", "Adobe", "Zoho", "Freshworks", "Atlassian", "Amazon", "Oracle", "TCS", "Infosys", "Wipro", "Accenture", "Deloitte"],
  backend: ["Google", "Microsoft", "Amazon", "Oracle", "IBM", "NVIDIA", "PayPal", "Cisco", "VMware", "Zoho", "Freshworks", "TCS", "Infosys", "HCLTech", "Cognizant", "Accenture"],
  ai: ["Google", "Microsoft", "Amazon", "Meta", "Apple", "Adobe", "IBM", "NVIDIA", "Intel", "Oracle", "Salesforce", "Deloitte", "Accenture"],
  ml: ["Google", "Microsoft", "Amazon", "Meta", "Apple", "Adobe", "IBM", "NVIDIA", "Intel", "Oracle", "Salesforce", "Deloitte", "Accenture"],
  "data scientist": ["Google", "Microsoft", "Amazon", "Meta", "Netflix", "Adobe", "IBM", "NVIDIA", "Oracle", "Salesforce", "PayPal", "Deloitte", "Accenture"],
  "data analyst": ["Amazon", "Microsoft", "Google", "Oracle", "IBM", "Salesforce", "TCS", "Infosys", "Wipro", "Cognizant", "Accenture", "Capgemini", "Deloitte", "Zoho", "Freshworks"],
  ui: ["Apple", "Adobe", "Meta", "Google", "Microsoft", "Netflix", "Atlassian", "Freshworks", "Zoho", "Accenture", "Deloitte"],
  devops: ["Amazon", "Microsoft", "Google", "Oracle", "IBM", "Cisco", "VMware", "NVIDIA", "TCS", "Infosys", "Wipro", "HCLTech", "Accenture", "Capgemini"],
};

function companyLogo(url: string) {
  return `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(url)}&sz=96`;
}

function roleKey(targetRole: string) {
  const lowered = targetRole.toLowerCase();
  if (lowered.includes("full")) return "full stack";
  if (lowered.includes("front")) return "frontend";
  if (lowered.includes("back")) return "backend";
  if (lowered.includes("data scientist")) return "data scientist";
  if (lowered.includes("data analyst")) return "data analyst";
  if (lowered.includes("devops") || lowered.includes("cloud")) return "devops";
  if (lowered.includes("ui") || lowered.includes("ux") || lowered.includes("design")) return "ui";
  if (lowered.includes("ml") || lowered.includes("machine")) return "ml";
  if (lowered.includes("ai")) return "ai";
  return "full stack";
}

function JobsPremium({ targetRole }: { targetRole: string }) {
  const key = roleKey(targetRole);
  const companyNames = roleCompanyOrder[key] || roleCompanyOrder["full stack"];
  const companies = companyNames
    .map((name) => companyCatalog.find((company) => company.name === name))
    .filter(Boolean) as typeof companyCatalog;
  const roleSuggestions = companies
    .flatMap((company) => company.roles)
    .filter((role, index, list) => list.indexOf(role) === index)
    .slice(0, 8);

  function openCareers(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="space-y-5">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Top Companies For Your Target Role</p>
          <h2 className="text-4xl font-black tracking-tight">Companies hiring for {targetRole}.</h2>
          <p className="mt-3 max-w-3xl text-slate-500 dark:text-slate-300">
            Browse relevant companies and jump straight to their official careers websites.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">{roleSuggestions.map((role) => <span className="pill" key={role}>{role}</span>)}</div>
        </div>
        <div className="grid min-w-64 gap-3 rounded-3xl bg-slate-100 p-5 dark:bg-white/10">
          <Building2 className="text-brand-600" size={28} />
          <p className="text-4xl font-black text-brand-600">{companies.length}</p>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">relevant companies</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {companies.map((company) => (
          <Card key={company.name} className="job-card-premium cursor-pointer">
            <div
              role="link"
              tabIndex={0}
              onClick={() => openCareers(company.url)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") openCareers(company.url);
              }}
              className="flex h-full flex-col"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/10">
                  <img className="h-full w-full object-contain p-2" src={companyLogo(company.url)} alt="" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-2xl font-black tracking-tight">{company.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">{company.description}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {company.roles.filter((role) => role === targetRole || roleSuggestions.includes(role)).slice(0, 6).map((role) => <span className="pill" key={role}>{role}</span>)}
              </div>
              <div className="mt-6 flex flex-1 items-end">
                <a
                  className="btn-primary w-full"
                  href={company.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  Careers <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
function Mentor({ user }: { user: User }) {
  const [messages, setMessages] = useState<Array<{ role: string; text: string; targetRole?: string }>>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || loading) return;
    const userText = text.trim();
    const activeRole = user.target_role || "Software Engineer";
    setText("");
    setLoading(true);
    setMessages((items) => [...items, { role: "user", text: userText, targetRole: activeRole }]);
    try {
      const result = await api.mentor(userText, activeRole);
      setMessages((items) => [...items, { role: "assistant", text: result.reply, targetRole: result.target_role || activeRole }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "The AI Mentor could not respond right now.";
      setMessages((items) => [...items, { role: "assistant", text: message, targetRole: activeRole }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto flex h-[68vh] max-w-5xl flex-col p-0">
      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 dark:border-white/10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow">Personalized Career Mentor</p>
          <h3 className="text-2xl font-black tracking-tight">Ask about {user.target_role}</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Uses your profile, resume, GitHub, roadmap, skill gaps, and interview progress.</p>
        </div>
        <span className="pill">Target Role: {user.target_role}</span>
      </div>

      <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-5">
        {!messages.length && (
          <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm leading-6 text-slate-500 dark:border-white/10 dark:text-slate-300">
            Ask for a roadmap, project ideas, resume feedback, interview prep, skill priorities, or companies to explore for your selected role.
          </div>
        )}
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={cn("chat whitespace-pre-wrap", message.role === "user" ? "chat-user" : "chat-ai")}>
            {message.text}
          </div>
        ))}
        {loading && <div className="chat chat-ai">Thinking...</div>}
      </div>

      <form onSubmit={send} className="flex gap-2 border-t border-slate-200 p-4 dark:border-white/10">
        <input
          className="input !mb-0"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Ask about your ${user.target_role} path...`}
        />
        <button className="btn-primary" disabled={loading}>{loading ? "Sending..." : "Send"}</button>
      </form>
    </Card>
  );
}
function Profile({ user, setUser, notify }: { user: User; setUser: (u: User) => void; notify: (m: string) => void }) {
  const [name, setName] = useState(user.name);
  const [skills, setSkills] = useState(user.skills.join(", "));
  const [interests, setInterests] = useState(user.career_interests || "");
  async function save() { const next = await api.updateProfile({ name, target_role: user.target_role, skills: skills.split(",").map((s) => s.trim()).filter(Boolean), github_username: user.github_username || "", career_interests: interests }); setUser(next); notify("Profile saved"); }
  return <Card className="max-w-3xl"><h3 className="text-xl font-black">Profile</h3><input className="input mt-4" value={name} onChange={(e) => setName(e.target.value)} /><textarea className="input min-h-36" value={skills} onChange={(e) => setSkills(e.target.value)} /><textarea className="input min-h-28" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="Career interests, preferred domains, goals" /><button className="btn-primary" onClick={save}>Save profile</button></Card>;
}

function SettingsPage() {
  const [health, setHealth] = useState<any>(null);
  useEffect(() => { api.health().then(setHealth); }, []);
  return <Card><h3 className="text-xl font-black">Settings</h3><p className="mt-3 text-slate-500">API status: {health ? "Connected" : "Checking..."}</p><p className="text-slate-500">Database: {health?.database || "unknown"}</p><p className="text-slate-500">Groq: {health?.groq_configured ? "Configured" : "Missing API key"}</p></Card>;
}

function ErrorBox({ text }: { text: string }) {
  return <p className="my-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm font-bold text-rose-600">{text}</p>;
}

function ProgressRow({ label, value }: { label: string; value: number }) {
  const safeValue = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
  return <div><div className="mb-1 flex justify-between text-sm"><span className="capitalize text-slate-500">{label.replace(/_/g, " ")}</span><b>{safeValue}%</b></div><div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${safeValue}%` }} /></div></div>;
}

function InfoCard({ title, meta, text }: { title: string; meta?: string; text?: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5"><div className="flex items-start justify-between gap-3"><b>{title}</b>{meta && <span className="pill">{meta}</span>}</div>{text && <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{text}</p>}</div>;
}

function WeekFocusPanel({ week }: { week: any }) {
  const tasks = (Array.isArray(week.tasks) ? week.tasks : [week.tasks]).filter(Boolean).slice(0, 4);
  const progress = Math.max(0, Math.min(100, Number(week.progress ?? 0)));
  return (
    <div className="week-focus-panel">
      <div>
        <div className="flex items-center justify-between gap-3">
          <h5 className="font-black">This Week Target</h5>
          <span className="pill">{progress}%</span>
        </div>
        <div className="mt-3 grid gap-2">
          {(tasks.length ? tasks : ["Complete this week's learning tasks"]).map((task: string) => (
            <div className="week-target-row" key={task}>
              <CheckCircle2 size={15} />
              <span>{task}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
          <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="mini-project-panel">
        <p className="text-xs font-black uppercase tracking-wide text-brand-600">Mini Project</p>
        <h5 className="mt-1 font-black">{week.mini_project || "Build a portfolio-ready practice project"}</h5>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="pill">{week.estimated_hours ? `${Math.max(1, Math.round(Number(week.estimated_hours) / 3))} Hours` : "3 Hours"}</span>
          <span className="pill">{week.difficulty || "Intermediate"}</span>
        </div>
        <button className="btn-secondary mt-4 w-full" type="button">View Project Guide</button>
      </div>
    </div>
  );
}

function RoadmapTimeline({ roadmap }: { roadmap: any }) {
  const weeks = roadmap?.weeks || [];
  if (!weeks.length) return null;
  return (
    <Card className="lg:col-span-2">
      <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <p className="eyebrow">Personalized roadmap</p>
          <h3 className="text-2xl font-black">Roadmap from Resume</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Generated from detected skills, missing skills, ATS score, experience level, and selected target role.</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-100 p-3 text-center dark:bg-white/10"><p className="text-2xl font-black text-brand-600">{roadmap.current_readiness || 0}%</p><p className="text-xs font-bold text-slate-500">Current</p></div>
          <div className="rounded-2xl bg-slate-100 p-3 text-center dark:bg-white/10"><p className="text-2xl font-black text-emerald-500">{roadmap.expected_readiness_after_completion || 0}%</p><p className="text-xs font-bold text-slate-500">Expected</p></div>
          <div className="rounded-2xl bg-slate-100 p-3 text-center dark:bg-white/10"><p className="text-sm font-black">{roadmap.experience_level || "Beginner"}</p><p className="text-xs font-bold text-slate-500">Level</p></div>
        </div>
      </div>

      <div className="mb-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <h4 className="font-black">Recommended Before Applying</h4>
          <List title="" items={roadmap.recommended_before_applying} compact />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <h4 className="font-black">Milestones</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {(roadmap.milestones || []).map((item: any) => <span className={cn("pill", item.completed && "bg-emerald-500/15 text-emerald-600 dark:text-emerald-200")} key={item.title}>{item.completed ? "âœ“ " : ""}{item.title}</span>)}
          </div>
        </div>
      </div>

      <div className="roadmap-timeline">
        {weeks.map((week: any) => (
          <details className="roadmap-week" key={week.week} open={week.week === 1}>
            <summary>
              <span className="roadmap-dot">{week.week}</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black uppercase text-brand-600">Week {week.week}</p>
                <h4 className="font-black">{week.goal}</h4>
                <div className="mt-2 flex flex-wrap gap-2">{(week.skills_to_learn || []).map((skill: string) => <span className="pill" key={skill}>{skill}</span>)}</div>
              </div>
              <div className="roadmap-week-meta">
                <span>{week.estimated_hours || 10} Hours</span>
                <span>{week.difficulty || "Intermediate"}</span>
              </div>
            </summary>
            <div className="roadmap-week-body">
              <div className="lg:col-span-2">
                <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                  <div>
                    <p className="eyebrow">Learning Resources</p>
                    <h5 className="text-xl font-black">Curated for this week</h5>
                  </div>
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-300">{week.practice_goal || "Use these resources to complete the weekly goal."}</p>
                </div>
                {(week.resources || []).length ? <div className="roadmap-resource-grid">
                  {(week.resources || []).map((resource: RoadmapResource, resourceIndex: number) => (
                    <RoadmapResourceCard resource={resource} index={resourceIndex} key={`${week.week}-${resource.type}-${resource.title}-${resource.url}`} />
                  ))}
                </div> : <p className="rounded-2xl bg-amber-500/10 p-3 text-xs font-bold text-amber-600">No learning resources available for this topic.</p>}
                <WeekFocusPanel week={week} />
              </div>
            </div>
          </details>
        ))}
      </div>
    </Card>
  );
}

function GitHubScoreBreakdown({ breakdown }: { breakdown?: Record<string, number> }) {
  const weights: Record<string, number> = {
    "Profile Completion": 10,
    "README Quality": 15,
    "Repository Quality": 20,
    "Project Complexity": 20,
    "Commit Consistency": 10,
    "Code Diversity": 10,
    "Documentation": 5,
    "Portfolio Website": 5,
    "Pinned Projects": 5,
    "Open Source Contribution": 5,
  };
  const entries = Object.entries(breakdown || {});
  if (!entries.length) return null;
  return <><h3 className="text-xl font-black">Portfolio score breakdown</h3><div className="mt-4 grid gap-3">{entries.map(([key, value]) => <ProgressRow key={key} label={`${key} (${value}/${weights[key] || 10})`} value={Math.round((Number(value) / (weights[key] || 10)) * 100)} />)}</div></>;
}

const hiddenMetadataValues = new Set(["", "not detected", "unknown", "n/a", "null", "undefined", "no data available", "license not detected", "github actions not detected"]);
function cleanMetadata(value: unknown) {
  const text = typeof value === "string" ? value.trim() : "";
  return hiddenMetadataValues.has(text.toLowerCase()) ? "" : text;
}

function RepositoryCard({ repo, detailed = false }: { repo: any; detailed?: boolean }) {
  const description = cleanMetadata(repo.description) || "This repository is currently under development. More project information will become available as additional documentation and source code are added.";
  const license = cleanMetadata(repo.license);
  const deploymentStatus = cleanMetadata(repo.deployment_status);
  const techStack = (repo.tech_stack || []).filter((item: unknown) => cleanMetadata(item));
  const languages = (repo.languages || []).filter((item: unknown) => cleanMetadata(item));
  const topics = (repo.topics || []).filter((item: unknown) => cleanMetadata(item));
  return (
    <details className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5" open={!detailed}>
      <summary className="cursor-pointer list-none">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <a className="text-lg font-black text-brand-600" href={repo.url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">{description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="pill">{repo.repository_health}% health</span>
              <span className="pill">{repo.stars || 0} stars</span>
              <span className="pill">{repo.forks || 0} forks</span>
              {deploymentStatus && <span className="pill">{deploymentStatus}</span>}
            </div>
          </div>
          <CircularProgress value={Number(repo.production_readiness || 0)} />
        </div>
      </summary>
      <div className="mt-4 grid gap-4 border-t border-slate-200 pt-4 dark:border-white/10 lg:grid-cols-2">
        <div>
          <List title="Tech stack" items={techStack} compact />
          <List title="Languages" items={languages} compact />
          <List title="Topics" items={topics} compact />
          {repo.deployment_url && <a className="btn-secondary mt-4" href={repo.deployment_url} target="_blank" rel="noopener noreferrer">Open Deployment</a>}
        </div>
        <div className="grid gap-3">
          <ProgressRow label="README Quality" value={Number(repo.readme_quality || 0)} />
          <ProgressRow label="Documentation Quality" value={Number(repo.documentation_quality || 0)} />
          <ProgressRow label="Project Complexity" value={Number(repo.project_complexity || 0)} />
          <ProgressRow label="Code Organization" value={Number(repo.code_organization || 0)} />
          {repo.last_updated && <p className="text-sm text-slate-500 dark:text-slate-300">Last updated: {new Date(repo.last_updated).toLocaleDateString()}</p>}
          {(repo.github_actions || license) && <div className="flex flex-wrap gap-2">{repo.github_actions && <span className="pill">GitHub Actions configured</span>}{license && <span className="pill">License: {license}</span>}</div>}
        </div>
      </div>
    </details>
  );
}

function ResourceCards({ title, items }: { title: string; items?: any[] }) {
  const resources = (items || []).filter((item) => item?.title && item?.provider && item?.type && item?.description && item?.url);
  if (!resources.length) return null;
  function openResource(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <div className="mt-5">
      <h4 className="mb-3 font-black">{title}</h4>
      <div className="grid gap-3 md:grid-cols-2">
        {resources.map((resource) => (
          <div
            key={`${resource.provider}-${resource.title}`}
            role="link"
            tabIndex={0}
            onClick={() => openResource(resource.url)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") openResource(resource.url);
            }}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-brand-500/50 hover:bg-brand-500/5 dark:border-white/10 dark:bg-white/5"
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="pill">{resource.type}</span>
              <span className="pill">{resource.provider}</span>
            </div>
            <h5 className="font-black">{resource.title}</h5>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">{resource.description}</p>
            <a className="btn-secondary mt-4 inline-flex" href={resource.url} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>
              Open Resource
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function List({ title, items, compact = false }: { title: string; items?: any[]; compact?: boolean }) {
  const normalized = (items || []).map((item) => typeof item === "string" ? item : item?.title || item?.skill || item?.name || item?.point || item?.text || JSON.stringify(item)).filter(Boolean);
  if (!normalized.length) return null;
  return <div className={compact ? "mt-3" : "mt-5"}><h4 className="mb-2 font-black">{title}</h4><div className="flex flex-wrap gap-2">{normalized.map((item) => <span className="pill" key={item}>{item}</span>)}</div></div>;
}

function Empty({ text }: { text: string }) {
  return <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-white/10">{text}</div>;
}

createRoot(document.getElementById("root")!).render(<App />);




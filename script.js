const roleData = {
  "Software Developer": {
    success: 78,
    skills: [
      ["JavaScript", 82],
      ["React", 76],
      ["System Design", 48],
      ["DSA", 62],
      ["SQL", 71],
    ],
    salaries: [
      ["Fresher", "4-8 LPA", 45],
      ["Mid", "8-15 LPA", 68],
      ["Senior", "15-35 LPA", 92],
    ],
    questions: [
      "Explain how React reconciliation works and when a component re-renders.",
      "How would you design a URL shortener for high traffic?",
      "Write the approach for finding the first non-repeating character in a string.",
    ],
    roadmap: ["Profile polish", "DSA practice", "React project", "System design basics", "Mock interviews", "Apply to product teams"],
  },
  "Data Scientist": {
    success: 72,
    skills: [
      ["Python", 80],
      ["Statistics", 65],
      ["SQL", 76],
      ["ML Models", 58],
      ["Visualization", 70],
    ],
    salaries: [
      ["Fresher", "5-9 LPA", 50],
      ["Mid", "10-18 LPA", 72],
      ["Senior", "18-38 LPA", 95],
    ],
    questions: [
      "How do you handle imbalanced classes in a classification problem?",
      "Explain bias variance tradeoff using a practical example.",
      "What metrics would you use for a recommendation model?",
    ],
    roadmap: ["Statistics refresh", "Kaggle notebook", "ML project", "SQL case studies", "Model deployment", "Analytics interviews"],
  },
  "AI Engineer": {
    success: 75,
    skills: [
      ["Python", 84],
      ["Deep Learning", 61],
      ["LLM APIs", 69],
      ["Vector DBs", 52],
      ["MLOps", 46],
    ],
    salaries: [
      ["Fresher", "6-10 LPA", 58],
      ["Mid", "12-22 LPA", 78],
      ["Senior", "22-45 LPA", 98],
    ],
    questions: [
      "How would you build a RAG system for company policy documents?",
      "What causes hallucination in LLM apps and how can you reduce it?",
      "Explain fine-tuning versus prompt engineering tradeoffs.",
    ],
    roadmap: ["LLM foundations", "RAG project", "Vector search", "Evaluation harness", "MLOps basics", "AI product portfolio"],
  },
  "Cyber Security Analyst": {
    success: 70,
    skills: [
      ["Networking", 74],
      ["Linux", 68],
      ["Threat Analysis", 55],
      ["SIEM", 50],
      ["Incident Response", 44],
    ],
    salaries: [
      ["Fresher", "4-7 LPA", 44],
      ["Mid", "8-16 LPA", 70],
      ["Senior", "16-34 LPA", 90],
    ],
    questions: [
      "Walk through how you would investigate a suspicious login alert.",
      "Explain the difference between vulnerability, threat, and risk.",
      "How does SQL injection work and how do you prevent it?",
    ],
    roadmap: ["Networking lab", "Linux hardening", "SOC simulations", "SIEM dashboard", "Security certification", "Incident response drills"],
  },
  "Product Manager": {
    success: 73,
    skills: [
      ["User Research", 68],
      ["Roadmapping", 64],
      ["Analytics", 59],
      ["Communication", 82],
      ["Market Sizing", 51],
    ],
    salaries: [
      ["Fresher", "6-11 LPA", 58],
      ["Mid", "12-24 LPA", 78],
      ["Senior", "24-50 LPA", 100],
    ],
    questions: [
      "How would you prioritize features for a placement preparation app?",
      "Define success metrics for a new AI resume optimizer.",
      "Tell me about a time you handled conflicting stakeholder requests.",
    ],
    roadmap: ["Product teardown", "User interviews", "Metrics case studies", "PRD portfolio", "Mock PM interviews", "Associate PM applications"],
  },
};

const jobs = [
  {
    company: "Zoho",
    title: "Frontend Developer",
    role: "Software Developer",
    type: "Full-time",
    location: "Chennai",
    skills: ["React", "JavaScript", "SQL"],
    salary: "8-12 LPA",
    salaryRank: 12,
    applyUrl: "https://www.zoho.com/careers/",
    summary: "Build customer-facing product interfaces with clean state management and accessible UI patterns.",
  },
  {
    company: "TCS",
    title: "Software Engineer Trainee",
    role: "Software Developer",
    type: "Full-time",
    location: "Bengaluru",
    skills: ["JavaScript", "DSA", "SQL"],
    salary: "4-7 LPA",
    salaryRank: 7,
    applyUrl: "https://www.tcs.com/careers",
    summary: "Entry-level engineering role for application development, testing, and enterprise delivery teams.",
  },
  {
    company: "Amazon",
    title: "SDE I",
    role: "Software Developer",
    type: "Full-time",
    location: "Hyderabad",
    skills: ["DSA", "System Design", "JavaScript"],
    salary: "18-32 LPA",
    salaryRank: 32,
    applyUrl: "https://www.amazon.jobs/en/locations/india",
    summary: "Work on scalable services with strong ownership, coding depth, and operational excellence.",
  },
  {
    company: "Microsoft",
    title: "Software Engineer",
    role: "Software Developer",
    type: "Full-time",
    location: "Hyderabad",
    skills: ["React", "System Design", "SQL"],
    salary: "20-36 LPA",
    salaryRank: 36,
    applyUrl: "https://careers.microsoft.com/v2/global/en/locations/india.html",
    summary: "Build cloud and productivity platform features with engineering quality and customer focus.",
  },
  {
    company: "Accenture",
    title: "Data Analyst",
    role: "Data Scientist",
    type: "Full-time",
    location: "Pune",
    skills: ["SQL", "Python", "Visualization"],
    salary: "6-10 LPA",
    salaryRank: 10,
    applyUrl: "https://www.accenture.com/in-en/careers",
    summary: "Analyze business data, create dashboards, and turn raw metrics into client-ready insights.",
  },
  {
    company: "IBM",
    title: "Associate Data Scientist",
    role: "Data Scientist",
    type: "Full-time",
    location: "Bengaluru",
    skills: ["Python", "Statistics", "ML Models"],
    salary: "9-16 LPA",
    salaryRank: 16,
    applyUrl: "https://www.ibm.com/careers/in-en",
    summary: "Apply statistical modeling and machine learning workflows to enterprise data problems.",
  },
  {
    company: "Oracle",
    title: "Data Science Intern",
    role: "Data Scientist",
    type: "Internship",
    location: "Bengaluru",
    skills: ["Python", "SQL", "Statistics"],
    salary: "50k/mo",
    salaryRank: 6,
    applyUrl: "https://www.oracle.com/in/careers/",
    summary: "Internship for experimentation, data preparation, and model evaluation on cloud product datasets.",
  },
  {
    company: "Microsoft",
    title: "AI Engineer Intern",
    role: "AI Engineer",
    type: "Internship",
    location: "Hyderabad",
    skills: ["Python", "LLM APIs", "Deep Learning"],
    salary: "60k/mo",
    salaryRank: 7,
    applyUrl: "https://careers.microsoft.com/v2/global/en/locations/india.html",
    summary: "Prototype AI features, evaluate model behavior, and integrate LLM capabilities into products.",
  },
  {
    company: "Google",
    title: "AI/ML Software Engineer",
    role: "AI Engineer",
    type: "Full-time",
    location: "Bengaluru",
    skills: ["Python", "Deep Learning", "MLOps"],
    salary: "24-45 LPA",
    salaryRank: 45,
    applyUrl: "https://www.google.com/about/careers/applications/locations/india/",
    summary: "Build ML-powered systems with strong software engineering, evaluation, and deployment practices.",
  },
  {
    company: "Infosys",
    title: "AI Associate",
    role: "AI Engineer",
    type: "Full-time",
    location: "Mysuru",
    skills: ["Python", "ML Models", "LLM APIs"],
    salary: "5-8 LPA",
    salaryRank: 8,
    applyUrl: "https://www.infosys.com/careers/",
    summary: "Work on AI accelerators, automation use cases, and model-backed enterprise solutions.",
  },
  {
    company: "Cisco",
    title: "Security Analyst Intern",
    role: "Cyber Security Analyst",
    type: "Internship",
    location: "Bengaluru",
    skills: ["Networking", "Linux", "Threat Analysis"],
    salary: "45k/mo",
    salaryRank: 5,
    applyUrl: "https://www.cisco.com/c/en/us/about/careers.html",
    summary: "Monitor security signals, investigate alerts, and learn incident response in a network-first environment.",
  },
  {
    company: "HCLTech",
    title: "SOC Analyst",
    role: "Cyber Security Analyst",
    type: "Full-time",
    location: "Noida",
    skills: ["SIEM", "Incident Response", "Linux"],
    salary: "6-11 LPA",
    salaryRank: 11,
    applyUrl: "https://www.hcltech.com/careers",
    summary: "Handle security monitoring, triage, escalation, and client-facing SOC operations.",
  },
  {
    company: "Wipro",
    title: "Cyber Defense Analyst",
    role: "Cyber Security Analyst",
    type: "Full-time",
    location: "Remote",
    skills: ["Threat Analysis", "Networking", "Incident Response"],
    salary: "7-13 LPA",
    salaryRank: 13,
    applyUrl: "https://careers.wipro.com/",
    summary: "Support threat detection, vulnerability workflows, and managed security delivery.",
  },
  {
    company: "Razorpay",
    title: "Associate Product Manager",
    role: "Product Manager",
    type: "Full-time",
    location: "Bengaluru",
    skills: ["User Research", "Analytics", "Roadmapping"],
    salary: "14-24 LPA",
    salaryRank: 24,
    applyUrl: "https://razorpay.com/jobs/",
    summary: "Own product discovery, metrics, execution, and stakeholder communication for fintech workflows.",
  },
  {
    company: "Freshworks",
    title: "Product Analyst Intern",
    role: "Product Manager",
    type: "Internship",
    location: "Chennai",
    skills: ["Analytics", "Communication", "User Research"],
    salary: "40k/mo",
    salaryRank: 5,
    applyUrl: "https://www.freshworks.com/company/careers/",
    summary: "Support product decisions through user insights, funnel analysis, and release experiments.",
  },
  {
    company: "Cognizant",
    title: "Product Management Associate",
    role: "Product Manager",
    type: "Full-time",
    location: "Pune",
    skills: ["Roadmapping", "Communication", "Market Sizing"],
    salary: "8-15 LPA",
    salaryRank: 15,
    applyUrl: "https://careers.cognizant.com/india-en/",
    summary: "Coordinate product requirements, client needs, releases, and measurable delivery outcomes.",
  },
];

const pageTitles = {
  dashboard: "Career Readiness Dashboard",
  roadmap: "AI Career GPS",
  interview: "Smart Mock Interview",
  jobs: "Job Recommendation Engine",
  resume: "AI Resume Optimizer",
  mentor: "AI Mentor Chatbot",
};

const interviewQuestionBank = {
  "Frontend Developer": {
    HR: [
      { id: "fe-hr-1", text: "Tell me about a frontend project you are proud of and the impact it created.", ideal: "A strong answer names the project, user problem, frontend stack, personal contribution, measurable impact, and one learning." },
      { id: "fe-hr-2", text: "How do you handle feedback when a UI you built needs major changes?", ideal: "A strong answer shows openness, clarifies requirements, prioritizes user needs, iterates quickly, and communicates tradeoffs." },
      { id: "fe-hr-3", text: "Why do you want to work as a Frontend Developer?", ideal: "A strong answer connects user experience, engineering craft, accessibility, performance, and product outcomes." },
    ],
    Technical: [
      { id: "fe-tech-1", text: "Explain React rendering and how you prevent unnecessary re-renders.", ideal: "Mention state and props changes, reconciliation, memoization, stable callbacks, component splitting, and measuring before optimizing." },
      { id: "fe-tech-2", text: "How would you improve Core Web Vitals on a slow dashboard?", ideal: "Discuss bundle splitting, lazy loading, image optimization, caching, reducing main-thread work, API pagination, and performance measurement." },
      { id: "fe-tech-3", text: "Explain semantic HTML and accessibility checks you use before shipping.", ideal: "Cover landmarks, labels, keyboard navigation, contrast, focus states, ARIA only when needed, and screen reader testing." },
    ],
    Coding: [
      { id: "fe-code-1", text: "Write a {language} function to debounce a search input callback.", ideal: "Use a timer retained across calls, clear the old timer, schedule the callback after delay, and preserve arguments/context where relevant." },
      { id: "fe-code-2", text: "Write a {language} solution to flatten a nested array.", ideal: "Use recursion or an explicit stack, handle arbitrary depth, keep order, and explain time complexity." },
      { id: "fe-code-3", text: "Write a {language} function to group an array of objects by a key.", ideal: "Iterate once, read the key value, create buckets, push items, and return a map/object/dictionary." },
    ],
  },
  "Backend Developer": {
    HR: [
      { id: "be-hr-1", text: "Tell me about a time you debugged a production or API issue.", ideal: "A strong answer explains symptoms, logs/metrics used, root cause, fix, prevention, and communication." },
      { id: "be-hr-2", text: "How do you manage deadlines when backend requirements keep changing?", ideal: "Clarify scope, break work into milestones, communicate risk, prioritize critical paths, and document decisions." },
      { id: "be-hr-3", text: "Why Backend Development?", ideal: "Connect reliability, data modeling, APIs, scalability, security, and solving business workflows." },
    ],
    Technical: [
      { id: "be-tech-1", text: "Design an authentication system with access and refresh tokens.", ideal: "Discuss hashed passwords, short-lived access tokens, refresh rotation, secure storage, revocation, rate limits, and audit logs." },
      { id: "be-tech-2", text: "How would you design pagination and filtering for a large jobs API?", ideal: "Mention indexed filters, cursor pagination, validation, stable sorting, caching, and response shape." },
      { id: "be-tech-3", text: "Explain database transactions and when you would use them.", ideal: "Cover atomicity, consistency, commit/rollback, isolation concerns, and examples like payments or inventory." },
    ],
    Coding: [
      { id: "be-code-1", text: "Write a {language} function to validate and normalize an email list, removing duplicates.", ideal: "Trim, lowercase, validate format, use a set for uniqueness, and return clean results with invalid entries handled." },
      { id: "be-code-2", text: "Write a {language} rate limiter for user requests in a fixed time window.", ideal: "Store request counts by user and window, increment safely, expire windows, and reject when limit is exceeded." },
      { id: "be-code-3", text: "Write a {language} function to merge two sorted arrays.", ideal: "Use two pointers, compare current values, append remaining items, and explain O(n + m)." },
    ],
  },
  "Full Stack Developer": {
    HR: [
      { id: "fs-hr-1", text: "Describe a full-stack feature you built from UI to database.", ideal: "Cover product goal, frontend flow, API contract, database model, testing, deployment, and impact." },
      { id: "fs-hr-2", text: "How do you decide whether logic belongs on frontend or backend?", ideal: "Discuss security, validation, user experience, performance, source of truth, and maintainability." },
      { id: "fs-hr-3", text: "How do you collaborate with designers and backend engineers?", ideal: "Mention contracts, prototypes, feedback loops, documentation, and shared acceptance criteria." },
    ],
    Technical: [
      { id: "fs-tech-1", text: "Design a resume upload and ATS analysis feature end to end.", ideal: "Cover upload UI, file validation, storage, parsing, API, scoring worker, database records, progress states, and security." },
      { id: "fs-tech-2", text: "How would you handle form validation across client and server?", ideal: "Use shared schemas where possible, client feedback for UX, server validation for trust, and clear error mapping." },
      { id: "fs-tech-3", text: "Explain how you would secure a full-stack dashboard.", ideal: "Discuss auth, RBAC, CSRF/XSS protection, input validation, secure headers, logging, and dependency hygiene." },
    ],
    Coding: [
      { id: "fs-code-1", text: "Write a {language} function to transform API errors into form field messages.", ideal: "Map error objects by field, provide fallback global messages, and handle unknown structures safely." },
      { id: "fs-code-2", text: "Write a {language} function to compute job match percentage from user skills and job skills.", ideal: "Normalize skill names, compare sets, weight matched skills, and return a bounded percentage." },
      { id: "fs-code-3", text: "Write a {language} function to cache expensive results with a time-to-live.", ideal: "Store value and expiry time, return cached value before expiry, recompute after expiry, and handle keys consistently." },
    ],
  },
  "Data Analyst": {
    HR: [
      { id: "da-hr-1", text: "Tell me about a time data changed your decision.", ideal: "State the original assumption, data explored, insight, decision, result, and limitation." },
      { id: "da-hr-2", text: "How do you explain technical findings to non-technical stakeholders?", ideal: "Use simple language, visuals, business metrics, assumptions, and actionable recommendations." },
      { id: "da-hr-3", text: "Why Data Analytics?", ideal: "Connect curiosity, business impact, storytelling, SQL/statistics, and decision support." },
    ],
    Technical: [
      { id: "da-tech-1", text: "Explain the difference between inner join, left join, and full outer join.", ideal: "Define each join by row inclusion, give a practical example, and mention duplicate/key considerations." },
      { id: "da-tech-2", text: "How would you investigate a sudden drop in conversion rate?", ideal: "Segment by funnel, source, device, geography, release changes, data quality, seasonality, and statistical significance." },
      { id: "da-tech-3", text: "What makes a dashboard useful for business users?", ideal: "Clear KPIs, context, filters, trends, definitions, latency expectations, and actionable layout." },
    ],
    Coding: [
      { id: "da-code-1", text: "Write a {language} function to calculate average order value from transactions.", ideal: "Sum revenue, count valid orders, handle empty data, and return a numeric average." },
      { id: "da-code-2", text: "Write a {language} function to find the top 3 most frequent values in a list.", ideal: "Count frequencies with a map, sort or use a heap, handle ties, and return top values." },
      { id: "da-code-3", text: "Write a {language} function to remove outliers using the IQR method.", ideal: "Sort values, calculate Q1/Q3, compute IQR, define bounds, and filter values." },
    ],
  },
  "AI/ML Engineer": {
    HR: [
      { id: "aiml-hr-1", text: "Describe an AI/ML project and how you evaluated whether it worked.", ideal: "Explain problem, data, model, metric, validation method, error analysis, deployment or demo, and learning." },
      { id: "aiml-hr-2", text: "How do you handle uncertainty when model results are imperfect?", ideal: "Discuss baselines, error analysis, stakeholder expectations, iteration, monitoring, and risk communication." },
      { id: "aiml-hr-3", text: "Why AI/ML Engineering?", ideal: "Connect modeling, software engineering, experimentation, responsible AI, and product value." },
    ],
    Technical: [
      { id: "aiml-tech-1", text: "Explain overfitting and how you reduce it.", ideal: "Mention train/test gap, regularization, cross-validation, more data, simpler models, dropout/early stopping, and feature control." },
      { id: "aiml-tech-2", text: "How would you build a RAG chatbot for career guidance?", ideal: "Cover document ingestion, chunking, embeddings, vector search, prompt construction, citations, evaluation, and guardrails." },
      { id: "aiml-tech-3", text: "What metrics would you use for a classification model and why?", ideal: "Discuss accuracy, precision, recall, F1, ROC-AUC, confusion matrix, class imbalance, and business cost." },
    ],
    Coding: [
      { id: "aiml-code-1", text: "Write a {language} function to compute cosine similarity between two vectors.", ideal: "Compute dot product, vector norms, handle zero vectors, and return dot divided by norm product." },
      { id: "aiml-code-2", text: "Write a {language} function to split a dataset into train and test sets.", ideal: "Shuffle deterministically if possible, split by ratio, avoid leakage, and return two arrays." },
      { id: "aiml-code-3", text: "Write a {language} function to calculate precision and recall from TP, FP, and FN.", ideal: "Precision is TP/(TP+FP), recall is TP/(TP+FN), handle zero denominators safely." },
    ],
  },
};

roleData["Frontend Developer"] = roleData["Software Developer"];
roleData["Backend Developer"] = roleData["Software Developer"];
roleData["Full Stack Developer"] = roleData["Software Developer"];
roleData["Data Analyst"] = roleData["Data Scientist"];
roleData["AI/ML Engineer"] = roleData["AI Engineer"];

let activeRole = "Frontend Developer";
let questionIndex = 0;
let resumeAtsScore = 69;
let uploadedResumeName = "";
let gpsAnalysis = null;
let currentUser = null;
let chatMessages = [];
let interviewSession = null;
let interviewHistory = { seenQuestionIds: [], sessions: [] };
let activeSpeechRecognition = null;

const USERS_KEY = "careerCopilotUsers";
const SESSION_KEY = "careerCopilotSession";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function setWidth(id, value) {
  const element = $(id);
  element.style.width = `${value}%`;
}

function loadUsers() {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  if (users.length) return users;
  const demoUsers = [
    {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name: "Rahul Kumar",
      email: "demo@careercopilot.ai",
      password: "Demo@1234",
      data: {
        activeRole: "Software Developer",
        resumeAtsScore: 69,
        gpsSkillInput: "HTML, CSS, JavaScript, React, SQL",
        resumeInput: "Built React dashboard for placement analytics. Created API integrations and improved page speed.",
        uploadedResumeName: "",
        chatMessages: [],
        interviewHistory: { seenQuestionIds: [], sessions: [] },
      },
    },
  ];
  localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
  return demoUsers;
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function findUserByEmail(email) {
  return loadUsers().find((user) => user.email.toLowerCase() === email.toLowerCase());
}

function setAuthMessage(message, type = "") {
  $("#authMessage").textContent = message;
  $("#authMessage").className = `auth-message ${type}`.trim();
}

function setAuthMode(mode) {
  const loginMode = mode === "login";
  $("#loginForm").classList.toggle("hidden", !loginMode);
  $("#registerForm").classList.toggle("hidden", loginMode);
  $("#showLoginBtn").classList.toggle("active", loginMode);
  $("#showRegisterBtn").classList.toggle("active", !loginMode);
  setAuthMessage(loginMode ? "Demo account: demo@careercopilot.ai / Demo@1234" : "Create an account. Your data will be stored in this browser.");
}

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "AI";
}

function persistCurrentUser() {
  if (!currentUser) return;
  const users = loadUsers();
  const index = users.findIndex((user) => user.id === currentUser.id);
  if (index === -1) return;
  currentUser.data = {
    ...currentUser.data,
    activeRole,
    resumeAtsScore,
    gpsSkillInput: $("#gpsSkillInput").value,
    resumeInput: $("#resumeInput").value,
    uploadedResumeName,
    gpsAnalysis,
    chatMessages,
    interviewHistory,
  };
  users[index] = currentUser;
  saveUsers(users);
}

function applyUserData(user) {
  currentUser = user;
  const data = user.data || {};
  activeRole = data.activeRole || "Software Developer";
  resumeAtsScore = data.resumeAtsScore || 69;
  uploadedResumeName = data.uploadedResumeName || "";
  gpsAnalysis = data.gpsAnalysis || null;
  chatMessages = data.chatMessages || [];
  interviewHistory = data.interviewHistory || { seenQuestionIds: [], sessions: [] };

  $("#profileName").textContent = user.name;
  $("#profileEmail").textContent = user.email;
  $("#profileAvatar").textContent = initials(user.name);
  $("#roleSelect").value = activeRole;
  $("#gpsSkillInput").value = data.gpsSkillInput || "HTML, CSS, JavaScript, React, SQL";
  $("#resumeInput").value = data.resumeInput || "Built React dashboard for placement analytics. Created API integrations and improved page speed.";
  $("#uploadStatus").textContent = uploadedResumeName
    ? `${uploadedResumeName} loaded from saved browser data.`
    : "No file uploaded yet. You can also paste resume text below.";
  $("#authScreen").classList.add("hidden");
  $("#appShell").classList.remove("hidden");
  renderAll();
  renderChat();
}

function loginUser(email, password) {
  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    setAuthMessage("Invalid email or password.", "error");
    return;
  }
  localStorage.setItem(SESSION_KEY, user.id);
  applyUserData(user);
}

function registerUser(name, email, password) {
  const users = loadUsers();
  if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    setAuthMessage("This email already has an account. Please login.", "error");
    return;
  }
  const user = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name,
    email,
    password,
    data: {
      activeRole: "Software Developer",
      resumeAtsScore: 69,
      gpsSkillInput: "HTML, CSS, JavaScript, React, SQL",
      resumeInput: "",
      uploadedResumeName: "",
      chatMessages: [],
      interviewHistory: { seenQuestionIds: [], sessions: [] },
    },
  };
  users.push(user);
  saveUsers(users);
  localStorage.setItem(SESSION_KEY, user.id);
  applyUserData(user);
}

function logoutUser() {
  persistCurrentUser();
  currentUser = null;
  localStorage.removeItem(SESSION_KEY);
  $("#appShell").classList.add("hidden");
  $("#authScreen").classList.remove("hidden");
  setAuthMode("login");
}

function restoreSession() {
  const sessionId = localStorage.getItem(SESSION_KEY);
  const users = loadUsers();
  const user = users.find((item) => item.id === sessionId);
  if (user) {
    applyUserData(user);
  } else {
    $("#authScreen").classList.remove("hidden");
    $("#appShell").classList.add("hidden");
  }
}

function renderDashboard() {
  const data = roleData[activeRole];
  const resumeScore = resumeAtsScore;
  const githubScore = activeRole === "Cyber Security Analyst" ? 71 : 82;

  $("#successRing").textContent = `${data.success}%`;
  $("#successRing").style.setProperty("--score", `${data.success}%`);
  $("#skillMetric").textContent = `${Math.round(data.skills.reduce((sum, item) => sum + item[1], 0) / data.skills.length)}%`;
  $("#resumeMetric").textContent = `${resumeScore}%`;
  $("#githubMetric").textContent = `${githubScore}%`;
  $("#roleChip").textContent = activeRole;
  $("#heroHeading").textContent = `${activeRole} path is ${data.success >= 75 ? "nearly ready" : "gaining momentum"}.`;
  $("#heroText").textContent = `Focus on ${data.skills.sort((a, b) => a[1] - b[1])[0][0]} and one portfolio project this week to lift your match score.`;

  setWidth("#skillBar", Number($("#skillMetric").textContent.replace("%", "")));
  setWidth("#resumeBar", resumeScore);
  setWidth("#githubBar", githubScore);

  $("#skillList").innerHTML = data.skills
    .map(([skill, value]) => `
      <div class="skill-row">
        <strong>${skill}</strong>
        <div class="bar"><span style="width: ${value}%"></span></div>
        <span>${value}%</span>
      </div>
    `)
    .join("");

  $("#salaryBars").innerHTML = data.salaries
    .map(([level, label, value]) => `
      <div class="salary-row">
        <strong>${level}</strong>
        <div class="bar"><span style="width: ${value}%"></span></div>
        <span>${label}</span>
      </div>
    `)
    .join("");
}

function parseSkillInput(value) {
  return value
    .toLowerCase()
    .split(/[\n,;|]+/)
    .map((skill) => skill.trim())
    .filter(Boolean);
}

function skillMatches(userSkills, requiredSkill) {
  const required = requiredSkill.toLowerCase();
  return userSkills.some((skill) => required.includes(skill) || skill.includes(required));
}

function analyzeGpsSkills() {
  const data = roleData[activeRole];
  const userSkills = parseSkillInput($("#gpsSkillInput").value);
  const required = data.skills.map(([skill]) => skill);
  const matched = required.filter((skill) => skillMatches(userSkills, skill));
  const missing = required.filter((skill) => !skillMatches(userSkills, skill));
  const readiness = Math.round((matched.length / required.length) * 100);

  gpsAnalysis = { userSkills, matched, missing, readiness };
  $("#gpsReadiness").textContent = `${readiness}%`;
  $("#gpsSummary").textContent = missing.length
    ? `You match ${matched.length} of ${required.length} core skills for ${activeRole}. Start with ${missing[0]}, then build proof through projects and mock interviews.`
    : `You match the core ${activeRole} skills. Your GPS now focuses on portfolio proof, interview polish, and applications.`;
  $("#gpsTags").innerHTML = [
    ...matched.map((skill) => `<span>${skill} matched</span>`),
    ...missing.map((skill) => `<span class="missing">${skill} missing</span>`),
  ].join("");
  renderRoadmap();
  persistCurrentUser();
}

function getGpsNodes() {
  const data = roleData[activeRole];
  if (!gpsAnalysis) {
    return data.roadmap.map((title, index) => ({
      title,
      detail: roadmapCopy(title),
      state: index < 2 ? "done" : index < 4 ? "progress" : "locked",
    }));
  }

  const missingNodes = gpsAnalysis.missing.map((skill, index) => ({
    title: `Learn ${skill}`,
    detail: `Focus on fundamentals, practice tasks, and one mini project using ${skill}.`,
    state: index === 0 ? "progress" : "locked",
  }));

  return [
    {
      title: "Skills you already have",
      detail: gpsAnalysis.matched.length
        ? `Matched: ${gpsAnalysis.matched.join(", ")}. Keep these visible in your resume and projects.`
        : "No core role skills matched yet. Start with the first missing skill below.",
      state: gpsAnalysis.matched.length ? "done" : "progress",
    },
    ...missingNodes,
    {
      title: `${activeRole} portfolio project`,
      detail: `Build one project that proves ${gpsAnalysis.missing[0] || gpsAnalysis.matched[0] || "your strongest skill"} in a realistic use case.`,
      state: gpsAnalysis.missing.length > 1 ? "locked" : "progress",
    },
    {
      title: "Resume and ATS update",
      detail: "Add role keywords, metrics, GitHub links, and project outcomes before applying.",
      state: "locked",
    },
    {
      title: "Mock interview and applications",
      detail: "Complete one technical mock, one HR mock, then apply to high-match jobs.",
      state: "locked",
    },
  ];
}

function renderRoadmap() {
  const nodes = getGpsNodes();
  $("#gpsRoleChip").textContent = activeRole;
  $("#roadmapTimeline").innerHTML = nodes
    .map((node, index) => {
      const label = node.state === "done" ? "Done" : node.state === "progress" ? "In progress" : "Locked";
      return `
        <article class="roadmap-node">
          <div class="node-icon ${node.state}">${index + 1}</div>
          <div>
            <h3>${node.title}</h3>
            <p>${node.detail}</p>
          </div>
          <span>${label}</span>
        </article>
      `;
    })
    .join("");
}

function renderSavedGpsAnalysis() {
  if (!gpsAnalysis) {
    $("#gpsReadiness").textContent = "--";
    $("#gpsSummary").textContent = "Enter your skills to generate a custom career route.";
    $("#gpsTags").innerHTML = "";
    return;
  }
  $("#gpsReadiness").textContent = `${gpsAnalysis.readiness}%`;
  $("#gpsSummary").textContent = gpsAnalysis.missing.length
    ? `You match ${gpsAnalysis.matched.length} core skills for ${activeRole}. Continue with ${gpsAnalysis.missing[0]}.`
    : `You match the core ${activeRole} skills. Focus on portfolio proof, interview polish, and applications.`;
  $("#gpsTags").innerHTML = [
    ...gpsAnalysis.matched.map((skill) => `<span>${skill} matched</span>`),
    ...gpsAnalysis.missing.map((skill) => `<span class="missing">${skill} missing</span>`),
  ].join("");
}

function roadmapCopy(step) {
  const copy = {
    "Profile polish": "Complete profile details, target companies, and preferred locations.",
    "DSA practice": "Solve 20 role-aligned problems and review weak patterns.",
    "React project": "Ship a dashboard with API integration, charts, and auth states.",
    "System design basics": "Practice caching, queues, databases, and scaling tradeoffs.",
    "Mock interviews": "Complete two technical rounds and one HR round.",
    "Apply to product teams": "Apply to high-match roles with tailored resumes.",
  };
  return copy[step] || "Complete this milestone to unlock stronger recommendations.";
}

function getInterviewBankForRole(role) {
  if (interviewQuestionBank[role]) return interviewQuestionBank[role];
  if (role === "Software Developer") return interviewQuestionBank["Full Stack Developer"];
  if (role === "Data Scientist") return interviewQuestionBank["Data Analyst"];
  if (role === "AI Engineer") return interviewQuestionBank["AI/ML Engineer"];
  return interviewQuestionBank["Frontend Developer"];
}

function getAvailableQuestions(role, round) {
  const bank = getInterviewBankForRole(role);
  return (bank[round] || []).filter((question) => !interviewHistory.seenQuestionIds.includes(question.id));
}

function formatQuestion(question) {
  const language = $("#languageSelect").value;
  return question.text.replaceAll("{language}", language);
}

function showLanguageField() {
  $("#languageField").classList.toggle("hidden", $("#roundSelect").value !== "Coding");
}

function startInterviewSession() {
  const round = $("#roundSelect").value;
  const language = $("#languageSelect").value;
  const available = getAvailableQuestions(activeRole, round);
  interviewSession = {
    id: Date.now(),
    role: activeRole,
    round,
    language,
    answers: [],
    currentQuestion: null,
    startedAt: new Date().toISOString(),
  };
  $("#interviewStatus").textContent = available.length
    ? `${round} Round started for ${activeRole}. ${available.length} unseen questions available.`
    : `No unseen ${round} questions remain for ${activeRole}. Change the round or target role.`;
  $("#interviewReport").innerHTML = "Finish an interview to generate a full report.";
  nextInterviewQuestion();
}

function nextInterviewQuestion() {
  if (!interviewSession) {
    $("#interviewStatus").textContent = "Start an interview session first.";
    return;
  }
  const available = getAvailableQuestions(interviewSession.role, interviewSession.round);
  if (!available.length) {
    $("#questionText").textContent = "No unseen questions left for this role and round.";
    $("#questionMode").textContent = "Complete";
    $("#interviewStatus").textContent = "Finish the report or choose a different round.";
    return;
  }
  const question = available[0];
  interviewSession.currentQuestion = question;
  if (!interviewHistory.seenQuestionIds.includes(question.id)) {
    interviewHistory.seenQuestionIds.push(question.id);
  }
  $("#questionText").textContent = formatQuestion(question);
  $("#questionMode").textContent = interviewSession.round === "Coding" ? `${interviewSession.round} - ${interviewSession.language}` : interviewSession.round;
  $("#answerInput").value = "";
  $("#interviewScore").textContent = "--";
  $("#scoreBreakdown").innerHTML = "";
  $("#interviewFeedback").textContent = "Answer with examples, clear reasoning, and a complete conclusion.";
  persistCurrentUser();
}

function evaluateInterviewAnswer() {
  if (!interviewSession || !interviewSession.currentQuestion) {
    $("#interviewFeedback").textContent = "Start the interview and load a question first.";
    return;
  }
  const answer = $("#answerInput").value.trim();
  if (!answer) {
    $("#interviewFeedback").textContent = "Please type or speak an answer before evaluation.";
    return;
  }
  const evaluation = scoreInterviewAnswer(answer, interviewSession.currentQuestion, interviewSession.round);
  const result = {
    questionId: interviewSession.currentQuestion.id,
    question: formatQuestion(interviewSession.currentQuestion),
    answer,
    round: interviewSession.round,
    language: interviewSession.language,
    ideal: interviewSession.currentQuestion.ideal,
    ...evaluation,
  };
  interviewSession.answers.push(result);
  if (!interviewHistory.seenQuestionIds.includes(result.questionId)) {
    interviewHistory.seenQuestionIds.push(result.questionId);
  }
  $("#interviewScore").textContent = `${evaluation.overall}%`;
  $("#scoreBreakdown").innerHTML = Object.entries(evaluation.criteria).map(([label, value]) => `
    <div class="skill-row">
      <strong>${label}</strong>
      <div class="bar"><span style="width: ${value}%"></span></div>
      <span>${value}%</span>
    </div>
  `).join("");
  $("#interviewFeedback").innerHTML = `
    <strong>Strengths:</strong> ${evaluation.strengths.join(" ")}<br>
    <strong>Weaknesses:</strong> ${evaluation.weaknesses.join(" ")}<br>
    <strong>Mistakes:</strong> ${evaluation.mistakes.join(" ")}<br>
    <strong>Improve:</strong> ${evaluation.suggestions.join(" ")}<br>
    <strong>Ideal answer:</strong> ${result.ideal}
  `;
  renderInterviewHistory();
  persistCurrentUser();
}

function scoreInterviewAnswer(answer, question, round) {
  const lower = answer.toLowerCase();
  const wordCount = answer.split(/\s+/).filter(Boolean).length;
  const idealWords = question.ideal.toLowerCase().split(/[^a-z0-9+#]+/).filter((word) => word.length > 3);
  const matched = idealWords.filter((word) => lower.includes(word));
  const technical = Math.min(96, 35 + matched.length * 7 + (/\b(o\(|complexity|api|database|react|sql|model|token|cache|test|metric)\b/i.test(answer) ? 12 : 0));
  const communication = Math.min(96, 40 + Math.min(wordCount, 120) / 2 + (/(first|second|finally|because|for example)/i.test(answer) ? 10 : 0));
  const confidence = Math.min(95, 45 + (wordCount > 45 ? 20 : 0) + (/(i would|i can|my approach|i implemented)/i.test(answer) ? 12 : 0));
  const relevance = Math.min(96, 38 + matched.length * 8 + (round === "Coding" && /function|return|loop|array|class|def|public|int|const/i.test(answer) ? 12 : 0));
  const completeness = Math.min(96, 35 + Math.min(wordCount, 140) / 2 + (/(tradeoff|edge case|test|validate|complexity|result)/i.test(answer) ? 12 : 0));
  const criteria = {
    Technical: Math.round(technical),
    Communication: Math.round(communication),
    Confidence: Math.round(confidence),
    Relevance: Math.round(relevance),
    Completeness: Math.round(completeness),
  };
  const overall = Math.round(Object.values(criteria).reduce((sum, score) => sum + score, 0) / 5);
  return {
    overall,
    criteria,
    strengths: [
      criteria.Communication >= 70 ? "Your explanation has a clear flow." : "You attempted to answer the question directly.",
      criteria.Relevance >= 70 ? "The answer stays relevant to the prompt." : "There is a useful base idea to build on.",
    ],
    weaknesses: [
      criteria.Technical < 70 ? "Add more technical depth and specific terms." : "Technical coverage is decent; add sharper tradeoffs.",
      criteria.Completeness < 70 ? "The answer needs examples, edge cases, and a stronger ending." : "Completeness is good; make it more concise.",
    ],
    mistakes: [
      matched.length < 2 ? "Important points from the ideal answer are missing." : "No major conceptual miss detected in this demo evaluation.",
    ],
    suggestions: [
      "Use a structure: context, approach, tradeoff, result.",
      round === "Coding" ? "Mention algorithm complexity and at least one edge case." : "Add one real project or workplace example.",
    ],
  };
}

function renderInterviewHistory() {
  const answers = interviewSession ? interviewSession.answers : [];
  $("#interviewHistoryList").innerHTML = answers.length
    ? answers.map((item, index) => `
      <div class="history-item">
        <strong>Q${index + 1}. ${item.round} - ${item.overall}%</strong>
        <span>${item.question}</span>
      </div>
    `).join("")
    : "No answers evaluated in this session yet.";
}

function finishInterviewReport() {
  if (!interviewSession || !interviewSession.answers.length) {
    $("#interviewReport").innerHTML = "Answer at least one question before generating a report.";
    return;
  }
  const answers = interviewSession.answers;
  const overall = Math.round(answers.reduce((sum, item) => sum + item.overall, 0) / answers.length);
  const roundScores = answers.reduce((acc, item) => {
    acc[item.round] = acc[item.round] || [];
    acc[item.round].push(item.overall);
    return acc;
  }, {});
  const roundHtml = Object.entries(roundScores).map(([round, scores]) => {
    const average = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
    return `<span>${round}: ${average}%</span>`;
  }).join("");
  const weakAreas = collectWeakInterviewAreas(answers);
  $("#interviewReport").innerHTML = `
    <div class="report-score">${overall}% overall</div>
    <div class="gps-tags">${roundHtml}</div>
    <h4>Areas to improve</h4>
    <ul>${weakAreas.map((area) => `<li>${area}</li>`).join("")}</ul>
    <h4>Personalized recommendations</h4>
    <ul>
      <li>Practice 3 answers using the STAR format for HR and project questions.</li>
      <li>For technical answers, include architecture, tradeoffs, testing, and metrics.</li>
      <li>For coding, explain approach, write clean ${interviewSession.language} code, cover edge cases, and state complexity.</li>
    </ul>
    <h4>Question feedback</h4>
    ${answers.map((item, index) => `
      <div class="report-question">
        <strong>Q${index + 1}: ${item.question}</strong>
        <p>Score: ${item.overall}%</p>
        <p><strong>Ideal:</strong> ${item.ideal}</p>
      </div>
    `).join("")}
  `;
  interviewHistory.sessions.push({ ...interviewSession, completedAt: new Date().toISOString(), overall });
  persistCurrentUser();
}

function collectWeakInterviewAreas(answers) {
  const totals = {};
  answers.forEach((answer) => {
    Object.entries(answer.criteria).forEach(([label, value]) => {
      totals[label] = totals[label] || [];
      totals[label].push(value);
    });
  });
  return Object.entries(totals)
    .map(([label, values]) => [label, Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)])
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map(([label, score]) => `${label}: currently averaging ${score}%.`);
}

function startVoiceAnswer() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    $("#interviewFeedback").textContent = "Voice input is not supported in this browser. Use Chrome or Edge, or type your answer.";
    return;
  }

  if (!window.isSecureContext) {
    $("#interviewFeedback").textContent = "Voice input needs a secure browser context. Localhost usually works; otherwise use typing.";
    return;
  }

  if (activeSpeechRecognition) {
    activeSpeechRecognition.stop();
    activeSpeechRecognition = null;
    $("#voiceAnswerBtn").textContent = "Voice answer";
    $("#interviewFeedback").textContent = "Voice capture stopped.";
    return;
  }

  activeSpeechRecognition = new SpeechRecognition();
  activeSpeechRecognition.lang = "en-IN";
  activeSpeechRecognition.interimResults = true;
  activeSpeechRecognition.continuous = false;

  activeSpeechRecognition.onstart = () => {
    $("#voiceAnswerBtn").textContent = "Stop voice";
    $("#interviewFeedback").textContent = "Listening... speak your answer clearly, then pause.";
  };

  activeSpeechRecognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join(" ")
      .trim();
    $("#answerInput").value = transcript;
    if (event.results[event.results.length - 1].isFinal) {
      $("#interviewFeedback").textContent = "Voice answer captured. Review it, then click Evaluate answer.";
    }
  };

  activeSpeechRecognition.onerror = (event) => {
    const messages = {
      "not-allowed": "Microphone permission was blocked. Allow microphone access in the browser address bar, then try again.",
      "service-not-allowed": "The browser speech service is blocked. Try Chrome/Edge or type your answer.",
      "no-speech": "No speech was detected. Click Voice answer again and speak a little closer to the microphone.",
      "audio-capture": "No microphone was found. Check your input device, then try again.",
      network: "Speech recognition needs the browser speech service. It may be offline or blocked, so typing is the best fallback.",
      aborted: "Voice capture was stopped.",
    };
    $("#interviewFeedback").textContent = messages[event.error] || `Voice capture failed (${event.error}). Please try again or type your answer.`;
  };

  activeSpeechRecognition.onend = () => {
    activeSpeechRecognition = null;
    $("#voiceAnswerBtn").textContent = "Voice answer";
  };

  try {
    activeSpeechRecognition.start();
  } catch (error) {
    activeSpeechRecognition = null;
    $("#voiceAnswerBtn").textContent = "Voice answer";
    $("#interviewFeedback").textContent = "Voice capture could not start. Refresh the page or type your answer.";
  }
}

function renderJobs() {
  const query = $("#jobSearch").value.toLowerCase();
  const type = $("#jobType").value;
  const filtered = jobs.filter((job) => {
    const haystack = job.join(" ").toLowerCase();
    return haystack.includes(query) && (type === "all" || job[2] === type);
  });

  $("#jobList").innerHTML = filtered
    .map(([company, title, jobType, location, skills, salary, match]) => `
      <article class="job-card">
        <div>
          <h3>${company} · ${title}</h3>
          <p>${location} · ${salary}</p>
          <div class="job-tags">
            <span>${jobType}</span>
            ${skills.split(", ").map((skill) => `<span>${skill}</span>`).join("")}
          </div>
        </div>
        <div class="match">${match}%<br><span>match</span></div>
      </article>
    `)
    .join("");
}

function renderJobs() {
  const query = $("#jobSearch").value.toLowerCase();
  const type = $("#jobType").value;
  const location = $("#jobLocation").value;
  const sort = $("#jobSort").value;
  const userSkills = parseSkillInput($("#gpsSkillInput").value);
  const scoredJobs = jobs.map((job) => ({ ...job, match: calculateJobMatch(job, userSkills) }));
  const filtered = scoredJobs
    .filter((job) => {
      const haystack = [job.company, job.title, job.type, job.location, job.role, job.skills.join(" "), job.salary].join(" ").toLowerCase();
      return haystack.includes(query) && (type === "all" || job.type === type) && (location === "all" || job.location === location);
    })
    .sort((a, b) => {
      if (sort === "salary") return b.salaryRank - a.salaryRank;
      if (sort === "company") return a.company.localeCompare(b.company);
      return b.match - a.match;
    });

  const topMatch = filtered.length ? Math.max(...filtered.map((job) => job.match)) : 0;
  $("#jobsHeading").textContent = `Best matches for ${activeRole}`;
  $("#jobsSummary").textContent = filtered.length
    ? `${filtered.filter((job) => job.role === activeRole).length} direct role matches and ${filtered.length} total recommendations found.`
    : "No jobs match these filters. Try all locations or clear your search.";
  $("#jobCount").textContent = filtered.length;
  $("#topMatch").textContent = `${topMatch}%`;

  $("#jobList").innerHTML = filtered
    .map((job) => `
      <article class="job-card">
        <div>
          <div class="job-title-row">
            <div>
              <h3>${job.company} - ${job.title}</h3>
              <p>${job.location} - ${job.salary}</p>
            </div>
            <span class="role-pill">${job.role}</span>
          </div>
          <p>${job.summary}</p>
          <div class="job-tags">
            <span>${job.type}</span>
            ${job.skills.map((skill) => `<span>${skill}</span>`).join("")}
          </div>
        </div>
        <div class="job-action">
          <div class="match">${job.match}%<br><span>match</span></div>
          <a class="primary-action apply-link" href="${job.applyUrl}" target="_blank" rel="noopener noreferrer">Apply</a>
        </div>
      </article>
    `)
    .join("") || `<div class="empty-state">No recommendations found for these filters.</div>`;
}

function calculateJobMatch(job, userSkills) {
  const requiredSkills = job.skills.map((skill) => skill.toLowerCase());
  const matchedSkills = requiredSkills.filter((skill) => skillMatches(userSkills, skill));
  const roleScore = job.role === activeRole ? 45 : 18;
  const skillScore = requiredSkills.length ? Math.round((matchedSkills.length / requiredSkills.length) * 40) : 0;
  const resumeScore = Math.round(resumeAtsScore * 0.1);
  const gpsScore = gpsAnalysis ? Math.round(gpsAnalysis.readiness * 0.05) : 3;
  return Math.min(98, roleScore + skillScore + resumeScore + gpsScore);
}

function getResumeSignals(text) {
  const normalized = text.toLowerCase();
  const roleKeywords = roleData[activeRole].skills.map((item) => item[0].toLowerCase());
  const matchedKeywords = roleKeywords.filter((keyword) => normalized.includes(keyword));
  const hasMetrics = /(\d+%|\d+\+|\d+\s?(users|ms|sec|lpa|projects|apis|features))/i.test(text);
  const hasImpact = /(improved|increased|reduced|optimized|built|created|launched|designed|led|automated)/i.test(text);
  const hasLinks = /(github\.com|linkedin\.com|portfolio|http)/i.test(text);
  const hasSections = ["education", "skills", "projects", "experience"].filter((section) => normalized.includes(section));
  const wordCount = normalized.split(/\s+/).filter(Boolean).length;

  return {
    keyword: Math.min(100, Math.round((matchedKeywords.length / roleKeywords.length) * 100)),
    metrics: hasMetrics ? 100 : 35,
    impact: hasImpact ? 100 : 45,
    structure: Math.min(100, hasSections.length * 25 + (wordCount > 120 ? 15 : 0)),
    links: hasLinks ? 100 : 50,
    matchedKeywords,
    missingKeywords: roleKeywords.filter((keyword) => !matchedKeywords.includes(keyword)),
  };
}

function scoreResume(text) {
  const signals = getResumeSignals(text);
  const score = Math.round(
    signals.keyword * 0.35 +
    signals.metrics * 0.2 +
    signals.impact * 0.2 +
    signals.structure * 0.15 +
    signals.links * 0.1
  );
  return { score: Math.max(28, Math.min(96, score)), signals };
}

function analyzeResume() {
  const text = $("#resumeInput").value.trim();
  const { score, signals } = scoreResume(text || uploadedResumeName);
  resumeAtsScore = score;
  $("#atsScore").textContent = `${score}%`;
  $("#resumeMetric").textContent = `${score}%`;
  setWidth("#resumeBar", score);
  $("#atsBreakdown").innerHTML = [
    ["Role keywords", signals.keyword],
    ["Measurable impact", signals.metrics],
    ["Action verbs", signals.impact],
    ["Resume sections", signals.structure],
  ].map(([label, value]) => `
    <div class="skill-row">
      <strong>${label}</strong>
      <div class="bar"><span style="width: ${value}%"></span></div>
      <span>${value}%</span>
    </div>
  `).join("");

  const tips = [];
  if (signals.missingKeywords.length) {
    tips.push(`Add missing ${activeRole} keywords: ${signals.missingKeywords.slice(0, 4).join(", ")}.`);
  }
  if (signals.metrics < 100) {
    tips.push("Add numbers to bullets, such as percentage improvement, users handled, response time, or project scale.");
  }
  if (signals.structure < 80) {
    tips.push("Use clear sections: Education, Skills, Projects, Experience, Certifications, and Links.");
  }
  if (signals.links < 100) {
    tips.push("Add LinkedIn, GitHub, or portfolio links so recruiters can verify your work quickly.");
  }
  if (!tips.length) {
    tips.push("Strong ATS fit. Now tailor the first three bullets to the exact job description before applying.");
  }
  $("#resumeTips").innerHTML = tips.map((tip) => `<li>${tip}</li>`).join("");
  persistCurrentUser();
}

function cleanExtractedText(rawText) {
  return rawText
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function handleResumeUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  uploadedResumeName = file.name;
  $("#uploadStatus").textContent = `Uploaded ${file.name} (${Math.ceil(file.size / 1024)} KB). Reading file...`;

  const reader = new FileReader();
  reader.onload = () => {
    const extracted = cleanExtractedText(String(reader.result || ""));
    const enoughText = extracted.split(/\s+/).filter(Boolean).length > 25;
    if (enoughText) {
      $("#resumeInput").value = extracted.slice(0, 12000);
      $("#uploadStatus").textContent = `Analyzing text extracted from ${file.name}.`;
    } else {
      $("#resumeInput").value = `${file.name}\n${activeRole}\nProjects Skills Experience Education Certifications GitHub LinkedIn`;
      $("#uploadStatus").textContent = `${file.name} uploaded. This browser demo could not extract full text from this format, so it used file metadata and target-role signals.`;
    }
    analyzeResume();
  };
  reader.onerror = () => {
    $("#uploadStatus").textContent = "Could not read this file. Paste resume text below and analyze again.";
  };
  reader.readAsText(file);
}

function clearResume() {
  $("#resumeFile").value = "";
  uploadedResumeName = "";
  $("#resumeInput").value = "";
  $("#uploadStatus").textContent = "No file uploaded yet. You can also paste resume text below.";
  analyzeResume();
}

function addMessage(text, sender = "bot") {
  chatMessages.push({ text, sender });
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.textContent = text;
  $("#chatLog").appendChild(message);
  $("#chatLog").scrollTop = $("#chatLog").scrollHeight;
  persistCurrentUser();
}

function renderChat() {
  $("#chatLog").innerHTML = "";
  if (!chatMessages.length) {
    addMessage(`Hi ${currentUser ? currentUser.name.split(" ")[0] : "there"}. I will remember your role, skills, resume score, and chat in this browser.`);
    return;
  }
  const savedMessages = [...chatMessages];
  chatMessages = [];
  savedMessages.forEach((message) => addMessage(message.text, message.sender));
}

function mentorReply(prompt) {
  const weakest = [...roleData[activeRole].skills].sort((a, b) => a[1] - b[1])[0][0];
  if (prompt.toLowerCase().includes("project")) {
    return `Build one ${activeRole} portfolio project around ${weakest}. Keep the README crisp: problem, architecture, screenshots, metrics, and deployment link.`;
  }
  if (prompt.toLowerCase().includes("interview")) {
    return `For ${activeRole}, practice one technical answer, one debugging story, and one tradeoff explanation daily. Your weakest signal right now is ${weakest}.`;
  }
  return `Your next best move is ${weakest}. Spend 5 focused sessions on it, then update your resume and take a mock interview to recalculate readiness.`;
}

function switchView(view) {
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  $$(".view").forEach((section) => section.classList.toggle("active-view", section.id === view));
  $("#pageTitle").textContent = pageTitles[view];
}

function wireEvents() {
  $$(".nav-item").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
  $("#roleSelect").addEventListener("change", (event) => {
    activeRole = event.target.value;
    questionIndex = 0;
    gpsAnalysis = null;
    interviewSession = null;
    renderAll();
    persistCurrentUser();
  });
  $("#boostPlanBtn").addEventListener("click", () => {
    switchView("mentor");
    addMessage(mentorReply("next action plan"));
  });
  $("#nextQuestionBtn").addEventListener("click", () => {
    nextInterviewQuestion();
  });
  $("#submitAnswerBtn").addEventListener("click", () => {
    evaluateInterviewAnswer();
  });
  $("#startInterviewBtn").addEventListener("click", startInterviewSession);
  $("#finishInterviewBtn").addEventListener("click", finishInterviewReport);
  $("#voiceAnswerBtn").addEventListener("click", startVoiceAnswer);
  $("#roundSelect").addEventListener("change", showLanguageField);
  $("#jobSearch").addEventListener("input", renderJobs);
  $("#jobType").addEventListener("change", renderJobs);
  $("#jobLocation").addEventListener("change", renderJobs);
  $("#jobSort").addEventListener("change", renderJobs);
  $("#gpsSkillInput").addEventListener("input", () => {
    persistCurrentUser();
    renderJobs();
  });
  $("#analyzeGpsBtn").addEventListener("click", analyzeGpsSkills);
  $("#sampleGpsBtn").addEventListener("click", () => {
    const samples = {
      "Software Developer": "HTML, CSS, JavaScript, React, Git, SQL",
      "Data Scientist": "Python, SQL, Excel, Statistics, Pandas",
      "AI Engineer": "Python, Machine Learning, LLM APIs, Git, APIs",
      "Cyber Security Analyst": "Networking, Linux, Python, Firewalls",
      "Product Manager": "Communication, User Research, Analytics, Roadmapping",
    };
    $("#gpsSkillInput").value = samples[activeRole];
    analyzeGpsSkills();
  });
  $("#analyzeResumeBtn").addEventListener("click", analyzeResume);
  $("#clearResumeBtn").addEventListener("click", clearResume);
  $("#resumeInput").addEventListener("input", persistCurrentUser);
  $("#resumeFile").addEventListener("change", handleResumeUpload);
  $("#showLoginBtn").addEventListener("click", () => setAuthMode("login"));
  $("#showRegisterBtn").addEventListener("click", () => setAuthMode("register"));
  $("#logoutBtn").addEventListener("click", logoutUser);
  $("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    loginUser($("#loginEmail").value.trim(), $("#loginPassword").value);
  });
  $("#registerForm").addEventListener("submit", (event) => {
    event.preventDefault();
    registerUser($("#registerName").value.trim(), $("#registerEmail").value.trim(), $("#registerPassword").value);
  });
  $("#chatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const value = $("#chatInput").value.trim();
    if (!value) return;
    addMessage(value, "user");
    $("#chatInput").value = "";
    setTimeout(() => addMessage(mentorReply(value)), 250);
  });
}

function renderAll() {
  renderDashboard();
  renderRoadmap();
  renderSavedGpsAnalysis();
  showLanguageField();
  $("#interviewRoleChip").textContent = activeRole;
  $("#questionText").textContent = "Choose a round and start the interview.";
  $("#questionMode").textContent = "Not started";
  renderInterviewHistory();
  renderJobs();
  analyzeResume();
}

wireEvents();
restoreSession();

export type ProjectCategory = "fullstack" | "automation" | "security";

export type ProjectItem = {
  title: string;
  description: string;
  stack: string[];
  category: ProjectCategory;
  link: string;
};

export const profile = {
  name: "Tanapon Yurawan",
  role: "Software Developer & Security Enthusiast",
  intro:
    "I am a software developer with a strong interest and expertise in Full-stack Development, Automation Systems, and Cybersecurity.",
  location: "Samut Prakan, Thailand",
  years: "1+ years experience",
};

export const skills = [
  "TypeScript",
  "Next.js",
  "Node.js",
  "Go",
  "Python",
  "PostgreSQL",
  "Docker",
  "n8n",
  "Burp Suite",
];

export const projects: ProjectItem[] = [
  {
    title: "Computer Science Testing & Evaluation Hub",
    description:
      "A scalable online examination platform to modernize coding assessments with automated, real-time evaluation.",
    stack: ["Next.js", "TypeScript", "Judge0 API", "Docker", "PostgreSQL"],
    category: "fullstack",
    link: "#",
  },
  {
    title: "Credential Deduplication Automation",
    description:
      "Full-stack automation platform to process and deduplicate CloudSEK credential reports, eliminating redundant tasks.",
    stack: ["Next.js", "n8n", "PostgreSQL"],
    category: "automation",
    link: "#",
  },
  {
    title: "SOC Alert Monitoring Dashboard",
    description:
      "Centralized monitoring dashboard integrating CrowdStrike API to aggregate, filter, and enrich incident metadata.",
    stack: ["n8n", "Node.js", "CrowdStrike API"],
    category: "security",
    link: "#",
  },
  {
    title: "Automated Task Notification System",
    description:
      "Automated tracking system fetching pending tasks via REST API and dynamic Slack notifications to prevent missed deadlines.",
    stack: ["n8n", "REST API", "Slack API"],
    category: "automation",
    link: "#",
  },
  {
    title: "Web Vulnerability Pentesting",
    description:
      "Conducted grey-box penetration testing to identify vulnerabilities based on OWASP Top 10.",
    stack: ["Burp Suite", "OWASP Top 10"],
    category: "security",
    link: "#",
  },
];

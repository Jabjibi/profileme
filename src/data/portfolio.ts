import raw from "./portfolio.json";

export type ProjectCategory = "fullstack" | "frontend" | "automation" | "security";

export type ProjectDetails = {
  overview: string;
  features: string[];
  images: string[];
  mockupLayout?: "phone-pair" | "desktop-phone";
  githubUrl?: string;
  liveUrl?: string;
};

export type ProjectItem = {
  title: string;
  description: string[];
  stack: string[];
  category: ProjectCategory;
  link: string;
  slug?: string;
  confidential?: boolean;
  details?: ProjectDetails;
};

export const profile = raw.profile;
export const skills: string[] = raw.skills;
export const projects: ProjectItem[] = raw.projects as unknown as ProjectItem[];

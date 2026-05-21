import raw from "./portfolio.json";

export type ProjectCategory = "fullstack" | "automation" | "security";

export type ProjectItem = {
  title: string;
  description: string;
  stack: string[];
  category: ProjectCategory;
  link: string;
  confidential?: boolean;
};

export const profile = raw.profile;
export const skills: string[] = raw.skills;
export const projects: ProjectItem[] = raw.projects as ProjectItem[];

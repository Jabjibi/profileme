import { useMemo, useState } from "react";

import { projects, type ProjectCategory } from "@/data/portfolio";
import content from "@/data/sections/projects.json";

const categories = content.categories as { label: string; value: "all" | ProjectCategory }[];

type CategoryFilter = (typeof categories)[number]["value"];

export function useProjectFilter() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return { activeCategory, setActiveCategory, filteredProjects };
}

import { useMemo, useState } from "react";

import { projects, type ProjectCategory } from "@/data/portfolio";

type CategoryFilter = "all" | ProjectCategory;

export function useProjectFilter() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return { activeCategory, setActiveCategory, filteredProjects };
}

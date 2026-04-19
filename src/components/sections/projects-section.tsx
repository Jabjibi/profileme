"use client";

import { motion, Variants } from "motion/react";
import { ExternalLink, ArrowUpRight } from "lucide-react";

import { projects } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  { label: "All", value: "all" },
  { label: "Fullstack", value: "fullstack" },
  { label: "Automation", value: "automation" },
  { label: "Security", value: "security" },
] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
};

function renderProjectCards(activeCategory: string) {
  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((project: any) => project.category === activeCategory);

  return (
    <motion.div
      key={activeCategory}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="grid gap-6 sm:grid-cols-2 pt-4"
    >
      {filtered.map((project: any) => (
        <motion.div key={project.title} variants={itemVariants}>
          <Card className="group h-full flex flex-col border-slate-800 bg-slate-950/40 backdrop-blur-sm shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-slate-900/60 hover:border-slate-700/80 overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-slate-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
            <CardHeader className="space-y-3 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold tracking-tight text-slate-100 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </CardTitle>
                <ArrowUpRight className="size-5 text-slate-600 transition-all duration-300 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <CardDescription className="text-sm leading-relaxed text-slate-400 font-light">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 mt-auto">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item: string) => (
                  <Badge 
                    key={item} 
                    variant="secondary" 
                    className="bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-white transition-colors border-0"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
              <Button 
                asChild 
                variant="outline" 
                size="sm" 
                className="w-full rounded-full border-slate-700 bg-transparent text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-600 transition-all"
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  View Case Study
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="my-32 scroll-mt-24 px-6 md:px-8 w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="mb-12 space-y-3">
          <div className="flex items-center space-x-3">
            <span className="h-px w-8 bg-blue-500/50 block"></span>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Selected Works</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Impact-Driven Projects</h2>
        </div>

        <Tabs defaultValue="all" className="gap-8 flex flex-col">
          <TabsList className="w-full justify-start overflow-x-auto bg-slate-900/50 border border-slate-800 rounded-full p-1 self-start inline-flex h-auto max-w-fit">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.value} 
                value={category.value} 
                className="rounded-full px-5 py-2.5 text-sm font-medium transition-all data-[state=active]:bg-slate-800 data-[state=active]:text-white data-[state=active]:shadow-lg hover:text-white text-slate-400"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.value} value={category.value} className="m-0 focus-visible:ring-0">
              {renderProjectCards(category.value)}
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </section>
  );
}

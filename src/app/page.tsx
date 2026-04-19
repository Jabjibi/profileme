import dynamic from "next/dynamic";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { HeroSection } from "@/components/sections/hero-section";

// Dynamically import lower sections to split the JS bundle and improve initial page load performance
const AboutSection = dynamic(() => import("@/components/sections/about-section").then(mod => mod.AboutSection), { ssr: true });
const ProjectsSection = dynamic(() => import("@/components/sections/projects-section").then(mod => mod.ProjectsSection), { ssr: true });
const ContactSection = dynamic(() => import("@/components/sections/contact-section").then(mod => mod.ContactSection), { ssr: true });

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="flex flex-col w-full">
        <HeroSection />
        <div className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

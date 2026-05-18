import dynamic from "next/dynamic";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { HeroSection } from "@/components/sections/hero-section";
// Dynamically import lower sections to split the JS bundle and improve initial page load performance
const AboutSection = dynamic(() => import("@/components/sections/about-section").then(mod => mod.AboutSection), { ssr: true });
const SliderSection = dynamic(() => import("@/components/sections/slider-section").then(mod => mod.SliderSection), { ssr: true });
const ProjectsSection = dynamic(() => import("@/components/sections/projects-section").then(mod => mod.ProjectsSection), { ssr: true });
const ContactSection = dynamic(() => import("@/components/sections/contact-section").then(mod => mod.ContactSection), { ssr: true });

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="relative z-10 flex w-full flex-col overflow-hidden">
        <HeroSection />
        <div className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
          <AboutSection />
          <SliderSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

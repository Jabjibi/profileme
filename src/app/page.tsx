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
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="relative flex w-full flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(34,211,238,0.12),transparent_36%),radial-gradient(circle_at_84%_22%,rgba(16,185,129,0.1),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(37,99,235,0.1),transparent_44%)]" />
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

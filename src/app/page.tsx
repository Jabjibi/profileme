import dynamic from "next/dynamic";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { HeroSection } from "@/components/sections/hero-section";
import PixelBlast from "@/components/ui/background-boxes";

// Dynamically import lower sections to split the JS bundle and improve initial page load performance
const AboutSection = dynamic(() => import("@/components/sections/about-section").then(mod => mod.AboutSection), { ssr: true });
const SliderSection = dynamic(() => import("@/components/sections/slider-section").then(mod => mod.SliderSection), { ssr: true });
const ProjectsSection = dynamic(() => import("@/components/sections/projects-section").then(mod => mod.ProjectsSection), { ssr: true });
const ContactSection = dynamic(() => import("@/components/sections/contact-section").then(mod => mod.ContactSection), { ssr: true });

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Animated background layer — sits behind everything including the fixed header */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(6,182,212,0.22),transparent_46%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.16),transparent_42%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.18),transparent_46%)]" />
        <PixelBlast
          className="absolute inset-0 opacity-45"
          color="#67e8f9"
          variant="square"
          pixelSize={3}
          patternScale={1.5}
          patternDensity={0.95}
          speed={0.45}
          enableRipples={false}
          liquid={false}
          noiseAmount={0}
          edgeFade={0.3}
          transparent
        />
        <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_12%,black)]" />
      </div>

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

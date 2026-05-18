import Image from "next/image";

import { skills } from "@/data/portfolio";
import content from "@/data/sections/about.json";
import { Badge } from "@/components/ui/badge";
import { WobbleCard } from "@/components/animations/wobble-card";
import FadeContent from "@/components/animations/fade-content";

const workspacePhoto =
  "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const codingPhoto =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const [card1, card2, card3] = content.cards;

export function AboutSection() {
  return (
    <section id="about" className="section-reveal section-reveal-delay-1 scroll-mt-20">
      <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
          <FadeContent duration={700} delay={0} translateY={30} className="col-span-1 lg:col-span-3">
            <WobbleCard
              containerClassName="min-h-[260px] bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 lg:col-span-3 lg:min-h-[320px]"
              className="px-5 py-7 sm:px-7 sm:py-9 lg:pr-64"
            >
              <div className="max-w-sm">
                <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  {card3.heading}
                </h2>
                <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                  {card3.description}
                </p>
              </div>
              <Image
                src={codingPhoto}
                alt={card3.imageAlt ?? ""}
                width={320}
                height={240}
                className="pointer-events-none absolute -bottom-6 -right-6 hidden h-[180px] w-[250px] rounded-xl object-cover shadow-2xl md:block lg:-right-12 lg:h-[240px] lg:w-[320px]"
                loading="lazy"
              />
              <div className="mt-5 flex flex-wrap gap-2">
                {skills.slice(0, 6).map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="rounded-full border-slate-100/35 bg-slate-100/10 px-3 py-1 text-slate-100"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </WobbleCard>
          </FadeContent>

          <FadeContent duration={700} delay={120} translateY={30} className="col-span-1 lg:col-span-2">
            <WobbleCard
              containerClassName="min-h-[240px] bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 lg:min-h-[280px]"
              className="px-5 py-7 sm:px-7 sm:py-9 lg:pr-52"
            >
              <div className="max-w-xs">
                <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  {card1.heading}
                </h2>
                <p className="mt-4 text-left text-base/6 text-neutral-200">
                  {card1.description}
                </p>
              </div>
              <Image
                src={workspacePhoto}
                alt={card1.imageAlt ?? ""}
                width={250}
                height={220}
                className="pointer-events-none absolute -bottom-4 -right-4 hidden h-[165px] w-[180px] rounded-xl object-cover shadow-2xl sm:h-[190px] sm:w-[210px] md:block lg:-right-10 lg:h-[220px] lg:w-[250px]"
                loading="lazy"
              />
            </WobbleCard>
          </FadeContent>

          <FadeContent duration={700} delay={200} translateY={30}>
            <WobbleCard
              containerClassName="min-h-[240px] bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 lg:min-h-[280px]"
              className="px-5 py-7 sm:px-7 sm:py-9"
            >
              <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                {card2.heading}
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                {card2.description}
              </p>
            </WobbleCard>
          </FadeContent>
      </div>
    </section>
  );
}


import { skills } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { WobbleCard } from "../ui/wobble-card";

const workspacePhoto =
  "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const codingPhoto =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-reveal section-reveal-delay-1 mt-20 scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-5xl px-1 sm:px-0">
        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
          <WobbleCard
            containerClassName="col-span-1 min-h-[240px] bg-gradient-to-br from-fuchsia-700 to-pink-900 lg:col-span-2 lg:min-h-[280px]"
            className="px-5 py-7 sm:px-7 sm:py-9 lg:pr-52"
          >
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Internship Development Security
              </h2>
              <p className="mt-4 text-left  text-base/6 text-neutral-200">
                Experience at BANGKOK MSP CO., LTD. developing automation platforms and security monitoring tools for the SOC team to improve operational efficiency.
              </p>
            </div>
            <img
              src={workspacePhoto}
              alt="Workspace setup"
              className="pointer-events-none absolute -bottom-4 -right-4 hidden h-[165px] w-[180px] rounded-xl object-cover shadow-2xl sm:h-[190px] sm:w-[210px] md:block lg:-right-10 lg:h-[220px] lg:w-[250px]"
              loading="lazy"
            />
          </WobbleCard>
          <WobbleCard
            containerClassName="col-span-1 min-h-[240px] bg-gradient-to-br from-indigo-500 to-indigo-800 lg:min-h-[280px]"
            className="px-5 py-7 sm:px-7 sm:py-9"
          >
            <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              CS-TEH Graduation Project
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              Developed a scalable online examination platform to modernize coding assessments for CS students with automated real-time grading.
            </p>
          </WobbleCard>
          <WobbleCard
            containerClassName="col-span-1 min-h-[260px] bg-gradient-to-br from-blue-700 to-indigo-900 lg:col-span-3 lg:min-h-[320px]"
            className="px-5 py-7 sm:px-7 sm:py-9 lg:pr-64"
          >
            <div className="max-w-sm">
              <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Technical Mastery in Automation & Security Tools
              </h2>
              <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                Highly skilled in utilizing Frontend, Backend, Infrastructure, and Security tools to build efficient and secure systems.
              </p>
            </div>
            <img
              src={codingPhoto}
              alt="Coding on screen"
              className="pointer-events-none absolute -bottom-6 -right-6 hidden h-[180px] w-[250px] rounded-xl object-cover shadow-2xl md:block lg:-right-12 lg:h-[240px] lg:w-[320px]"
              loading="lazy"
            />
            <div className="mt-5 flex flex-wrap gap-2">
              {skills.slice(0, 6).map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="rounded-full border-slate-100/35 bg-slate-100/10 px-3 py-1 text-slate-50"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </WobbleCard>
        </div>
      </div>
    </section>
  );
}

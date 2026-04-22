import { ArrowUpRight, Clock3, GitBranch, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "yurawan.ta@gmail.com",
    detail: "Best for project ideas and collaboration",
    href: "mailto:yurawan.ta@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(+66) 090 - 215 - 9223",
    detail: "For quick discussions and urgent requests",
    href: "tel:+660902159223",
  },
  {
    icon: GitBranch,
    label: "GitHub",
    value: "github.com/tanap",
    detail: "Explore live repositories and experiments",
    href: "https://github.com/tanap",
    external: true,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="section-reveal section-reveal-delay-3 scroll-mt-20">
      <Card className="relative overflow-hidden rounded-3xl border-slate-700/75 bg-slate-950/70 text-slate-100 shadow-[0_30px_90px_rgba(2,6,23,0.7)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent" />
        </div>

        <div className="relative grid gap-0 lg:grid-cols-[1.08fr_1fr]">
          <CardHeader className="space-y-6 border-b border-slate-800/80 p-7 sm:p-10 lg:border-b-0 lg:border-r lg:border-slate-800/80">
            <span className="inline-flex w-fit items-center rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
              Let&apos;s Collaborate
            </span>

            <div className="space-y-3">
              <CardTitle className="text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Ready for a new project?
              </CardTitle>
              <CardDescription className="max-w-xl text-base leading-relaxed text-slate-300">
                If you need scalable automation systems, full-stack solutions, or cybersecurity consulting, let&apos;s shape something meaningful together.
              </CardDescription>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button asChild className="rounded-full bg-slate-100 px-6 text-slate-950 hover:bg-white">
                <a href="mailto:yurawan.ta@gmail.com">Send an email</a>
              </Button>
              <a
                href="tel:+660902159223"
                className="inline-flex items-center rounded-full border border-slate-600/80 px-5 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-slate-400 hover:text-white"
              >
                Call now
              </a>
            </div>

            <p className="inline-flex items-center gap-2 text-sm text-slate-400">
              <Clock3 className="size-4 text-cyan-200" />
              Usually responds within 24 hours.
            </p>
          </CardHeader>

          <CardContent className="space-y-3 p-7 pt-7 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Direct channels</p>
            <div className="space-y-3">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-700/80 bg-slate-900/55 px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-500/80 hover:bg-slate-800/65"
                >
                  <span className="inline-flex min-w-0 items-center gap-3">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-600/70 bg-slate-800/80 text-slate-100 transition-colors group-hover:border-cyan-300/70 group-hover:text-cyan-200">
                      <channel.icon className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-slate-100">{channel.label}</span>
                      <span className="block truncate text-xs text-slate-400">{channel.detail}</span>
                    </span>
                  </span>

                  <span className="inline-flex shrink-0 items-center gap-2 text-right">
                    <span className="max-w-[12rem] truncate text-sm text-slate-300">{channel.value}</span>
                    <ArrowUpRight className="size-4 text-slate-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-100" />
                  </span>
                </a>
              ))}
            </div>
          </CardContent>
        </div>
      </Card>
    </section>
  );
}

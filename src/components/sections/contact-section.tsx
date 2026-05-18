import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Clock3, GitBranch, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FadeContent from "@/components/animations/fade-content";
import content from "@/data/sections/contact.json";

const iconMap: Record<string, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  github: GitBranch,
};

const channels = content.channels.map((ch) => ({
  ...ch,
  icon: iconMap[ch.iconKey],
}));

export function ContactSection() {
  return (
    <section id="contact" className="section-reveal section-reveal-delay-3 scroll-mt-20">
      <FadeContent duration={700} delay={0} translateY={32} scale={0.97}>
        <Card className="relative overflow-hidden rounded-3xl border-border/75 bg-card/70 text-foreground shadow-[0_4px_20px_rgba(15,23,42,0.07)]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />
            <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent" />
          </div>

          <div className="relative grid gap-0 lg:grid-cols-[1.08fr_1fr]">
            <CardHeader className="space-y-6 border-b border-border/80 p-7 sm:p-10 lg:border-b-0 lg:border-r lg:border-border/80">
              <span className="inline-flex w-fit items-center rounded-full border border-cyan-500/40 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">
                {content.badge}
              </span>

              <div className="space-y-3">
                <CardTitle className="text-2xl font-semibold leading-tight text-foreground sm:text-3xl lg:text-4xl">
                  {content.heading}
                </CardTitle>
                <CardDescription className="max-w-xl text-base leading-relaxed text-muted-foreground break-words">
                  {content.description}
                </CardDescription>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button asChild className="rounded-full bg-slate-900 px-6 text-white hover:bg-slate-800">
                  <a href="mailto:yurawan.ta@gmail.com">{content.cta.primary}</a>
                </Button>
                <a
                  href="tel:+660902159223"
                  className="inline-flex items-center rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-border hover:text-foreground"
                >
                  {content.cta.secondary}
                </a>
              </div>

              <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="size-4 text-cyan-600" />
                {content.responseTime}
              </p>
            </CardHeader>

            <CardContent className="space-y-3 p-7 pt-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{content.channelsLabel}</p>
              <div className="space-y-3">
                {channels.map((channel, index) => (
                  <FadeContent key={channel.label} duration={550} delay={index * 110} translateY={16}>
                    <a
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noopener noreferrer" : undefined}
                      className="group flex flex-col gap-3 rounded-2xl border border-border/80 bg-muted/55 px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:bg-muted/65 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span className="inline-flex min-w-0 items-center gap-3">
                        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-muted/80 text-foreground transition-colors group-hover:border-cyan-500/70 group-hover:text-cyan-600">
                          <channel.icon className="size-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-foreground">{channel.label}</span>
                          <span className="block text-xs text-muted-foreground break-words sm:truncate">{channel.detail}</span>
                        </span>
                      </span>

                      <span className="inline-flex w-full items-center justify-between gap-2 text-left sm:w-auto sm:shrink-0 sm:justify-end sm:text-right">
                        <span className="min-w-0 max-w-full break-all text-sm text-muted-foreground sm:max-w-[12rem] sm:truncate sm:break-normal">{channel.value}</span>
                        <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                      </span>
                    </a>
                  </FadeContent>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      </FadeContent>
    </section>
  );
}

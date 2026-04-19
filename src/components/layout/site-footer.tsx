import { Code2 } from "lucide-react";

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-20 border-t border-slate-800/80 bg-slate-950/80">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
        <div className="grid gap-8 md:grid-cols-[1.15fr_auto_1fr] md:items-end">
          <div className="space-y-3">
            <a
              href="#home"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-100 transition-colors hover:text-emerald-300"
            >
              <span className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-1.5 text-emerald-300">
                <Code2 className="size-4" />
              </span>
              Tan Portfolio
            </a>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              Built for performance, clarity, and conversion.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400 md:justify-center">
            {quickLinks.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-slate-100">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="space-y-2 text-sm text-slate-400 md:text-right">
            <p>© 2026 Tanap. Crafted with Next.js + shadcn/ui</p>
            <p className="inline-flex items-center gap-2 md:justify-end">
              <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
              Open to freelance and full-time opportunities.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

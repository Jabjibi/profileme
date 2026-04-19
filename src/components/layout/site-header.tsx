"use client";

import { useEffect, useState } from "react";
import { Code2, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color,opacity,transform] duration-500 ease-out motion-reduce:transition-none",
        "opacity-0 translate-y-[-20px] motion-safe:animate-[headerReveal_560ms_cubic-bezier(0.22,1,0.36,1)_forwards] motion-reduce:opacity-100 motion-reduce:translate-y-0",
        isScrolled ? "bg-slate-950/85 border-slate-800/70" : "bg-slate-950/0 border-slate-800/0"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="#home"
          className={cn(
            "inline-flex items-center gap-2 text-sm font-semibold tracking-wide opacity-0 translate-y-[-12px] motion-safe:animate-[headerItemReveal_420ms_cubic-bezier(0.22,1,0.36,1)_forwards] motion-reduce:opacity-100 motion-reduce:translate-y-0"
          )}
          style={{ animationDelay: "80ms" }}
        >
          <span className="rounded-lg bg-primary/15 p-1.5 text-primary">
            <Code2 className="size-4" />
          </span>
          Tan Portfolio
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "hover:text-foreground opacity-0 translate-y-[-12px] motion-safe:animate-[headerItemReveal_420ms_cubic-bezier(0.22,1,0.36,1)_forwards] motion-reduce:opacity-100 motion-reduce:translate-y-0"
              )}
              style={{ animationDelay: `${160 + index * 80}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          className={cn(
            "opacity-0 translate-y-[-12px] motion-safe:animate-[headerItemReveal_420ms_cubic-bezier(0.22,1,0.36,1)_forwards] motion-reduce:opacity-100 motion-reduce:translate-y-0"
          )}
          style={{ animationDelay: "440ms" }}
        >
          <Button asChild size="sm" className="gap-2 rounded-full transition-transform hover:scale-105">
            <Link href="#contact">
              <Sparkles className="size-4 animate-pulse" />
              Let&apos;s Talk
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

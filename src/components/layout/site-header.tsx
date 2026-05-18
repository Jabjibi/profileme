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
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color] duration-500 ease-out",
        isScrolled ? "bg-background/85 border-border/70" : "bg-background/0 border-border/0"
      )}
    >
      <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8">
        <Link href="#home" className="justify-self-start inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground">
          <span className="rounded-lg bg-primary/15 p-1.5 text-primary">
            <Code2 className="size-4" />
          </span>
          Tan Portfolio
        </Link>

        <nav className="hidden justify-self-center items-center gap-6 text-sm text-muted-foreground md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="justify-self-end flex items-center gap-2">
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

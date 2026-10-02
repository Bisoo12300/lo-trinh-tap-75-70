"use client";

import { useEffect, useState } from "react";
import { TOC } from "@/data/content";

export function StickyNav() {
  const [active, setActive] = useState<string>(TOC[0].href);

  useEffect(() => {
    const sections = TOC.map((t) => document.querySelector(t.href)).filter(
      Boolean,
    ) as Element[];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActive("#" + entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-20 border-b border-[var(--line)] bg-[rgba(15,18,23,0.82)] backdrop-blur-md">
      <div className="wrap flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TOC.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold no-underline transition-colors ${
              active === item.href
                ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                : "text-[var(--muted)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

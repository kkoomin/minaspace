"use client";

import { useEffect, useRef, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(".prose h2, .prose h3"),
    );

    const collected: Heading[] = elements.map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: Number(el.tagName[1]) as 2 | 3,
    }));
    setHeadings(collected);

    if (collected.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="hidden lg:block sticky top-[68px] w-full min-w-0 overflow-hidden">
      <p
        className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.08em]"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        목차
      </p>
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className="block border-l-2 py-1 text-xs leading-[1.4] no-underline transition-colors"
          style={{
            paddingLeft: h.level === 3 ? "20px" : "10px",
            color:
              activeId === h.id
                ? "var(--color-text-primary)"
                : "var(--color-text-tertiary)",
            borderLeftColor:
              activeId === h.id
                ? "var(--color-text-primary)"
                : "var(--color-border)",
            fontWeight: activeId === h.id ? 500 : 400,
          }}
        >
          {h.text}
        </a>
      ))}
    </div>
  );
}

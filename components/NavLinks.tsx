"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex gap-5">
      {links.map(({ href, label }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className="text-[13px] transition-colors"
            style={{
              color: isActive
                ? "var(--color-text-primary)"
                : "var(--color-text-secondary)",
              fontWeight: isActive ? 500 : 400,
            }}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

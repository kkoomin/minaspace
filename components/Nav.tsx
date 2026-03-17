import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Nav() {
  return (
    <nav
      className="sticky top-0 z-10 border-b"
      style={{
        background: "var(--color-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto flex h-[52px] max-w-[640px] items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          minaspace
        </Link>
        <NavLinks />
      </div>
    </nav>
  );
}

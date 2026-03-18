import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-10">
      <div
        className="mx-auto flex h-[52px] max-w-[640px] items-center justify-between border-b px-6 lg:max-w-[860px]"
        style={{
          borderColor: "var(--color-border)",
          background: "var(--color-bg)",
        }}
      >
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

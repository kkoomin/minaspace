import Link from "next/link";
import type { PostMeta } from "@/lib/types";

interface PostItemProps {
  post: PostMeta;
}

function formatDate(date: string): string {
  return date.slice(0, 7).replace("-", ".");
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-baseline justify-between gap-4 border-b py-3 no-underline first:border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <span
        className="text-sm group-hover:opacity-70 transition-opacity"
        style={{ color: "var(--color-text-primary)" }}
      >
        {post.title}
      </span>
      <span
        className="shrink-0 whitespace-nowrap font-mono text-xs"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        {formatDate(post.date)}
      </span>
    </Link>
  );
}

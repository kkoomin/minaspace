"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/types";
import PostList from "./PostList";

interface HomeFilterProps {
  posts: PostMeta[];
}

const HOME_LIMIT = 5;

export default function HomeFilter({ posts }: HomeFilterProps) {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? posts.slice(0, HOME_LIMIT)
      : posts.filter((p) =>
          p.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
        );

  const isAll = query === "";

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => setQuery("")}
          className="cursor-pointer rounded border px-2.5 py-1 text-[11px] font-medium transition-colors"
          style={
            isAll
              ? {
                  background: "var(--color-text-primary)",
                  color: "var(--color-bg)",
                  borderColor: "var(--color-text-primary)",
                }
              : {
                  background: "var(--color-bg-secondary)",
                  color: "var(--color-text-secondary)",
                  borderColor: "var(--color-border)",
                }
          }
        >
          All
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts"
          className="rounded border px-3 py-1.5 text-sm outline-none transition-colors"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-bg)",
            color: "var(--color-text-primary)",
          }}
          onFocus={(e) =>
            (e.target.style.borderColor = "var(--color-border-strong)")
          }
          onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
        />
      </div>

      <p
        className="mb-0.5 text-[11px] font-medium uppercase tracking-[0.07em]"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        Posts
      </p>
      <PostList posts={filtered} />
    </>
  );
}

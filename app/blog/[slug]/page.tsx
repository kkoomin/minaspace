import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { compileMDXContent } from "@/lib/mdx";
import TableOfContents from "@/components/TableOfContents";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return { title: post.title };
  } catch {
    return {};
  }
}

function formatFullDate(date: string): string {
  return date.slice(0, 10).replace(/-/g, ".");
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { content } = await compileMDXContent(post.content);

  return (
    <div
      className="mx-auto min-h-[calc(100vh-52px)] max-w-[640px] px-6 py-12 lg:max-w-[860px]"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_160px]">
        {/* 메인 컬럼 */}
        <div className="min-w-0 lg:order-first">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm no-underline transition-opacity hover:opacity-70"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <ArrowLeft size={14} />
            목록으로
          </Link>

          <div className="mb-8">
            <h1
              className="mb-3 text-[24px] font-medium leading-[1.35]"
              style={{ color: "var(--color-text-primary)" }}
            >
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="font-mono text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {formatFullDate(post.date)}
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border px-[7px] py-[1px] text-[11px]"
                  style={{
                    background: "var(--color-bg-secondary)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <hr
            style={{ borderColor: "var(--color-border)", marginBottom: "24px" }}
          />

          <article className="prose">{content}</article>
        </div>

        {/* TOC 사이드바 */}
        <TableOfContents />
      </div>
    </div>
  );
}

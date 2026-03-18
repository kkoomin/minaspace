import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/PostList";
import Pagination from "@/components/Pagination";

export const metadata: Metadata = { title: "Blog" };

const POSTS_PER_PAGE = 10;

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam ?? 1));
  const allPosts = getAllPosts();
  const paginatedPosts = allPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <main
      className="mx-auto min-h-[calc(100vh-52px)] max-w-[640px] px-6 py-12 lg:max-w-[860px]"
      style={{ background: "var(--color-bg)" }}
    >
      <h1
        className="mb-8 text-[22px] font-medium"
        style={{ color: "var(--color-text-primary)" }}
      >
        Blog
      </h1>
      <PostList posts={paginatedPosts} />
      <Pagination
        total={allPosts.length}
        perPage={POSTS_PER_PAGE}
        currentPage={currentPage}
        basePath="/blog"
      />
    </main>
  );
}

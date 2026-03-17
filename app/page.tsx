import { getAllPosts } from "@/lib/posts";
import HomeFilter from "@/components/HomeFilter";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main
      className="mx-auto min-h-[calc(100vh-52px)] max-w-[640px] px-6 pb-20 pt-12"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="mb-10">
        <h1
          className="mb-2 text-[22px] font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          구민하
        </h1>
        <p
          className="text-sm leading-[1.65]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          프론트엔드 개발자. 이커머스와 어드민 시스템을 주로 만듭니다.
          <br />
          Next.js, React, TypeScript를 씁니다.
        </p>
      </div>

      <HomeFilter posts={posts} />
    </main>
  );
}

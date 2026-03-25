import { getAllPosts } from "@/lib/posts";
import HomeFilter from "@/components/HomeFilter";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main
      className="mx-auto min-h-[calc(100vh-52px)] max-w-[640px] px-6 py-12 lg:max-w-[860px]"
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
          프론트엔드 개발자.
          <br />
          기술로 문제를 해결하고 새로운 가치를 만들며, 글로서 생각을 나눠보고자
          합니다.
        </p>
      </div>

      <HomeFilter posts={posts} />
    </main>
  );
}

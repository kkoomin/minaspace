import type { PostMeta } from "@/lib/types";
import PostItem from "./PostItem";

interface PostListProps {
  posts: PostMeta[];
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p
        className="py-8 text-sm"
        style={{ color: "var(--color-text-tertiary)" }}
      >
        포스트가 없습니다.
      </p>
    );
  }

  return (
    <div className="mt-1">
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </div>
  );
}

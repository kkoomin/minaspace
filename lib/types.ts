export interface PostMeta {
  slug: string;
  title: string;
  date: string; // 'YYYY-MM-DD'
  tags: string[];
  description?: string;
}

export interface Post extends PostMeta {
  content: string; // raw MDX string
}

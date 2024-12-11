import path from "path";
import matter from "gray-matter";
import fg from "fast-glob";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import fs from "node:fs/promises";

const postsDirectory = path.join(process.cwd(), "src/content");

export interface PostMeta {
  title: string;
  date: string;
  tags: string[];
  published: string;
  excerpt: string;
}

export interface Post {
  slug: string;
  meta: PostMeta;
  content: string;
}

export async function getPostSlugs() {
  const paths = await fg("**/*.md", {
    cwd: postsDirectory,
    onlyFiles: true,
  });
  return paths;
}

function ensureMdExtension(slug: string): string {
  return slug.endsWith(".md") ? slug : `${slug}.md`;
}

function decodeSlug(slug: string): string {
  return decodeURIComponent(slug);
}

function validateAndFormatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      // 유효하지 않은 날짜인 경우 현재 날짜 반환
      return new Date().toISOString();
    }
    return date.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const decodedSlug = decodeSlug(slug);
  const fullPath = path.join(postsDirectory, ensureMdExtension(decodedSlug));
  const fileContents = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: decodedSlug.replace(/\.md$/, ""),
    meta: {
      title: data.title || "",
      date: validateAndFormatDate(data.date || ""),
      tags: data.tags || [],
      published: validateAndFormatDate(data.published || ""),
      excerpt: data.excerpt || "",
    },
    content,
  };
}

// 캐시 설정 추가
export const revalidate = 3600; // 1시간마다 재검증

export async function getAllPosts(): Promise<Post[]> {
  try {
    const slugs = await getPostSlugs();
    const posts = await Promise.all(
      slugs.map(async (slug) => {
        const post = await getPostBySlug(slug);
        return post;
      })
    );

    // null 값 필터링 추가
    return posts
      .filter((post): post is Post => post !== null)
      .sort(
        (a, b) =>
          new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
      );
  } catch (error) {
    console.error("Failed to get posts:", error);
    return [];
  }
}

export async function serializeMdx(source: string) {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeHighlight],
    },
  });
  return mdxSource;
}

export function searchPosts(query: string, posts: Post[]): Post[] {
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.meta.title.toLowerCase().includes(lowercaseQuery) ||
      post.meta.tags.some((tag) =>
        tag.toLowerCase().includes(lowercaseQuery)
      ) ||
      post.meta.excerpt.toLowerCase().includes(lowercaseQuery)
  );
}

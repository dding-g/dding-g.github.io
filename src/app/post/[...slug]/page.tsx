import { Post } from "@/components/post";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const post = await getPostBySlug(params.slug.join("/"));
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: "article",
      publishedTime: post.meta.date,
      authors: ["Your Name"],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const { meta, content } = await getPostBySlug(params.slug.join("/"));
  if (!meta || !content) {
    return <></>;
  }

  return <Post content={content} meta={meta} />;
}

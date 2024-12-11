import { Suspense } from "react";
import { getAllPosts } from "@/lib/mdx";
import PostList from "@/components/post-list";
import SearchBar from "@/components/search-bar";

export const revalidate = 3600;

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center">Blog Posts</h1>
      <SearchBar />
      <Suspense fallback={<div>Loading...</div>}>
        <PostList initialPosts={posts} />
      </Suspense>
    </div>
  );
}

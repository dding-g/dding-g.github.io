import { Suspense } from "react";
import { getAllPosts } from "@/lib/mdx";
import PostList from "@/components/post-list";
import SearchBar from "@/components/search-bar";

// export const revalidate = 3600;

export default async function HomePage({
  searchParams,
}: {
  searchParams: any;
}) {
  const posts = await getAllPosts(searchParams.keyword as string);

  return (
    <div
      className="container px-4 py-8 mx-auto space-y-10"
      key={searchParams.keyword}
    >
      <SearchBar />
      <Suspense fallback={<div>Loading...</div>}>
        <PostList initialPosts={posts} />
      </Suspense>
    </div>
  );
}

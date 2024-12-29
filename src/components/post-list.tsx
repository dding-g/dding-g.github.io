"use client";

import { useState, useEffect } from "react";
import { Post } from "@/lib/mdx";

import { useInView } from "react-intersection-observer";
import PostListItem from "./post-list-item";

interface PostListProps {
  initialPosts: Post[];
}

export default function PostList({ initialPosts }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts.slice(0, 30));
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      const nextPosts = initialPosts.slice(page * 30, (page + 1) * 30);
      if (nextPosts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...nextPosts]);
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [inView, initialPosts, page]);

  return (
    <div className="grid gap-8 max-w-[1280px] mx-auto">
      {posts.map((post) => (
        <PostListItem
          key={post.slug}
          slug={post.slug}
          title={post.meta.title}
          published={post.meta.published}
          tags={post.meta.tags}
        />
      ))}
      <div ref={ref} />
    </div>
  );
}

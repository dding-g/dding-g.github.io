"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Post } from "@/lib/mdx";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useInView } from "react-intersection-observer";

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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link href={`/post/${post.slug}`} key={post.slug}>
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>{post.meta.title}</CardTitle>
              <CardDescription>
                {new Date(post.meta.published).toLocaleDateString()}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                {post.meta.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
      <div ref={ref} />
    </div>
  );
}

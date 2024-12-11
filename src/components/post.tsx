"use client";

import { MDXRemote } from "next-mdx-remote";
import { format } from "date-fns";

export const Post = ({ mdxSource, meta }: any) => {
  return (
    <article className="container px-4 py-8 mx-auto">
      <h1 className="mb-4 text-4xl font-bold">{meta.title}</h1>
      <p className="mb-8 text-gray-500">
        {format(new Date(meta.date), "MMMM d, yyyy")}
      </p>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRemote {...mdxSource} />
      </div>
    </article>
  );
};

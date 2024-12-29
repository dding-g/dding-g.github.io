"use client";

import { format } from "date-fns";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Post = ({ content, meta }: any) => {
  return (
    <article className="container px-4 py-8 mx-auto">
      <h1 className="mb-4 text-4xl font-bold">{meta.title}</h1>
      <p className="mb-8 text-gray-500">
        {format(new Date(meta.date), "MMMM d, yyyy")}
      </p>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {/* <MDXRemote {...mdxSource} /> */}
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    </article>
  );
};

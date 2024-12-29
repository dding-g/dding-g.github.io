import Link from "next/link";
import React from "react";
import { Badge } from "./ui/badge";

type Props = {
  slug: string;
  title: string;
  description?: string;
  published: string;
  tags?: string[];
};
export default function PostListItem({
  slug,
  title,
  published,
  description,
  tags = [],
}: Props) {
  return (
    <Link className="w-full" href={`/post/${slug}`} prefetch={false}>
      <div className="px-5 py-4 space-y-2 transition-shadow duration-300 border border-gray-200 shadow-md rounded-2xl hover:shadow-lg">
        <div className="space-y-1">
          <div className="text-xl font-semibold text-gray-900">{title}</div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        {!!description && (
          <div className="text-lg text-gray-700">{description}</div>
        )}
        <div className="text-sm font-medium text-gray-500">{published}</div>
      </div>
    </Link>
  );
}

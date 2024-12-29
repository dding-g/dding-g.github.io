"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("keyword") ?? "");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`?keyword=${encodeURIComponent(query)}`);
  };

  return (
    <div className="max-w-[720px] mx-auto px-5">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
        />
        <Button
          className="px-4 py-2 font-semibold text-gray-800 transition-all duration-200 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 hover:shadow-lg"
          type="submit"
        >
          검색
        </Button>
      </form>
    </div>
  );
}

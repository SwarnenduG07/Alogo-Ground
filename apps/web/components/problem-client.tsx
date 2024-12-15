
'use client';

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

export function ProblemSearch({ query, onSearch }: { 
  query: string | null;
  onSearch: (query: string) => void;
}) {
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onSearch(formData.get("query") as string);
      }}
      className="flex gap-2 items-center">
        <Input 
          className="w-auto"
          name="query"
          placeholder="Search problems"
        />
        <Button size="sm" variant="secondary">
          Search
        </Button>
      </form>
      {query && (
        <Link className="text-sm mt-1 text-blue-500 underline"
          href="/problems"
        >
          Clear Search
        </Link>
      )}
    </div>
  );
}
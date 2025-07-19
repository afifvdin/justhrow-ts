"use client";

import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") === "asc" ? "asc" : "desc";

  const updateParam = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sort", value);
    router.push(`?${newSearchParams.toString()}`);
  };

  const updateParamForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const search = formData.get("search") as string;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("search", search);
    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <div className="my-4 flex items-center justify-between gap-2 sm:gap-4">
      <form className="relative grow" onSubmit={updateParamForm}>
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-neutral-400" />
        <Input
          name="search"
          placeholder="Search your workspaces"
          className="bg-white pl-8 shadow-none"
        />
      </form>
      <Select defaultValue={sort} onValueChange={updateParam}>
        <SelectTrigger>
          <SelectValue placeholder="Earliest first" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Earliest first</SelectItem>
          <SelectItem value="desc">Latest first</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

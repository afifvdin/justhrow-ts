import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";

export default async function WorkspacesPage() {
  return (
    <div className="mx-auto w-full max-w-5xl p-8">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Your workspaces</h2>
        <Button className="rounded-full" size="sm">
          New workspace
        </Button>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="relative grow">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-neutral-400" />
          <Input
            placeholder="Search your workspaces"
            className="my-4 bg-white pl-8 shadow-none"
          />
        </div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Earliest first" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Earliest first</SelectItem>
            <SelectItem value="desc">Latest first</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
        <div className="h-48 w-full animate-pulse rounded-3xl border bg-neutral-50" />
      </div>
    </div>
  );
}

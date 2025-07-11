import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/services/session";
import Link from "next/link";

export async function Workspaces() {
  const session = await getCurrentSession();

  if (!session || !session.user) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Your recent workspaces</h2>
        <Button variant="ghost" className="rounded-full" size="sm" asChild>
          <Link href="/workspaces">View all</Link>
        </Button>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
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

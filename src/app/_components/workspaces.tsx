import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/services/session";
import { getAllWorkspace } from "@/services/workspace";
import { Workspace } from "./workspace";

export async function Workspaces() {
  const session = await getCurrentSession();

  if (!session || !session.user) {
    return null;
  }

  const workspaces = await getAllWorkspace({ userId: session.user.id });

  if (!workspaces.length) {
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
        {workspaces.map((workspace) => {
          return (
            <Workspace
              key={workspace.id}
              id={workspace.id}
              name={workspace.name}
              filesCount={workspace._count.contents}
            />
          );
        })}
      </div>
    </div>
  );
}

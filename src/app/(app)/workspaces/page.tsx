import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCurrentSession } from "@/services/session";
import { getAllWorkspace } from "@/services/workspace";
import { NewWorkspaceForm } from "./_components/new-workspace-form";

export default async function WorkspacesPage() {
  const session = await getCurrentSession();

  if (!session || !session.user) {
    return null;
  }

  const workspaces = await getAllWorkspace({ userId: session.user.id });

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Your workspaces</h2>
        <NewWorkspaceForm />
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
    </>
  );
}

const Workspace = ({
  id,
  name,
  filesCount,
}: {
  id: string;
  name: string;
  filesCount: number;
}) => {
  return (
    <Link href={`/workspaces/${id}`}>
      <div className="flex w-full flex-col items-start rounded-xl border bg-neutral-50 p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg">
        <p>{name}</p>
        <p className="text-muted-foreground text-sm">
          {filesCount} files uploaded
        </p>
      </div>
    </Link>
  );
};

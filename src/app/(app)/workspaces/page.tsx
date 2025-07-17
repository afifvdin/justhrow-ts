import { Workspace } from "@/app/_components/workspace";
import { getCurrentSession } from "@/services/session";
import { getAllWorkspace } from "@/services/workspace";
import { NewWorkspaceForm } from "./_components/new-workspace-form";
import { SearchFilter } from "./_components/search-filter";

export default async function WorkspacesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const sort = query.sort === "asc" ? "asc" : "desc";
  const search = query.search as string;

  const session = await getCurrentSession();

  if (!session || !session.user) {
    return null;
  }

  const workspaces = await getAllWorkspace({
    userId: session.user.id,
    sort,
    search,
  });

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Your workspaces</h2>
        <NewWorkspaceForm />
      </div>
      <SearchFilter />
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

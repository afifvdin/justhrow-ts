import { TrashIcon } from "lucide-react";
import { humanizeDate } from "@/lib/utils";
import { getAllContent } from "@/services/content";
import { getCurrentSession } from "@/services/session";
import { getWorkspace } from "@/services/workspace";
import { Content } from "./_components/content";
import { DeleteWorkspace } from "./_components/delete-workspace";
import { Settings } from "./_components/settings";
import { Uploader } from "./_components/uploader";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getCurrentSession();
  const workspace = await getWorkspace({ id });
  const contents = await getAllContent({ workspaceId: id });

  if (!workspace) {
    return <div>Workspace not found</div>;
  }

  const authorized = session?.userId === workspace.userId;
  const sharedBy = workspace.user.name;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold">
            {workspace.name} ({contents.length})
          </h2>
          {workspace.willDeletedAt && (
            <p className="text-destructive flex items-center gap-1 text-xs">
              <TrashIcon className="size-3" />
              <span>Scheduled on {humanizeDate(workspace.willDeletedAt)}</span>
              {!authorized && (
                <span className="text-muted-foreground">by {sharedBy}</span>
              )}
            </p>
          )}
        </div>
        {authorized && (
          <div className="flex items-center justify-end gap-2">
            <DeleteWorkspace id={id} />
            <Settings
              id={id}
              name={workspace.name}
              willDeletedAt={workspace.willDeletedAt}
            />
            <Uploader id={id} />
          </div>
        )}
      </div>
      <div className="mt-12 grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 sm:gap-4 lg:gap-8">
        {contents.map((content) => {
          return (
            <Content
              key={content.id}
              workspaceId={id}
              authorized={authorized}
              id={content.id}
              url={content.presignedUrl}
              name={content.name}
              mimetype={content.mimetype}
              size={content.size}
            />
          );
        })}
      </div>
    </div>
  );
}

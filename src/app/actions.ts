"use server";

import { createContentMany } from "@/services/content";
import { uploadMany } from "@/services/s3";
import { getCurrentSession } from "@/services/session";
import { createWorkspace } from "@/services/workspace";
import { redirect } from "next/navigation";

export async function uploadAction(_: any, form: FormData) {
  const files = form.getAll("files") as unknown as File[];
  const session = await getCurrentSession();
  if (!session) {
    return null;
  }
  const user = session.user;

  const workspace = await createWorkspace({ userId: user.id });

  const filepaths = await uploadMany({ files, folder: workspace.id });

  await createContentMany({
    data: files.map((file, i) => {
      return {
        name: file.name,
        url: filepaths[i] ?? "",
        mimetype: file.type,
        size: file.size.toString(),
        userId: user.id,
        workspaceId: workspace.id,
      };
    }),
  });

  redirect(`/workspaces/${workspace.id}`);
}

"use server";

import { redirect } from "next/navigation";
import { createContentMany } from "@/services/content";
import { uploadManyFile } from "@/services/s3";
import { getCurrentSession } from "@/services/session";
import { createWorkspace } from "@/services/workspace";
import { TNewContentState } from "@/types/state";

export async function newContentsAction(
  _: any,
  form: FormData,
): Promise<TNewContentState> {
  let workspaceId = "";
  try {
    const files = form.getAll("files") as unknown as File[];
    const session = await getCurrentSession();
    if (!session) {
      return { error: { errors: ["You must be logged in to upload files."] } };
    }
    const user = session.user;

    const workspace = await createWorkspace({ userId: user.id });

    const filepaths = await uploadManyFile({ files, folder: workspace.id });

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
    workspaceId = workspace.id;
  } catch (error) {
    console.log("[ERROR] Upload Action:", error);
    return { error: { errors: ["Failed to upload files. Please try again."] } };
  }

  redirect(`/workspaces/${workspaceId}`);
}

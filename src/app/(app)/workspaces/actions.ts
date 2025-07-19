"use server";

import { redirect } from "next/navigation";
import { getCurrentSession } from "@/services/session";
import { createWorkspace } from "@/services/workspace";
import { TNewWorkspaceState } from "@/types/state";

export async function createWorkspaceAction(
  _: any,
  __: FormData,
): Promise<TNewWorkspaceState> {
  let workspaceId = "";
  try {
    const session = await getCurrentSession();

    if (!session?.user) {
      return {
        error: {
          errors: ["You must be logged in to create workspace."],
        },
      };
    }

    const workspace = await createWorkspace({ userId: session.user.id });
    workspaceId = workspace.id;
  } catch (error) {
    console.log("[ERROR] Create Workspace Action:", error);
    return {
      error: {
        errors: ["Failed to create workspace. Please try again."],
      },
    };
  }

  redirect(`/workspaces/${workspaceId}`);
}

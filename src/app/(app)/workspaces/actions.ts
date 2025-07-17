"use server";

import { redirect } from "next/navigation";
import { getCurrentSession } from "@/services/session";
import { createWorkspace } from "@/services/workspace";
import { TNewWorkspaceState } from "@/types/state";

export async function createWorkspaceAction(
  _: any,
  __: FormData,
): Promise<TNewWorkspaceState> {
  const session = await getCurrentSession();

  if (!session?.user) {
    return {
      errors: ["No user found"],
    };
  }

  const workspace = await createWorkspace({ userId: session.user.id });

  redirect(`/workspaces/${workspace.id}`);
}

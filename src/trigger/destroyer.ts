import { z } from "zod";
import { deleteContent } from "@/services/content";
import { deleteWorkspace } from "@/services/workspace";
import { logger, schemaTask } from "@trigger.dev/sdk/v3";

export const contentDestroyerTask = schemaTask({
  id: "content-destroyer-task",
  schema: z.object({
    id: z.string(),
  }),
  run: async (payload) => {
    logger.log(`Deleting content with id: ${payload.id}`);
    await deleteContent({ id: payload.id });
    logger.log(`Deleted content with id: ${payload.id}`);
  },
});

export const workspaceDestroyerTask = schemaTask({
  id: "workspace-destroyer-task",
  schema: z.object({
    id: z.string(),
  }),
  run: async (payload) => {
    logger.log(`Deleting workspace with id: ${payload.id}`);
    await deleteWorkspace({ id: payload.id });
    logger.log(`Deleted workspace with id: ${payload.id}`);
  },
});

import { z } from "zod";
import { deleteContent, getAllContent, getContent } from "@/services/content";
import { removeFile, removeManyFile } from "@/services/s3";
import { deleteWorkspace, getWorkspace } from "@/services/workspace";
import { logger, schemaTask } from "@trigger.dev/sdk/v3";

export const contentDestroyerTask = schemaTask({
  id: "content-destroyer-task",
  schema: z.object({
    id: z.string(),
  }),
  run: async (payload) => {
    logger.log(`Deleting content with id: ${payload.id}`);

    const content = await getContent({ id: payload.id });
    if (!content) {
      logger.error(`Content with id: ${payload.id} not found`);
      return;
    }

    if (!content?.willDeletedAt || content.willDeletedAt > new Date()) {
      logger.log(
        `Content with id: ${payload.id} is scheduled for deletion later`,
      );
      return;
    }

    if (!content) {
      logger.error(`Content with id: ${payload.id} not found`);
      return;
    }

    await Promise.all([
      removeFile({ path: content.url }),
      deleteContent({ id: payload.id, userId: content.userId }),
    ]);

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

    const workspace = await getWorkspace({ id: payload.id });
    if (!workspace) {
      logger.error(`Workspace with id: ${payload.id} not found`);
      return;
    }

    if (!workspace?.willDeletedAt || workspace.willDeletedAt > new Date()) {
      logger.log(
        `Workspace with id: ${payload.id} is scheduled for deletion later`,
      );
      return;
    }

    const contents = await getAllContent({ workspaceId: payload.id });

    await Promise.all([
      removeManyFile({ paths: contents.map((content) => content.url) }),
      deleteWorkspace({ id: payload.id, userId: workspace.userId }),
    ]);

    logger.log(`Deleted workspace with id: ${payload.id}`);
  },
});

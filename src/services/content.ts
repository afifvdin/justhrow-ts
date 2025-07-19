"server-only";

import { CLOUDFLARE_R2_DEFAULT_PRESIGNED_EXPIRES_IN } from "@/lib/constant";
import { prisma } from "@/lib/db";
import { secondsUntil } from "@/lib/utils";
import { getPresignedUrl, removeFile } from "./s3";

export async function getAllContent({
  workspaceId,
  sort = "desc",
}: {
  workspaceId: string;
  sort?: "asc" | "desc";
}) {
  const now = new Date();
  const [workspace, contents] = await prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });
    const contents = await tx.content.findMany({
      where: {
        workspaceId,
      },
      orderBy: {
        createdAt: sort,
      },
    });

    return [workspace, contents];
  });

  const contentsWithImage = [];
  for (const content of contents) {
    let expiresIn: number = CLOUDFLARE_R2_DEFAULT_PRESIGNED_EXPIRES_IN;
    if (content.willDeletedAt) {
      expiresIn = secondsUntil({ now, futureDate: content.willDeletedAt });
    } else if (workspace?.willDeletedAt) {
      expiresIn = secondsUntil({ now, futureDate: workspace.willDeletedAt });
    }

    if (expiresIn <= 0) {
      contentsWithImage.push({ ...content, presignedUrl: "" });
    } else {
      contentsWithImage.push({
        ...content,
        presignedUrl: await getPresignedUrl({ path: content.url, expiresIn }),
      });
    }
  }

  return contentsWithImage;
}

export async function getContent({ id }: { id: string }) {
  return await prisma.content.findUnique({
    where: { id },
  });
}

export async function createContent({
  userId,
  workspaceId,
  name,
  mimetype,
  url,
  size,
}: {
  userId: string;
  workspaceId: string;
  name: string;
  mimetype: string;
  url: string;
  size: string;
}) {
  try {
    return await prisma.content.create({
      data: {
        name,
        userId,
        workspaceId,
        mimetype,
        url,
        size,
      },
    });
  } catch (error) {
    console.error("[ERROR] Create Content:", error);
    throw new Error("Failed to create content. Please try again.");
  }
}

export async function createContentMany({
  data,
}: {
  data: {
    userId: string;
    workspaceId: string;
    name: string;
    mimetype: string;
    url: string;
    size: string;
  }[];
}) {
  try {
    return await prisma.content.createMany({
      data,
    });
  } catch (error) {
    console.error("[ERROR] Create Content Many:", error);
    throw new Error("Failed to create contents. Please try again.");
  }
}

export async function updateContent({
  userId,
  id,
  willDeletedAt,
}: {
  userId: string;
  id: string;
  willDeletedAt: Date;
}) {
  try {
    return await prisma.content.update({
      where: {
        id,
        userId,
      },
      data: {
        willDeletedAt,
      },
    });
  } catch (error) {
    console.error("[ERROR] Update Content:", error);
    throw new Error("Failed to update content. Please try again.");
  }
}

export async function deleteContent({
  userId,
  id,
}: {
  userId: string;
  id: string;
}) {
  try {
    const content = await getContent({ id });
    if (!content || content.userId !== userId) {
      throw new Error("Content not found or unauthorized");
    }
    await Promise.all([
      removeFile({ path: content.url }),
      prisma.content.delete({
        where: {
          id,
          userId,
        },
      }),
    ]);
  } catch (error) {
    console.error("[ERROR] Delete Content:", error);
    throw error;
  }
}

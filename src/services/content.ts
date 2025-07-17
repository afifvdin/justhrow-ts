"server-only";

import { CLOUDFLARE_R2_DEFAULT_PRESIGNED_EXPIRES_IN } from "@/lib/constant";
import { prisma } from "@/lib/db";
import { getPresignedUrl } from "./s3";
import { secondsUntil } from "@/lib/utils";

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

    contentsWithImage.push({
      ...content,
      presignedUrl: await getPresignedUrl({ path: content.url, expiresIn }),
    });
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
  return await prisma.content.createMany({
    data,
  });
}

export async function updateContent({
  id,
  willDeletedAt,
}: {
  id: string;
  willDeletedAt: Date;
}) {
  return await prisma.content.update({
    where: {
      id,
    },
    data: {
      willDeletedAt,
    },
  });
}

export async function deleteContent({ id }: { id: string }) {
  return await prisma.content.delete({
    where: {
      id,
    },
  });
}

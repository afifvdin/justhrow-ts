"server-only";

import { prisma } from "@/lib/db";

export async function getAllContent({
  workspaceId,
  sort = "desc",
}: {
  workspaceId: string;
  sort?: "asc" | "desc";
}) {
  return await prisma.content.findMany({
    where: {
      workspaceId,
    },
    orderBy: {
      createdAt: sort,
    },
  });
}

export async function getContent({ id }: { id: string }) {
  return await prisma.content.findUnique({
    where: { id },
  });
}

export async function createContent({
  userId,
  workspaceId,
  mimetype,
  url,
  size,
}: {
  userId: string;
  workspaceId: string;
  mimetype: string;
  url: string;
  size: string;
}) {
  return await prisma.content.create({
    data: {
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

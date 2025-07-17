"server-only";

import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db";

export async function getAllWorkspace({
  userId,
  sort = "desc",
  search,
}: {
  userId: string;
  sort?: "asc" | "desc";
  search?: string;
}) {
  const where: Prisma.WorkspaceWhereInput = { userId };
  if (search && typeof search === "string") {
    where.name = { contains: search, mode: "insensitive" };
  }

  return await prisma.workspace.findMany({
    where,
    include: {
      _count: {
        select: {
          contents: true,
        },
      },
    },
    orderBy: {
      createdAt: sort,
    },
  });
}

export async function getWorkspace({ id }: { id: string }) {
  return await prisma.workspace.findUnique({
    where: {
      id,
    },
  });
}

export async function createWorkspace({
  userId,
  name,
}: {
  userId: string;
  name?: string;
}) {
  return await prisma.workspace.create({
    data: {
      name: name ?? "New Workspace",
      userId,
    },
  });
}

export async function updateWorkspace({
  id,
  name,
  willDeletedAt,
}: {
  id: string;
  name?: string;
  willDeletedAt?: Date;
}) {
  const data: Prisma.WorkspaceUpdateInput = {};
  if (name) {
    data.name = name;
  }
  if (willDeletedAt) {
    data.willDeletedAt = willDeletedAt;
  }
  return await prisma.workspace.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteWorkspace({ id }: { id: string }) {
  return await prisma.$transaction(async (tx) => {
    await tx.content.deleteMany({
      where: { workspaceId: id },
    });
    return await tx.workspace.delete({
      where: { id },
    });
  });
}

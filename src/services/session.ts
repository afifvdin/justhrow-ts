"server-only";

import { cookies } from "next/headers";
import { SESSION_LIFETIME_IN_DAYS } from "@/lib/constant";
import { prisma } from "@/lib/db";

export async function getAllSessions({ userId }: { userId: string }) {
  return await prisma.session.findMany({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function getSession({ id }: { id: string }) {
  const session = await prisma.session.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt < new Date()) {
    return null;
  }

  return session;
}

export async function getCurrentSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    return null;
  }

  return await getSession({ id: session.value });
}

export async function createSession({ userId }: { userId: string }) {
  try {
    const expiresAt = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * SESSION_LIFETIME_IN_DAYS,
    );

    return await prisma.session.create({
      data: { userId, expiresAt },
    });
  } catch (error) {
    console.error("[ERROR] Create Session:", error);
    throw new Error("Failed to create session. Please try again.");
  }
}

export async function deleteSession({ id }: { id: string }) {
  try {
    return await prisma.session.delete({
      where: { id },
    });
  } catch (error) {
    console.error("[ERROR] Delete Session:", error);
    throw new Error("Failed to delete session. Please try again.");
  }
}

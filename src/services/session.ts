"server-only";

import { Prisma, Session } from "@/generated/prisma";
import { SESSION_LIFETIME_IN_DAYS } from "@/lib/constant";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

type SessionWithUser = Prisma.SessionGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
        email: true;
        avatarUrl: true;
      };
    };
  };
}>;

export async function createSession(userId: string): Promise<Session> {
  const expiresAt = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * SESSION_LIFETIME_IN_DAYS,
  );

  return await prisma.session.create({
    data: { userId, expiresAt },
  });
}

export async function getCurrentSession(): Promise<SessionWithUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    return null;
  }

  return await getSession(session.value);
}

export async function getSession(
  sessionId: string,
): Promise<SessionWithUser | null> {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
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

export async function deleteSession(sessionId: string) {
  return await prisma.session.delete({
    where: { id: sessionId },
  });
}

export async function getAllSessions(userId: string) {
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

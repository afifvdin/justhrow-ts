"server-only";

import { User } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { hashPassword } from "./auth";

export async function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  const hashedPassword = await hashPassword(password);
  return await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
}

export async function getUserByEmail({
  email,
  password = false,
}: {
  email: string;
  password?: boolean;
}): Promise<Pick<User, "id" | "name" | "email" | "password"> | null> {
  return await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password,
    },
  });
}

export async function getUserById(
  id: string,
): Promise<Pick<User, "id" | "name" | "email"> | null> {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}

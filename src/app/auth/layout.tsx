import { getCurrentSession } from "@/services/session";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();

  if (session) {
    redirect("/");
  }

  return children;
}

import { redirect } from "next/navigation";
import React from "react";
import { getCurrentSession } from "@/services/session";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/auth/login");
  }

  return <div className="mx-auto w-full max-w-5xl p-8">{children}</div>;
}

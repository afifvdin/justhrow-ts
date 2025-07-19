import React from "react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto w-full max-w-5xl p-4 sm:p-8">{children}</div>;
}

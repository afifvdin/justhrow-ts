"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();
  const pathLength = pathname.split("/").length;

  if (pathname !== "/" && pathLength === 2) {
    return (
      <Link
        href="/"
        className="flex items-center gap-2 text-sm hover:underline"
      >
        <ArrowLeftIcon className="size-4" />
        Back to home
      </Link>
    );
  }
  if (pathname !== "/" && pathLength === 3) {
    return (
      <Link
        href="/workspaces"
        className="flex items-center gap-2 text-sm hover:underline"
      >
        <ArrowLeftIcon className="size-4" />
        Back to workspaces
      </Link>
    );
  }
  return (
    <Link href="/" className="text-sm hover:underline">
      Justhrow
    </Link>
  );
}

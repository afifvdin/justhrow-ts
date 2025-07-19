"use client";

import { XIcon } from "lucide-react";
import { Button } from "../ui/button";

export function FilePreview({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) {
  return (
    <div className="group/file relative flex h-20 flex-col rounded-md border bg-white sm:h-24">
      <Button
        variant="outline"
        size="icon"
        className="pointer-events-none absolute -top-1 -right-1 h-auto w-auto rounded-full p-1 opacity-0 transition-all group-hover/file:pointer-events-auto group-hover/file:opacity-100"
        onClick={onRemove}
      >
        <XIcon />
      </Button>
      <div className="flex grow items-center justify-center">
        <p className="text-sm sm:text-base">
          {(file.size / (1024 * 1024)).toFixed(2)} MB
        </p>
      </div>
      <div className="border-t p-2">
        <p className="line-clamp-1 text-xs text-ellipsis whitespace-nowrap">
          {file.name}
        </p>
      </div>
    </div>
  );
}

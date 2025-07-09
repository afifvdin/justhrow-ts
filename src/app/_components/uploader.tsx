"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowUpIcon,
  FileArchiveIcon,
  FileImageIcon,
  FileTextIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import React from "react";

export function Uploader() {
  const [files, setFiles] = React.useState<File[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleRemove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFiles = e.target.files;
    if (targetFiles && targetFiles.length) {
      setFiles(Array.from(targetFiles));
    }
  };

  return (
    <div
      className={cn(
        files.length === 0 && "border-dashed",
        "group/uploader relative mx-auto flex max-h-96 min-h-52 w-full max-w-2xl flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-gray-200 bg-neutral-50 text-center text-gray-500 transition-all",
      )}
    >
      <input
        ref={inputRef}
        onChange={handleFilesChange}
        type="file"
        multiple
        className={cn(
          files.length > 0 && "hidden",
          "absolute top-0 left-0 h-full w-full cursor-pointer rounded-3xl opacity-0",
        )}
      />
      {files.length === 0 ? (
        <div className="flex grow flex-col items-center justify-center text-neutral-300">
          <div className="flex items-center">
            <FileArchiveIcon className="-mr-8 size-12 -rotate-8 stroke-1" />
            <FileImageIcon className="z-1 size-16 fill-neutral-50 stroke-1" />
            <FileTextIcon className="-ml-8 size-12 rotate-8 stroke-1" />
          </div>
          <div className="text-sm leading-tight font-medium text-neutral-500 group-hover/uploader:underline">
            <p>
              Drop your files here or <span className="font-bold">browse</span>
            </p>
            <p>Max file size: 50 MB</p>
          </div>
        </div>
      ) : (
        <div className="grid max-h-full w-full grow grid-cols-5 content-start gap-2 overflow-y-auto px-2 pt-2 transition-all">
          {files.map((file, index) => (
            <FileItem
              key={index}
              file={file}
              onRemove={() => handleRemove(index)}
            />
          ))}
        </div>
      )}
      {files.length > 0 && (
        <div className="flex w-full items-center justify-between gap-4 p-2">
          <Button
            onClick={() => inputRef.current?.click()}
            variant="outline"
            size="sm"
            className="rounded-full"
          >
            <PlusIcon />
            Add files
          </Button>
          <Button size="icon" className="m-0 size-auto rounded-full p-1.5">
            <ArrowUpIcon />
          </Button>
        </div>
      )}
    </div>
  );
}

function FileItem({ file, onRemove }: { file: File; onRemove: () => void }) {
  return (
    <div className="group/file relative flex h-24 flex-col rounded-md border bg-white">
      <Button
        variant="outline"
        size="icon"
        className="pointer-events-none absolute -top-1 -right-1 h-auto w-auto rounded-full p-1 opacity-0 transition-all group-hover/file:pointer-events-auto group-hover/file:opacity-100"
        onClick={onRemove}
      >
        <XIcon />
      </Button>
      <div className="flex grow items-center justify-center">
        <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
      </div>
      <div className="border-t p-2">
        <p className="line-clamp-1 text-xs text-ellipsis whitespace-nowrap">
          {file.name}
        </p>
      </div>
    </div>
  );
}

"use client";

import { ArrowUpIcon, Loader2Icon, PlusIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DropzonePlaceholder } from "../ui/dropzone-placeholder";
import { FilePreview } from "../ui/file-preview";

export function ContentUploader({ pending }: { pending: boolean }) {
  const [files, setFiles] = React.useState<File[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleRemove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFiles = e.target.files;
    if (targetFiles && targetFiles.length) {
      setFiles([...files, ...Array.from(targetFiles)]);
    }
  };

  return (
    <div
      className={cn(
        files.length === 0 && "border-dashed",
        "group/uploader relative mx-auto flex max-h-96 min-h-96 w-full max-w-2xl flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-gray-200 bg-neutral-50 text-center text-gray-500 transition-all sm:min-h-52 sm:rounded-3xl",
      )}
    >
      <input
        ref={inputRef}
        onChange={handleFilesChange}
        name="files"
        type="file"
        multiple
        className={cn(
          files.length > 0 && "hidden",
          "absolute top-0 left-0 h-full w-full cursor-pointer rounded-xl opacity-0 sm:rounded-3xl",
        )}
      />
      {files.length === 0 ? (
        <DropzonePlaceholder />
      ) : (
        <div className="grid max-h-full w-full grow grid-cols-3 content-start gap-2 overflow-y-auto px-2 pt-2 transition-all sm:grid-cols-4 lg:grid-cols-5">
          {files.map((file, index) => (
            <FilePreview
              key={index}
              file={file}
              onRemove={() => handleRemove(index)}
            />
          ))}
        </div>
      )}
      {files.length > 0 && (
        <div className="flex w-full items-center justify-between gap-2 p-2 sm:gap-4">
          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            variant="outline"
            size="sm"
            className="rounded-full"
          >
            <PlusIcon />
            Add files
          </Button>
          <Button
            disabled={pending}
            type="submit"
            size="icon"
            className="m-0 size-auto rounded-full p-1.5"
          >
            {pending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <ArrowUpIcon />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

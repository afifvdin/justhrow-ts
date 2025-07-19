import { FileArchiveIcon, FileImageIcon, FileTextIcon } from "lucide-react";

export function DropzonePlaceholder() {
  return (
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
  );
}

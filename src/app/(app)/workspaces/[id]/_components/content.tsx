import { DownloadIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IMAGES_EXTENSIONS } from "@/lib/constant";
import { cn, humanizeSize, mimeToExt } from "@/lib/utils";
import { DeleteContent } from "./delete-content";

export function Content({
  authorized,
  workspaceId,
  id,
  name,
  mimetype,
  size,
  url,
}: {
  authorized: boolean;
  workspaceId: string;
  id: string;
  name: string;
  mimetype: string;
  size: string;
  url: string;
}) {
  const degree = Math.random() * 10 - 5;
  const ext = mimeToExt(mimetype);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        style={
          {
            "--degree": `${degree}deg`,
          } as React.CSSProperties
        }
        className="relative top-0 flex size-36 rotate-(--degree) items-center justify-center overflow-hidden rounded-xl border-4 bg-white p-2 shadow transition-all hover:-top-1 hover:shadow-xl sm:size-52 sm:rounded-3xl sm:border-8 sm:p-4"
      >
        {IMAGES_EXTENSIONS.includes(ext) ? (
          <Image src={url} alt="image" fill className="bg-cover object-cover" />
        ) : (
          <p className="text-muted-foreground text-sm font-bold sm:text-base">
            {ext}
          </p>
        )}
        <Button
          size="icon"
          variant="secondary"
          className={cn(
            authorized ? "right-11" : "right-2",
            "absolute top-2 h-auto w-auto rounded-full p-1.5",
          )}
        >
          <a href={url} download={name} target="_blank">
            <DownloadIcon className="size-4" />
          </a>
        </Button>
        {authorized && <DeleteContent workspaceId={workspaceId} id={id} />}
      </div>
      <div className="flex items-center gap-2">
        <div className="space-y-1 text-center sm:space-y-2">
          <p className="text-sm leading-none sm:text-base">{name}</p>
          <p className="text-muted-foreground text-xs sm:text-sm">
            {humanizeSize(size)}
          </p>
        </div>
      </div>
    </div>
  );
}

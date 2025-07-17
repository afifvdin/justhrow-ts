import { PlusIcon, SettingsIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn, humanizeSize, mimeToExt } from "@/lib/utils";
import { getAllContent } from "@/services/content";
import { getWorkspace } from "@/services/workspace";

const IMAGES_EXTENSIONS = [
  "JPG",
  "JPEG",
  "PNG",
  "GIF",
  "WEBP",
  "SVG",
  "BMP",
  "ICO",
  "AVIF",
];

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workspace = await getWorkspace({ id });
  const contents = await getAllContent({ workspaceId: id });

  if (!workspace) {
    return <div>Workspace not found</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">{workspace.name}</h2>
        <div className="flex items-center justify-end gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="size-auto rounded-full p-2"
                size="icon"
              >
                <SettingsIcon />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full" size="sm">
                <PlusIcon />
                New files
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add files</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8">
        {contents.map((content) => {
          return (
            <Card
              key={content.id}
              url={content.presignedUrl}
              id={content.id}
              name={content.name}
              mimetype={content.mimetype}
              size={content.size}
            />
          );
        })}
      </div>
    </div>
  );
}

function Card({
  id,
  name,
  mimetype,
  size,
  url,
}: {
  id: string;
  name: string;
  mimetype: string;
  size: string;
  url: string;
}) {
  const ext = mimeToExt(mimetype);
  return (
    <div key={id} className="flex flex-col items-center gap-4">
      <div
        style={
          {
            "--degree": `${Math.random() * 20 - 10}deg`,
          } as React.CSSProperties
        }
        className="relative top-0 flex size-52 rotate-(--degree) cursor-pointer items-center justify-center overflow-hidden rounded-3xl border-8 bg-white p-4 shadow transition-all hover:-top-1 hover:shadow-xl"
      >
        {IMAGES_EXTENSIONS.includes(ext) ? (
          <Image src={url} alt="image" fill className="bg-cover object-cover" />
        ) : (
          <p className="text-muted-foreground font-bold">{ext}</p>
        )}
      </div>
      <div className="space-y-2 text-center">
        <p className="leading-none">{name}</p>
        <p className="text-muted-foreground text-sm">{humanizeSize(size)}</p>
      </div>
    </div>
  );
}

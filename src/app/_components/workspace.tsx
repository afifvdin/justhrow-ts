import Link from "next/link";

export function Workspace({
  id,
  name,
  filesCount,
}: {
  id: string;
  name: string;
  filesCount: number;
}) {
  return (
    <Link href={`/workspaces/${id}`}>
      <div
        style={
          {
            "--degree": `${Math.random() * 10 - 5}deg`,
          } as React.CSSProperties
        }
        className="relative top-0 flex h-52 rotate-(--degree) cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-8 bg-white p-4 shadow transition-all hover:-top-1 hover:shadow-xl"
      >
        <p>{name}</p>
        <p className="text-muted-foreground text-sm">
          {filesCount} files uploaded
        </p>
      </div>
    </Link>
  );
}

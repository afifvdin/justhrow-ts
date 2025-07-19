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
            "--degree": `${Math.random() * 8 - 4}deg`,
          } as React.CSSProperties
        }
        className="relative top-0 flex h-36 rotate-(--degree) cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-4 bg-white p-2 shadow transition-all hover:-top-1 hover:shadow-xl sm:h-52 sm:rounded-3xl sm:border-8 sm:p-4"
      >
        <p className="text-sm sm:text-base">{name}</p>
        <p className="text-muted-foreground text-xs sm:text-sm">
          {filesCount} files uploaded
        </p>
      </div>
    </Link>
  );
}

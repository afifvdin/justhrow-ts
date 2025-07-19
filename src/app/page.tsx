import { Workspaces } from "./_components/workspaces";
import { Uploader } from "./_components/uploader";

const WORDING = [
  "Upload, share, and let it vanish.",
  "Your files, their eyes, your rules.",
  "Drop it here, send a link, set it free.",
  "Share a secret, set a timer.",
  "Justhrow: files in, friends in, time out.",
  "Make it temporary. Make it easy.",
  "Send a file, watch it disappear.",
];

export default async function Home() {
  const word = WORDING[Math.floor(Math.random() * WORDING.length)];
  return (
    <div className="bg mx-auto flex min-h-full w-full max-w-5xl grow flex-col items-center justify-center space-y-12 px-4 py-16 sm:space-y-24 sm:px-8 sm:py-36">
      <div className="flex w-full flex-col items-center justify-center gap-2 sm:gap-4 sm:pb-16">
        <h1 className="text-3xl font-semibold tracking-tighter sm:text-5xl">
          {word}
        </h1>
        <Uploader />
      </div>
      <Workspaces />
    </div>
  );
}

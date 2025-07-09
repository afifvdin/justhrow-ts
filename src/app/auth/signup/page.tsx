import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconBrandGithub, IconBrandGoogleFilled } from "@tabler/icons-react";
import Link from "next/link";

export default async function LoginPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-sm items-center justify-center p-8">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <div className="w-full space-y-2">
          <Input className="w-full" placeholder="Name" />
          <Input className="w-full" placeholder="Email address" />
          <Input className="w-full" placeholder="Password" />
          <Button className="w-full">Register</Button>
        </div>
        <p className="text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Link className="hover:underline" href="/auth/login">
            Log in
          </Link>
        </p>
        <p className="text-muted-foreground text-sm">Or</p>
        <Button variant="secondary" className="w-full">
          <IconBrandGoogleFilled />
          Continue with Google
        </Button>
        <Button variant="secondary" className="w-full">
          <IconBrandGithub />
          Continue with Github
        </Button>
        <Link className="text-muted-foreground text-sm" href="/">
          Back to home
        </Link>
      </div>
    </div>
  );
}

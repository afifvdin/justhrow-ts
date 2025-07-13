import { Button } from "@/components/ui/button";
import { IconBrandGithub } from "@tabler/icons-react";
import { githubLoginAction } from "../actions";

export function GithubAuth() {
  return (
    <form action={githubLoginAction} className="w-full">
      <Button variant="secondary" className="w-full" type="submit">
        <IconBrandGithub />
        Continue with Github
      </Button>
    </form>
  );
}

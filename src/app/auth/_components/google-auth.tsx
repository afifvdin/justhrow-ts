import { Button } from "@/components/ui/button";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { googleLoginAction } from "../actions";

export function GoogleAuth() {
  return (
    <form action={googleLoginAction} className="w-full">
      <Button variant="secondary" className="w-full" type="submit">
        <IconBrandGoogleFilled />
        Continue with Google
      </Button>
    </form>
  );
}

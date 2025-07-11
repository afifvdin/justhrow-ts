"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TLoginState } from "@/types/state";
import {
  IconBrandGithub,
  IconBrandGoogleFilled,
  IconLoader2,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { googleLoginAction, loginAction } from "../actions";

const defaultState: TLoginState = {
  error: {
    errors: [],
    properties: {
      email: {
        errors: [],
      },
      password: {
        errors: [],
      },
    },
  },
  state: {
    email: "",
    password: "",
  },
};

export default function LoginPage() {
  const [state, action, pending] = React.useActionState(
    loginAction,
    defaultState,
  );

  React.useEffect(() => {
    if (state?.error?.errors.length) {
      state.error.errors.map((error) => {
        toast.error(error);
      });
    }
  }, [state]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-sm items-center justify-center p-8">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Log in to justhrow</h1>
        <form
          action={action}
          className="flex w-full flex-col items-center justify-center gap-4"
        >
          <div className="w-full space-y-2">
            <Input
              name="email"
              type="email"
              defaultValue={state?.state?.email ?? ""}
              className="w-full"
              placeholder="Email address"
            />
            {!pending &&
              state?.error?.properties?.email?.errors?.map((error, index) => (
                <p
                  key={`${error}-${index}`}
                  className="ml-2 text-xs text-red-500"
                >
                  {error}
                </p>
              ))}
            <Input
              name="password"
              type="password"
              defaultValue={state?.state?.password ?? ""}
              className="w-full"
              placeholder="Password"
            />
            {!pending &&
              state?.error?.properties?.password?.errors?.map(
                (error, index) => (
                  <p
                    key={`${error}-${index}`}
                    className="ml-2 text-xs text-red-500"
                  >
                    {error}
                  </p>
                ),
              )}
            <Button className="w-full" type="submit" disabled={pending}>
              {pending && <IconLoader2 className="animate-spin" />}
              Log in
            </Button>
          </div>
          <p className="text-sm">
            <span className="text-muted-foreground">
              Don't have an account?{" "}
            </span>
            <Link className="hover:underline" href="/auth/signup">
              Sign up
            </Link>
          </p>
          <p className="text-muted-foreground text-sm">Or</p>
        </form>
        <form action={googleLoginAction} className="w-full">
          <Button variant="secondary" className="w-full" type="submit">
            <IconBrandGoogleFilled />
            Continue with Google
          </Button>
        </form>
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

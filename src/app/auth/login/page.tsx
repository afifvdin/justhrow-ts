"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TLoginState } from "@/types/state";
import { IconLoader2 } from "@tabler/icons-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { GithubAuth } from "../_components/github-auth";
import { GoogleAuth } from "../_components/google-auth";
import { loginAction } from "../actions";

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
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [state, action, pending] = React.useActionState(
    loginAction,
    defaultState,
  );

  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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
        <form action={action} className="w-full space-y-2">
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
            state?.error?.properties?.password?.errors?.map((error, index) => (
              <p
                key={`${error}-${index}`}
                className="ml-2 text-xs text-red-500"
              >
                {error}
              </p>
            ))}
          <Button className="w-full" type="submit" disabled={pending}>
            {pending && <IconLoader2 className="animate-spin" />}
            Log in
          </Button>
        </form>
        <p className="text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link className="hover:underline" href="/auth/signup">
            Sign up
          </Link>
        </p>
        <p className="text-muted-foreground text-sm">Or</p>
        <GoogleAuth />
        <GithubAuth />
        <Link className="text-muted-foreground text-sm" href="/">
          Back to home
        </Link>
      </div>
    </div>
  );
}

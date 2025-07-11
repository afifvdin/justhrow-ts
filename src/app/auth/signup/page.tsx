"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TRegisterState } from "@/types/state";
import {
  IconBrandGithub,
  IconBrandGoogleFilled,
  IconLoader2,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { registerAction } from "../actions";

const defaultState: TRegisterState = {
  error: {
    errors: [],
    properties: {
      name: {
        errors: [],
      },
      email: {
        errors: [],
      },
      password: {
        errors: [],
      },
    },
  },
  state: {
    name: "",
    email: "",
    password: "",
  },
};

export default function SignUpPage() {
  const [state, action, pending] = React.useActionState(
    registerAction,
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
    <form
      action={action}
      className="mx-auto flex min-h-screen w-full max-w-sm items-center justify-center p-8"
    >
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <div className="w-full space-y-2">
          <Input
            name="name"
            type="text"
            defaultValue={state?.state?.name ?? ""}
            className="w-full"
            placeholder="Name"
          />
          {!pending &&
            state?.error?.properties?.name?.errors?.map((error, index) => (
              <p
                key={`${error}-${index}`}
                className="ml-2 text-xs text-red-500"
              >
                {error}
              </p>
            ))}
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
            Register
          </Button>
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
    </form>
  );
}

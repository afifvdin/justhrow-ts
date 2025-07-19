"use client";

import { Loader2Icon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TNewWorkspaceState } from "@/types/state";
import { createWorkspaceAction } from "../actions";

const initialState: TNewWorkspaceState = {
  error: {
    errors: [],
  },
};

export function NewWorkspaceForm() {
  const [state, action, pending] = React.useActionState(
    createWorkspaceAction,
    initialState,
  );

  React.useEffect(() => {
    if (state.error?.errors.length) {
      state.error.errors.map((error) => {
        toast.error(error);
      });
    }
  }, [state]);

  return (
    <form action={action}>
      <Button
        disabled={pending}
        type="submit"
        className="rounded-full"
        size="sm"
      >
        {pending && <Loader2Icon className="animate-spin" />}
        New workspace
      </Button>
    </form>
  );
}

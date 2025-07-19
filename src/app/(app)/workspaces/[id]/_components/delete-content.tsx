"use client";

import { Loader2Icon, TrashIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TDeleteContentState } from "@/types/state";
import { deleteContentAction } from "../actions";

const initialState: TDeleteContentState = {
  error: { errors: [] },
  state: {},
};

export function DeleteContent({
  workspaceId,
  id,
}: {
  workspaceId: string;
  id: string;
}) {
  const [state, action, pending] = React.useActionState(
    deleteContentAction,
    initialState,
  );

  React.useEffect(() => {
    if (state.success) {
      toast.success("Content deleted");
      return;
    }
    if (state.error?.errors) {
      state.error.errors.map((error) => {
        toast.error(error);
      });
    }
  }, [state]);

  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="workspaceId" value={workspaceId} />
      <Button
        type="submit"
        size="icon"
        variant="secondary"
        className="absolute top-2 right-2 h-auto w-auto rounded-full p-1.5"
        disabled={pending}
      >
        {pending ? <Loader2Icon /> : <TrashIcon className="size-4" />}
      </Button>
    </form>
  );
}

"use client";

import { PlusIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { ContentUploader } from "@/components/macro/content-uploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TNewContentState } from "@/types/state";
import { appendContentsAction } from "../actions";

const initialState: TNewContentState = {
  error: {
    errors: [],
  },
};

export function Uploader({ id }: { id: string }) {
  const [open, setOpen] = React.useState(false);
  const [state, action, pending] = React.useActionState(
    appendContentsAction,
    initialState,
  );

  React.useEffect(() => {
    if (state.success) {
      setOpen(false);
      return;
    }
    if (state.error?.errors) {
      state.error.errors.map((error) => {
        toast.error(error);
      });
    }
  }, [state]);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (pending) return;
        setOpen(v);
      }}
    >
      <DialogTrigger asChild>
        <Button className="rounded-full" size="sm">
          <PlusIcon />
          New files
        </Button>
      </DialogTrigger>
      <DialogContent className="px-2 pb-2 sm:p-6">
        <DialogHeader>
          <DialogTitle>Add files</DialogTitle>
        </DialogHeader>
        <form action={action}>
          <input type="hidden" name="workspaceId" value={id} />
          <ContentUploader pending={pending} />
        </form>
      </DialogContent>
    </Dialog>
  );
}

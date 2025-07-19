"use client";

import { Loader2Icon, TrashIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TDeleteWorkspaceState } from "@/types/state";
import { deleteWorkspaceAction } from "../actions";

const initialState: TDeleteWorkspaceState = {
  error: { errors: [] },
};

export function DeleteWorkspace({ id }: { id: string }) {
  const [open, setOpen] = React.useState(false);
  const [state, action, pending] = React.useActionState(
    deleteWorkspaceAction,
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
        <Button
          className="text-destructive hover:text-destructive h-auto w-auto rounded-full p-2"
          size="icon"
          variant="outline"
        >
          <TrashIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="px-2 pb-2 sm:p-6">
        <DialogHeader>
          <DialogTitle>Delete workspace</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this workspace? This action cannot be
          undone.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={pending} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <form action={action}>
            <input type="hidden" name="id" value={id} />
            <Button type="submit" disabled={pending} variant="destructive">
              {pending && <Loader2Icon />}
              Delete
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

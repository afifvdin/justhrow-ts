"use client";

import { ChevronDownIcon, Loader2Icon, SettingsIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TSettingsState } from "@/types/state";
import { settingsAction } from "../actions";

const initialState: TSettingsState = {
  error: {
    errors: [],
  },
  state: {
    name: "",
    date: "",
    time: "",
  },
};

export function Settings({
  id,
  name,
  willDeletedAt,
}: {
  id: string;
  name: string;
  willDeletedAt: Date | null;
}) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    willDeletedAt ?? undefined,
  );
  const [state, action, pending] = React.useActionState(
    settingsAction,
    initialState,
  );
  const time = willDeletedAt
    ? willDeletedAt.toLocaleTimeString("en-US", { hour12: false })
    : "";

  React.useEffect(() => {
    if (state.success) {
      toast.success("Workspace updated");
      setOpenDialog(false);
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
      open={openDialog}
      onOpenChange={(v) => {
        if (pending) return;
        setOpenDialog(v);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="size-auto rounded-full p-2"
          size="icon"
        >
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <input type="hidden" name="workspaceId" value={id} />
          {date && (
            <input type="hidden" name="date" value={date.toISOString()} />
          )}
          <div className="space-y-1">
            <div className="space-y-3">
              <Label htmlFor="name">Workspace name</Label>
              <Input
                name="name"
                id="name"
                className="w-full"
                placeholder="Name"
                defaultValue={name}
              />
            </div>
            {!pending &&
              state?.error?.properties?.name?.errors?.map((error, index) => (
                <p
                  key={`${error}-${index}`}
                  className="ml-2 text-xs text-red-500"
                >
                  {error}
                </p>
              ))}
          </div>
          <div className="grid w-full grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="space-y-3">
                <Label htmlFor="date-picker" className="px-1">
                  Will deleted at
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker"
                      className="w-full justify-between"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {!pending &&
                state?.error?.properties?.date?.errors?.map((error, index) => (
                  <p
                    key={`${error}-${index}`}
                    className="ml-2 text-xs text-red-500"
                  >
                    {error}
                  </p>
                ))}
            </div>
            <div className="space-y-1">
              <div className="space-y-3">
                <Label htmlFor="time-picker" className="px-1">
                  Time
                </Label>
                <Input
                  name="time"
                  type="time"
                  id="time-picker"
                  step="1"
                  defaultValue={time}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
              {!pending &&
                state?.error?.properties?.time?.errors?.map((error, index) => (
                  <p
                    key={`${error}-${index}`}
                    className="ml-2 text-xs text-red-500"
                  >
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={pending} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending && <Loader2Icon />}
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

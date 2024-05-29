import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IndustrySelect } from "./IndustrySelect";
import { StatusSelect } from "./StatusSelect";
import { toast } from "./ui/use-toast";
import { FollowUpDate } from "./FolllowUpDate";
import { CallStatus } from "./CallStatus";

export function AddCall({
  phone,
  open,
  setOpen,
}: {
  phone?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[625px] max-w-xl bg-slate-900">
        <DialogHeader>
          <DialogTitle>Add Call</DialogTitle>
          <DialogDescription>
            Add a new call to your list of contacts.
          </DialogDescription>
        </DialogHeader>
        <CallForm phoneN={phone} />
      </DialogContent>
    </Dialog>
  );
}

function CallForm({
  className,
  phoneN,
}: {
  className?: string;
  phoneN?: string;
}) {
  const [phone, setPhone] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [outcome, setOutcome] = React.useState("");
  const [followup, setFollowup] = React.useState<Date | undefined>(undefined);
  const [notes, setNotes] = React.useState("");

  const handleAddCall = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("phone", phone);
    console.log("duration", duration);
    console.log("outcome", outcome);
    console.log("followup", followup);
    console.log("notes", notes);
    toast({ description: "Lead Added Successfully" });
  };
  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleAddCall}
    >
      <div className="flex gap-2 justify-between">
        <div className="grid gap-2 w-full">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phoneN ? phoneN : phone}
            disabled={phoneN === "" ? false : true}
          />
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor="duration">Call Duration in Seconds</Label>
          <Input
            id="duration"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="grid gap-2 w-full">
          <Label htmlFor="outcome">Call Outcome</Label>
          <CallStatus status={outcome} setStatus={setOutcome} />
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor="followup">Followup Date</Label>
          <FollowUpDate date={followup as Date} setDate={setFollowup} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Input
          id="notes"
          onChange={(e) => {
            setNotes(e.target.value);
          }}
          value={notes}
        />
      </div>

      <Button
        type="submit"
        variant={"outline"}
        className="bg-slate-300 text-slate-800"
      >
        Add Call
      </Button>
    </form>
  );
}

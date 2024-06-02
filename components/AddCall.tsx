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
import { FollowUpDate } from "./FollowUpDate";
import { CallStatus } from "./CallStatus";
import axios from "axios";

export function AddCall({
  phone,
  open,
  setOpen,
  totalCalls,
  setTotalCalls,
}: {
  phone?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  totalCalls: number;
  setTotalCalls: (calls: number) => void;
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
        <CallForm
          phoneN={phone}
          totalCalls={totalCalls}
          setTotalCalls={setTotalCalls}
        />
      </DialogContent>
    </Dialog>
  );
}

function CallForm({
  className,
  phoneN,
  totalCalls,
  setTotalCalls,
}: {
  className?: string;
  phoneN?: string;
  totalCalls: number;
  setTotalCalls: (calls: number) => void;
}) {
  const [phone, setPhone] = React.useState(phoneN ? phoneN : "");
  const [duration, setDuration] = React.useState("");
  const [outcome, setOutcome] = React.useState("");
  const [followup, setFollowup] = React.useState<Date | undefined>(undefined);
  const [notes, setNotes] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleAddCall = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!outcome) {
      setLoading(false);
      toast({ description: "Please select a call outcome" });
      return;
    }
    const phoneRegex = /^[+]\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      setLoading(false);
      toast({
        title: "Invalid phone number",
        description:
          "Please enter a valid phone number. It should start with a plus sign (+), followed by country code and 10-15 digits. Example: +1234567890",
      });
      return;
    }
    const fetchCalls = async () => {
      await axios.get("/api/calls").then((res) => {
        setTotalCalls(totalCalls + 1);
      });
    };
    await axios
      .post("/api/calls", {
        phone,
        callDuration: duration,
        callOutcome: outcome,
        followUpDate: followup,
        callNotes: notes,
      })
      .then((res) => {
        if (res.status === 200) {
          toast({ description: "Call added successfully" });
          if (!phoneN) {
            setPhone("");
          }
          setDuration("");
          setOutcome("");
          setFollowup(undefined);
          setNotes("");
          fetchCalls();
          setLoading(false);
          setTotalCalls(res.data.totalCalls);
        }
      })
      .catch((e) => {
        setLoading(false);
        toast({ description: e.response.data.message });
      });
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
            required
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
            required
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
        {loading ? "Adding Call..." : "Add Call"}
      </Button>
    </form>
  );
}

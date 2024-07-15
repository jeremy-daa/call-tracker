import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "./ui/use-toast";
import { FollowUpDate } from "./FollowUpDate";
import { CallStatus } from "./CallStatus";
import axios from "axios";

export function CallForm({
  className,
  phoneN,
  setTotalCalls,
  setClientLeads,
  clientLeads,
  setFilteredLeads,
  filteredLeads,
  setOpen,
  totalCalls,
}: {
  className?: string;
  phoneN?: string;
  setTotalCalls: (calls: number) => void;
  totalCalls: number;
  setClientLeads: (leads: any[]) => void;
  clientLeads: any[];
  setFilteredLeads: (leads: any[]) => void;
  filteredLeads: any[];
  setOpen: (open: boolean) => void;
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
          setOpen(false);
          setDuration("");
          setOutcome("");
          setNotes("");

          if (followup) {
            const updatedLeads = clientLeads.map((lead) => {
              if (lead.phone === phone) {
                lead.followUpDate = followup;
                return lead;
              }
              return lead;
            });
            setClientLeads(updatedLeads);

            const updatedFilteredLeads = filteredLeads.map((lead) => {
              if (lead.phone === phone) {
                return { ...lead, followUpDate: followup };
              }
              return lead;
            });
            setFilteredLeads(updatedFilteredLeads);
            console.log(filteredLeads);
            setFollowup(undefined);
          }

          const totalCalls = async () => {
            await axios.get("/api/calls").then((res) => {
              setTotalCalls(res.data.calls.length);
            });
          };

          totalCalls();
          setLoading(false);
          setTotalCalls(res.data.totalCalls);
        }
      })
      .catch((e) => {
        setLoading(false);
        toast({ description: "Error adding call" });
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

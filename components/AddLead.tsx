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
import axios from "axios";

export function AddLead({
  open,
  setOpen,
  industries,
  setClientLeads,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  industries: any[];
  setClientLeads: (value: any[]) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[625px] max-w-xl bg-slate-900">
        <DialogHeader>
          <DialogTitle>Add Lead</DialogTitle>
          <DialogDescription>
            Add a new lead to your list of contacts.
          </DialogDescription>
        </DialogHeader>
        <ProfileForm industries={industries} setClientLeads={setClientLeads} />
      </DialogContent>
    </Dialog>
  );
}

function ProfileForm({
  className,
  industries,
  setClientLeads,
}: {
  className?: string;
  industries: any[];
  setClientLeads: (value: any[]) => void;
}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [industry, setIndustry] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleAddLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const phoneRegex = /^[+]\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      setLoading(false);
      return toast({
        title: "Invalid phone number",
        description:
          "Please enter a valid phone number. It should start with a plus sign (+), followed by country code and 10-15 digits. Example: +1234567890",
      });
    }
    const fetchLeads = async () => {
      await axios.get("/api/leads").then((res) => {
        setClientLeads(res.data);
      });
    };

    await axios
      .post("/api/leads", {
        name,
        email,
        phone,
        company,
        industry,
        status,
        notes,
      })
      .then((res) => {
        setName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setIndustry("");
        setStatus("");
        setNotes("");
        setLoading(false);
        fetchLeads();

        toast({ description: "Lead added successfully" });
      })
      .catch((err) => {
        setLoading(false);
        toast({ description: err.response.data.message });
      });
  };
  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleAddLead}
    >
      <div className="flex gap-2 justify-between">
        <div className="grid gap-2 w-full">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="grid gap-2 w-full">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            required
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            required
            onChange={(e) => setCompany(e.target.value)}
            value={company}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="grid gap-2 w-full">
          <Label htmlFor="industry">Industry</Label>
          <IndustrySelect
            industry={industry}
            setIndustry={setIndustry}
            industries={industries}
          />
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor="status">Status</Label>
          <StatusSelect status={status} setStatus={setStatus} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Input
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <Button
        type="submit"
        variant={"outline"}
        className="bg-slate-300 text-slate-800"
      >
        {loading ? "Adding Lead..." : "Add Lead"}
      </Button>
    </form>
  );
}

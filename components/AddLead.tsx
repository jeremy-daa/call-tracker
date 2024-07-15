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
import { set } from "mongoose";

export function AddLead({
  open,
  setOpen,
  industries,
  setClientLeads,
  setTotalLeads,
  totalLeads,
  setFilteredLeads,
  filterTerm,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  industries: any[];
  setClientLeads: (value: any[]) => void;
  setTotalLeads: (value: number) => void;
  totalLeads: number;
  setFilteredLeads: (leads: any[]) => void;
  filterTerm: string;
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
        <ProfileForm
          industries={industries}
          setClientLeads={setClientLeads}
          setTotalLeads={setTotalLeads}
          totalLeads={totalLeads}
          setFilteredLeads={setFilteredLeads}
          filterTerm={filterTerm}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

function ProfileForm({
  className,
  industries,
  setClientLeads,
  setTotalLeads,
  totalLeads,
  setFilteredLeads,
  filterTerm,
  setOpen,
}: {
  className?: string;
  industries: any[];
  setClientLeads: (value: any[]) => void;
  setTotalLeads: (value: number) => void;
  totalLeads: number;
  setFilteredLeads: (leads: any[]) => void;
  filterTerm: string;
  setOpen: (open: boolean) => void;
}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState<undefined | string>(undefined);
  const [phone, setPhone] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [industry, setIndustry] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [websiteStatus, setWebsiteStatus] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const followUpDate = undefined;

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
        setTotalLeads(totalLeads + 1);
      });
    };

    await axios
      .post("/api/leads", {
        name,
        email,
        phone,
        company,
        industry,
        website,
        websiteStatus,
        status,
        notes,
      })
      .then((res) => {
        setName("");
        setEmail(undefined);
        setPhone("");
        setCompany("");
        setIndustry("");
        setStatus("");
        setNotes("");
        setWebsite("");
        setWebsiteStatus("");
        setOpen(false);
        setLoading(false);
        fetchLeads();
        setClientLeads(res.data);

        const newfilteredLeads = res.data.filter((lead: any) => {
          if (filterTerm === "") {
            return lead;
          }
          if (lead.industry === filterTerm) {
            return lead;
          }
        });
        setFilteredLeads(newfilteredLeads);
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
      <div className="flex gap-2">
        <div className="grid gap-2 w-full">
          <Label htmlFor="webiste">Website</Label>
          <Input
            id="website"
            required
            onChange={(e) => setWebsite(e.target.value)}
            value={website}
          />
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor="websiteStatus">Website Status</Label>
          <Input
            id="websiteStatus"
            required
            onChange={(e) => setWebsiteStatus(e.target.value)}
            value={websiteStatus}
          />
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

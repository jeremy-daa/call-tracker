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
import { SelectDemo } from "./Select";
import { StatusSelect } from "./StatusSelect";
import { toast } from "./ui/use-toast";

export function AddLead({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
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
        <ProfileForm />
      </DialogContent>
    </Dialog>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [industry, setIndustry] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleAddLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log("data", data);
    toast({ description: "Lead Added Successfully" });
  };
  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleAddLead}
    >
      <div className="flex gap-2 justify-between">
        <div className="grid gap-2 w-full">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" />
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor="email">Email</Label>
          <Input id="email" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="grid gap-2 w-full">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" />
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor="company">Company</Label>
          <Input id="company" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="grid gap-2 w-full">
          <Label htmlFor="industry">Industry</Label>
          <IndustrySelect industry={industry} setIndustry={setIndustry} />
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor="status">Status</Label>
          <StatusSelect status={status} setStatus={setStatus} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" />
      </div>

      <Button
        type="submit"
        variant={"outline"}
        className="bg-slate-300 text-slate-800"
      >
        Add Lead
      </Button>
    </form>
  );
}

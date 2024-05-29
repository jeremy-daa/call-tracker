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
import { toast } from "./ui/use-toast";
import { FollowUpDate } from "./FolllowUpDate";
import { CallStatus } from "./CallStatus";

export function AddIndustry({
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
          <DialogTitle>Add Industry</DialogTitle>
          <DialogDescription>Add a new industry category.</DialogDescription>
        </DialogHeader>
        <IndustryForm phoneN={phone} />
      </DialogContent>
    </Dialog>
  );
}

function IndustryForm({
  className,
  phoneN,
}: {
  className?: string;
  phoneN?: string;
}) {
  const [industry, setIndustry] = React.useState("");
  const [description, setDescription] = React.useState("");
  const handleAddIndustry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast({ description: "Lead Added Successfully" });
  };
  return (
    <form
      className={cn("grid items-start gap-4", className)}
      onSubmit={handleAddIndustry}
    >
      <div className="flex gap-2 justify-between">
        <div className="grid gap-2 w-full">
          <Label htmlFor="industry">Industry Name</Label>
          <Input
            id="industry"
            onChange={(e) => {
              setIndustry(e.target.value);
            }}
            value={industry}
          />
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor="description">Short Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
      </div>

      <Button
        type="submit"
        variant={"outline"}
        className="bg-slate-300 text-slate-800"
      >
        Add Industry
      </Button>
    </form>
  );
}

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CallForm } from "./CallForm";

export function AddCall({
  phone,
  open,
  setOpen,
  setTotalCalls,
  setClientLeads,
  clientLeads,
  setFilteredLeads,
  filteredLeads,
  totalCalls,
}: {
  phone?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  setTotalCalls: (calls: number) => void;
  setClientLeads: (leads: any[]) => void;
  clientLeads: any[];
  setFilteredLeads: (leads: any[]) => void;
  filteredLeads: any[];
  totalCalls: number;
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
          setTotalCalls={setTotalCalls}
          setClientLeads={setClientLeads}
          clientLeads={clientLeads}
          setFilteredLeads={setFilteredLeads}
          filteredLeads={filteredLeads}
          setOpen={setOpen}
          totalCalls={totalCalls}
        />
      </DialogContent>
    </Dialog>
  );
}

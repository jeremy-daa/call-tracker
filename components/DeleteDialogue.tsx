import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "./ui/use-toast";

export function DeleteDialogue({
  leadId,
  name,
  setFilteredLeads,
  filteredLeads,
  clientLeads,
  setClientLeads,
  totalLeads,
  setTotalLeads,
  setTotalCalls,
}: {
  leadId: string;
  name: string;
  setFilteredLeads: (leads: any[]) => void;
  filteredLeads: any[];
  clientLeads: any[];
  setClientLeads: (leads: any[]) => void;
  totalLeads: number;
  setTotalLeads: (value: number) => void;
  setTotalCalls: (value: number) => void;
}) {
  const handleLeadDelete = () => {
    axios
      .delete(`/api/leads/${leadId}`)
      .then((res) => {
        toast({
          variant: "success",
          title: "Deleted",
          description: "Lead deleted successfully",
        });
        setFilteredLeads(filteredLeads.filter((lead) => lead._id !== leadId));
        setClientLeads(clientLeads.filter((lead) => lead._id !== leadId));
        setTotalLeads(totalLeads - 1);
        const totalCalls = async () => {
          await axios.get("/api/calls").then((res) => {
            const total = res.data.calls.length || 0;
            setTotalCalls(total);
          });
        };

        totalCalls();
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.response.data.message,
        });
      });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-red-400 w-[180px]">
          Delete Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-800">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-center mb-2">Delete Lead</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete{" "}
            <span className="font-bold text-red-400">{name}</span> from the list
            of leads?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-6">
          <DialogTrigger asChild>
            <Button variant="outline" className="px-5">
              Cancel
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-red-600 border-x-slate-400 hover:bg-red-800 px-5"
              onClick={handleLeadDelete}
            >
              Delete
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}

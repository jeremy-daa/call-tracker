"use client";
import React from "react";
import { Badge } from "./ui/badge";
import { MdAddCall } from "react-icons/md";
import { Button } from "./ui/button";
import { FaUserTie } from "react-icons/fa";
import { toast } from "./ui/use-toast";
import { SelectLeadStatus } from "./Select";
import Image from "next/image";
import { getStatusColor } from "@/utils/functions";
import axios from "axios";
import { DeleteDialogue } from "./DeleteDialogue";

const LeadCard = ({
  setOpenDrawer,
  setOpenCall,
  setPhone,
  lead,
  setLeadInfo,
  setCallsInfo,
  setCallsLoading,
  setFilteredLeads,
  filteredLeads,
  clientLeads,
  setClientLeads,
  totalCalls,
  totalLeads,
  setTotalCalls,
  setTotalLeads,
}: {
  setOpenDrawer: (value: boolean) => void;
  setOpenCall: (value: boolean) => void;
  setPhone: (value: string) => void;
  lead: any;
  setLeadInfo: (value: any) => void;
  setCallsInfo: (value: any) => void;
  setCallsLoading: (value: boolean) => void;
  setFilteredLeads: (value: any[]) => void;
  filteredLeads: any[];
  clientLeads: any[];
  setClientLeads: (value: any[]) => void;
  totalCalls: number;
  totalLeads: number;
  setTotalCalls: (value: number) => void;
  setTotalLeads: (value: number) => void;
}) => {
  const [status, setStatus] = React.useState("");
  const [selectedLead, setSelectedLead] = React.useState(lead);
  const fetchLead = async () => {
    setCallsLoading(true);
    setLeadInfo(lead);
    await axios
      .get(`/api/leads/${lead._id}`)
      .then((res) => {
        setCallsInfo(res.data.calls);
        setCallsLoading(false);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "No follow-up date";
    const d = new Date(date);
    // Month in text, day + "th", year
    return `${d.toLocaleString("default", {
      month: "long",
    })} ${d.getDate()}th, ${d.getFullYear()}`;
  };

  const handleStatusUpdate = (value: string, leadId: string) => {
    axios
      .put(`/api/leads/${leadId}`, { status: value })
      .then((res) => {
        toast({
          variant: "success",
          title: "Updated",
          description: "Lead status updated successfully",
        });
        axios
          .get(`/api/leads/${leadId}`)
          .then((res) => {
            setSelectedLead(res.data.lead);
          })
          .catch((err) => {
            console.log("Error: ", err);
          });

        setStatus("");
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update lead status",
        });
      });
  };

  return (
    <div className="w-full bg-slate-800 border-2 border-slate-300 py-4 px-8  flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Image
          src="/favicon_chiraro.svg"
          alt="logo"
          width="30"
          height="45"
          className="w-auto h-[35px] object-contain mr-5"
        />
        <div className="min-w-[250px] max-w-[250px] flex flex-col items-start">
          <h2 className="text-xl">{selectedLead.fullName}</h2>
          <p className="text-sm">{selectedLead.company}</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span>Status:</span>
            <span className="font-bold flex justify-center items-center">
              <Badge
                className={`w-fit ${getStatusColor(
                  selectedLead.status
                )} text-slate-900 hover:text-slate-900`}
              >
                {selectedLead.status}
              </Badge>
            </span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="text-sm">Followup Date:</span>
            <span className="font-bold flex justify-center items-center">
              <Badge className={`w-fit text-slate-200 hover:text-slate-300`}>
                {formatDate(selectedLead.followUpDate)}
              </Badge>
            </span>
          </div>
        </div>
        <div className="ml-3 flex flex-col gap-3 self-center">
          <div className="flex gap-3">
            <SelectLeadStatus status={status} setStatus={setStatus} />
            {/* if select value changes display update button */}
            {status && (
              <>
                <Button
                  variant={"outline"}
                  className="px-10 flex gap-4 justify-center items-center hover:bg-slate-900"
                  onClick={() => handleStatusUpdate(status, selectedLead._id)}
                >
                  Update
                </Button>
                <Button
                  variant={"outline"}
                  className="px-10 flex gap-4 justify-center items-center hover:bg-slate-900"
                  onClick={() => {
                    setStatus("");
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
          <DeleteDialogue
            leadId={selectedLead._id}
            name={selectedLead.fullName}
            setFilteredLeads={setFilteredLeads}
            filteredLeads={filteredLeads}
            clientLeads={clientLeads}
            setClientLeads={setClientLeads}
            totalLeads={totalLeads}
            setTotalLeads={setTotalLeads}
            totalCalls={totalCalls}
            setTotalCalls={setTotalCalls}
          />
        </div>
      </div>
      <div className="flex gap-4 flex-col">
        <Button
          variant={"outline"}
          className="px-10 flex gap-4 justify-start items-center hover:bg-slate-900"
          onClick={() => {
            setOpenDrawer(true);
            fetchLead();
          }}
        >
          <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
            <FaUserTie />
          </Badge>
          View
        </Button>
        <Button
          variant={"outline"}
          className="px-10 flex gap-4 justify-start items-center hover:bg-slate-900"
          onClick={() => {
            setOpenCall(true);
            setPhone(lead.phone);
          }}
        >
          <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
            <MdAddCall />
          </Badge>
          Add Call
        </Button>
      </div>
    </div>
  );
};

export default LeadCard;

"use client";
import * as React from "react";
import Image from "next/image";
import { TableDemo } from "@/components/Table";
import { EditText, EditTextarea } from "react-edit-text";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Badge } from "./ui/badge";
import {
  MdEmail,
  MdPhone,
  MdNotes,
  MdEdit,
  MdSave,
  MdCancel,
} from "react-icons/md";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import axios from "axios";
import Link from "next/link";
import { toast } from "./ui/use-toast";

interface drawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: any;
}

export function DrawerDemo({
  open,
  onOpenChange,
  leadInfo,
  setLeadInfo,
  callsInfo,
  setCallsInfo,
  callsLoading,
  setPhone,
  setOpenCall,
  setFilteredLeads,
  filteredLeads,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leadInfo: any;
  setLeadInfo: (value: any) => void;
  callsInfo: any[];
  setCallsInfo: (value: any) => void;
  callsLoading: boolean;
  setPhone: (value: string) => void;
  setOpenCall: (value: boolean) => void;
  setFilteredLeads: (value: any[]) => void;
  filteredLeads: any[];
}) {
  const lead = leadInfo;
  const dateFormat = (date: Date) => {
    //  CHeck if date is valid
    if (!date) return "No follow-up date";
    const d = new Date(date);
    // Month in text, day + "th", year
    return `${d.toLocaleString("default", {
      month: "long",
    })} ${d.getDate()}th, ${d.getFullYear()}`;
  };
  const [editNotes, setEditNotes] = React.useState(false);
  const [notes, setNotes] = React.useState(leadInfo?.notes);
  const [inputChange, setInputChange] = React.useState("");
  const [successful, setSuccessful] = React.useState(false);

  const newfilteredLeads = filteredLeads.map((lead: any) => {
    if (lead.phone === leadInfo.phone) {
      return {
        ...lead,
        notes,
      };
    }
    return lead;
  });
  const newLeadInfo = { ...leadInfo, notes };
  const handleNotesUpdate = async () => {
    if (!notes) {
      setNotes("No notes");
    }

    await axios
      .post(`/api/leads/${lead?._id}`, {
        notes,
      })
      .then((res) => {
        setFilteredLeads(newfilteredLeads);
        setSuccessful(true);

        toast({
          title: "Success",
          description: "Lead note updated successfully",
        });
        setEditNotes(false);
        // setNotes(leadInfo?.notes);
        setLeadInfo(newLeadInfo);
      })
      .catch((err) => {
        console.log("Error: ", err);
        toast({
          title: "Error",
          description: "Failed to update lead note",
        });
      });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-slate-800 rounded-none">
        <div className="mx-auto w-full max-w-5xl flex justify-between items-start ">
          <div className="w-full flex-[0.4] mb-2">
            <DrawerHeader className="mb-2">
              <div className="w-fit flex justify-center items-center p-4 mb-5 rounded-full border-2 border-slate-300">
                <Image
                  src="/favicon_chiraro.svg"
                  alt="logo"
                  width="30"
                  height="45"
                  className="w-[35px] h-[35px] object-contain"
                />
              </div>
              <DrawerTitle>{lead?.fullName}</DrawerTitle>
              <DrawerDescription>{lead?.company}</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-5">
              <div className="flex flex-col gap-5 mb-2 select-text">
                {/* Display Info About lead*/}
                <div className="flex items-center gap-5">
                  <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
                    <MdPhone className="mr-2" /> Phone Number:
                  </Badge>
                  <Link href={`tel:${lead.phone}`}>{lead.phone}</Link>
                </div>
                <div className="flex items-center gap-5">
                  <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
                    <MdEmail className="mr-2" /> Email:
                  </Badge>
                  <Link href={`mailto:${lead.email}`}>{lead?.email}</Link>
                </div>
                <div className="flex items-center gap-5">
                  <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
                    <HiMiniBuildingOffice2 className="mr-2" /> Industry:
                  </Badge>
                  <span>{lead?.industry}</span>
                </div>
                <div className="flex items-center gap-5">
                  <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
                    <HiMiniBuildingOffice2 className="mr-2" /> Followup Date:
                  </Badge>
                  {/* Display Followup Date formated */}
                  <span>
                    {lead?.followUpDate === null
                      ? "N/A"
                      : dateFormat(lead?.followUpDate)}
                  </span>
                </div>
                <div className="flex items-center gap-5">
                  <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
                    <MdNotes className="mr-2" /> Notes:
                  </Badge>
                  <div className="flex gap-2 justify-between items-center w-full">
                    <EditText
                      defaultValue={notes === "" ? "No notes" : leadInfo?.notes}
                      inputClassName="inputText"
                      readonly={!editNotes}
                      value={notes}
                      style={{
                        border: ` ${editNotes ? "1px solid #00B5D8" : "none"}`,
                        backgroundColor: ` ${
                          editNotes ? "#334155b5" : "transparent"
                        }`,
                        paddingLeft: "8px",
                        paddingRight: "8px",
                        paddingTop: `2px`,
                        paddingBottom: `2px`,
                        minHeight: "29.5px",
                        minWidth: "170px",
                      }}
                      onSave={(e) => {
                        setNotes(e.value);
                      }}
                      onChange={(e) => {
                        setNotes(e.target.value);
                      }}
                    />

                    {editNotes ? (
                      <div className="flex gap-2">
                        <button
                          className="bg-blue-300 text-slate-900 hover:bg-blue-500 hover:text-slate-900 flex justify-center items-center mr-3 px-2 py-[2px] rounded-[25px]"
                          onClick={() => {
                            handleNotesUpdate();
                            setFilteredLeads(newfilteredLeads);
                          }}
                        >
                          <MdSave />
                        </button>
                        <button
                          className="bg-red-300 text-slate-900 hover:bg-red-500 flex justify-center items-center mr-3 px-2 py-[2px] rounded-[25px]"
                          onClick={() => {
                            setEditNotes(!editNotes);
                            setNotes(lead?.notes || "No notes");
                          }}
                        >
                          <MdCancel />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="bg-green-300 text-slate-900 hover:bg-green-500 hover:text-slate-900 flex justify-center items-center mr-3 px-2 py-[2px] rounded-[25px]"
                        onClick={() => setEditNotes(!editNotes)}
                      >
                        <MdEdit />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button
                className="bg-slate-700 hover:bg-slate-600"
                variant={"outline"}
                onClick={() => {
                  setOpenCall(true);
                  setPhone(lead.phone);
                }}
              >
                Add Call
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setLeadInfo({});
                    setCallsInfo([]);
                  }}
                >
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
          <div className="flex-[0.6] pt-4 mt-8 flex flex-col justify-between">
            <TableDemo calls={callsInfo} callsLoading={callsLoading} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

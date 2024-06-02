"use client";
import axios from "axios";
import React from "react";
import { EditText, EditTextarea } from "react-edit-text";
import { MdEdit, MdSave, MdCancel } from "react-icons/md";

const NoteEdit = ({
  initialNotes,
  leadInfo,
  setLeadInfo,
  filteredLeads,
  setFilteredLeads,
  toast,
  leadId,
  clientLeads,
  setClientLeads,
}: {
  initialNotes: string;
  leadInfo: any;
  setLeadInfo: any;
  filteredLeads: any[];
  setFilteredLeads: any;
  toast: any;
  leadId: string;
  clientLeads: any[];
  setClientLeads: (value: any[]) => void;
}) => {
  const [editNotes, setEditNotes] = React.useState(false);
  const [notes, setNotes] = React.useState(initialNotes);
  const newfilteredLeads = filteredLeads.map((lead: any) => {
    if (lead.phone === leadInfo.phone) {
      return {
        ...lead,
        notes,
      };
    }
    return lead;
  });
  const newClientLeads = clientLeads.map((lead: any) => {
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
      .post(`/api/leads/${leadId}`, {
        notes,
      })
      .then((res) => {
        setFilteredLeads(newfilteredLeads);
        setClientLeads(newClientLeads);

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
    <>
      <EditText
        defaultValue={notes === "" ? "No notes" : leadInfo?.notes}
        inputClassName="inputText"
        readonly={!editNotes}
        value={notes}
        style={{
          border: ` ${editNotes ? "1px solid #00B5D8" : "none"}`,
          backgroundColor: ` ${editNotes ? "#334155b5" : "transparent"}`,
          paddingLeft: "8px",
          paddingRight: "8px",
          paddingTop: `2px`,
          paddingBottom: `2px`,
          minHeight: "29.5px",
          minWidth: "170px",
        }}
        onSave={(e) => {
          if (notes === "") return setNotes("No notes");
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
              setNotes(initialNotes || "No notes");
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
    </>
  );
};

export default NoteEdit;

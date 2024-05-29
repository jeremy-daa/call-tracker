import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "./ui/badge";

export function SelectDemo({
  status,
  setStatus,
  setLeadId,
  leadId,
}: {
  status: string;
  leadId: string;
  setStatus: (status: any) => void;
  setLeadId: (leadId: any) => void;
}) {
  return (
    <Select
      value={status}
      onValueChange={(value) => {
        setStatus(value);
        setLeadId(leadId);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Change lead status" />
      </SelectTrigger>
      <SelectContent className="bg-slate-800">
        <SelectGroup className="items-start">
          <SelectItem value="Not Called">
            <Badge className="w-fit bg-slate-400 text-slate-900 hover:bg-bg-green-400 hover:text-slate-900">
              Not Called
            </Badge>
          </SelectItem>
          <SelectItem value="Call Scheduled">
            <Badge className="w-fit bg-slate-300 text-slate-900 hover:bg-bg-green-400 hover:text-slate-900">
              Call Scheduled
            </Badge>
          </SelectItem>
          <SelectItem value="Calling">
            <Badge className="w-fit bg-slate-100 text-slate-900 hover:bg-bg-green-400 hover:text-slate-900">
              Calling
            </Badge>
          </SelectItem>
          <SelectItem value="No Answer">
            <Badge className="w-fit bg-red-200 text-slate-900 hover:bg-bg-green-400 hover:text-slate-900">
              No Answer
            </Badge>
          </SelectItem>
          <SelectItem value="Left Voicemail">
            <Badge className="w-fit bg-red-300 text-slate-900 hover:bg-bg-green-400 hover:text-slate-900">
              Left Voicemail
            </Badge>
          </SelectItem>
          <SelectItem value="Call Back Later">
            <Badge className="w-fit bg-yellow-400 text-slate-900 hover:bg-bg-green-400 hover:text-slate-900">
              Call Back Later
            </Badge>
          </SelectItem>
          <SelectItem value="Interested">
            <Badge className="w-fit bg-green-400 text-slate-900 hover:bg-bg-green-400 hover:text-slate-900">
              Interested
            </Badge>
          </SelectItem>
          <SelectItem value="Not Interested">
            <Badge className="w-fit bg-pink-400 text-slate-900 hover:bg-bg-green-400 hover:text-slate-900">
              Not Interested
            </Badge>
          </SelectItem>
          <SelectItem value="Do Not Call">
            <Badge className="w-fit bg-pink-600 text-slate-900 hover:bg-bg-green-400 hover:text-slate-900">
              Do Not Call
            </Badge>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

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

export function CallStatus({
  status,
  setStatus,
}: {
  status: string;
  setStatus: (status: any) => void;
}) {
  return (
    <Select
      value={status}
      onValueChange={(value) => {
        setStatus(value);
      }}
    >
      <SelectTrigger className="">
        <SelectValue placeholder="Call status" />
      </SelectTrigger>
      <SelectContent className="bg-slate-800">
        <SelectGroup className="items-start">
          {/* 
        "Connected",
        "Voicemail",
        "No Answer",
        "Disconnected",
        "Busy",
        "Other", */}

          <SelectItem value="Connected">
            <Badge className="w-fit bg-green-500 text-slate-900 hover:bg-bg-green-400 hover:text-slate-900">
              Connected
            </Badge>
          </SelectItem>
          <SelectItem value="Voicemail">
            <Badge className="w-fit bg-yellow-300 text-slate-900 hover:bg-bg-green-400 hover:text-slate-900">
              Voicemail
            </Badge>
          </SelectItem>
          <SelectItem value="No Answer">
            <Badge className="w-fit bg-red-200 text-slate-900 hover:bg-bg-green-400 hover:text-slate-900">
              No Answer
            </Badge>
          </SelectItem>
          <SelectItem value="Disconnected">
            <Badge className="w-fit bg-red-400 text-slate-900 hover:bg-bg-green-400 hover:text-slate-900">
              Disconnected
            </Badge>
          </SelectItem>
          <SelectItem value="Busy">
            <Badge className="w-fit bg-blue-300 text-slate-900 hover:bg-bg-green-400 hover:text-slate-900">
              Busy
            </Badge>
          </SelectItem>
          <SelectItem value="Other">
            <Badge className="w-fit bg-yellow-400 text-slate-900 hover:bg-bg-green-400 hover:text-slate-900">
              Other
            </Badge>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

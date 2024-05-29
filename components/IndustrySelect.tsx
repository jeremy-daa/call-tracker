import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const industries = [
  {
    value: "law",
    label: "Law Firm",
  },
  {
    value: "tourism",
    label: "Tour & Travel",
  },
  {
    value: "finance",
    label: "Finance",
  },
  {
    value: "health",
    label: "Healthcare",
  },
  {
    value: "edu",
    label: "Education",
  },
  {
    value: "media",
    label: "Media",
  },
  {
    value: "other",
    label: "Other",
  },
];

export function IndustrySelect({
  industry,
  setIndustry,
}: {
  industry: string;
  setIndustry: (industry: any) => void;
}) {
  return (
    <Select
      value={industry}
      onValueChange={(value) => {
        setIndustry(value);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select industry" />
      </SelectTrigger>
      <SelectContent className="bg-slate-800">
        <SelectGroup className="items-start">
          {industries.map((industry) => (
            <SelectItem key={industry.value} value={industry.value}>
              {industry.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

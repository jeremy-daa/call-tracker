"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CommandList } from "cmdk";

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

const Combobox = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between hover:bg-slate-700"
        >
          {value
            ? industries.find((industry) => industry.value === value)?.label
            : "Filter by industry..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-slate-950">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search industry..." />
            <CommandEmpty>No industry found.</CommandEmpty>
            <CommandGroup>
              {industries.map((industry) => (
                <CommandItem
                  key={industry.value}
                  value={industry.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="hover:bg-slate-700"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === industry.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {industry.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;

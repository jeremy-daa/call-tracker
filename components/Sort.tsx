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

export function Sort({
  filteredLeads,
  setFilteredLeads,
}: {
  filteredLeads: any[];
  setFilteredLeads: (leads: any[]) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const sortOptions = ["Follow-up date", "Status"];
  const handleSort = (value: string) => {
    if (value === "Follow-up date") {
      setFilteredLeads(
        [...filteredLeads].sort(
          (a, b) =>
            new Date(a.follow_up_date).getTime() -
            new Date(b.follow_up_date).getTime()
        )
      );
    } else if (value === "Status") {
      setFilteredLeads(
        [...filteredLeads].sort((a, b) => a.status.localeCompare(b.status))
      );
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between hover:bg-slate-700"
        >
          {value ? sortOptions.find((opt) => opt === value) : "Sort by..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-slate-950">
        <Command>
          <CommandList>
            <CommandInput placeholder="Sort by..." />
            <CommandEmpty>No Sorting Option found.</CommandEmpty>
            <CommandGroup>
              {sortOptions.map((option, index) => (
                <CommandItem
                  key={index}
                  value={option}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    handleSort(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="hover:bg-slate-700"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

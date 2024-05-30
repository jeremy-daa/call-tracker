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

const Combobox = ({
  setIndustryFilter,
  industries,
}: {
  industries: any[];
  setIndustryFilter: (value: string) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-slate-400 hover:bg-slate-700"
        >
          {value
            ? industries.find((industry) => industry.name === value)?.name
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
              {industries.map((industry, index) => (
                <CommandItem
                  key={index}
                  value={industry.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setIndustryFilter(
                      currentValue === value ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                  className="hover:bg-slate-700"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === industry.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {industry.name}
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

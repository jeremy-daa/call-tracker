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

export function IndustrySelect({
  industry,
  setIndustry,
  industries,
}: {
  industry: string;
  setIndustry: (industry: any) => void;
  industries: any[];
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(industry);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between hover:bg-slate-700"
        >
          {value
            ? industries.find((industry) => industry.name === value)?.name
            : "Select Industry..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-slate-950">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search industry..." />
            <CommandEmpty>No industry found.</CommandEmpty>
            <CommandGroup>
              {industries.map((industry) => (
                <CommandItem
                  key={industry.name}
                  value={industry.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setIndustry(currentValue);
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
}

export default IndustrySelect;

// export function IndustrySelect({
//   industry,
//   setIndustry,
//   industries,
// }: {
//   industry: string;
//   setIndustry: (industry: any) => void;
//   industries: any[];
// }) {
//   return (
//     <Select
//       value={industry}
//       onValueChange={(value) => {
//         setIndustry(value);
//       }}
//     >
//       <SelectTrigger>
//         <SelectValue placeholder="Select industry" />
//       </SelectTrigger>
//       <SelectContent className="bg-slate-800">
//         <SelectGroup className="items-start">
//           {industries.map((industry, index) => (
//             <SelectItem key={index} value={industry.name}>
//               {industry.name}
//             </SelectItem>
//           ))}
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// }

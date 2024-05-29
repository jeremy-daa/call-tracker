import * as React from "react";
import Image from "next/image";
import { TableDemo } from "@/components/Table";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from "./ui/badge";
import { MdEmail, MdPhone, MdNotes } from "react-icons/md";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { on } from "events";

interface drawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: any;
}

export function DrawerDemo({ open, onOpenChange }: drawerProps) {
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
              <DrawerTitle>Lead Name</DrawerTitle>
              <DrawerDescription>Company Name</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-5">
              <div className="flex flex-col gap-5 mb-2">
                {/* Display Info About lead*/}
                <div className="flex items-center gap-5">
                  <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
                    <MdPhone className="mr-2" /> Phone Number:
                  </Badge>
                  <span>+251-991-165512</span>
                </div>
                <div className="flex items-center gap-5">
                  <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
                    <MdEmail className="mr-2" /> Email:
                  </Badge>
                  <span>abc@gmail.com</span>
                </div>
                <div className="flex items-center gap-5">
                  <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
                    <HiMiniBuildingOffice2 className="mr-2" /> Industry:
                  </Badge>
                  <span>Law Firm</span>
                </div>
                <div className="flex items-center gap-5">
                  <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
                    <MdNotes className="mr-2" /> Notes:
                  </Badge>
                  <span>Note likely to convert</span>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button
                className="bg-slate-700 hover:bg-slate-600"
                variant={"outline"}
              >
                Add Call
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
          <div className="flex-[0.6] pt-4 mt-8 flex flex-col justify-between">
            <TableDemo />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

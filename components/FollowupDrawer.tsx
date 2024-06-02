import { Badge } from "@/components/ui/badge";
import React from "react";
import { Button } from "@/components/ui/button";
import { MdCalendarMonth } from "react-icons/md";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const FollowupDrawer = ({ filteredLeads }: { filteredLeads: any[] }) => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  return (
    <div>
      <Button
        variant={"outline"}
        className="px-10 flex gap-4 justify-center items-center hover:bg-slate-900"
        onClick={() => {
          setOpenDrawer(true);
        }}
      >
        <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
          <MdCalendarMonth />
        </Badge>
        Follow-up
      </Button>
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent className="bg-slate-800 rounded-none w-[500px] h-[100vh] mx-auto">
          <DrawerHeader className="flex gap-3 flex-col items-center">
            <DrawerTitle>Follow-up</DrawerTitle>
            <DrawerDescription>
              Your leads with follow-up dates
            </DrawerDescription>
          </DrawerHeader>
          <div>
            {filteredLeads.map((lead: any, index) => (
              <div
                key={index}
                className="flex gap-3 items-center justify-center"
              >
                <Badge
                  className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900"
                  variant="outline"
                >
                  {lead.lead_id}
                </Badge>
                <Badge
                  className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900"
                  variant="outline"
                >
                  {lead.lead_name}
                </Badge>
                <Badge
                  className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900"
                  variant="outline"
                >
                  {lead.lead_email}
                </Badge>
                <Badge
                  className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900"
                  variant="outline"
                >
                  {lead.lead_phone}
                </Badge>
              </div>
            ))}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FollowupDrawer;

"use client";
import axios from "axios";
import Combobox from "@/components/Combobox";
import LeadCard from "@/components/LeadCard";
import { Button } from "@/components/ui/button";
import { MdAddCall } from "react-icons/md";
import { RiUserSearchFill, RiUserAddFill } from "react-icons/ri";
import { TbCategoryPlus } from "react-icons/tb";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DrawerDemo } from "@/components/Drawer";
import { AddLead } from "@/components/AddLead";
import { AddCall } from "@/components/AddCall";
import { AddIndustry } from "@/components/AddIndustry";

const Dashboard = ({ leads, calls }: { leads: any[]; calls?: number }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [openLead, setOpenLead] = useState(false);
  const [openIndustry, setOpenIndustry] = useState(false);
  const [phone, setPhone] = useState("");
  const [leadInfo, setLeadInfo] = useState({} as any);
  const [callsInfo, setCallsInfo] = useState([] as any[]);
  const [callsLoading, setCallsLoading] = useState(false);
  const [filteredLeads, setFilteredLeads] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);
  const [industryFilter, setIndustryFilter] = useState("");
  const [industries, setIndustries] = useState<any[]>([]);
  useEffect(() => {
    const awaitIndustries = async () => {
      await axios.get("/api/industries").then((res) => {
        setIndustries(res.data);
      });
    };
    awaitIndustries();
  }, []);

  return (
    <div>
      <DrawerDemo
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        leadInfo={leadInfo}
        setLeadInfo={setLeadInfo}
        callsInfo={callsInfo}
        setCallsInfo={setCallsInfo}
        callsLoading={callsLoading}
        setPhone={setPhone}
        setOpenCall={setOpenCall}
      />
      <Toaster />
      <AddLead open={openLead} setOpen={setOpenLead} industries={industries} />
      <AddCall phone={phone} open={openCall} setOpen={setOpenCall} />
      <AddIndustry
        open={openIndustry}
        setOpen={setOpenIndustry}
        setIndustries={setIndustries}
      />
      <div className="mt-10 mx-auto w-fit border-[1px] border-[#d9d9d999] rounded-[5px] px-12 py-8 flex flex-col items-center justify-between gap-10 flex-wrap bg-slate-800">
        <Badge className="cursor-default bg-slate-200 text-slate-900 ml-8 hover:bg-slate-300 hover:text-slate-800 text-md px-5">
          Your Dashbord
        </Badge>
        <div className="flex gap-8 flex-wrap">
          <h2 className="font-mono uppercase tracking-wider">
            <span className="text-3xl">Total Leads </span>
            <span className="text-3xl">: {leads.length}</span>
          </h2>
          <h2 className="font-mono uppercase">
            <span className="text-3xl">| Total Calls </span>
            <span className="text-3xl">: {calls}</span>
          </h2>
        </div>
        <div className="flex justify justify-between w-full gap-10">
          <Button
            variant={"outline"}
            className="px-10 flex gap-4 justify-center items-center hover:bg-slate-900"
            onClick={() => {
              setOpenLead(true);
            }}
          >
            <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
              <RiUserAddFill />
            </Badge>
            Add Lead
          </Button>
          <Button
            variant={"outline"}
            className="px-10 flex gap-4 justify-center items-center hover:bg-slate-900"
            onClick={() => {
              setOpenCall(true);
              setPhone("");
            }}
          >
            <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
              <MdAddCall />
            </Badge>
            Add Call
          </Button>
          <Button
            variant={"outline"}
            className="px-10 flex gap-4 justify-center items-center hover:bg-slate-900"
          >
            <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
              <TbCategoryPlus />
            </Badge>
            Add Industry
          </Button>
          <div className="relative border-2 border-blue-500 bg-slate-800 text-slate-200 p-2 rounded-lg px-3 pr-4 flex justify-between">
            <input
              type="text"
              className="max-w-36 bg-slate-800 focus:outline-none text-slate-200 placeholder-slate-200 ml-2 text-sm"
              placeholder="Search Leads"
            />
            <Badge
              className="bg-slate-200 text-slate-900 hover:bg-slate-200 cursor-pointer"
              onClick={() => {}}
            >
              <RiUserSearchFill />
            </Badge>
          </div>
        </div>
      </div>
      <div className="mx-36 mt-16">
        <div className="px-10 mb-6 border-t-[1px] border-b-[1px] py-5 border-slate-300 flex justify-between items-center">
          <Combobox
            industries={industries}
            setIndustryFilter={setIndustryFilter}
          />
          {/* <Badge className="cursor-pointer bg-slate-200 text-slate-900 ml-8 hover:bg-slate-300 hover:text-slate-800">
          All
        </Badge> */}
        </div>
        <div className="w-full">
          <Badge
            variant={"outline"}
            className="mx-10 my-4 bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900 text-base px-5 "
          >
            All Leads
          </Badge>
          <div className="px-4 w-full pb-5 [&:not(:last-child)]:border-b-2 border-b-slate-300 mb-5 ">
            <div className="flex flex-col gap-6 w-full py-4 items-center">
              {/* Lead Card */}
              {leads.map((lead, index) => (
                <LeadCard
                  key={lead._id}
                  setOpenDrawer={setOpenDrawer}
                  setOpenCall={setOpenCall}
                  setPhone={setPhone}
                  lead={lead}
                  setLeadInfo={setLeadInfo}
                  setCallsInfo={setCallsInfo}
                  setCallsLoading={setCallsLoading}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

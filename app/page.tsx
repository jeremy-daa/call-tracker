"use client";
import Link from "next/link";
import Image from "next/image";
import NavButton from "@/components/NavButton";
import { FaUserTie } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { MdAddCall } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast";
import { RiUserSearchFill, RiUserAddFill } from "react-icons/ri";
import { TbCategoryPlus } from "react-icons/tb";
import { Toaster } from "@/components/ui/toaster";

import { useState } from "react";
import Combobox from "@/components/Combobox";
import { Badge } from "@/components/ui/badge";
import { DrawerDemo } from "@/components/Drawer";
import { SelectDemo } from "@/components/Select";
import { AddLead } from "@/components/AddLead";
import { AddCall } from "@/components/AddCall";
import { set } from "mongoose";
import { AddIndustry } from "@/components/AddIndustry";

export default function Home() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [openLead, setOpenLead] = useState(false);
  const [openIndustry, setOpenIndustry] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [leadId, setLeadId] = useState("");
  const { toast } = useToast();

  const handleStatusUpdate = (value: string, leadId: string) => {
    setStatus(value);
    console.log("Status Updated to: ", value);
    console.log("Lead ID: ", leadId);
    toast({
      description: "Lead Status Updated!",
    });
    setLeadId("");
    setStatus("");
  };
  return (
    <></>
    // <main className="min-h-[200vh] py-8 sm:px-24 md:px-16 px-12 ">
    //   <DrawerDemo open={openDrawer} onOpenChange={setOpenDrawer} />
    //   <Toaster />
    //   <AddLead open={openLead} setOpen={setOpenLead} />
    //   <AddCall phone={phone} open={openCall} setOpen={setOpenCall} />
    //   <AddIndustry open={openIndustry} setOpen={setOpenIndustry} />
    //   <div className="w-full h-auto sticky top-0 py-5 flex justify-between bg-slate-950 z-30">
    //     <Link
    //       href={"/"}
    //       className="flex items-center text-[30px] tracking-[.4rem]"
    //     >
    //       <Image
    //         src="/favicon_chiraro.svg"
    //         alt="logo"
    //         width="30"
    //         height="45"
    //         className="w-auto h-[35px] object-contain mr-5"
    //       />
    //       <p className="hidden sm:block font-light text-3xl">CHIRARO</p>
    //     </Link>
    //     <div>
    //       <NavButton />
    //     </div>
    //   </div>
    //   <h1 className="text-center md:text-5xl tracking-wide mt-16 capitalize text-3xl">
    //     Welcome Back!
    //   </h1>
    //   <div className="mt-10 mx-auto w-fit border-[1px] border-[#d9d9d999] rounded-[5px] px-12 py-8 flex flex-col items-center justify-between gap-10 flex-wrap bg-slate-800">
    //     <Badge className="cursor-default bg-slate-200 text-slate-900 ml-8 hover:bg-slate-300 hover:text-slate-800 text-md px-5">
    //       Your Dashbord
    //     </Badge>
    //     <div className="flex gap-8 flex-wrap">
    //       <h2 className="font-mono uppercase tracking-wider">
    //         <span className="text-3xl">Total Leads </span>
    //         <span className="text-3xl">: 100</span>
    //       </h2>
    //       <h2 className="font-mono uppercase">
    //         <span className="text-3xl">| Total Calls </span>
    //         <span className="text-3xl">: 100</span>
    //       </h2>
    //     </div>
    //     <div className="flex justify justify-between w-full gap-10">
    //       <Button
    //         variant={"outline"}
    //         className="px-10 flex gap-4 justify-center items-center hover:bg-slate-900"
    //         onClick={() => {
    //           setOpenLead(true);
    //         }}
    //       >
    //         <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
    //           <RiUserAddFill />
    //         </Badge>
    //         Add Lead
    //       </Button>
    //       <Button
    //         variant={"outline"}
    //         className="px-10 flex gap-4 justify-center items-center hover:bg-slate-900"
    //         onClick={() => {
    //           setOpenCall(true);
    //           setPhone("");
    //         }}
    //       >
    //         <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
    //           <MdAddCall />
    //         </Badge>
    //         Add Call
    //       </Button>
    //       <Button
    //         variant={"outline"}
    //         className="px-10 flex gap-4 justify-center items-center hover:bg-slate-900"
    //       >
    //         <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
    //           <TbCategoryPlus />
    //         </Badge>
    //         Add Industry
    //       </Button>
    //       <div className="relative border-2 border-blue-500 bg-slate-800 text-slate-200 p-2 rounded-lg px-3 pr-4 flex justify-between">
    //         <input
    //           type="text"
    //           className="max-w-36 bg-slate-800 focus:outline-none text-slate-200 placeholder-slate-200 ml-2 text-sm"
    //           placeholder="Search Leads"
    //         />
    //         <Badge
    //           className="bg-slate-200 text-slate-900 hover:bg-slate-200 cursor-pointer"
    //           onClick={() => {}}
    //         >
    //           <RiUserSearchFill />
    //         </Badge>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="mx-36 mt-16">
    //     <div className="px-10 mb-6 border-t-[1px] border-b-[1px] py-5 border-slate-300 flex justify-between items-center">
    //       <Combobox />
    //       {/* <Badge className="cursor-pointer bg-slate-200 text-slate-900 ml-8 hover:bg-slate-300 hover:text-slate-800">
    //       All
    //     </Badge> */}
    //     </div>
    //     <div className="w-full">
    //       <Badge
    //         variant={"outline"}
    //         className="mx-10 my-4 bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900 text-base px-5 "
    //       >
    //         Law Firm
    //       </Badge>
    //       <div className="px-4 w-full pb-5 [&:not(:last-child)]:border-b-2 border-b-slate-300 mb-5 ">
    //         <div className="flex flex-col gap-6 w-full py-4 items-center">
    //           {/* Lead Card */}
    //           <div className="w-full bg-slate-800 border-2 border-slate-300 py-4 px-8  flex justify-between items-center">
    //             <div className="flex gap-4 items-center">
    //               <Image
    //                 src="/favicon_chiraro.svg"
    //                 alt="logo"
    //                 width="30"
    //                 height="45"
    //                 className="w-auto h-[35px] object-contain mr-5"
    //               />
    //               <div>
    //                 <h2 className="text-xl">Lead Name</h2>
    //                 <p className="text-sm">Company Name</p>
    //                 <div className="mt-4 flex items-center justify-center gap-3">
    //                   <span>Status:</span>
    //                   <span className="font-bold flex justify-center items-center">
    //                     <Badge className="w-fit bg-green-400 text-slate-900 hover:bg-bg-green-400 hover:text-slate-900">
    //                       Not Called
    //                     </Badge>
    //                   </span>{" "}
    //                 </div>
    //               </div>
    //               <div className="ml-8 flex gap-3 self-start">
    //                 <SelectDemo
    //                   status={leadId === "1" ? status : ""}
    //                   setStatus={setStatus}
    //                   leadId={"1"}
    //                   setLeadId={setLeadId}
    //                 />
    //                 {/* if select value changes display update button */}
    //                 {status === "" ? null : "1" === leadId ? (
    //                   <>
    //                     <Button
    //                       variant={"outline"}
    //                       className="px-10 flex gap-4 justify-center items-center hover:bg-slate-900"
    //                       onClick={() => handleStatusUpdate(status, "leadId")}
    //                     >
    //                       Update
    //                     </Button>
    //                     <Button
    //                       variant={"outline"}
    //                       className="px-10 flex gap-4 justify-center items-center hover:bg-slate-900"
    //                       onClick={() => {
    //                         setLeadId("");
    //                         setStatus("");
    //                       }}
    //                     >
    //                       Cancel
    //                     </Button>
    //                   </>
    //                 ) : null}
    //               </div>
    //             </div>
    //             <div className="flex gap-4 flex-col">
    //               <Button
    //                 variant={"outline"}
    //                 className="px-10 flex gap-4 justify-start items-center hover:bg-slate-900"
    //                 onClick={() => setOpenDrawer(true)}
    //               >
    //                 <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
    //                   <FaUserTie />
    //                 </Badge>
    //                 View
    //               </Button>
    //               <Button
    //                 variant={"outline"}
    //                 className="px-10 flex gap-4 justify-start items-center hover:bg-slate-900"
    //                 onClick={() => {
    //                   setOpenCall(true);
    //                   setPhone("1234567890");
    //                 }}
    //               >
    //                 <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
    //                   <MdAddCall />
    //                 </Badge>
    //                 Add Call
    //               </Button>
    //             </div>
    //           </div>
    //           <div className="w-full bg-slate-800 border-2 border-slate-300 py-4 px-8  flex justify-between items-center">
    //             <div className="flex gap-4 items-center">
    //               <Image
    //                 src="/favicon_chiraro.svg"
    //                 alt="logo"
    //                 width="30"
    //                 height="45"
    //                 className="w-auto h-[35px] object-contain mr-5"
    //               />
    //               <div>
    //                 <h2 className="text-xl">Lead Name</h2>
    //                 <p className="text-sm">Company Name</p>
    //                 <div className="mt-4 flex items-center justify-center gap-3">
    //                   <span>Status:</span>
    //                   <span className="font-bold flex justify-center items-center">
    //                     <Badge className="w-fit bg-green-400 text-slate-900 hover:bg-bg-green-400 hover:text-slate-900">
    //                       Not Called
    //                     </Badge>
    //                   </span>{" "}
    //                 </div>
    //               </div>
    //               <div className="ml-8 flex gap-3 self-start">
    //                 <SelectDemo
    //                   status={leadId === "2" ? status : ""}
    //                   setStatus={setStatus}
    //                   leadId={"2"}
    //                   setLeadId={setLeadId}
    //                 />
    //                 {/* if select value changes display update button */}
    //                 {status === "" ? null : "2" === leadId ? (
    //                   <>
    //                     <Button
    //                       variant={"outline"}
    //                       className="px-10 flex gap-4 justify-center items-center hover:bg-slate-900"
    //                       onClick={() => handleStatusUpdate(status, "leadId")}
    //                     >
    //                       Update
    //                     </Button>
    //                     <Button
    //                       variant={"outline"}
    //                       className="px-10 flex gap-4 justify-center items-center hover:bg-slate-900"
    //                       onClick={() => {
    //                         setLeadId("");
    //                         setStatus("");
    //                       }}
    //                     >
    //                       Cancel
    //                     </Button>
    //                   </>
    //                 ) : null}
    //               </div>
    //             </div>
    //             <div className="flex gap-4 flex-col">
    //               <Button
    //                 variant={"outline"}
    //                 className="px-10 flex gap-4 justify-start items-center hover:bg-slate-900"
    //                 onClick={() => setOpenDrawer(true)}
    //               >
    //                 <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
    //                   <FaUserTie />
    //                 </Badge>
    //                 View
    //               </Button>
    //               <Button
    //                 variant={"outline"}
    //                 className="px-10 flex gap-4 justify-start items-center hover:bg-slate-900"
    //                 onClick={() => {
    //                   setOpenCall(true);
    //                   setPhone("2345678910");
    //                 }}
    //               >
    //                 <Badge className="bg-slate-200 text-slate-900 hover:bg-slate-200 hover:text-slate-900">
    //                   <MdAddCall />
    //                 </Badge>
    //                 Add Call
    //               </Button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Data Displayed */}

    //   {/* <Accordion type="single" collapsible className="w-full">
    //     <AccordionItem value="item-1">
    //       <AccordionTrigger className="hover:">Is it accessible?</AccordionTrigger>
    //       <AccordionContent>
    //         Yes. It adheres to the WAI-ARIA design pattern.
    //       </AccordionContent>
    //     </AccordionItem>
    //     <AccordionItem value="item-2">
    //       <AccordionTrigger>Is it styled?</AccordionTrigger>
    //       <AccordionContent>
    //         Yes. It comes with default styles that matches the other
    //         components&apos; aesthetic.
    //       </AccordionContent>
    //     </AccordionItem>
    //     <AccordionItem value="item-3">
    //       <AccordionTrigger>Is it animated?</AccordionTrigger>
    //       <AccordionContent>
    //         Yes. It&apos;s animated by default, but you can disable it if you
    //         prefer.
    //       </AccordionContent>
    //     </AccordionItem>
    //   </Accordion> */}
    // </main>
  );
}

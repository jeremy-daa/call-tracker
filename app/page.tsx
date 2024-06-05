import Link from "next/link";
import Image from "next/image";
import NavButton from "@/components/NavButton";
import Dashboard from "@/components/Dashboard";
import axios from "axios";
import dbConnect from "@/utils/dbConnect";
import Lead from "@/models/Lead";
import Call from "@/models/Call";
const fetchLeads = async () => {
  const leadsFetch = await fetch(`${process.env.NEXTAUTH_URL}/api/leads`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Aequseted-With": "XMLHttpRequest",
      key: `${process.env.NEXTAUTH_SECRET}`,
    },
  });

  return leadsFetch.json();
};
const fetchCalls = async () => {
  const callsFetch = await fetch(`${process.env.NEXTAUTH_URL}/api/calls`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Aequseted-With": "XMLHttpRequest",
      key: `${process.env.NEXTAUTH_SECRET}`,
    },
  });

  return callsFetch.json();
};

export default async function Home() {
  const leads = await fetchLeads();
  const calls = await fetchCalls();

  return (
    <main className="min-h-[200vh] py-8 sm:px-24 md:px-16 px-12 mb-16">
      <div className="w-full h-auto sticky top-0 py-5 flex justify-between bg-slate-950 z-30">
        <Link
          href={"/"}
          className="flex items-center text-[30px] tracking-[.4rem]"
        >
          <Image
            src="/favicon_chiraro.svg"
            alt="logo"
            width="30"
            height="45"
            className="w-auto h-[35px] object-contain mr-5"
          />
          <p className="hidden sm:block font-light text-3xl">CHIRARO</p>
        </Link>
        <div>
          <NavButton />
        </div>
      </div>
      <h1 className="text-center md:text-5xl tracking-wide mt-16 capitalize text-3xl">
        Welcome Back!
      </h1>
      <Dashboard leads={leads} calls={calls.calls.length} />
    </main>
  );
}

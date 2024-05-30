import Link from "next/link";
import Image from "next/image";
import NavButton from "@/components/NavButton";
import Dashboard from "@/components/Dashboard";
import axios from "axios";
import dbConnect from "@/utils/dbConnect";
import Lead from "@/models/Lead";
import Call from "@/models/Call";

export default async function Home() {
  await dbConnect();
  const leadsFetch = await Lead.find();
  const callsFetch = await Call.find();
  const leads = JSON.parse(JSON.stringify(leadsFetch));
  const calls = JSON.parse(JSON.stringify(callsFetch));

  return (
    <main className="min-h-[200vh] py-8 sm:px-24 md:px-16 px-12 ">
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

      <Dashboard leads={leads} calls={calls.length} />
    </main>
  );
}

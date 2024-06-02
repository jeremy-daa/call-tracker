import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Call from "@/models/Call";
import { getAuthSession } from "@/lib/authOptions";
import Lead from "@/models/Lead";

export async function POST(request: Request) {
  enum statusEnum {
    "Connected",
    "Voicemail",
    "No Answer",
    "Disconnected",
    "Busy",
    "Other",
  }

  interface RequestBody {
    phone: string;
    callDuration: string;
    callOutcome: statusEnum;
    followUpDate: Date;
    callNotes: string;
  }
  const body: RequestBody = await request.json();
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  } else {
    const { phone, callDuration, callOutcome, followUpDate, callNotes } = body;

    if (!phone || !callOutcome) {
      return NextResponse.json(
        { message: "Requred fields missing" },
        { status: 400 }
      );
    }
    const test = parseInt(callDuration);
    if (Number.isNaN(test)) {
      return NextResponse.json(
        { message: "Invalid call duration" },
        { status: 400 }
      );
    }

    const phoneRegex = /^[+]\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { message: "Invalid phone number" },
        { status: 400 }
      );
    }

    if (!Object.values(statusEnum).includes(callOutcome)) {
      return NextResponse.json(
        { message: "Invalid call status" },
        { status: 400 }
      );
    }

    // Lead with this phone number doesn't exists, try adding lead first!
    const lead = await Lead.findOne({ phone });
    if (!lead) {
      return NextResponse.json(
        {
          message:
            "Lead with this phone number doesn't exists, add the lead first!",
        },
        { status: 400 }
      );
    }

    if (followUpDate) {
      const date = new Date(followUpDate);
      if (isNaN(date.getTime())) {
        return NextResponse.json(
          { message: "Invalid follow up date" },
          { status: 400 }
        );
      }
    }

    const { _id: leadId } = lead;

    try {
      await dbConnect();
      const newCall = new Call({
        lead: leadId,
        callDuration,
        callOutcome,
        callNotes,
        followUpDate,
      });
      const res = await newCall.save();
      if (res) {
        const calls = await Call.find();
        const totalCalls = calls.length;

        return NextResponse.json(
          { message: "Call added successfully", totalCalls },
          { status: 200 }
        );
      }
    } catch (e: any) {
      NextResponse.json({ message: `Internal Server Err` }, { status: 500 });
    }
  }

  return NextResponse.json(
    { message: "Internal Server Error" },
    { status: 500 }
  );
}

export async function GET(request: Request) {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  } else {
    try {
      await dbConnect();
      const calls = await Call.find();

      return NextResponse.json({ calls }, { status: 200 });
    } catch (e: any) {
      return NextResponse.json(
        { message: `Internal Server Err` },
        { status: 500 }
      );
    }
  }
}

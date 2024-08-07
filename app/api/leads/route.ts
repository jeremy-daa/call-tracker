import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/authOptions";
import Lead from "@/models/Lead";
import dbConnect from "@/utils/dbConnect";
import { headers } from "next/headers";
import Call from "@/models/Call";

export async function POST(request: Request) {
  enum statusEnum {
    "Not Called",
    "Call Scheduled",
    "Calling",
    "No Answer",
    "Left Voicemail",
    "Call Back Later",
    "Interested",
    "Not Interested",
    "Do Not Call",
    "Follow-up Required",
  }

  interface RequestBody {
    name?: string;
    email: string;
    phone: string;
    company?: string;
    industry: string;
    status: statusEnum;
    followUpDate?: Date | null;
    notes?: string;
    website?: string;
    websiteStatus?: string;
  }
  const body: RequestBody = await request.json();
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  } else {
    let {
      name,
      email,
      phone,
      company,
      industry,
      status,
      notes,
      website,
      websiteStatus,
    } = body;

    if (!phone || !industry || !status) {
      return NextResponse.json(
        { error: "Requred fields missing" },
        { status: 400 }
      );
    }
    const phoneRegex = /^[+]\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    if (!Object.values(statusEnum).includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Check if lead phone number already exists
    const leadPhoneExists = await Lead.findOne({ phone });
    if (leadPhoneExists) {
      return NextResponse.json(
        { message: "Lead with this phone number already exists" },
        { status: 409 }
      );
    }

    const leadEmailExists = await Lead.findOne({ email });
    if (
      leadEmailExists &&
      email !== "" &&
      email !== null &&
      email !== undefined
    ) {
      return NextResponse.json(
        { message: "Lead with this email already exists" },
        { status: 409 }
      );
    }

    try {
      await dbConnect();
      let followUpDate = undefined;

      const newLead = new Lead({
        fullName: name || "No Name",
        email,
        phone,
        company: company || "No Company name",
        industry,
        status,
        website: website || "No Website",
        websiteStatus: websiteStatus || "No Website Status",
        followUpDate,
        notes: notes || "No Notes",
      });
      const res = await newLead.save();
      if (res) {
        const leads = await Lead.find();
        return NextResponse.json(leads, { status: 200 });
      }
    } catch (e: any) {
      console.log(e);
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
  const headersList = headers();
  const referer = headersList.get("key");

  if (referer === process.env.REFERER) {
    try {
      await dbConnect();
      const leads = await Lead.find();
      const calls = await Call.find();

      leads.forEach((lead) => {
        const latestCall = calls
          .filter((call) => call.lead.toString() === lead._id.toString())
          .sort((a, b) => b.date - a.date)[0];
        if (!latestCall) {
          lead.followUpDate = null;
          return;
        }
        lead.followUpDate = latestCall?.followUpDate;
      });

      leads.reverse();
      return NextResponse.json(leads, { status: 200 });
    } catch (e: any) {
      return NextResponse.json(
        { message: `Internal Server Err: ${e.message}` },
        { status: 500 }
      );
    }
  }
  if (!session) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }
  try {
    await dbConnect();
    const leads = await Lead.find();
    const calls = await Call.find();

    leads.forEach((lead) => {
      const latestCall = calls
        .filter((call) => call.lead.toString() === lead._id.toString())
        .sort((a, b) => b.date - a.date)[0];
      if (!latestCall) {
        lead.followUpDate = null;
        return;
      }
      lead.followUpDate = latestCall?.followUpDate;
    });

    leads.reverse();
    return NextResponse.json(leads, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { message: `Internal Server Err` },
      { status: 500 }
    );
  }
}

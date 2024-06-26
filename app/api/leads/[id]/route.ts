import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/authOptions";
import Lead from "@/models/Lead";
import dbConnect from "@/utils/dbConnect";
import Call from "@/models/Call";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id || "";
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }
  try {
    await dbConnect();

    const lead = await Lead.findById(id);
    if (!lead) {
      return NextResponse.json({ message: "Lead not found" }, { status: 404 });
    }
    const calls = await Call.find({
      lead: id,
    });

    // From the lead object, get the latest call object with matching lead id and set lead.followUpDate to latest call.followUpDate

    // const latestCall: any = calls
    //   .filter((call) => call.lead.toString() === lead._id.toString())
    //   .sort((a, b) => b.date - a.date)[0];

    // if (!latestCall) {
    //   lead.followUpDate = null;
    // } else {
    //   lead.followUpDate = latestCall?.followUpDate;
    // }

    return NextResponse.json({ lead, calls }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { message: `Internal Server Err` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id || "";
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  } else
    try {
      await dbConnect();
      const lead = await Lead.findByIdAndDelete(id);

      if (!lead) {
        return NextResponse.json(
          { message: "Lead not found" },
          { status: 404 }
        );
      }

      const res = await Call.deleteMany({ lead: id });

      const calls = await Call.find();
      const totalCalls = calls.filter(
        (call) => call.lead.toString() !== lead?._id.toString()
      ).length;
      if (!lead) {
        return NextResponse.json(totalCalls, { status: 404 });
      }

      return NextResponse.json(
        { message: "Lead deleted successfully" },
        { status: 200 }
      );
    } catch (e: any) {
      return NextResponse.json(
        { message: `Internal Server Err` },
        { status: 500 }
      );
    }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  enum statusEnum {
    NotCalled = "Not Called",
    CallScheduled = "Call Scheduled",
    Calling = "Calling",
    NoAnswer = "No Answer",
    LeftVoicemail = "Left Voicemail",
    CallBackLater = "Call Back Later",
    Interested = "Interested",
    NotInterested = "Not Interested",
    DoNotCall = "Do Not Call",
    FollowUpRequired = "Follow-up Required",
  }
  const id = params.id || "";
  const session = await getAuthSession();
  const body: { status: statusEnum } = await request.json();
  if (!session) {
    return NextResponse.json(
      { message: "User not authenticated!" },
      { status: 401 }
    );
  } else {
    const { status } = body;
    try {
      await dbConnect();

      const leadExists = await Lead.findById(id);

      if (!leadExists) {
        return NextResponse.json(
          { message: "Lead not found" },
          { status: 404 }
        );
      }

      if (!Object.values(statusEnum).includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }

      await Lead.findByIdAndUpdate(id, { status });

      return NextResponse.json(
        { message: "Lead updated successfully" },
        { status: 200 }
      );
    } catch (e: any) {
      console.log(e);
      return NextResponse.json(
        { message: `Internal Server Err` },
        { status: 500 }
      );
    }
  }
}
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id || "";
  const session = await getAuthSession();
  const body = await request.json();
  if (!session) {
    return NextResponse.json(
      { message: "User not authenticated!" },
      { status: 401 }
    );
  } else {
    const { notes } = body;
    try {
      await dbConnect();
      console.log(notes);

      const leadExists = await Lead.findById(id);

      if (!leadExists) {
        return NextResponse.json(
          { message: "Lead not found" },
          { status: 404 }
        );
      }

      await Lead.findByIdAndUpdate(id, { notes });

      return NextResponse.json(
        { message: "Lead updated successfully" },
        { status: 200 }
      );
    } catch (e: any) {
      console.log(e);
      return NextResponse.json(
        { message: `Internal Server Err` },
        { status: 500 }
      );
    }
  }
}

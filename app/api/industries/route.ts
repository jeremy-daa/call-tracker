import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Industry from "@/models/Industry";
import { getAuthSession } from "@/lib/authOptions";

export async function POST(request: Request) {
  const body = await request.json();
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  } else {
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Requred fields missing" },
        { status: 400 }
      );
    }
    // CHeck if industry already exists
    const industryExists = await Industry.findOne({ name });

    if (industryExists) {
      return NextResponse.json(
        { message: "Industry already exists" },
        { status: 400 }
      );
    }

    try {
      await dbConnect();
      const newIndustry = new Industry({
        name,
        description,
      });
      const res = await newIndustry.save();
      if (res) {
        return NextResponse.json(
          { message: "Industry added successfully" },
          { status: 200 }
        );
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

  if (session) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }
  try {
    await dbConnect();
    const industries = await Industry.find();
    return NextResponse.json(industries, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { message: `Internal Server Err` },
      { status: 500 }
    );
  }
}

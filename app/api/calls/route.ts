import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Call from "@/models/Call";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, phone, message } = body;

  return NextResponse.json({ message: "Call Created" }, { status: 201 });
}

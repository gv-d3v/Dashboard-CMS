import { connectMongoDB } from "@/lib/mongodb";
import Websites from "@/models/websites";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await connectMongoDB();

    const websites = await Websites.find();

    return NextResponse.json({ websites }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.log(error);
  }
}

export const dynamic = "force-dynamic";
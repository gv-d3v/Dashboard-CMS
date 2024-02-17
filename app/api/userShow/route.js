import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await connectMongoDB();
    
    const user = await User.find().select("-password");

    return NextResponse.json({ user }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.log(error);
  }
}

export const dynamic = "force-dynamic";

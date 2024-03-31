import { connectMongoDB } from "@/lib/mongodb";
import Accommodation from "@/models/accommodation";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/middleware/routeAuth";

export async function GET(req, res) {
  const session = await isAuthenticated();
  if (!session) {
    return NextResponse.json({ error: "Access Denied" }, { status: 403 });
  }

  try {
    await connectMongoDB();

    const accommodation = await Accommodation.find();

    return NextResponse.json({ accommodation }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.log(error);
  }
}

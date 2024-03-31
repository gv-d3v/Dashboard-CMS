import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/middleware/routeAuth";

export async function GET(req, res) {
  const session = await isAuthenticated();

  if (!session) {
    return NextResponse.json({ error: "Access Denied" }, { status: 403 });
  }
  try {
    await connectMongoDB();

    const user = await User.find().select("-password");

    return NextResponse.json({ user }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.log(error);
  }
}

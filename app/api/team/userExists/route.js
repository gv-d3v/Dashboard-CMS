import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/middleware/routeAuth";

export async function POST(req) {
  const session = await isAuthenticated();

  if (!session) {
    return NextResponse.json({ error: "Access Denied" }, { status: 403 });
  }
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("email");
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}

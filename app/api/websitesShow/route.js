import { connectMongoDB } from "@/lib/mongodb";
import Websites from "@/models/websites";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/middleware/routeAuth";

export async function GET(req, res) {
  const session = await isAuthenticated();
  if (!session) {
    return NextResponse.json({ error: "Access Denied" }, { status: 403 });
  }

  try {
    await connectMongoDB();

    const websites = await Websites.find();

    return NextResponse.json({ websites });
  } catch (error) {
    console.log(error);
  }
}

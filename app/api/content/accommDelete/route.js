import { connectMongoDB } from "@/lib/mongodb";
import Accommodation from "@/models/accommodation";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/middleware/routeAuth";

export async function DELETE(req) {
  const session = await isAuthenticated();

  if (!session) {
    return NextResponse.json({ error: "Access Denied" }, { status: 403 });
  }
  try {
    await connectMongoDB();
    const id = await req.json();

    await Accommodation.deleteOne({ _id: id });

    return NextResponse.json(true);
  } catch (error) {
    console.log(error);
  }
}

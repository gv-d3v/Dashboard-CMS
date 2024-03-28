import { connectMongoDB } from "@/lib/mongodb";
import Accommodation from "@/models/accommodation";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectMongoDB();
    const id = await req.json();

    await Accommodation.deleteOne({ _id: id });

    return NextResponse.json(true);
  } catch (error) {
    console.log(error);
  }
}

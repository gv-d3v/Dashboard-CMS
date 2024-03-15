import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Accommodation from "@/models/accommodation";

export async function POST(req) {
  try {
    const { websiteId, name, destination, city, address, rooms, guests, price, description } = await req.json();

    await connectMongoDB();
    await Accommodation.create({ websiteId, name, destination, city, address, rooms, guests, price, description });

    return NextResponse.json({ message: "Accommodation added." }, { status: 201 });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ message: "Error occurred during the process", error: error.message }, { status: 500 });
  }
}

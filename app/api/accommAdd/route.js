import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Accommodation from "@/models/accommodation";

export async function POST(req) {
  try {
    //const body = await req.json();
    //console.log("Received request body:", body);

    const { websiteId, accommId, name, destination, city, address, rooms, guests, price, description, images } = await req.json();

    await connectMongoDB();

    const imagesArray = images.map(url => ({ url }));

    await Accommodation.create({ websiteId, accommId, name, destination, city, address, rooms, guests, price, description, images });

    return NextResponse.json({ message: "Accommodation added." }, { status: 201 });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ message: "Error occurred during the process", error: error.message }, { status: 500 });
  }
}

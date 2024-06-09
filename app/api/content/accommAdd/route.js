import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Accommodation from "@/models/accommodation";
import { isAuthenticated } from "@/middleware/routeAuth";

export async function POST(req) {
  const session = await isAuthenticated();

  if (!session) {
    return NextResponse.json({ error: "Access Denied" }, { status: 403 });
  }

  try {
    const { websiteId, accommId, name, destination, city, address, rooms, guests, price, description,amenities, images } = await req.json();

    await connectMongoDB();

    await Accommodation.create({ websiteId, accommId, name, destination, city, address, rooms, guests, price, description,amenities, images });

    return NextResponse.json({ message: "Accommodation added." }, { status: 201 });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ message: "Error occurred during the process", error: error.message }, { status: 500 });
  }
}

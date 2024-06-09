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
    const { accommId, name, destination, city, address, rooms, guests, price, description, amenities, images } = await req.json();

    await connectMongoDB();

    let updateFields = {
      $set: {
        name,
        destination,
        city,
        address,
        rooms,
        guests,
        price,
        description,
        amenities,
        images,
      },
    };

    const user = await Accommodation.findOneAndUpdate({ accommId }, updateFields);

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}

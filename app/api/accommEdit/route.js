import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Accommodation from "@/models/accommodation";

export async function POST(req) {
  try {
    const { accommId, name, destination, city, address, rooms, guests, price, description, images } = await req.json();

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
        images,
      },
    };

    const user = await Accommodation.findOneAndUpdate({ accommId }, updateFields);

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { isAuthenticated } from "@/middleware/routeAuth";

export async function POST(req) {
  const session = await isAuthenticated();

  if (!session) {
    return NextResponse.json({ error: "Access Denied" }, { status: 403 });
  }
  try {
    const { userId, name, email, password, images, role } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await User.create({ userId, name, email, password: hashedPassword, images, role });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error occured during registration" }, { status: 500 });
  }
}

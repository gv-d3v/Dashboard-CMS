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
    const { _id, name, email, password, images, role } = await req.json();

    await connectMongoDB();

    let updateFields = {
      $set: {
        name,
        email,
        images,
        role,
      },
    };

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.$set.password = hashedPassword;
    }

    const user = await User.findOneAndUpdate({ _id }, updateFields);

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}

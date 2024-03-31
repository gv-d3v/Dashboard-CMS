// Server-side code (API route)
import { NextResponse } from "next/server";
import { adminFireApp } from "@/lib/firebase-admin"; // Ensure correct import path
import { isAuthenticated } from "@/middleware/routeAuth";

const admin = require("firebase-admin");
const { getApps } = require("firebase/app");

// Initialize Firebase Admin SDK if not already initialized
if (!getApps()) {
  adminFireApp();
}

export async function DELETE(req, res) {
  const session = await isAuthenticated();
  if (!session) {
    return NextResponse.json({ error: "Access Denied" }, { status: 403 });
  }
  try {
    const { email } = await req.json();
    console.log("Email received:", email);

    // Find user by email
    const userRecord = await admin.auth().getUserByEmail(email);

    // Delete user
    await admin.auth().deleteUser(userRecord.uid);
    console.log("User with email", email, "successfully removed");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing user:", error);
    return NextResponse.json({ success: false, message: "Error removing user", error }, { status: 500 });
  }
}

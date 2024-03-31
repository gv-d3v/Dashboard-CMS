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

export async function POST(req, res) {
  const session = await isAuthenticated();
  if (!session) {
    return NextResponse.json({ error: "Access Denied" }, { status: 403 });
  }
  try {
    const { email, password, newEmail } = await req.json();

    // Check if user exists
    const userRecord = await admin.auth().getUserByEmail(email);

    // If user exists, update their information
    if (email !== newEmail) {
      await admin.auth().updateUser(userRecord.uid, { email: newEmail });
      console.log("Email updated successfully");
    }

    if (password) {
      await admin.auth().updateUser(userRecord.uid, { password: password });
      console.log("Password updated successfully");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ success: false, message: "Error updating user", error }, { status: 500 });
  }
}

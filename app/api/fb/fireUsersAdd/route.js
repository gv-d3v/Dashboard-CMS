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
    const { email, password } = await req.json();
    console.log("Email received:", email);

    // Create user with email and password
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });
    console.log("Successfully created user with UID:", userRecord.uid);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ success: false, message: "Error creating user", error }, { status: 500 });
  }
}

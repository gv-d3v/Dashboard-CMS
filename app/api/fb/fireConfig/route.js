import { isAuthenticated } from "@/middleware/routeAuth";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const session = await isAuthenticated();
  if (!session) {
    return NextResponse.json({ error: "Access Denied" }, { status: 403 });
  }

  const firebaseConfig = {
    apiKey: process.env.NEXT_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_FIREBASE_APP_ID,
  };

  try {
    return NextResponse.json({ firebaseConfig });
  } catch (err) {
    console.log(error);
  }
}

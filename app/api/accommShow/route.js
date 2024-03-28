import { connectMongoDB } from "@/lib/mongodb";
import Accommodation from "@/models/accommodation";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await connectMongoDB();

    const accommodation = await Accommodation.find();

    return NextResponse.json({ accommodation }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.log(error);
  }
}

export const dynamic = "force-dynamic";
/*
import authMiddleware from '../../middleware/auth';

export default async function dashboardHandler(req, res) {
  // Use the authMiddleware before processing the dashboard request
  await authMiddleware(req, res);

  // The rest of your dashboard route logic goes here

  res.status(200).json({ message: 'Success', data: your dashboard data })
}*/

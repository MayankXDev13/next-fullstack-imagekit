import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const vidoes = await Video.find({}).sort({ createdAt: -1 }).lean();

    if (!vidoes || vidoes.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(vidoes);
  } catch (error) {
    console.error("Failed to fetch video", error);
    return NextResponse.json(
      {
        error: "Failed to fetch video",
      },
      { status: 500 }
    );
  }
}

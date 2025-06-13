import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const body: IVideo = await request.json();

    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbanilUrl
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }
    const videoDate = {
      ...body,
      controls: body?.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
    };
    const newVideo = await Video.create(videoDate);

    return NextResponse.json(newVideo);
  } catch (error) {
    console.error("Failed to create video", error);
    return NextResponse.json({ error: "Failed to create video" }, { status: 500 });
  }
}

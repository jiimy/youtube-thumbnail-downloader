import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search");

  if (!search) {
    return NextResponse.json(
      { error: "URL parameter is missing" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: "snippet",
        maxResults: 10,
        q: search,
        order: "date",
        key: `${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
      },
    });
    console.log('res :', response);
    return NextResponse.json(response.data.items);
  } catch (error) {
    console.error("YouTube API 호출 오류:", error);
    return NextResponse.json(
      { error: "Failed to download image" },
      { status: 500 }
    );
  }
}

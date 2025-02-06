import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const key = request.nextUrl.searchParams.get("key");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is missing" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer", // arraybuffer로 응답 받기
    });

    // 이미지 데이터를 Blob 형태로 변환
    const buffer = Buffer.from(response.data, "binary");

    // 클라이언트에게 이미지를 전송 (헤더에서 적절한 타입과 길이 설정)
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg", // 이미지 타입 설정
        "Content-Disposition": `attachment; filename="${key}.jpg"`, // 다운로드될 파일명 설정
        "Content-Length": buffer.length.toString(), // 파일 크기 설정
      },
    });
  } catch (error) {
    console.error("이미지 다운로드 실패:", error);
    return NextResponse.json(
      { error: "Failed to download image" },
      { status: 500 }
    );
  }
}

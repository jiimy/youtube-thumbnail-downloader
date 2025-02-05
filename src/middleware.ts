import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // if (pathname.startsWith("/mypage") && !request.cookies.get("session-id")) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  const res = NextResponse.next();

  // CORS 헤더 추가는 모든 API 요청에 적용
  if (pathname.startsWith("/api/")) {
    res.headers.append("Access-Control-Allow-Credentials", "true");
    res.headers.append("Access-Control-Allow-Origin", "*");
    res.headers.append(
      "Access-Control-Allow-Methods",
      "GET,DELETE,PATCH,POST,PUT"
    );
    res.headers.append(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
  }

  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    "/api/:path*",
    // "/mypage/:path*",
    // "/bookmark/:path*",
    // "/upload/:path*",
    // "/support/:path*",
  ],
};

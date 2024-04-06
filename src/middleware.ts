import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/api/image/:path*",
};

const middleware = (request: NextRequest) => {
  const { nextUrl } = request;

  const referer = request.headers.get("referer");

  if (!referer || new URL(referer).hostname !== nextUrl.hostname) {
    nextUrl.pathname = "/caught";

    return NextResponse.redirect(nextUrl);
  }

  const accept = request.headers.get("accept");

  if (
    !accept ||
    accept.includes("text/") ||
    accept.includes("application/") ||
    !accept.includes("image")
  ) {
    nextUrl.pathname = "/caught";

    return NextResponse.redirect(nextUrl);
  }

  const userAgent = request.headers.get("user-agent");

  if (!userAgent || !userAgent.includes("Mozilla")) {
    nextUrl.pathname = "/caught";

    return NextResponse.redirect(nextUrl);
  }

  if (request.method !== "GET") {
    return new NextResponse(null, {
      status: 405,
    });
  }

  return NextResponse.next();
};

export default middleware;

import { NextResponse } from "next/server";

export default async function middleware(req) {
  const { pathname, search } = req.nextUrl;
  const allowedOrigin = process.env.NEXT_PUBLIC_FRONTEND_URL;

  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("x-custom-header", pathname);
  response.headers.set("x-search-url", search);

  return response;
}

export const config = {
  matcher: "/:path*",
};

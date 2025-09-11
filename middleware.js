// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const url = req.nextUrl.clone();

  //ambil cookie session
  const token = req.cookies.get("session")?.value;

  //proteksi halaman dashboard
  if (url.pathname.startsWith("/dashboard")) {
    if(!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    try {
      // Verify JWT
      await jwtVerify(token, secret);
    } catch (err) {
      console.error("JWT error:", err.message);
      url.pathname = "/login";
      const res = NextResponse.redirect(url);
      res.cookies.delete("session");
      return res;
    }
  }

  return NextResponse.next();
}
//kasih tau route mana aja yang kena middleware
export const config = {
  matcher: ["/dashboard/:path*"],
};
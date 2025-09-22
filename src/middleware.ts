import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import * as jose from "jose";

async function middleware(req: NextRequest) {
  console.log(req.url);
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    decode: (params) => {
      const decoded = jose.jwtVerify(
        params.token ?? "",
        new TextEncoder().encode(params.secret.toString())
      );
      // const decoded = jwt.verify(params.token ?? "", params.secret) as JWT;

      return decoded as unknown as JWT;
    },
  });
  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export default middleware;

export const config = {
  matcher: "/user(.*)",
};

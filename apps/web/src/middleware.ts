import NextAuth from "next-auth";

import authConfig from "@web/lib/auth.config";

export const middleware = NextAuth(authConfig).auth(async (req) => {
  if (
    !req.auth &&
    req.nextUrl.pathname !== "/" &&
    req.nextUrl.pathname !== "/site.webmanifest" &&
    !req.nextUrl.pathname.startsWith("/api/auth")
  ) {
    const newUrl = new URL("/", req.nextUrl.origin);
    newUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);

    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
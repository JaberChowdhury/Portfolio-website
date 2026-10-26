import { NextResponse, type NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/en" || pathname === "/bn") {
    return NextResponse.redirect(new URL("/", request.url), 308)
  }

  if (pathname.startsWith("/en/") || pathname.startsWith("/bn/")) {
    const newPath = pathname.replace(/^\/(en|bn)/, "") || "/"
    return NextResponse.redirect(new URL(newPath, request.url), 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}

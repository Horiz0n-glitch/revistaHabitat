import { type NextRequest, NextResponse } from "next/server"
import { mockLogout } from "@/lib/mock-auth"

export async function POST(request: NextRequest) {
  mockLogout()
  return NextResponse.redirect(new URL("/", request.url))
}

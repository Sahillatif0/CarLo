import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set('token', '', { maxAge: 0, path: '/' }); // delete cookie
  return res;
}

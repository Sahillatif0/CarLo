
// export async function POST(req: Request) {
//   const { password } = await req.json();
//   if (!password) {
//     return Response.json({ error: "Password is required" }, { status: 400 });
//   }
//   const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
//   console.log("Admin Password:", ADMIN_PASSWORD);
//   if (password !== ADMIN_PASSWORD) {
//     return Response.json({ error: "Invalid password" }, { status: 401 });
//   }
//   return Response.json({ success: true });
// }

// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { password } = await req.json();

  // Your actual password check logic
  if (password === process.env.ADMIN_PASSWORD) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json({ success: false, error: 'JWT secret not configured' }, { status: 500 });
    }
    const token = jwt.sign({ admin: true }, jwtSecret, { expiresIn: '1h' });

    const res = NextResponse.json({ success: true });
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return res;
  }

  return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
}
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const protectedPaths = ['/admin', '/api/car', '/add-car'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  console.log('Token:', token);


  // Skip middleware for login page to prevent redirect loop
  if (request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  // Allow public GET requests to cars
  if((request.nextUrl.pathname.startsWith('/api/car') && request.method === 'GET') ||
     (request.nextUrl.pathname.startsWith('/api/cars') && request.method !== 'POST')){
        return NextResponse.next();
  }

  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If the token exists, validate it
//   if (token) {
//     try {
//       jwt.verify(token, process.env.JWT_SECRET!);
//     } catch (error) {
//         console.log(error);
//       // Clear invalid token and redirect
//       
//     }
//   }
 
   const base64Url = token?.split('.')[1]
    if (!base64Url) {
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('token');
        return response;
    }

    const decodedPayload = JSON.parse(Buffer.from(base64Url, 'base64url').toString())
    
    const now = Math.floor(Date.now() / 1000)
    
    if (decodedPayload.exp && decodedPayload.exp < now) {
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('token');
        return response;
    }

  return NextResponse.next();
}

// Update matcher to exclude login page
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/car/:path*', '/add-car', '/cars'],
}
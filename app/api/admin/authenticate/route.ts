
export async function POST(req: Request) {
  const { password } = await req.json();
  if (!password) {
    return Response.json({ error: "Password is required" }, { status: 400 });
  }
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  console.log("Admin Password:", ADMIN_PASSWORD);
  if (password !== ADMIN_PASSWORD) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }
  return Response.json({ success: true });
}

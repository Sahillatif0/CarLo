import { prisma } from "@/lib/prisma";

// GET: Fetch all msgs
export async function GET() {
  try {
    let msgs = await prisma.message.findMany();
    return Response.json({msgs},{status: 200});
    
  } catch (error) {
    return Response.json({ error: (error as Error).message || "An error occurred" }, { status: 500 });
  }

}

// POST: Add a car
export async function POST(req: Request) {
  const { msgDetails } = await req.json();
  if (!msgDetails) {
    return Response.json({ error: "Msg details are required" }, { status: 400 });
  }
  console.log(msgDetails)
  
  const msg = await prisma.message.create({
    data: msgDetails,
  });
  return Response.json(msg);
}

export async function PATCH(req: Request) {
  const { read } = await req.json();
  if (read === undefined) {
    return Response.json({ error: "Msg ID and read status are required" }, { status: 400 });
  }
  
  try {
    const updatedMsg = await prisma.message.updateMany({
      data: { read },
    });
    return Response.json(updatedMsg);
  } catch (error) {
    return Response.json({ error: (error as Error).message || "An error occurred" }, { status: 500 });
  }
}

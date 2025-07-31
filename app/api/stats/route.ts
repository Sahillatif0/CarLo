import { prisma } from "@/lib/prisma";

// GET: Fetch all stats
    export async function GET() {
    try {
    const stats = await prisma.stats.findUnique({
        where: { id: 1 },
    });
    return Response.json({stats},{status: 200});

  } catch (error) {
    return Response.json({ error: (error as Error).message || "An error occurred" }, { status: 500 });
  }
    
}

// PUT: Update stats
export async function PUT(req: Request) {
  const { stats } = await req.json();
  if (!stats) {
    return Response.json({ error: "Stats are required" }, { status: 400 });
  }
  const updatedStats = await prisma.stats.update({
    where: { id: 1 },
    data: { ...stats },
  });
  if (!updatedStats) {
    return Response.json({ error: "Failed to update stats" }, { status: 500 });
  }
  return Response.json(updatedStats);
}

import { prisma } from "@/lib/prisma";

// GET: Fetch all cars
export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      where: {
        OR: [
          { badge: "featured" },
          { badge: "Featured" },
          { featured: true },
        ]
      }
    });
    return Response.json({cars},{status: 200});
    
  } catch (error) {
    return Response.json({ error: (error as Error).message || "An error occurred" }, { status: 500 });
  }

}


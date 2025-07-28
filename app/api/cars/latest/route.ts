import { prisma } from "@/lib/prisma";

// GET: Fetch all cars
export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().getTime() - 30*24*60&60),
          lte: new Date()
        }
      }
    });
    return Response.json({cars},{status: 200});
    
  } catch (error) {
    return Response.json({ error: (error as Error).message || "An error occurred" }, { status: 500 });
  }

}


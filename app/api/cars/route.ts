import { prisma } from "@/lib/prisma";

// GET: Fetch all cars
export async function GET(req: Request) {
  const sold = req.url.includes("sold=true");
  try {
    let cars;
    if (sold) {
      cars = await prisma.car.findMany();
    } else {
      cars = await prisma.car.findMany({ where: { sold: false } });
    }
    return Response.json({cars},{status: 200});
    
  } catch (error) {
    return Response.json({ error: (error as Error).message || "An error occurred" }, { status: 500 });
  }

}

// POST: Add a car
export async function POST(req: Request) {
  const { carDetails, sellerDetails } = await req.json();
  if (!carDetails || !sellerDetails) {
    return Response.json({ error: "Car details and seller details are required" }, { status: 400 });
  }
  let seller = await prisma.user.findUnique({
    where: { email: sellerDetails.email },
  });
  if (!seller) {
    seller = await prisma.user.create({
      data: {
        name: sellerDetails.name,
        email: sellerDetails.email,
        phone: sellerDetails.phone,
        address: sellerDetails.address
      }
    })
  }
  const car = await prisma.car.create({
    data: { ...carDetails, sellerId: seller.id},
  });
  return Response.json(car);
}

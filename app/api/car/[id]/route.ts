
import { prisma } from "@/lib/prisma"; 

export async function GET(req: Request) {
  const id = req.url.split("/").pop();
  
  
  
  try {
    const currentCar = await prisma.car.findUnique({
      where: {
        id: id as string,
      },
    });

    
    if (!currentCar) {
      return Response.json({ message: "Car not found" });
    }

    const seller = await prisma.user.findUnique({
      where: { id: currentCar.sellerId },
    });

    const relatedCars = await prisma.car.findMany({
      where: {
        id: { not: currentCar.id },
        OR: [
          { make: currentCar.make },
          { model: currentCar.model },
          {
            price: {
              gte: currentCar.price * 0.9,
              lte: currentCar.price * 1.1,
            },
          },
          {
            year: {
              gte: currentCar.year - 2,
              lte: currentCar.year + 2,
            },
          },
          { city: currentCar.city },
        ],
      },
      take: 10,
    });

    const scoredCars = relatedCars.map((car) => {
      let score = 0;
      if (car.make === currentCar.make) score += 2;
      if (car.model === currentCar.model) score += 3;
      if (car.city === currentCar.city) score += 1;
      if (Math.abs(car.price - currentCar.price) < currentCar.price * 0.1) score += 2;
      if (Math.abs(car.year - currentCar.year) <= 2) score += 1;
      return { ...car, score };
    });

    const sorted = scoredCars.sort((a, b) => b.score - a.score);

    return Response.json({ car: currentCar, seller, relatedCars: sorted });
  } catch (error) {
    return Response.json({ message: "Internal server error", error });
  }
}

export async function DELETE(req: Request) {
  const id = req.url.split("/").pop();
  
  try {
    const car = await prisma.car.delete({
      where: {
        id: id as string,
      },
    });

    return Response.json({ message: "Car deleted successfully", car });
  } catch (error) {
    return Response.json({ message: "Internal server error", error });
  }
}

export async function PUT(req: Request) {
  const id = req.url.split("/").pop();
  const { carDetails } = await req.json();
  console.log("Car ID:", id);
  //how to remove properties from carDetails?
  const { sellerId, status, ...updatedDetails } = carDetails;

  try {
    const updatedCar = await prisma.car.update({
      where: {
        id: id as string,
      },
      data: {
        ...updatedDetails,
        },
    });

    console.log("Updated Car:", updatedCar, id);
    
    return Response.json({ message: "Car updated successfully", updatedCar });
  } catch (error) {
    console.log("Error updating Car:", error);
    return Response.json({ message: "Internal server error", error });
  }
}
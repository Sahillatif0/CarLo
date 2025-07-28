
import { prisma } from "@/lib/prisma"; 

export async function GET(req: Request) {
  const id = req.url.split("/").pop();
  
  
  
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
    });


    if (!user) {
      return Response.json({ message: "User not found" });
    }

    return Response.json({ seller: user });
  } catch (error) {
    return Response.json({ message: "Internal server error", error });
  }
}

export async function DELETE(req: Request) {
  const id = req.url.split("/").pop();
  
  try {
    const user = await prisma.user.delete({
      where: {
        id: id as string,
      },
    });

    return Response.json({ message: "Car deleted successfully", user });
  } catch (error) {
    return Response.json({ message: "Internal server error", error });
  }
}

export async function PUT(req: Request) {
  const id = req.url.split("/").pop();
  const { userDetails } = await req.json();
  console.log(userDetails);

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id as string,
      },
      data: userDetails,
    });

    return Response.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    return Response.json({ message: "Internal server error", error });
  }
}
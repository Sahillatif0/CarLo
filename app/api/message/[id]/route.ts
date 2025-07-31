import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request) {
  const id = req.url.split("/").pop();
    console.log("Deleting message with ID:", id);
  if (!id) {
    return Response.json({ error: "Msg ID is required" }, { status: 400 });
  }
  
  try {
    const deletedMsg = await prisma.message.delete({
      where: { id },
    });
    return Response.json(deletedMsg);
  } catch (error) {
    return Response.json({ error: (error as Error).message || "An error occurred" }, { status: 500 });
  }
}
// PATCH: Update a msg
export async function PATCH(req: Request) {
  const { id, read } = await req.json();
  if (!id || read === undefined) {
    return Response.json({ error: "Msg ID and read status are required" }, { status: 400 });
  }
  
  try {
    const updatedMsg = await prisma.message.update({
      where: { id },
      data: { read },
    });
    return Response.json(updatedMsg);
  } catch (error) {
    return Response.json({ error: (error as Error).message || "An error occurred" }, { status: 500 });
  }
}

import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});

export async function deleteImages(fileKeys: string[]) {
  try {
    await utapi.deleteFiles(fileKeys); 
    console.log("Files deleted successfully:", fileKeys);
    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false };
  }
}

import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  carImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .onUploadError(async ()=>{
        console.log("Error uploading")
    })
    .onUploadComplete(async ({ file }) => {
        console.log("File uploaded:", file);

    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

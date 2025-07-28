// import { createRouteHandler } from "uploadthing/next";
// import { ourFileRouter } from "./core";
    
// const handler = createRouteHandler({
//   router: ourFileRouter,
// });

// export { handler as GET, handler as POST };
// app/api/uploadthing/route.ts
// import { createRouteHandler } from "uploadthing/server";
// import { ourFileRouter } from "./core"; // adjust path as necessary

// export const { GET, POST } = createRouteHandler({
//   router: ourFileRouter,
// });
import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});

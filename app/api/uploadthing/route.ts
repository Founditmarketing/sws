import { createRouteHandler } from "uploadthing/next";

import { rfqRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: rfqRouter,
});

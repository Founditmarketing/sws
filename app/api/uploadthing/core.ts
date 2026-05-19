import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// File router for RFQ document uploads. Accepts plans, specs, photos, ZIPs.
// Caps total submission to 20 files at 100MB each per UploadThing free tier
// — bump the limits when the client moves to the paid tier or S3.
export const rfqRouter = {
  rfqDocs: f({
    pdf: { maxFileSize: "32MB", maxFileCount: 10 },
    "application/zip": { maxFileSize: "128MB", maxFileCount: 5 },
    "application/octet-stream": { maxFileSize: "128MB", maxFileCount: 10 }, // DWG/DXF
    image: { maxFileSize: "16MB", maxFileCount: 20 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "16MB",
      maxFileCount: 5,
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      maxFileSize: "16MB",
      maxFileCount: 5,
    },
  })
    .middleware(async () => ({ source: "rfq-form" }))
    .onUploadComplete(async ({ file, metadata }) => {
      // Persist nothing here; the API route correlates files to the submission.
      return { url: file.url, key: file.key, source: metadata.source };
    }),
} satisfies FileRouter;

export type RfqRouter = typeof rfqRouter;

"use client";

import { generateReactHelpers } from "@uploadthing/react";

import type { RfqRouter } from "@/app/api/uploadthing/core";

const { useUploadThing: utUseUploadThing, uploadFiles } =
  generateReactHelpers<RfqRouter>();

export { uploadFiles };

// Wrapper that adds an `isAvailable` flag. We assume UploadThing is reachable
// client-side; the API route will 401 if `UPLOADTHING_TOKEN` isn't set, in
// which case the caller catches the error and falls back to metadata-only.
export function useUploadThing(
  endpoint: "rfqDocs",
  opts?: Parameters<typeof utUseUploadThing>[1],
) {
  const result = utUseUploadThing(endpoint, opts);
  return { ...result, isAvailable: true };
}

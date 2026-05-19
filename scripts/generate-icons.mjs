/**
 * Generates the Apple touch icon (180x180 PNG) and a legacy favicon.ico
 * (32x32) from the canonical app/icon.svg. Next.js's App Router file-based
 * convention picks up app/apple-icon.png and app/favicon.ico automatically,
 * so no metadata wiring is required after this runs.
 *
 * Usage: `node scripts/generate-icons.mjs`
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = path.join(root, "app", "icon.svg");
const applePath = path.join(root, "app", "apple-icon.png");
const faviconPath = path.join(root, "app", "favicon.ico");

const BG = { r: 6, g: 7, b: 9, alpha: 1 }; // graphite-950

async function main() {
  const svg = await readFile(svgPath);

  // 180x180 Apple touch icon, opaque graphite background to match the brand.
  const apple = await sharp(svg)
    .resize(180, 180, { fit: "contain", background: BG })
    .flatten({ background: BG })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(applePath, apple);

  // 32x32 favicon, written as a .ico container. sharp doesn't emit ICO
  // natively, so we render PNG bytes and wrap them in a minimal single-image
  // ICO header. Browsers and crawlers accept PNG-encoded ICO since IE11.
  const png32 = await sharp(svg)
    .resize(32, 32, { fit: "contain", background: BG })
    .flatten({ background: BG })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const ico = wrapPngAsIco(png32, 32, 32);
  await writeFile(faviconPath, ico);

  console.log(`Wrote ${applePath} (${apple.length} bytes)`);
  console.log(`Wrote ${faviconPath} (${ico.length} bytes)`);
}

function wrapPngAsIco(pngBuf, width, height) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: ICO
  header.writeUInt16LE(1, 4); // image count

  const dir = Buffer.alloc(16);
  dir.writeUInt8(width === 256 ? 0 : width, 0);
  dir.writeUInt8(height === 256 ? 0 : height, 1);
  dir.writeUInt8(0, 2); // palette
  dir.writeUInt8(0, 3); // reserved
  dir.writeUInt16LE(1, 4); // color planes
  dir.writeUInt16LE(32, 6); // bpp
  dir.writeUInt32LE(pngBuf.length, 8); // image size
  dir.writeUInt32LE(header.length + dir.length, 12); // offset

  return Buffer.concat([header, dir, pngBuf]);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

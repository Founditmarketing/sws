// Generates one-page placeholder PDFs in public/downloads/.
// Run with `node scripts/generate-placeholder-pdfs.mjs`.
// These are intentional CLIENT-CONFIRM placeholders. Replace with the real
// signed/sealed documents once Joe provides them. See
// docs/prequal-data-checklist.md for the full swap list.
import PDFDocument from "pdfkit";
import { createWriteStream, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "downloads");
mkdirSync(outDir, { recursive: true });

const COMPANY = {
  legalName: "Sitework Specialist LLC",
  dba: "Sitework Specialist",
  address: "423 Vicky Ln., Alexandria, LA 71303",
  phone: "(318) 484-8931",
  email: "joeburnssws@gmail.com",
  state: "Louisiana",
};

const COLOR_GRAPHITE = "#0b0d11";
const COLOR_BONE = "#3f4853";
const COLOR_AMBER = "#a85700";
const COLOR_RULE = "#c0c5cb";

function header(doc, title, subtitle) {
  doc.fillColor(COLOR_GRAPHITE).font("Helvetica-Bold").fontSize(22).text(title, { align: "left" });
  doc.moveDown(0.2);
  doc.fillColor(COLOR_AMBER).font("Helvetica").fontSize(9).text(subtitle.toUpperCase(), {
    characterSpacing: 2,
  });
  doc.moveDown(0.4);
  doc
    .moveTo(doc.page.margins.left, doc.y)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y)
    .strokeColor(COLOR_RULE)
    .lineWidth(0.75)
    .stroke();
  doc.moveDown(1);
}

function kv(doc, label, value) {
  doc.fillColor(COLOR_BONE).font("Helvetica").fontSize(8).text(label.toUpperCase(), {
    characterSpacing: 1.5,
    continued: false,
  });
  doc.fillColor(COLOR_GRAPHITE).font("Helvetica-Bold").fontSize(11).text(value);
  doc.moveDown(0.5);
}

function placeholderBanner(doc) {
  doc.moveDown(1.2);
  doc
    .rect(
      doc.page.margins.left,
      doc.y,
      doc.page.width - doc.page.margins.left - doc.page.margins.right,
      54,
    )
    .strokeColor(COLOR_AMBER)
    .lineWidth(1)
    .stroke();
  doc.moveDown(0.4);
  doc.fillColor(COLOR_AMBER).font("Helvetica-Bold").fontSize(9).text("PLACEHOLDER DOCUMENT", {
    characterSpacing: 2,
    align: "center",
  });
  doc.fillColor(COLOR_GRAPHITE).font("Helvetica").fontSize(10).text(
    "This is a layout placeholder. The signed, current document is available on request from the prequalification contact below and will replace this file before any award.",
    { align: "center", lineGap: 2 },
  );
  doc.moveDown(0.5);
}

function footer(doc) {
  const bottomY = doc.page.height - doc.page.margins.bottom - 48;
  doc
    .moveTo(doc.page.margins.left, bottomY)
    .lineTo(doc.page.width - doc.page.margins.right, bottomY)
    .strokeColor(COLOR_RULE)
    .lineWidth(0.5)
    .stroke();
  doc.fillColor(COLOR_BONE).font("Helvetica").fontSize(8);
  doc.text(
    `${COMPANY.legalName}  ·  ${COMPANY.address}  ·  ${COMPANY.phone}  ·  ${COMPANY.email}`,
    doc.page.margins.left,
    bottomY + 8,
    { width: doc.page.width - doc.page.margins.left - doc.page.margins.right, align: "center" },
  );
  doc.text(
    "Generated as a layout placeholder. Replace with the executed document on file.",
    { align: "center" },
  );
}

function newDoc(title) {
  const doc = new PDFDocument({
    size: "LETTER",
    margins: { top: 56, bottom: 64, left: 56, right: 56 },
    info: {
      Title: title,
      Author: COMPANY.legalName,
      Subject: "Prequalification placeholder",
      Keywords: "placeholder, prequalification, sitework specialist",
    },
  });
  return doc;
}

async function writeDoc(filename, build) {
  const path = join(outDir, filename);
  const doc = newDoc(filename);
  const stream = createWriteStream(path);
  doc.pipe(stream);
  build(doc);
  footer(doc);
  doc.end();
  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
  console.log(`wrote ${path}`);
}

await writeDoc("sitework-specialist-w9.pdf", (doc) => {
  header(doc, "Form W-9 (placeholder)", "Request for Taxpayer Identification Number");
  kv(doc, "Legal name (line 1)", COMPANY.legalName);
  kv(doc, "Business name / DBA (line 2)", COMPANY.dba);
  kv(doc, "Federal tax classification", "Limited Liability Company (LLC)");
  kv(doc, "Tax classification — LLC code", "[CLIENT-CONFIRM]  (C / S / P)");
  kv(doc, "Address", COMPANY.address);
  kv(doc, "Employer Identification Number (EIN)", "XX-XXXXXXX  [CLIENT-CONFIRM]");
  kv(doc, "Backup withholding subject", "No");
  kv(doc, "Signed", "[CLIENT-CONFIRM]   Date: [CLIENT-CONFIRM]");
  placeholderBanner(doc);
});

await writeDoc("sitework-specialist-coi-template.pdf", (doc) => {
  header(doc, "ACORD 25 — Certificate of Liability Insurance (sample)", "Sample COI template");
  kv(doc, "Producer", "[CLIENT-CONFIRM]  insurance broker / producer name + address");
  kv(doc, "Insured", `${COMPANY.legalName}\n${COMPANY.address}`);
  kv(doc, "General Liability — each occurrence / aggregate", "$2,000,000 / $4,000,000  [CLIENT-CONFIRM]");
  kv(doc, "Automobile Liability — combined single limit", "$1,000,000  [CLIENT-CONFIRM]");
  kv(doc, "Umbrella / Excess Liability", "$10,000,000  [CLIENT-CONFIRM]");
  kv(doc, "Workers' Compensation", "Statutory  +  $1,000,000 employer's liability  [CLIENT-CONFIRM]");
  kv(doc, "Carriers", "Travelers  ·  The Hartford  ·  Zurich   [CLIENT-CONFIRM]");
  kv(doc, "Certificate holder", "Issued per project award. Sample only.");
  kv(doc, "Additional insured / waiver of subrogation", "Available on award per contract.");
  placeholderBanner(doc);
});

await writeDoc("sitework-specialist-capabilities.pdf", (doc) => {
  header(doc, "Capabilities Statement (placeholder)", "Self-performed commercial site work");
  doc.fillColor(COLOR_GRAPHITE).font("Helvetica").fontSize(11).text(
    "Sitework Specialist LLC is a Central Louisiana commercial site work contractor headquartered in Alexandria, with yards in Pineville, Jonesville, and Natchez. We self-perform mass excavation, grading, land clearing, erosion control, retaining structures, and complete pad sites for industrial, energy, healthcare, municipal, and commercial development clients.",
    { align: "left", lineGap: 3 },
  );
  doc.moveDown(0.8);
  kv(doc, "Core capabilities", "Mass excavation · Grading · Land clearing · Erosion control · Retaining structures · Pad sites · Storm drainage");
  kv(doc, "NAICS codes", "237310 · 237990 · 238910 · 238990 · 561730");
  kv(doc, "Bonding capacity (single / aggregate)", "$25M / $60M   [CLIENT-CONFIRM]");
  kv(doc, "Safety EMR (current)", "0.34   [CLIENT-CONFIRM]");
  kv(doc, "Coverage radius", "200 miles from Alexandria HQ");
  kv(doc, "Representative clients", "Cleco Power · CenturyLink · Procter & Gamble · Roy O. Martin · Christus Health · Rapides Parish · LaDOTD · Weyerhaeuser");
  kv(doc, "Prequal contact", `${COMPANY.email}  ·  ${COMPANY.phone}`);
  placeholderBanner(doc);
});

console.log("done");

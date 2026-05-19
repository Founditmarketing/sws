import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "node:crypto";

import {
  quickRfqSchema,
  rfqSubmissionSchema,
  type QuickRfqSubmission,
  type RfqSubmission,
} from "@/lib/rfq/schema";
import { capabilities } from "@/lib/content/capabilities";
import { markets } from "@/lib/content/markets";
import { siteConfig, INQUIRY_EMAIL } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function generateReference() {
  const date = new Date();
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const rand = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `SWS-${yy}${mm}${dd}-${rand}`;
}

function labelMarket(slug: string) {
  return markets.find((m) => m.slug === slug)?.title ?? slug;
}

function labelCapabilities(slugs: string[]) {
  return slugs
    .map((s) => capabilities.find((c) => c.slug === s)?.title ?? s)
    .join(", ");
}

function buildEmail({
  reference,
  data,
}: {
  reference: string;
  data: import("@/lib/rfq/schema").RfqSubmission;
}) {
  const summary = `
Reference: ${reference}
Submitted: ${new Date().toISOString()}

PROJECT
- Name: ${data.projectName}
- Market: ${labelMarket(data.market)}
- Location: ${data.city}, ${data.state}
- Target Start: ${data.targetStart}

SCOPE
- Capabilities: ${labelCapabilities(data.capabilities)}
- Size: ${data.size} ${data.sizeUnit}
- Notes: ${data.notes ?? "(none)"}

DOCUMENTS (${data.files.length})
${
  data.files.length
    ? data.files
        .map((f) => `- ${f.name} (${f.size} bytes)${f.url ? ` -> ${f.url}` : ""}`)
        .join("\n")
    : "- (none uploaded)"
}

CONTACT
- ${data.fullName} - ${data.role}
- ${data.company}
- ${data.email}
- ${data.phone}
- Best time to call: ${data.bestTime ?? "anytime"}
`.trim();

  const html = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 640px; margin: 0; color: #14181d;">
  <div style="background: #060709; color: #f4f1ea; padding: 24px;">
    <div style="font-family: monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #FFB238;">
      Sitework Specialist - New RFQ
    </div>
    <h1 style="font-size: 24px; margin: 8px 0 0; color: #f4f1ea;">${data.projectName}</h1>
    <div style="font-family: monospace; font-size: 12px; color: #d6cdb8; margin-top: 4px;">
      Ref ${reference}
    </div>
  </div>
  <div style="padding: 24px; background: #fbfaf7;">
    <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #5d6772; margin: 0 0 8px;">Project</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 4px 0;"><strong>Market</strong></td><td>${labelMarket(data.market)}</td></tr>
      <tr><td style="padding: 4px 0;"><strong>Location</strong></td><td>${data.city}, ${data.state}</td></tr>
      <tr><td style="padding: 4px 0;"><strong>Target start</strong></td><td>${data.targetStart}</td></tr>
    </table>

    <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #5d6772; margin: 24px 0 8px;">Scope</h2>
    <p><strong>Capabilities:</strong> ${labelCapabilities(data.capabilities)}</p>
    <p><strong>Size:</strong> ${data.size} ${data.sizeUnit}</p>
    ${data.notes ? `<p><strong>Notes:</strong><br/>${escapeHtml(data.notes)}</p>` : ""}

    <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #5d6772; margin: 24px 0 8px;">
      Documents (${data.files.length})
    </h2>
    ${
      data.files.length
        ? `<ul>${data.files
            .map(
              (f) =>
                `<li><a href="${f.url ?? "#"}">${escapeHtml(f.name)}</a> <span style="color:#5d6772; font-size:12px;">(${(f.size / 1024 / 1024).toFixed(2)} MB)</span></li>`,
            )
            .join("")}</ul>`
        : "<p style='color:#5d6772'>None uploaded - estimator should request files in follow-up.</p>"
    }

    <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #5d6772; margin: 24px 0 8px;">Contact</h2>
    <p>
      <strong>${escapeHtml(data.fullName)}</strong> - ${escapeHtml(data.role)}<br/>
      ${escapeHtml(data.company)}<br/>
      <a href="mailto:${data.email}">${escapeHtml(data.email)}</a><br/>
      <a href="tel:${data.phone}">${escapeHtml(data.phone)}</a><br/>
      Best time: ${escapeHtml(data.bestTime ?? "anytime")}
    </p>
  </div>
</div>
`.trim();

  return { text: summary, html };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendEmail(args: {
  reference: string;
  data: import("@/lib/rfq/schema").RfqSubmission;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SALES_INBOX_EMAIL || INQUIRY_EMAIL;
  const from = process.env.RFQ_FROM_EMAIL || `quotes@${new URL(siteConfig.url).hostname}`;

  if (!apiKey) {
    return { sent: false, skipped: true, reason: "RESEND_API_KEY not set" };
  }

  const resend = new Resend(apiKey);
  const { html, text } = buildEmail(args);

  const result = await resend.emails.send({
    from: `${siteConfig.name} RFQ <${from}>`,
    to: [to],
    replyTo: args.data.email,
    subject: `[RFQ ${args.reference}] ${args.data.projectName} - ${args.data.company}`,
    text,
    html,
  });

  if (result.error) {
    return { sent: false, error: result.error.message };
  }
  return { sent: true, id: result.data?.id };
}

async function postWebhook(payload: {
  reference: string;
  data: import("@/lib/rfq/schema").RfqSubmission;
}) {
  const url = process.env.RFQ_WEBHOOK_URL;
  if (!url) return { posted: false, skipped: true, reason: "RFQ_WEBHOOK_URL not set" };

  const body = JSON.stringify({
    type: "rfq.submitted",
    reference: payload.reference,
    submittedAt: new Date().toISOString(),
    data: payload.data,
  });

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const secret = process.env.RFQ_WEBHOOK_SECRET;
  if (secret) {
    const sig = crypto.createHmac("sha256", secret).update(body).digest("hex");
    headers["X-SWS-Signature"] = `sha256=${sig}`;
  }

  try {
    const res = await fetch(url, { method: "POST", headers, body });
    if (!res.ok) {
      return { posted: false, status: res.status, error: await res.text() };
    }
    return { posted: true };
  } catch (e) {
    return { posted: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/**
 * Map a homepage-inline `quick-cta` submission onto the full RFQ shape so the
 * downstream email + webhook code paths stay identical. Multi-step-only fields
 * get explicit "—" or "(unspecified)" placeholders so the operator can see at
 * a glance which lead came from the quick form vs the long form.
 */
function normalizeQuickSubmission(q: QuickRfqSubmission): RfqSubmission {
  const noteLines: string[] = ["Submitted via homepage inline quick form."];
  if (q.needBy) noteLines.push(`Customer needs response by: ${q.needBy}`);
  if (q.notes) noteLines.push("", q.notes);

  return {
    market: q.market,
    projectName: `${q.company} — quick inquiry`,
    city: "(to be confirmed)",
    state: "LA",
    targetStart: "Budgeting only",
    capabilities: [],
    size: 0,
    sizeUnit: "acres",
    notes: noteLines.join("\n"),
    files: q.files ?? [],
    fullName: q.fullName,
    role: "Other",
    company: q.company,
    email: q.email,
    phone: "(not provided)",
    bestTime: undefined,
    consent: true,
  };
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  // Try the quick (homepage CTA) shape first, then fall back to the full
  // multi-step shape. Either branch normalizes to the same downstream payload.
  let data: RfqSubmission;
  let source: "quick-cta" | "full-rfq";

  const quickParsed = quickRfqSchema.safeParse(payload);
  if (quickParsed.success) {
    data = normalizeQuickSubmission(quickParsed.data);
    source = "quick-cta";
  } else {
    const fullParsed = rfqSubmissionSchema.safeParse(payload);
    if (!fullParsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed.",
          issues: fullParsed.error.flatten(),
        },
        { status: 422 },
      );
    }
    data = fullParsed.data;
    source = "full-rfq";
  }

  const reference = generateReference();

  const [emailResult, webhookResult] = await Promise.all([
    sendEmail({ reference, data }).catch((e) => ({
      sent: false,
      error: e instanceof Error ? e.message : String(e),
    })),
    postWebhook({ reference, data }).catch((e) => ({
      posted: false,
      error: e instanceof Error ? e.message : String(e),
    })),
  ]);

  // We treat the submission as successful even if downstream notifications
  // fail — the customer experience shouldn't depend on Resend uptime.
  // We log so the operator can see what happened in Vercel logs.
  console.log("[rfq.submitted]", {
    source,
    reference,
    company: data.company,
    market: data.market,
    email: emailResult,
    webhook: webhookResult,
  });

  return NextResponse.json({
    ok: true,
    reference,
    notifications: {
      email: emailResult,
      webhook: webhookResult,
    },
  });
}

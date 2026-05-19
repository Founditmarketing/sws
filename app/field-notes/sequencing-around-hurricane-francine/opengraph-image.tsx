import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Field notes — How we sequenced mass earthwork around Hurricane Francine. Sitework Specialist, Central Louisiana.";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #060709 0%, #0b0d11 60%, #14181d 100%)",
          color: "#f4f1ea",
          padding: 72,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#FFB238",
            fontSize: 14,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 36, height: 2, background: "#FFB238" }} />
          Field notes &middot; 02 &middot; Sitework specialist
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 78,
              lineHeight: 0.98,
              fontWeight: 800,
              letterSpacing: -2,
              maxWidth: 1040,
            }}
          >
            How we sequenced mass earthwork around Hurricane Francine.
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#8d96a0",
              maxWidth: 980,
              lineHeight: 1.4,
            }}
          >
            A Category-2 hurricane mid-cut. What we shut down, how we
            secured, when we reopened, and the three lessons we walked out
            with &mdash; contractor to contractor.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: 24,
            borderTop: "1px solid rgba(244,241,234,0.15)",
            fontSize: 18,
            color: "#d6cdb8",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ color: "#8d96a0", fontSize: 14, letterSpacing: 3 }}>
              SITEWORK SPECIALIST &middot; ALEXANDRIA, LA
            </span>
            <span>
              siteworkspecialistllc.com / field-notes /
              sequencing-around-hurricane-francine
            </span>
          </div>
          <span
            style={{
              color: "#FFB238",
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontSize: 16,
            }}
          >
            Sitework Specialist
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}

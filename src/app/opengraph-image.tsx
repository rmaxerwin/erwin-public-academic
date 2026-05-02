import { ImageResponse } from "next/og";

export const alt = "Erwin Public · Academic — Texas Essential Knowledge and Skills, browseable.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fbf8f2",
          padding: 96,
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <svg width="120" height="120" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="20" stroke="#1a160f" strokeWidth="1.5" fill="none" />
            <line x1="2" y1="22" x2="42" y2="22" stroke="#1a160f" strokeWidth="1.5" />
            <circle cx="22" cy="22" r="9" fill="#c25a3a" />
            <line x1="14" y1="30" x2="30" y2="30" stroke="#1a160f" strokeWidth="1" opacity="0.4" />
            <line x1="17" y1="36" x2="27" y2="36" stroke="#1a160f" strokeWidth="1" opacity="0.3" />
          </svg>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#7a6f5a",
              fontFamily: "sans-serif",
            }}
          >
            Erwin Public
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#1a160f",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>Erwin&nbsp;</span>
            <span style={{ fontStyle: "italic", color: "#4a4234" }}>Public&nbsp;</span>
            <span style={{ color: "#7a6f5a" }}>·&nbsp;</span>
            <span>Academic</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              lineHeight: 1.4,
              color: "#4a4234",
              fontStyle: "italic",
              maxWidth: 900,
            }}
          >
            Texas Essential Knowledge and Skills, browseable. Public domain, free, and ready to use.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "sans-serif",
            fontSize: 16,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#c25a3a",
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: "#c25a3a" }} />
          <div>Free · Public</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

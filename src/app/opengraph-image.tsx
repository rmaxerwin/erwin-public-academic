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
          justifyContent: "space-between",
          backgroundColor: "#fbf8f2",
          padding: 80,
          fontFamily: "serif",
        }}
      >
        {/* Top — mark + small wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="84" height="84" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="20" stroke="#1a160f" strokeWidth="1.5" fill="none" />
            <line x1="2" y1="22" x2="42" y2="22" stroke="#1a160f" strokeWidth="1.5" />
            <circle cx="22" cy="22" r="9" fill="#c25a3a" />
            <line x1="14" y1="30" x2="30" y2="30" stroke="#1a160f" strokeWidth="1" opacity="0.4" />
            <line x1="17" y1="36" x2="27" y2="36" stroke="#1a160f" strokeWidth="1" opacity="0.3" />
          </svg>
          <div
            style={{
              display: "flex",
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

        {/* Middle — title + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              fontSize: 104,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#1a160f",
            }}
          >
            <span style={{ display: "flex" }}>Erwin</span>
            <span style={{ display: "flex", fontStyle: "italic", color: "#4a4234" }}>
              Public
            </span>
            <span
              style={{
                display: "flex",
                width: 18,
                height: 18,
                borderRadius: 999,
                backgroundColor: "#c25a3a",
              }}
            />
            <span style={{ display: "flex" }}>Academic</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 30,
              lineHeight: 1.35,
              color: "#4a4234",
              fontStyle: "italic",
              maxWidth: 980,
            }}
          >
            Texas Essential Knowledge and Skills, browseable. Public domain,
            free, and ready to use.
          </div>
        </div>

        {/* Bottom — badge */}
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
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              backgroundColor: "#c25a3a",
            }}
          />
          <div style={{ display: "flex" }}>Free · Public</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

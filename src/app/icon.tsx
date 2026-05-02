import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbf8f2",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="20" stroke="#1a160f" strokeWidth="2" fill="none" />
          <line x1="2" y1="22" x2="42" y2="22" stroke="#1a160f" strokeWidth="2" />
          <circle cx="22" cy="22" r="9" fill="#c25a3a" />
        </svg>
      </div>
    ),
    { ...size },
  );
}

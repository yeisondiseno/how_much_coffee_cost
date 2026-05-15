import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #1b0e07 0%, #3d1f0d 60%, #6b3a1f 100%)",
          fontSize: 96,
          lineHeight: 1,
        }}
      >
        ☕
      </div>
    ),
    { ...size },
  );
}

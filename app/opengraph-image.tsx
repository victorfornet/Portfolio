import { ImageResponse } from "next/og";

export const alt = "Victor Fornet — I build consumer apps from idea to growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 60,
          background: "linear-gradient(180deg, #5cb9ff 0%, #bfe4ff 60%, #6fd05a 100%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#0c1726", opacity: 0.7 }}>
          Victor Fornet
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 64,
            fontWeight: 600,
            color: "#0c1726",
            marginTop: 8,
            lineHeight: 1.1,
          }}
        >
          <div style={{ display: "flex" }}>I build consumer apps —</div>
          <div style={{ display: "flex" }}>from idea to growth.</div>
        </div>
      </div>
    ),
    size,
  );
}

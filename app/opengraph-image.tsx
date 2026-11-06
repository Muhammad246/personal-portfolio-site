import { ImageResponse } from "next/og";

export const alt = "Muhammad Ali — Data, AI & Backend Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 82px",
          background: "#111310",
          color: "#f2f3ed",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "#b5d9bd", color: "#111310", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700 }}>MA</div>
          <div style={{ fontSize: 24, color: "#b5d9bd", letterSpacing: 2 }}>PORTFOLIO</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -2 }}>Muhammad Ali</div>
          <div style={{ fontSize: 34, color: "#b5d9bd" }}>Data, AI &amp; Backend Engineering</div>
          <div style={{ fontSize: 23, color: "#a2a69e" }}>Computer Science student at PAF-KIET · Karachi, Pakistan</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 19, color: "#a2a69e" }}>
          <div style={{ width: 10, height: 10, borderRadius: 10, background: "#b5d9bd" }} />
          Building with data and intelligent systems
        </div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";
import { site } from "./lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The social card, generated at build time in the site's own palette.
 *
 * A portfolio's whole job is to be sent to someone. Without this, every link
 * shared to LinkedIn, Slack or X renders as a bare grey rectangle.
 *
 * Deliberately no webfont: fetching one at build time makes the build depend
 * on the network, and the layout carries this on its own.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0c0e",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Key light from above, matching the site's lighting model. */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 300,
            width: 700,
            height: 520,
            background:
              "radial-gradient(circle, rgba(232,217,184,0.16) 0%, rgba(232,217,184,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#6fa88c",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#7a8088",
              display: "flex",
            }}
          >
            Available for work
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.02,
              letterSpacing: -3,
              color: "#edeef0",
              display: "flex",
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.4,
              color: "#9ba0a8",
              maxWidth: 900,
              display: "flex",
            }}
          >
            {site.role} · {site.locationShort}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.10)",
            paddingTop: 28,
          }}
        >
          <div style={{ fontSize: 26, color: "#edeef0", display: "flex" }}>
            {site.name}
          </div>
          <div style={{ fontSize: 22, color: "#e8d9b8", display: "flex" }}>
            {site.email}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

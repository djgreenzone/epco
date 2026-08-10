import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type OgParams = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

/**
 * Shared branded Open Graph / Twitter card renderer.
 * Kept in a private (_og) folder so Next never treats it as a route.
 */
export function renderOgImage({ eyebrow, title, subtitle }: OgParams) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          backgroundColor: "#05070a",
          padding: "80px",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* gradient glows */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "-160px",
            width: "700px",
            height: "700px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(0,242,255,0.35) 0%, rgba(0,242,255,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-260px",
            right: "-180px",
            width: "760px",
            height: "760px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(255,0,234,0.30) 0%, rgba(255,0,234,0) 70%)",
          }}
        />

        {/* eyebrow */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: "#7c8794",
              fontFamily: "monospace",
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "84px",
              lineHeight: 1.05,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-2px",
              maxWidth: "980px",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                marginTop: "28px",
                fontSize: "30px",
                lineHeight: 1.35,
                color: "#9aa4b0",
                maxWidth: "860px",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        {/* footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            EPCO
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              color: "#7c8794",
              fontFamily: "monospace",
            }}
          >
            eddypham.company
          </div>
        </div>

        {/* bottom accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: "10px",
            background:
              "linear-gradient(90deg, #00f2ff 0%, #ff00ea 55%, #ffcc00 100%)",
          }}
        />
      </div>
    ),
    { ...OG_SIZE }
  );
}

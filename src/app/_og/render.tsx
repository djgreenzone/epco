import { readFileSync } from "node:fs";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type OgParams = {
  eyebrow: string;
  /** Leading, white portion of the headline. */
  title: string;
  /** Trailing keyword rendered in the brand gradient. */
  accent?: string;
  subtitle?: string;
};

const GRADIENT = "linear-gradient(90deg, #00f2ff 0%, #ff00ea 52%, #ffcc00 100%)";

/* Prismatic aurora echoing the hero — built from layered radial gradients
   because Satori supports neither conic-gradient nor filter: blur. Applied to
   the root element (Satori won't paint an empty inset:0 overlay). */
const AURORA =
  "radial-gradient(72% 82% at 16% 0%, rgba(0,242,255,0.42) 0%, rgba(0,242,255,0) 60%)," +
  "radial-gradient(68% 78% at 50% -10%, rgba(96,120,255,0.38) 0%, rgba(96,120,255,0) 58%)," +
  "radial-gradient(78% 88% at 98% 4%, rgba(255,0,234,0.40) 0%, rgba(255,0,234,0) 60%)," +
  "radial-gradient(55% 60% at 84% 30%, rgba(255,150,40,0.20) 0%, rgba(255,150,40,0) 55%)";

/* Load the site's real Geist typeface so the cards match the hero.
   Satori needs raw font data — woff is supported (woff2 is not).
   Read with fs (not fetch): these images are generated at build time on the
   Node runtime, where fetch() does not support file: URLs. The
   new URL(..., import.meta.url) literal keeps the font bundled with the route. */
function loadFonts() {
  return [
    {
      name: "Geist",
      data: readFileSync(new URL("./fonts/geist-900.woff", import.meta.url)),
      weight: 900 as const,
      style: "normal" as const,
    },
    {
      name: "Geist",
      data: readFileSync(new URL("./fonts/geist-500.woff", import.meta.url)),
      weight: 500 as const,
      style: "normal" as const,
    },
    {
      name: "Geist Mono",
      data: readFileSync(new URL("./fonts/geist-mono-500.woff", import.meta.url)),
      weight: 500 as const,
      style: "normal" as const,
    },
  ];
}

/** Balance headline size against its length so long titles don't overflow. */
function titleSize(len: number) {
  if (len <= 18) return 92;
  if (len <= 26) return 80;
  if (len <= 36) return 66;
  return 56;
}

/**
 * Shared branded Open Graph / Twitter card renderer.
 * Kept in a private (_og) folder so Next never treats it as a route.
 */
export function renderOgImage({ eyebrow, title, accent, subtitle }: OgParams) {
  const fonts = loadFonts();
  const headlineLen = (title + (accent ? " " + accent : "")).length;
  const size = titleSize(headlineLen);

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
          backgroundColor: "#000000",
          backgroundImage: AURORA,
          padding: "76px",
          fontFamily: "Geist",
          overflow: "hidden",
        }}
      >
        {/* eyebrow with brand tick */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: "92px",
              height: "6px",
              borderRadius: "9999px",
              background: GRADIENT,
              marginBottom: "26px",
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "Geist Mono",
              fontSize: "24px",
              letterSpacing: "7px",
              textTransform: "uppercase",
              color: "#8b97a5",
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* headline + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: `${size}px`,
              lineHeight: 1.0,
              fontWeight: 900,
              letterSpacing: "-3px",
              color: "#ffffff",
              maxWidth: "1000px",
            }}
          >
            <span style={{ display: "flex" }}>{title}</span>
            {accent ? (
              <span
                style={{
                  display: "flex",
                  marginLeft: "0.3em",
                  color: "transparent",
                  backgroundImage: GRADIENT,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                {accent}
              </span>
            ) : null}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                marginTop: "30px",
                fontSize: "29px",
                fontWeight: 500,
                lineHeight: 1.35,
                color: "#9aa4b0",
                maxWidth: "880px",
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
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "9999px",
                background: GRADIENT,
                marginRight: "14px",
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: "34px",
                fontWeight: 900,
                letterSpacing: "-1.5px",
                color: "#ffffff",
              }}
            >
              EPCO.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Geist Mono",
              fontSize: "23px",
              letterSpacing: "1px",
              color: "#7c8794",
            }}
          >
            eddypham.company
          </div>
        </div>

        {/* feathered gradient hairline */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: "4px",
            background:
              "linear-gradient(90deg, rgba(0,242,255,0) 0%, #00f2ff 18%, #ff00ea 55%, #ffcc00 82%, rgba(255,204,0,0) 100%)",
          }}
        />
      </div>
    ),
    { ...OG_SIZE, fonts }
  );
}

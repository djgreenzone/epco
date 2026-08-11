import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "./_og/render";

export const alt = "EPCO — From Scribbles to Scale";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    eyebrow: "// EPCO INTERNATIONAL",
    title: "From Scribbles to",
    accent: "Scale.",
    subtitle:
      "We engineer physical products, source global manufacturing, and deploy full-funnel performance marketing campaigns.",
  });
}

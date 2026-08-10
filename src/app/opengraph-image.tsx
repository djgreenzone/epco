import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "./_og/render";

export const alt = "EPCO — From Scribbles to Scale";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "// EPCO INTERNATIONAL",
    title: "From Scribbles to Scale.",
    subtitle:
      "We engineer physical products, source global manufacturing, and deploy full-stack direct response campaigns.",
  });
}

import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "../../_og/render";

export const alt = "EPCO — Product Development";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    eyebrow: "// PRODUCT DEVELOPMENT",
    title: "Sketch to",
    accent: "Launch.",
    subtitle:
      "Engineering, sourcing, and commercial strategy behind more than 160 product launches.",
  });
}

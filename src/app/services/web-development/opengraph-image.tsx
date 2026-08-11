import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "../../_og/render";

export const alt = "EPCO — Web Development";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    eyebrow: "// WEB DEVELOPMENT",
    title: "Built to",
    accent: "Convert.",
    subtitle:
      "Custom web platforms, mobile apps, and AI integrations engineered for direct response and transactional scale.",
  });
}

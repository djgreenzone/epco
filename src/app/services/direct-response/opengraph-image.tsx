import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "../../_og/render";

export const alt = "EPCO — Direct Response Marketing";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgImage({
    eyebrow: "// DIRECT RESPONSE",
    title: "Ads That Sell",
    accent: "on Impact.",
    subtitle:
      "DRTV, infomercials, media buying, and QVC/HSN launches — 30+ years and $1B+ in retail sales.",
  });
}

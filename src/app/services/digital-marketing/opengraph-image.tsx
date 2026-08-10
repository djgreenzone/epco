import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "../../_og/render";

export const alt = "EPCO — Digital Marketing";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "// DIGITAL MARKETING",
    title: "Growth Engines, Not Campaigns.",
    subtitle:
      "Nine channels run as one revenue engine — social, search, paid, funnels, email, and AI automation.",
  });
}

import type { MetadataRoute } from "next";

const BASE = "https://www.eddypham.company";

const service = (slug: string): MetadataRoute.Sitemap[number] => ({
  url: `${BASE}/services/${slug}`,
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.8,
});

const legal = (slug: string): MetadataRoute.Sitemap[number] => ({
  url: `${BASE}/legal/${slug}`,
  lastModified: new Date(),
  changeFrequency: "yearly",
  priority: 0.2,
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    service("product-development"),
    service("direct-response"),
    service("web-development"),
    service("digital-marketing"),
    legal("privacy"),
    legal("terms"),
  ];
}

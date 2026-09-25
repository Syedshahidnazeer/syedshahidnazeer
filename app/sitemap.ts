import type { MetadataRoute } from "next";

import { SITE_URL } from "@/config";

// Single-page site: one URL. The image entry lets Google Images associate the
// preview image with the page. llms.txt isn't listed — sitemaps are for HTML.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE_URL}/opengraph-image.png`],
    },
  ];
}

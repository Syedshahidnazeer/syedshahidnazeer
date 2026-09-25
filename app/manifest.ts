import type { MetadataRoute } from "next";

import { PROFILE } from "@/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PROFILE.name} — ${PROFILE.title}`,
    short_name: PROFILE.name,
    description: PROFILE.summary,
    start_url: "/",
    display: "standalone",
    background_color: "#030014",
    theme_color: "#030014",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

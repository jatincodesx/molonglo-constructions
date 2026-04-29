import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: "Canberra-focused custom home builder delivering new homes, knockdown rebuilds and residential construction services.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0f0e",
    theme_color: "#111512",
    icons: [
      {
        src: site.logo,
        sizes: "192x192",
        type: "image/jpeg"
      }
    ]
  };
}

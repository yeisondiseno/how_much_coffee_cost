import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CoffeeCalc",
    short_name: "CoffeeCalc",
    description:
      "Free coffee cost calculator: convert any price into cups of coffee.",
    start_url: `/${routing.defaultLocale}`,
    display: "standalone",
    background_color: "#fff8f0",
    theme_color: "#1b0e07",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon",
        type: "image/png",
        sizes: "32x32",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        type: "image/png",
        sizes: "180x180",
        purpose: "any",
      },
    ],
  };
}

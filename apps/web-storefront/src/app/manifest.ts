import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Welqo — Conciergerie Airbnb",
    short_name: "Welqo",
    description: "Gestion locative et conciergerie Airbnb dans les Hauts-de-France (Lille, Lens, Arras).",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#d45537", // welqo-terracotta
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

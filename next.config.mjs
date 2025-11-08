// next.config.mjs
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  compress: true,

  // Évite le warning "Next.js inferred your workspace root..."
  turbopack: {
    root: __dirname,
  },

  async redirects() {
    return [
      // Page d’atterrissage unique → version FR du site
      { source: "/", destination: "/fr", permanent: false },
    ];
  },

  // Laisse Next gérer les images sans optimisation côté build (utile en dev ou si tu sers /uploads)
  images: {
    unoptimized: true,
    // Si tu charges des badges depuis l’extérieur, ajoute ici leurs domaines :
    // remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default config;

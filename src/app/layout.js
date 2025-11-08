// Root layout — charge Tailwind et pose le <html>/<body>
import "./globals.css";

// src/app/layout.js
export const metadata = {
  title: "GD // CYBER",
  description: "Portfolio Cloud & Cybersecurity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-black text-zinc-100 antialiased selection:bg-emerald-500/20">
        {children}
      </body>
    </html>
  );
}

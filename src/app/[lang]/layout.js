// src/app/[lang]/layout.js
import NavbarPro from "@/components/NavbarPro";
import Footer from "@/components/Footer";
import CyberWallpaper from "@/components/CyberWallpaper";
import { getDictionary } from "@/lib/get-dictionary";

const LOCALES = ["fr", "en"];

export async function generateMetadata({ params }) {
  // Next 16 : params est une Promise
  const { lang } = await params;
  const locale = LOCALES.includes(lang) ? lang : "fr";

  const siteName = "GD // CYBER";
  const title =
    locale === "fr"
      ? "Guy-Dorlant — Ingénieur Cloud & Cybersécurité"
      : "Guy-Dorlant — Cloud & Cybersecurity Engineer";
  const description =
    locale === "fr"
      ? "Architectures sécurisées, détection de menaces, labs SOC/Azure/IAM/GRC."
      : "Secure architectures, threat detection, SOC/Azure/IAM/GRC labs.";

  return {
    title: { default: title, template: `%s | ${siteName}` },
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName,
      locale,
      type: "website",
    },
    alternates: { canonical: `/${locale}`, languages: { en: "/en", fr: "/fr" } },
  };
}

export default async function RootLangLayout({ children, params }) {
  const { lang } = await params;                  // ✅ Next 16
  const locale = LOCALES.includes(lang) ? lang : "fr";
  const dict = await getDictionary(locale);

  return (
    <>
      {/* fond (statique/animé) côté serveur */}
      <CyberWallpaper />

      {/* contenu */}
      <div className="relative z-10 min-h-screen" data-lang={locale}>
        <NavbarPro dict={dict} lang={locale} />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </div>
    </>
  );
}

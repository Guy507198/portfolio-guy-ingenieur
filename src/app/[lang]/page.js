import Navbar from "@/components/Navbar";
import Glow from "@/components/Glow";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CertsWall from "@/components/CertsWall";
import ProjectsGrid from "@/components/ProjectsGrid";
import { getDictionary } from "@/lib/get-dictionary";

export default async function Page({ params }) {
  const { lang } = await params; // Next 16: params est une Promise
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar dict={dict} lang={lang} />
      <Glow />

      {/* HERO */}
      <Hero dict={dict} lang={lang} />

      {/* ABOUT */}
      <section id="about" className="scroll-mt-24">
        <About dict={dict} />
      </section>

      {/* SKILLS */}
      <section id="skills" className="scroll-mt-24">
        <Skills dict={dict} />
      </section>

      {/* PROJECTS (cartes “case files” de la home) */}
      <section id="projects" className="scroll-mt-24">
        <Projects dict={dict} />
      </section>

      {/* LABS / PROJETS détaillés (grille) – si tu veux l’afficher aussi en home */}
      {/* <ProjectsGrid dict={dict} lang={lang} /> */}

      {/* CERTIFICATIONS (la section porte déjà l’id "certifications") */}
      <CertsWall dict={dict} />

      {/* CONTACT */}
      <section id="contact" className="py-16 px-6 border-t border-white/10 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">{dict.contact.title}</h3>
          <p className="text-gray-300">
            {dict.contact.email} :{" "}
            <a className="text-emerald-400 underline" href="mailto:moubaghou06924318@gmail.com">
              moubaghou06924318@gmail.com
            </a>{" "}
            · {dict.contact.phone} :{" "}
            <a className="text-emerald-400 underline" href="tel:+33758701129">
              +33 7 58 70 11 29
            </a>{" "}
            · CV :{" "}
            <a className="text-emerald-400 underline" href="/assets/CV_Guy-Dorlant.pdf">
              {dict.contact.cv}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

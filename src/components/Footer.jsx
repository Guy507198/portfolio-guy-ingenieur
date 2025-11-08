export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-gray-400">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Guy-Dorlant MOUBAGHOU-MANGUI.</p>
          <div className="flex gap-4">
            <a
              href="https://github.com/Guy507198"
              target="_blank"
              className="hover:text-emerald-300"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/guy-dorlant-moubaghou/"
              target="_blank"
              className="hover:text-emerald-300"
            >
              LinkedIn
            </a>
            <a
              href="mailto:moubaghou06924318@gmail.com"
              className="hover:text-emerald-300"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

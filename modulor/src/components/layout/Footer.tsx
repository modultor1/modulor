import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = {
  Programmes: [
    "Mentions légales",
    "Conditions générale d'utilisation",
    "Politique de protection des données personnelles",
    "Cookies",
    "Déclaration d'accessibilité",
    "Sécurité",
  ],
  "À propos": [
    "Mentions légales",
    "Conditions générale d'utilisation",
    "Politique de protection",
    "Cookies",
    "Déclaration d'accessibilité",
    "Sécurité",
  ],
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden mt-auto">
      <Image src="/images/bg-footer.png" alt="" fill className="object-cover" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/pattern-footer.png" alt="" fill className="object-cover opacity-30" aria-hidden />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Image src="/images/logo-bleu.png" alt="Modulor" width={110} height={30} className="object-contain object-left" />
            <div className="flex items-center gap-3 mt-1">
              <Link href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                <Image src="/images/icon-instagram.png" alt="Instagram" width={28} height={28} />
              </Link>
              <Link href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                <Image src="/images/icon-facebook.png" alt="Facebook" width={28} height={28} />
              </Link>
              <Link href="#" aria-label="YouTube" className="hover:opacity-80 transition-opacity">
                <Image src="/images/icon-youtube.png" alt="YouTube" width={28} height={28} />
              </Link>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-bold mb-3" style={{ color: "#21D34C" }}>{title}</h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-5 pb-5 border-t border-border/40 text-center bg-white relative z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 -mb-10 sm:-mb-12">
          <p className="text-xs text-muted-foreground">
            © 2025 Modulor – All Web Service. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

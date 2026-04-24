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
      {/* Fond vert clair */}
      <Image src="/images/bg-footer.png" alt="" fill className="object-cover" aria-hidden />
      {/* Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/pattern-footer.png" alt="" fill className="object-cover opacity-30" aria-hidden />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Image src="/images/logo-bleu.png" alt="Modulor" width={120} height={32} className="object-contain object-left" />
            <div className="flex items-center gap-3 mt-2">
              {/* Instagram */}
              <Link href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
                      <stop offset="0%" stopColor="#ffd600"/>
                      <stop offset="30%" stopColor="#ff6b00"/>
                      <stop offset="60%" stopColor="#e1306c"/>
                      <stop offset="80%" stopColor="#833ab4"/>
                      <stop offset="100%" stopColor="#405de6"/>
                    </radialGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-grad)"/>
                  <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none"/>
                  <circle cx="17.2" cy="6.8" r="1.1" fill="white"/>
                </svg>
              </Link>
              {/* Facebook */}
              <Link href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="5" fill="#1877F2"/>
                  <path d="M15.5 8H13.5V6.5C13.5 5.95 13.95 5.5 14.5 5.5H15.5V3H13.5C12.12 3 11 4.12 11 5.5V8H9V10.5H11V21H13.5V10.5H15.5L15.5 8Z" fill="white"/>
                </svg>
              </Link>
              {/* YouTube */}
              <Link href="#" aria-label="YouTube" className="hover:opacity-80 transition-opacity">
                <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="5" fill="#FF0000"/>
                  <path d="M19.6 8.2C19.4 7.5 18.8 6.9 18.1 6.7C16.8 6.4 12 6.4 12 6.4C12 6.4 7.2 6.4 5.9 6.7C5.2 6.9 4.6 7.5 4.4 8.2C4.1 9.5 4.1 12 4.1 12C4.1 12 4.1 14.5 4.4 15.8C4.6 16.5 5.2 17.1 5.9 17.3C7.2 17.6 12 17.6 12 17.6C12 17.6 16.8 17.6 18.1 17.3C18.8 17.1 19.4 16.5 19.6 15.8C19.9 14.5 19.9 12 19.9 12C19.9 12 19.9 9.5 19.6 8.2Z" fill="#FF0000" stroke="white" strokeWidth="0.5"/>
                  <polygon points="10.2,9.6 10.2,14.4 14.8,12" fill="white"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-bold text-primary mb-4">{title}</h3>
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

        <div className="mt-10 pt-6 border-t border-border/40 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Modulor – All Web Service. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

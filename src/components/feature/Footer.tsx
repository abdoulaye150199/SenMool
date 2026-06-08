import { NavLink, useLocation } from 'react-router-dom';

const footerLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Mool-Safe', path: '/bracelet' },
  { label: 'App Mobile', path: '/app-mobile' },
  { label: 'Dashboard', path: '/dashboard' },
];

export default function Footer() {
  const location = useLocation();
  const hideOnDashboard = location.pathname.startsWith('/dashboard');
  const hideOnToolPage = location.pathname.startsWith('/bracelet') || location.pathname.startsWith('/app-mobile');

  if (hideOnDashboard || hideOnToolPage) return null;

  return (
    <footer className="bg-ocean-900 text-white">
      <div className="w-full px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-senegal-green flex items-center justify-center">
                <i className="ri-anchor-line text-white text-sm" />
              </div>
              <span className="font-display font-bold text-base tracking-tight">
                SEN-MOOL
                <span className="text-senegal-green"> PROTECT</span>
              </span>
            </div>
            <p className="text-ocean-200 text-sm leading-relaxed max-w-xs">
              Projet de souveraineté numérique et de sécurité maritime.
              Bracelet connecté, app mobile et dashboard temps réel pour protéger
              les travailleurs de la mer au Sénégal.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <div className="w-5 h-5 rounded-full bg-senegal-green" />
              <div className="w-5 h-5 rounded-full bg-senegal-yellow" />
              <div className="w-5 h-5 rounded-full bg-senegal-red" />
              <span className="text-ocean-300 text-xs ml-1">Made in Sénégal</span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-ocean-100">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="text-ocean-200 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-ocean-100">
              Partenaires & Contacts
            </h4>
            <div className="text-ocean-200 text-sm space-y-2">
              <p>Primature — New Deal Technologique 2026</p>
              <p>UNCHK — Pôle STN / MIC</p>
              <p>SENUM SA — Cloud National</p>
              <p>Marine Nationale du Sénégal</p>
            </div>
            <div className="mt-4 text-ocean-300 text-xs">
              <p>Initiateur : Serigne Moustapha Niang</p>
              <p>serignemoustapha.niang@unchk.edu.sn</p>
              <p>+221 78 428 27 76</p>
            </div>
          </div>
        </div>

        <div className="border-t border-ocean-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-ocean-400 text-xs">
            © 2026 SEN-MOOL PROTECT 2.0 — Souveraineté Numérique & Économie Bleue
          </p>
          <p className="text-ocean-500 text-xs">
            Cadre : New Deal Technologique 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
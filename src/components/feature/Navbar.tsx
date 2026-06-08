import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Mool-Safe', path: '/bracelet' },
  { label: 'App', path: '/app-mobile' },
  { label: 'Dashboard', path: '/dashboard' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isPresentation = location.pathname === '/presentation';
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isToolPage = location.pathname.startsWith('/bracelet') || location.pathname.startsWith('/app-mobile');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  if (isPresentation || isDashboard || isToolPage) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-senegal-green flex items-center justify-center">
            <i className="ri-anchor-line text-white text-sm" />
          </div>
          <span
            className={`font-display font-bold text-sm md:text-base tracking-tight transition-colors ${
              scrolled ? 'text-ocean-900' : 'text-white'
            }`}
          >
            SEN-MOOL
            <span className="text-senegal-green"> PROTECT</span>
          </span>
        </NavLink>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? scrolled
                      ? 'bg-ocean-900 text-white'
                      : 'bg-white/20 text-white'
                    : scrolled
                    ? 'text-ocean-700 hover:bg-ocean-50'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
            scrolled ? 'text-ocean-900' : 'text-white'
          }`}
        >
          <i className={menuOpen ? 'ri-close-line text-xl' : 'ri-menu-3-line text-xl'} />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-ocean-100 shadow-lg">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-ocean-900 text-white' : 'text-ocean-700 hover:bg-ocean-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

          </div>
        </div>
      )}
    </nav>
  );
}
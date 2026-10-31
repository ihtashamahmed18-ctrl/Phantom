import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/process', label: 'Process' },
  { path: '/gallery', label: 'Gallery' },
  // { path: '/testimonials', label: 'Testimonials' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact' },
];

type NavbarProps = {
  onSignOut: () => void;
};

export default function Navbar({ onSignOut }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, session } = useAuth();

  const isHome = location.pathname === '/';
  const darkNav = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const linkColor = darkNav
    ? 'text-cream-100/80 hover:text-cream-50'
    : 'text-cream-100/80 hover:text-cream-50';

  const logoColor = 'text-cream-50';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          darkNav
            ? 'bg-ink-950/95 backdrop-blur-md py-3 shadow-lg shadow-ink-950/20'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <Link to="/" className={`group flex items-center gap-3 ${logoColor}`}>
            <span className="flex h-9 w-9 items-center justify-center border border-gold-400/60 text-gold-300 transition-colors duration-300 group-hover:border-gold-300 group-hover:bg-gold-400/10">
              <span className="font-serif text-lg font-semibold leading-none">L</span>
            </span>
            <span className="font-serif text-xl font-medium tracking-wide">
              LTS WELDING HOUSE
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                      active ? 'text-gold-300' : linkColor
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-1/2 h-px bg-gold-400 transition-all duration-300 ${
                        active ? 'w-4 -translate-x-1/2 opacity-100' : 'w-0 opacity-0'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
            {isAdmin && (
              <li>
                <Link
                  to="/admin/gallery"
                  className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${location.pathname === '/admin/gallery' ? 'text-gold-300' : linkColor}`}
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>

          {/* CTA */}
          <Link
            to="/contact"
            className="btn-shine hidden border border-gold-400/50 px-5 py-2.5 text-sm font-medium tracking-wide text-gold-200 transition-all duration-300 hover:border-gold-300 hover:bg-gold-400/10 lg:block"
          >
            Book a Consultation
          </Link>

          {/* Sign out */}
          {session && (
            <button
              onClick={() => onSignOut()}
              className="hidden text-sm font-medium tracking-wide text-cream-100/60 transition-colors hover:text-gold-300 lg:block"
            >
              Sign Out
            </button>
          )}

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="text-cream-50 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-ink-950 transition-all duration-500 lg:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-2">
          {NAV_ITEMS.map((item, i) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`font-serif text-2xl transition-all duration-500 ${
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                } ${active ? 'text-gold-300' : 'text-cream-100 hover:text-gold-200'}`}
                style={{ transitionDelay: menuOpen ? `${i * 60 + 100}ms` : '0ms' }}
              >
                {item.label}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              to="/admin/gallery"
              className={`mt-6 border border-gold-400/50 px-6 py-3 text-sm font-medium tracking-wide text-gold-200 transition-all duration-500 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: `${NAV_ITEMS.length * 60 + 100}ms` }}
            >
              Admin Gallery
            </Link>
          )}
          <Link
            to="/contact"
            className={`mt-6 border border-gold-400/50 px-6 py-3 text-sm font-medium tracking-wide text-gold-200 transition-all duration-500 ${
              menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? `${NAV_ITEMS.length * 60 + 100}ms` : '0ms' }}
          >
            Book a Consultation
          </Link>
          {session && (
            <button
              onClick={() => onSignOut()}
              className="mt-4 text-sm font-medium tracking-wide text-cream-100/60 transition-colors hover:text-gold-300"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </>
  );
}

import { Link } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/process', label: 'Process' },
  { path: '/gallery', label: 'Gallery' },
  // { path: '/testimonials', label: 'Testimonials' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-ink-950 pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Top section */}
        <div className="grid gap-12 border-b border-ink-800 pb-16 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 text-cream-50">
              <span className="flex h-9 w-9 items-center justify-center border border-gold-400/60 text-gold-300">
                <span className="font-serif text-lg font-semibold leading-none">L</span>
              </span>
              <span className="font-serif text-xl font-medium tracking-wide">LTS WELDING HOUSE</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-100/40">
              A premium digital showcase demonstrating how a professional
              practice can present itself with distinction.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-ultra-wide text-gold-400">
              Navigation
            </h4>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-cream-100/50 transition-colors hover:text-gold-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-ultra-wide text-gold-400">
              Contact
            </h4>
            <ul className="mt-5 space-y-4">
              <li className="flex items-center gap-3 text-sm text-cream-100/50">
                <Mail size={16} className="text-gold-400/60" />
                <a href="mailto:jugnugujjar858@gmail.com" className="transition-colors hover:text-gold-300">jugnugujjar858@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-cream-100/50">
                <MessageCircle size={16} className="text-gold-400/60" />
                <a href="https://wa.me/923349838115" className="transition-colors hover:text-gold-300">+92 334 9838115</a>
              </li>
            </ul>
          </div>

          {/* Admin contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-ultra-wide text-gold-400">
              Admin Contact
            </h4>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-100/50">
              Please use only the email or WhatsApp contact shown here to reach the admin.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="text-xs text-cream-100/30">
            Sample design for demonstration purposes. All content is illustrative.
          </p>
          <p className="text-xs text-cream-100/30">
            &copy; {new Date().getFullYear()} LTS Welding House. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

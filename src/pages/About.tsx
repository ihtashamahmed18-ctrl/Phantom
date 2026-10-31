import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
const FEATURES = [
  { title: 'Established Expertise', text: 'Years of dedicated practice in the field, building a foundation of deep knowledge and proven results.' },
  { title: 'Tailored Methodology', text: 'Every engagement is approached individually, with methods adapted to fit the specific context.' },
  { title: 'Trusted Partnerships', text: 'Long-term relationships built on transparency, reliability, and mutual respect.' },
  { title: 'Measurable Outcomes', text: 'Results that can be quantified — because impact matters as much as intention.' },
];

export default function About() {
  return (
    <>
      {/* Page header */}
      <section className="bg-ink-950 pb-20 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal-up max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-ultra-wide text-gold-400">
              About the Practice
            </span>
            <h1 className="gold-line mt-4 text-5xl text-cream-50 lg:text-7xl">
              A Commitment to
              <span className="block text-gold-300 italic">Refined Professionalism</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Practice profile */}
      <section className="bg-ink-900 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="reveal-up">
            <p className="text-lg leading-relaxed text-cream-100/70">
              This practice is focused on dependable welding work, charger cabinets, compressor systems, and carefully finished workshop equipment.
            </p>
            <p className="mt-6 leading-relaxed text-cream-100/50">
              Each project is approached with attention to clean construction, practical performance, durable materials, and a professional final finish.
            </p>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {FEATURES.map((feature, i) => (
                <li
                  key={feature.title}
                  className="reveal-up flex items-center gap-3 text-cream-100/80"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className="h-1.5 w-1.5 flex-shrink-0 bg-gold-400" />
                  <span className="text-sm font-medium tracking-wide">{feature.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Detailed features */}
      <section className="bg-cream-50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal-up mb-16 max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-ultra-wide text-gold-600">
              Core Principles
            </span>
            <h2 className="gold-line mt-4 text-4xl text-ink-800 sm:text-5xl">
              What Sets This Practice Apart
            </h2>
          </div>

          <div className="stagger grid gap-8 md:grid-cols-2">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="group border-l-2 border-ink-200 pl-6 transition-colors duration-500 hover:border-gold-500"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <h3 className="font-serif text-2xl text-ink-800">{feature.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-500">{feature.text}</p>
              </div>
            ))}
          </div>

          <div className="reveal-up mt-16 text-center">
            <Link
              to="/contact"
              className="btn-shine group inline-flex items-center gap-3 bg-ink-800 px-8 py-4 text-sm font-semibold tracking-wide text-cream-50 transition-all duration-300 hover:bg-ink-700"
            >
              Get in Touch
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

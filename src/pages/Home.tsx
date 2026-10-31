import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';

const HERO_IMAGE =
  'https://images.pexels.com/photos/2191622/pexels-photo-2191622.jpeg?auto=compress&cs=tinysrgb&w=1600';

const TEASERS = [
  { icon: 'Compass', title: 'Strategic Direction', text: 'Clear paths forward through thoughtful analysis.' },
  { icon: 'Layers', title: 'Bespoke Solutions', text: 'Tailored approaches — no templates, no shortcuts.' },
  { icon: 'ShieldCheck', title: 'Quality Assurance', text: 'Rigorous standards at every stage of delivery.' },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-ink-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 scale-100 opacity-100 transition-all duration-[1.6s]">
            <img
              src={HERO_IMAGE}
              alt="Architectural space representing professional excellence"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 animate-fade-up" style={{ animationDelay: '300ms', opacity: 0 }}>
              <span className="h-px w-12 bg-gold-400" />
              <span className="text-xs font-medium uppercase tracking-ultra-wide text-gold-300">
                Professional Studio
              </span>
            </div>

            <h1
              className="mt-6 font-serif text-5xl leading-[1.1] text-cream-50 sm:text-6xl lg:text-7xl xl:text-8xl animate-fade-up"
              style={{ animationDelay: '500ms', opacity: 0 }}
            >
              Crafted Excellence
              <span className="block text-gold-300 italic">in Every Detail</span>
            </h1>

            <p
              className="mt-8 max-w-lg text-lg leading-relaxed text-cream-100/70 animate-fade-up"
              style={{ animationDelay: '700ms', opacity: 0 }}
            >
              A demonstration of how a refined digital presence can elevate a
              professional practice — communicating credibility, expertise, and
              trust from the first impression.
            </p>

            <div
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center animate-fade-up"
              style={{ animationDelay: '900ms', opacity: 0 }}
            >
              <Link
                to="/contact"
                className="btn-shine group flex items-center justify-center gap-3 bg-gold-500 px-7 py-4 text-sm font-semibold tracking-wide text-ink-950 transition-all duration-300 hover:bg-gold-400"
              >
                Book a Consultation
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/gallery"
                className="border border-cream-100/30 px-7 py-4 text-sm font-medium tracking-wide text-cream-50 transition-all duration-300 hover:border-cream-100/60 hover:bg-cream-50/5"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </div>

        <Link
          to="/services"
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream-100/50 transition-colors duration-300 hover:text-gold-300 animate-fade-in"
          style={{ animationDelay: '1200ms', opacity: 0 }}
          aria-label="Scroll to services"
        >
          <span className="text-xs uppercase tracking-ultra-wide">Explore</span>
          <ArrowDown size={18} className="animate-bounce" />
        </Link>
      </section>

      {/* Services teaser */}
      <section className="bg-cream-50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal-up mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-ultra-wide text-gold-600">
              What We Offer
            </span>
            <h2 className="gold-line mt-4 text-4xl text-ink-800 sm:text-5xl lg:text-6xl">
              Areas of Expertise
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-500">
              Each capability is a placeholder for the real services that will
              be defined in the next phase.
            </p>
          </div>

          <div className="stagger mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEASERS.map((teaser, i) => (
              <div
                key={i}
                className="group relative overflow-hidden border border-ink-200/60 bg-white p-8 transition-all duration-500 hover:border-gold-400/50 hover:shadow-xl hover:shadow-ink-200/40"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="absolute right-6 top-6 font-serif text-5xl text-ink-100 transition-colors duration-500 group-hover:text-gold-200">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-2xl text-ink-800">{teaser.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-500">{teaser.text}</p>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold-500 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>

          <div className="reveal-up mt-12 text-center">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-gold-600 transition-colors hover:text-gold-700"
            >
              View All Services
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* About teaser with image */}
      <section className="relative overflow-hidden bg-ink-900 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="reveal-left relative">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 border border-gold-400/30 transition-transform duration-700 lg:translate-x-4 lg:translate-y-4" />
                <div className="clip-reveal relative overflow-hidden">
                  <div className="aspect-[4/5] w-full" aria-hidden="true" />
                </div>
              </div>
              <div className="reveal-scale absolute -bottom-6 -right-4 bg-gold-500 px-6 py-4 text-ink-950 shadow-xl lg:right-8">
                <p className="font-serif text-3xl leading-none">Excellence</p>
                <p className="mt-1 text-xs uppercase tracking-ultra-wide">in Practice</p>
              </div>
            </div>

            <div className="reveal-right">
              <span className="text-xs font-medium uppercase tracking-ultra-wide text-gold-400">
                About the Practice
              </span>
              <h2 className="gold-line mt-4 text-4xl text-cream-50 sm:text-5xl lg:text-6xl">
                A Commitment to
                <span className="block text-gold-300 italic">Refined Professionalism</span>
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-cream-100/70">
                This section demonstrates how a professional biography can be
                presented with elegance and restraint.
              </p>
              <div className="mt-8">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-gold-300 transition-colors hover:text-gold-200"
                >
                  Read More
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process teaser */}
      <section className="bg-cream-100 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal-up mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-ultra-wide text-gold-600">
              How We Work
            </span>
            <h2 className="gold-line mt-4 text-4xl text-ink-800 sm:text-5xl lg:text-6xl">
              A Methodical Approach
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-500">
              Every engagement follows a clear, considered process — ensuring
              clarity, quality, and alignment from start to finish.
            </p>
          </div>

          <div className="stagger mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {['Discovery', 'Strategy', 'Execution', 'Refinement'].map((step, i) => (
              <div key={i} className="group relative text-center" style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="relative z-10 mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-ink-200 bg-cream-50 transition-all duration-500 group-hover:border-gold-400 group-hover:shadow-lg group-hover:shadow-gold-200/50" />
                  <span className="font-serif text-3xl text-ink-400 transition-colors duration-500 group-hover:text-gold-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-ink-800">{step}</h3>
              </div>
            ))}
          </div>

          <div className="reveal-up mt-12 text-center">
            <Link
              to="/process"
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-gold-600 transition-colors hover:text-gold-700"
            >
              See Full Process
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="relative overflow-hidden bg-ink-950 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal-up mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-ultra-wide text-gold-400">
              Selected Work
            </span>
            <h2 className="gold-line mt-4 text-4xl text-cream-50 sm:text-5xl lg:text-6xl">
              Portfolio Showcase
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream-100/60">
              Explore the latest LTS Welding House work in the gallery.
            </p>
          </div>

          <div className="stagger mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true" />

          <div className="reveal-up mt-12 text-center">
            <Link
              to="/gallery"
              className="group inline-flex items-center gap-2 border border-gold-400/50 px-6 py-3 text-sm font-medium tracking-wide text-gold-200 transition-all duration-300 hover:border-gold-300 hover:bg-gold-400/10"
            >
              Open Gallery
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink-900 py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="reveal-up">
            <h2 className="font-serif text-4xl text-cream-50 sm:text-5xl">
              Ready to Begin?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream-100/60">
              The first step is a no-obligation consultation. Reach out and you'll
              receive a response within one business day.
            </p>
            <Link
              to="/contact"
              className="btn-shine group mt-10 inline-flex items-center gap-3 bg-gold-500 px-8 py-4 text-sm font-semibold tracking-wide text-ink-950 transition-all duration-300 hover:bg-gold-400"
            >
              Book a Consultation
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

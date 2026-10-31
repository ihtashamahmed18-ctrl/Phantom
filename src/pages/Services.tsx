import { Link } from 'react-router-dom';
import {
  Compass,
  Layers,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Handshake,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
};

const SERVICES: Service[] = [
  {
    icon: Compass,
    title: 'Strategic Direction',
    description:
      'Defining a clear path forward through thoughtful analysis, identifying opportunities that align with long-term goals and values.',
    features: ['Goal assessment', 'Market analysis', 'Roadmap development'],
  },
  {
    icon: Layers,
    title: 'Bespoke Solutions',
    description:
      'Tailored approaches crafted for each engagement — no templates, no shortcuts, only work shaped to fit the unique needs of the practice.',
    features: ['Custom frameworks', 'Adaptive methodology', 'Flexible delivery'],
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description:
      'Rigorous standards applied at every stage, ensuring deliverables meet the highest benchmarks of excellence and professionalism.',
    features: ['Multi-stage review', 'Standardized checks', 'Continuous monitoring'],
  },
  {
    icon: Sparkles,
    title: 'Creative Excellence',
    description:
      'A refined aesthetic sensibility that elevates every output, blending form and function into a seamless professional presentation.',
    features: ['Design thinking', 'Brand alignment', 'Visual storytelling'],
  },
  {
    icon: TrendingUp,
    title: 'Growth Strategy',
    description:
      'Sustainable, considered expansion guided by data-informed insight and an intuitive understanding of market dynamics.',
    features: ['Performance metrics', 'Scaling frameworks', 'Opportunity mapping'],
  },
  {
    icon: Handshake,
    title: 'Client Partnership',
    description:
      'A collaborative relationship built on transparency, trust, and a shared commitment to achieving meaningful outcomes.',
    features: ['Regular check-ins', 'Transparent reporting', 'Shared milestones'],
  },
];

export default function Services() {
  return (
    <>
      {/* Page header */}
      <section className="bg-ink-950 pb-20 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal-up max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-ultra-wide text-gold-400">
              What We Offer
            </span>
            <h1 className="gold-line mt-4 text-5xl text-cream-50 lg:text-7xl">
              Areas of Expertise
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-cream-100/60">
              A demonstration of how the practice can present its core
              capabilities. Each card is a placeholder for the real services
              that will be defined in the next phase.
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-cream-50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <article
                key={i}
                className="group relative overflow-hidden border border-ink-200/60 bg-white p-8 transition-all duration-500 hover:border-gold-400/50 hover:shadow-xl hover:shadow-ink-200/40"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="absolute right-6 top-6 font-serif text-5xl text-ink-100 transition-colors duration-500 group-hover:text-gold-200">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative mb-6 flex h-14 w-14 items-center justify-center bg-ink-50 text-ink-700 transition-all duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                  <service.icon size={26} />
                </div>
                <h3 className="font-serif text-2xl text-ink-800">{service.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-500">{service.description}</p>
                <ul className="mt-6 space-y-2">
                  {service.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-ink-600">
                      <span className="h-1.5 w-1.5 flex-shrink-0 bg-gold-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold-500 transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="reveal-up mt-16 text-center">
            <Link
              to="/contact"
              className="btn-shine group inline-flex items-center gap-3 bg-ink-800 px-8 py-4 text-sm font-semibold tracking-wide text-cream-50 transition-all duration-300 hover:bg-ink-700"
            >
              Discuss Your Needs
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

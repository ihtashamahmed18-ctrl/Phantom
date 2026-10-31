import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

type Step = {
  num: string;
  title: string;
  description: string;
  details: string[];
};

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Discovery',
    description:
      'An initial consultation to understand goals, context, and the unique parameters that shape each engagement.',
    details: ['Initial consultation', 'Goal identification', 'Context assessment'],
  },
  {
    num: '02',
    title: 'Strategy',
    description:
      'A tailored plan is developed, mapping out objectives, milestones, and the approach that will guide the work ahead.',
    details: ['Custom plan development', 'Milestone mapping', 'Resource allocation'],
  },
  {
    num: '03',
    title: 'Execution',
    description:
      'The strategy comes to life through meticulous craft, with quality checkpoints at every stage of development.',
    details: ['Phased delivery', 'Quality checkpoints', 'Regular progress updates'],
  },
  {
    num: '04',
    title: 'Refinement',
    description:
      'Review, adjust, and polish — ensuring the final result meets the highest standards before delivery.',
    details: ['Comprehensive review', 'Final adjustments', 'Delivery and handoff'],
  },
];

export default function Process() {
  return (
    <>
      {/* Page header */}
      <section className="bg-ink-950 pb-20 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal-up max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-ultra-wide text-gold-400">
              How We Work
            </span>
            <h1 className="gold-line mt-4 text-5xl text-cream-50 lg:text-7xl">
              A Methodical Approach
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-cream-100/60">
              Every engagement follows a clear, considered process — ensuring
              clarity, quality, and alignment from first conversation to final
              delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-cream-100 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="space-y-8">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="reveal-up group relative grid gap-6 border border-ink-200/60 bg-white p-8 transition-all duration-500 hover:border-gold-400/50 hover:shadow-lg lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-12 lg:p-12"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Number */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-ink-200 bg-cream-50 transition-all duration-500 group-hover:border-gold-400 group-hover:shadow-lg group-hover:shadow-gold-200/50">
                  <span className="font-serif text-3xl text-ink-400 transition-colors duration-500 group-hover:text-gold-600">
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-serif text-3xl text-ink-800">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-500">{step.description}</p>
                </div>

                {/* Details */}
                <ul className="space-y-2 lg:border-l lg:border-ink-100 lg:pl-8">
                  {step.details.map((detail, di) => (
                    <li key={di} className="flex items-center gap-2 text-sm text-ink-600">
                      <span className="h-1.5 w-1.5 flex-shrink-0 bg-gold-400" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="reveal-up mt-16 text-center">
            <Link
              to="/contact"
              className="btn-shine group inline-flex items-center gap-3 bg-ink-800 px-8 py-4 text-sm font-semibold tracking-wide text-cream-50 transition-all duration-300 hover:bg-ink-700"
            >
              Start the Process
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

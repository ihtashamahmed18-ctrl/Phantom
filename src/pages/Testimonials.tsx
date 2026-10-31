import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Quote, Star, ArrowRight } from 'lucide-react';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Working with this practice was an exceptional experience from start to finish. The attention to detail and commitment to quality exceeded every expectation we had.',
    name: 'Alexandra Chen',
    role: 'Director, Sample Organization',
    rating: 5,
  },
  {
    quote:
      'A truly professional engagement. The methodology was clear, the communication was excellent, and the final result spoke for itself. Highly recommended.',
    name: 'Marcus Bennett',
    role: 'Founder, Demo Company',
    rating: 5,
  },
  {
    quote:
      'What sets this practice apart is the combination of strategic thinking and meticulous execution. Every aspect was considered, nothing was left to chance.',
    name: 'Sofia Mendoza',
    role: 'Partner, Illustrative LLP',
    rating: 5,
  },
  {
    quote:
      'From the initial consultation to the final delivery, the process was seamless. The level of professionalism and craft is genuinely rare.',
    name: 'James Whitfield',
    role: 'CEO, Placeholder Industries',
    rating: 5,
  },
  {
    quote:
      'An outstanding partnership. The practice brought clarity, direction, and a level of refinement that transformed our approach entirely.',
    name: 'Priya Nair',
    role: 'Creative Director, Sample Studio',
    rating: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <>
      {/* Page header */}
      <section className="bg-ink-950 pb-20 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal-up max-w-2xl text-center mx-auto">
            <span className="text-xs font-medium uppercase tracking-ultra-wide text-gold-400">
              Client Voices
            </span>
            <h1 className="gold-line mt-4 text-5xl text-cream-50 lg:text-7xl">
              What Clients Say
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-cream-100/60">
              The following testimonials are entirely fictional and for design
              demonstration only.
            </p>
          </div>
        </div>
      </section>

      {/* Slider */}
      <section
        className="bg-cream-50 py-24 lg:py-32"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="reveal-scale relative min-h-[340px] sm:min-h-[300px]">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-700 ${
                  i === index
                    ? 'translate-x-0 opacity-100'
                    : i < index
                      ? '-translate-x-8 opacity-0'
                      : 'translate-x-8 opacity-0'
                }`}
              >
                <div className="text-center">
                  <Quote size={40} className="mx-auto text-gold-300" aria-hidden />
                  <div className="mt-4 flex justify-center gap-1">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} size={18} className="fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <blockquote className="mx-auto mt-6 max-w-2xl font-serif text-2xl leading-relaxed text-ink-700 sm:text-3xl">
                    "{t.quote}"
                  </blockquote>
                  <div className="mt-8">
                    <p className="font-semibold text-ink-800">{t.name}</p>
                    <p className="mt-1 text-sm text-ink-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center border border-ink-200 text-ink-600 transition-all duration-300 hover:border-gold-400 hover:text-gold-600"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 transition-all duration-300 ${
                    i === index ? 'w-8 bg-gold-500' : 'w-2 bg-ink-200 hover:bg-ink-300'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center border border-ink-200 text-ink-600 transition-all duration-300 hover:border-gold-400 hover:text-gold-600"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* CTA */}
          <div className="reveal-up mt-16 text-center">
            <Link
              to="/contact"
              className="btn-shine group inline-flex items-center gap-3 bg-ink-800 px-8 py-4 text-sm font-semibold tracking-wide text-cream-50 transition-all duration-300 hover:bg-ink-700"
            >
              Become the Next Success Story
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

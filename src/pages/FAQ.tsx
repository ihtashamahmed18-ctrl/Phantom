import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, ArrowRight } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What types of welding and workshop equipment are shown in the gallery?',
    answer:
      'The gallery includes LTS charger cabinets, battery charging units, electrical control panels, copper coil assemblies, and PUMA air compressors in several configurations.',
  },
  {
    question: 'Can you build a charger cabinet to match a specific requirement?',
    answer:
      'Yes. Charger cabinets can be planned around the required voltage, current, controls, meters, cable arrangement, enclosure size, and intended working environment.',
  },
  {
    question: 'What should I provide before requesting a quote?',
    answer:
      'Please share the equipment type, required specifications, quantity, preferred dimensions, power requirements, and any reference photos or drawings. This helps define the work accurately.',
  },
  {
    question: 'Do you work on compressor systems and electrical equipment?',
    answer:
      'The work shown includes compressor units and electrical workshop equipment. The exact service or fabrication scope should be confirmed before work begins based on the equipment and its condition.',
  },
  {
    question: 'How do you approach the finish and quality of a fabricated unit?',
    answer:
      'The focus is on clean construction, secure connections, practical controls, durable enclosure finishing, and a neat final presentation suitable for regular workshop use.',
  },
  {
    question: 'How do I contact the admin about a welding project?',
    answer:
      'Use only jugnugujjar858@gmail.com or WhatsApp at +92 334 9838115. Include your requirements and reference photos so the project can be reviewed properly.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* Page header */}
      <section className="bg-ink-950 pb-20 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal-up max-w-2xl text-center mx-auto">
            <span className="text-xs font-medium uppercase tracking-ultra-wide text-gold-400">
              Common Questions
            </span>
            <h1 className="gold-line mt-4 text-5xl text-cream-50 lg:text-7xl">
              Frequently Asked
            </h1>
          </div>
        </div>
      </section>

      {/* Accordion */}
      <section className="bg-cream-100 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="reveal space-y-3">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`border transition-colors duration-300 ${
                    isOpen
                      ? 'border-gold-400/50 bg-white'
                      : 'border-ink-200/60 bg-white/50 hover:border-ink-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-xl text-ink-800">{item.question}</span>
                    <span
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center transition-all duration-300 ${
                        isOpen ? 'bg-gold-500 text-ink-950 rotate-180' : 'bg-ink-100 text-ink-500'
                      }`}
                    >
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 leading-relaxed text-ink-500">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="reveal-up mt-16 text-center">
            <p className="text-ink-500">Still have questions?</p>
            <Link
              to="/contact"
              className="group mt-6 inline-flex items-center gap-3 bg-ink-800 px-8 py-4 text-sm font-semibold tracking-wide text-cream-50 transition-all duration-300 hover:bg-ink-700"
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

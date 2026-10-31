import { Info, Mail, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <>
      <section className="bg-ink-950 pb-20 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal-up max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-ultra-wide text-gold-400">
              Get in Touch
            </span>
            <h1 className="gold-line mt-4 text-5xl text-cream-50 lg:text-7xl">
              Contact the
              <span className="block text-gold-300 italic">Admin</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-cream-50 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="reveal-up">
            <p className="max-w-2xl text-lg leading-relaxed text-ink-600">
              Please use only the contact details below to contact the admin. No other contact details are official.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <a
                href="mailto:jugnugujjar858@gmail.com"
                className="flex items-center gap-4 border border-ink-200 bg-white p-6 transition-colors hover:border-gold-400"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-ink-50 text-gold-600">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink-400">Admin Email</p>
                  <p className="mt-1 text-ink-700">jugnugujjar858@gmail.com</p>
                </div>
              </a>
              <a
                href="https://wa.me/923349838115"
                className="flex items-center gap-4 border border-ink-200 bg-white p-6 transition-colors hover:border-gold-400"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-ink-50 text-gold-600">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink-400">Admin WhatsApp</p>
                  <p className="mt-1 text-ink-700">+92 334 9838115</p>
                </div>
              </a>
            </div>

            <div className="mt-8 flex items-start gap-3 border border-gold-200 bg-gold-50 p-4">
              <Info size={18} className="mt-0.5 flex-shrink-0 text-gold-600" />
              <p className="text-xs leading-relaxed text-ink-500">
                Use only jugnugujjar858@gmail.com or WhatsApp at +92 334 9838115 to contact the admin.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

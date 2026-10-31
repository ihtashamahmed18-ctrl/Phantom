import { useState } from 'react';
import { X } from 'lucide-react';
import chargerCollection from '@/assets/gallery/IMG_2752.png';
import coilAssemblyOne from '@/assets/gallery/IMG_2750.png';
import newBlueCharger from '@/assets/gallery/IMG_2743.png';
import newCompressorPair from '@/assets/gallery/IMG_2744.png';
import newPumaCompressors from '@/assets/gallery/IMG_2746.png';
import blueChargerDetail from '@/assets/gallery/IMG_2745.png';
import blueChargerAlternate from '@/assets/gallery/IMG_2747.png';
import turquoiseCompressorPair from '@/assets/gallery/IMG_2753.png';
import airCompressor from '@/assets/gallery/IMG_2749.png';
import dualCharger from '@/assets/gallery/IMG_2748.png';
import redCharger from '@/assets/gallery/IMG_2739.png';
import chargerGroup from '@/assets/gallery/IMG_2740.png';
import wrappedCharger from '@/assets/gallery/IMG_2741.png';
import twinCharger from '@/assets/gallery/IMG_2742.png';

type GalleryPhoto = {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  transparent?: boolean;
};

const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: '01', title: 'LTS Charger Collection', description: 'A coordinated collection of LTS charger cabinets.', date: '2026-03-09', image: chargerCollection, transparent: true },
  { id: '02', title: 'Coil Assembly', description: 'Detailed copper coil assembly with labeled connections.', date: '2026-03-21', image: coilAssemblyOne, transparent: true },
  { id: '03', title: 'PUKKA Air Compressor', description: 'Compact air compressor prepared for workshop service.', date: '2026-04-02', image: airCompressor, transparent: true },
  { id: '04', title: 'Dual Charger System', description: 'Twin charger system with precision control panels.', date: '2026-04-11', image: dualCharger, transparent: true },
  { id: '05', title: 'Red Charger Unit', description: 'A completed red LTS charging cabinet.', date: '2026-04-18', image: redCharger, transparent: true },
  { id: '06', title: 'Four-Unit Charger Set', description: 'Four charger units arranged as a complete set.', date: '2026-04-25', image: chargerGroup, transparent: true },
  { id: '07', title: 'Wrapped Delivery Unit', description: 'A protected charger unit prepared for delivery.', date: '2026-05-03', image: wrappedCharger, transparent: true },
  { id: '08', title: 'Twin Red Charger Build', description: 'Two finished LTS cabinets with matching detailing.', date: '2026-05-10', image: twinCharger, transparent: true },
  { id: '09', title: 'Blue Charger Cabinet', description: 'A blue LTS charger cabinet with dual meters.', date: '2026-05-17', image: newBlueCharger, transparent: true },
  { id: '10', title: 'PUMA Compressor Pair', description: 'Matching PUMA air compressors in contrasting finishes.', date: '2026-05-24', image: newCompressorPair, transparent: true },
  { id: '11', title: 'PUMA Compressor Collection', description: 'A red and blue PUMA compressor collection.', date: '2026-05-31', image: newPumaCompressors, transparent: true },
  { id: '12', title: 'Blue Charger Detail', description: 'A detailed blue LTS charger cabinet.', date: '2026-06-07', image: blueChargerDetail, transparent: true },
  { id: '13', title: 'Blue Charger Alternate', description: 'A second blue charger cabinet with refined front detailing.', date: '2026-06-14', image: blueChargerAlternate, transparent: true },
  { id: '14', title: 'Turquoise Compressor Pair', description: 'A matching pair of turquoise PUMA compressors.', date: '2026-06-21', image: turquoiseCompressorPair, transparent: true },
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  return (
    <>
      <section className="bg-ink-950 pb-20 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="reveal-up max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-ultra-wide text-gold-400">Portfolio</span>
            <h1 className="gold-line mt-4 text-5xl text-cream-50 lg:text-7xl">Gallery</h1>
            <p className="mt-8 text-lg leading-relaxed text-cream-100/60">View our latest work</p>
          </div>
        </div>
      </section>

      <section className="bg-cream-50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY_PHOTOS.map((photo, index) => (
              <article
                key={photo.id}
                className="group cursor-pointer border border-ink-200/70 bg-white p-3 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/70 hover:shadow-xl hover:shadow-ink-950/10"
                style={{ transitionDelay: `${index * 35}ms` }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className={`h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105 ${photo.transparent ? 'p-3' : ''}`}
                  />

                </div>
                <div className="px-2 pb-2 pt-5">
                  <p className="text-xs uppercase tracking-ultra-wide text-gold-600">{photo.date}</p>
                  <h2 className="mt-2 font-serif text-2xl text-ink-800">{photo.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{photo.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedPhoto && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/95 p-6 backdrop-blur-sm" onClick={() => setSelectedPhoto(null)}>
          <div className="relative w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <button onClick={() => setSelectedPhoto(null)} className="absolute -right-2 -top-12 text-cream-50 transition-colors hover:text-gold-300" aria-label="Close photo preview">
              <X size={28} />
            </button>
            <img src={selectedPhoto.image} alt={selectedPhoto.title} className="max-h-[72vh] w-full object-contain" />
            <div className="mt-5 text-center">
              <p className="text-xs uppercase tracking-ultra-wide text-gold-300">{selectedPhoto.date}</p>
              <h2 className="mt-2 font-serif text-3xl text-cream-50">{selectedPhoto.title}</h2>
              <p className="mt-2 text-cream-100/60">{selectedPhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

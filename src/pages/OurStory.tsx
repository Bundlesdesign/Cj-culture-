import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Scissors, Eye, ShieldCheck } from 'lucide-react';
import lookbookCoutureAtelier from '@/assets/images/lookbook_couture_atelier_1791277502272.jpg';
import heroFashionEditorial from '@/assets/images/hero_fashion_editorial_1791277461414.jpg';
import { useShop } from '@/context/ShopContext';
import { AtelierBreadcrumb } from '@/components/AtelierBreadcrumb';

export const OurStory: React.FC = () => {
  const { openWhatsAppConcierge } = useShop();

  const milestones = [
    {
      year: '2020',
      title: 'The Founding Atelier',
      desc: 'Founded with a singular conviction: to create architectural luxury garments free from ephemeral fast-fashion trends, celebrating natural fibers and heritage hand-finishing.'
    },
    {
      year: '2022',
      title: 'Milan & Paris Sourcing Partnerships',
      desc: 'Established exclusive partnerships with family-owned mills in Biella for virgin wools and Como for 22-momme Mulberry silks, ensuring every thread meets rigorous ecological and tactile standards.'
    },
    {
      year: '2024',
      title: 'International Acclaim & Private Trunk Shows',
      desc: 'Presented private capsule showcases across Lagos, London, and Paris, receiving accolades from fashion critics and dressing discerning women who value quiet luxury.'
    },
    {
      year: '2026',
      title: 'The Modern Digital Atelier',
      desc: 'Expanding our bespoke commissions worldwide through white-glove direct delivery, bespoke WhatsApp styling consultations, and numbered limited editions.'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-100">
        <AtelierBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Our Story & Atelier Heritage' }]} />
      </div>

      {/* Editorial Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-[#0A0A0A] text-white overflow-hidden py-24">
        <div className="absolute inset-0 z-0">
          <img
            src={lookbookCoutureAtelier}
            alt="Atelier Craftsmanship"
            className="w-full h-full object-cover object-center scale-100 opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-4">
            <Sparkles size={14} />
            <span>Atelier Heritage & Philosophy</span>
          </div>
          <h1 className="font-playfair text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white mb-6">
            The Art of Sculpted Elegance
          </h1>
          <p className="text-xs sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light">
            CT Collections exists at the intersection of architectural discipline and sensual fluidity.
            We honor classic haute couture heritage while creating for the self-possessed modern woman.
          </p>
        </div>
      </section>

      {/* Craftsmanship Pillars */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                Our Manifesto
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight leading-tight">
                Luxury Defined by Time and Touch
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                <p>
                  True luxury does not clamor for attention with loud logos or frenzied seasonal turnover.
                  It announces itself quietly through the weight of 22-momme Mulberry silk against the skin,
                  the razor-sharp drape of double-faced virgin wool, and interior seams finished with the care
                  typically reserved for museum garments.
                </p>
                <p>
                  Each piece in our collection requires between 18 and 42 hours of dedicated handcrafting by master
                  pattern cutters and tailors. We produce strictly in small, numbered editions to eliminate waste and
                  preserve the rarity of our creations.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-neutral-200">
                <div>
                  <Scissors size={20} className="text-[#D4AF37] mb-2" />
                  <h4 className="font-semibold text-neutral-900 text-xs">Hand Cut</h4>
                  <p className="text-[11px] text-neutral-500 font-light mt-0.5">Individual artisan patterns</p>
                </div>
                <div>
                  <Eye size={20} className="text-[#D4AF37] mb-2" />
                  <h4 className="font-semibold text-neutral-900 text-xs">Zero Waste</h4>
                  <p className="text-[11px] text-neutral-500 font-light mt-0.5">Numbered limited batches</p>
                </div>
                <div>
                  <ShieldCheck size={20} className="text-[#D4AF37] mb-2" />
                  <h4 className="font-semibold text-neutral-900 text-xs">Heritage Fiber</h4>
                  <p className="text-[11px] text-neutral-500 font-light mt-0.5">Certified natural textiles</p>
                </div>
              </div>
            </div>

            {/* Visual showcase */}
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 shadow-xl">
              <img
                src={heroFashionEditorial}
                alt="Architectural tailoring"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 text-white text-xs font-mono">
                <span className="block text-[#D4AF37] text-[10px] uppercase tracking-widest font-sans">
                  The Sovereign Blazer
                </span>
                <span>Cut from Super 140s Virgin Wool</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2 block">
              Chronology
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight">
              Our Journey Through Fashion
            </h2>
          </div>

          <div className="space-y-12">
            {milestones.map((m) => (
              <div key={m.year} className="flex flex-col sm:flex-row gap-6 sm:gap-12 pb-10 border-b border-neutral-100 last:border-0">
                <div className="sm:w-32 flex-shrink-0">
                  <span className="font-playfair text-3xl font-bold text-[#D4AF37] tabular-nums">
                    {m.year}
                  </span>
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-neutral-900 mb-2">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="py-20 bg-[#0A0A0A] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-playfair text-3xl sm:text-4xl font-normal mb-3">
            Schedule a Private Consultation
          </h2>
          <p className="text-xs text-neutral-400 mb-8 max-w-lg mx-auto font-light leading-relaxed">
            Whether inquiring about custom proportions for an upcoming gala or commissioning an archive look,
            our private client director will assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => openWhatsAppConcierge('Hello! I would like to schedule a private styling consultation with CT Collections.')}
              className="bg-[#D4AF37] hover:bg-[#c49f2e] text-[#0A0A0A] py-3.5 px-8 text-xs uppercase tracking-widest font-semibold transition-colors shadow-lg"
            >
              Consult via WhatsApp
            </button>
            <Link
              to="/shop"
              className="border border-white/30 hover:border-white text-white py-3.5 px-8 text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Explore Ready-To-Wear
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;

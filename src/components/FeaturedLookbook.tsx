import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import lookbookCoutureAtelier from '@/assets/images/lookbook_couture_atelier_1791277502272.jpg';

export const FeaturedLookbook: React.FC = () => {
  return (
    <section className="py-24 bg-[#0A0A0A] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden bg-neutral-900 shadow-2xl">
              <img
                src={lookbookCoutureAtelier}
                alt="Behind the scenes in the CT Collections Atelier"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 text-[11px] uppercase tracking-widest text-[#D4AF37] font-mono bg-black/60 px-3 py-1 backdrop-blur-xs">
                Private Atelier · Lagos & Paris
              </div>
            </div>
          </div>

          {/* Editorial Text Column */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              <Sparkles size={14} />
              <span>Autumn/Winter Lookbook Edit</span>
            </div>

            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-white tracking-tight">
              Where Couture Craft Meets Modern Motion
            </h2>

            <p className="text-sm text-white/75 font-light leading-relaxed">
              Every garment in our atelier begins not with a sketch, but with fabric in motion.
              We drape 22-momme Italian Mulberry silk and double-faced virgin wool directly onto the form,
              seeking an equilibrium between architectural precision and unstudied ease.
            </p>

            {/* Editorial Pillars (unboxed clean prose) */}
            <div className="space-y-4 pt-2 border-t border-white/10 text-xs">
              <div className="flex gap-4">
                <span className="font-playfair font-bold text-[#D4AF37] text-base">01</span>
                <div>
                  <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
                    French Seams & Hand Finishes
                  </h4>
                  <p className="text-white/60 mt-0.5 font-light">
                    Every interior seam is bound in silk habotai, ensuring the reverse of each piece is as pristine as its face.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="font-playfair font-bold text-[#D4AF37] text-base">02</span>
                <div>
                  <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
                    Split Double-Face Wool
                  </h4>
                  <p className="text-white/60 mt-0.5 font-light">
                    Two layers of fine wool split and hand-folded inward along the edges, eliminating bulk for weightless drape.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/lookbook"
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c49f2e] text-[#0A0A0A] font-semibold text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all duration-300 shadow-lg"
              >
                <span>View Full Lookbook</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                to="/our-story"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white font-medium text-xs uppercase tracking-[0.2em] px-8 py-4 transition-colors"
              >
                <span>Atelier Heritage</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLookbook;

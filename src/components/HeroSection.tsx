import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import heroFashionEditorial from '@/assets/images/hero_fashion_editorial_1791277461414.jpg';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background Full-Bleed Editorial Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroFashionEditorial}
          alt="CT Collections Autumn Winter High-Fashion Campaign"
          className="w-full h-full object-cover object-center scale-100 animate-fade-in"
          priority-asset="true"
        />
        {/* Measured dark scrim for contrast & legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/35" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-24 pb-16 flex flex-col items-center">
        {/* Clean unboxed campaign metadata */}
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium mb-4 animate-fade-in">
          <span>Atelier Autumn/Winter 2026</span>
          <span aria-hidden="true">·</span>
          <span>Limited Run Haute Tailoring</span>
        </div>

        {/* Display Headline */}
        <h1 className="font-playfair text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white max-w-4xl leading-[1.08] text-balance mb-6 animate-slide-up">
          Sculpted Elegance. <br />
          <span className="italic font-normal font-cormorant text-amber-100">Timeless Grace.</span>
        </h1>

        {/* Narrative subtext */}
        <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-10 text-balance animate-fade-in">
          Discover silhouettes born from Italian Mulberry silk, double-faced virgin wool,
          and architectural tailoring crafted for discerning modern women.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md animate-scale-in">
          <Link
            to="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#c49f2e] text-[#0A0A0A] font-semibold text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all duration-300 shadow-xl hover:scale-[1.02]"
          >
            <span>Shop the Collection</span>
            <ArrowRight size={14} />
          </Link>

          <Link
            to="/lookbook"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white border border-white/40 hover:border-white font-medium text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all duration-300 backdrop-blur-xs"
          >
            <span>Explore Lookbook</span>
          </Link>
        </div>

        {/* Campaign Metrics / Trust Signals (clean unboxed numbers) */}
        <div className="mt-16 pt-8 border-t border-white/15 grid grid-cols-3 gap-6 sm:gap-12 text-center max-w-xl w-full">
          <div>
            <p className="font-playfair text-xl sm:text-2xl font-bold text-white tabular-nums">100%</p>
            <p className="text-[11px] text-white/60 uppercase tracking-widest mt-1">Pure Silk & Wool</p>
          </div>
          <div>
            <p className="font-playfair text-xl sm:text-2xl font-bold text-white tabular-nums">Limited</p>
            <p className="text-[11px] text-white/60 uppercase tracking-widest mt-1">Numbered Editions</p>
          </div>
          <div>
            <p className="font-playfair text-xl sm:text-2xl font-bold text-white tabular-nums">Atelier</p>
            <p className="text-[11px] text-white/60 uppercase tracking-widest mt-1">Bespoke Fitting</p>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <a
        href="#new-arrivals"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white flex flex-col items-center gap-1.5 transition-colors"
        aria-label="Scroll down to new arrivals"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-light">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
};

export default HeroSection;

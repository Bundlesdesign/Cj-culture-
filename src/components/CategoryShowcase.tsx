import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES_DATA } from '@/data/products';

export const CategoryShowcase: React.FC = () => {
  return (
    <section id="categories" className="py-24 bg-[#FAF8F5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2">
            Curated Taxonomy
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-3 font-light">
            Distinctive design pillars crafted for formal galas, commanding daytime silhouettes, and effortless silk luxury.
          </p>
        </div>

        {/* 4 Large Editorial Tiles in Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_DATA.map((cat, idx) => (
            <Link
              key={cat.name}
              to={`/shop?category=${encodeURIComponent(cat.categoryFilter)}`}
              className="group relative aspect-[3/4] overflow-hidden bg-neutral-200 block shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Category Image */}
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300" />

              {/* Content in bottom of tile */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-white flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-medium mb-1 font-mono">
                  {cat.count}
                </span>

                <div className="flex items-center justify-between">
                  <h3 className="font-playfair text-xl sm:text-2xl font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                    {cat.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-black transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <p className="text-xs text-white/70 font-light mt-1.5 line-clamp-1">
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;

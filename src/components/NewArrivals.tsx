import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export const NewArrivals: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'Evening Wear', 'Blazers & Suiting', 'Silk & Satin'];

  const filteredProducts =
    selectedFilter === 'All'
      ? PRODUCTS.slice(0, 4)
      : PRODUCTS.filter((p) => p.category === selectedFilter).slice(0, 4);

  return (
    <section id="new-arrivals" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-neutral-100 pb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-2">
              Autumn / Winter 2026
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight">
              New Atelier Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mt-2 font-light">
              Limited-edition pieces crafted from pure Mulberry silk, cashmere, and virgin wool.
            </p>
          </div>

          {/* Interactive Filter Controls (Functional button tabs) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF8F5] border border-neutral-200/60">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium transition-all ${
                  selectedFilter === cat
                    ? 'bg-[#0A0A0A] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 2} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 border-b-2 border-neutral-900 pb-1 text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
          >
            <span>Explore All Atelier Creations</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;

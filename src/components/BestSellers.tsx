import React from 'react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const BestSellers: React.FC = () => {
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-neutral-100 pb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-2">
              Most Coveted Silhouettes
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight">
              Atelier Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mt-2 font-light">
              Enduring signatures celebrated by private collectors and international fashion editors.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-800 hover:text-[#D4AF37] font-semibold transition-colors"
          >
            <span>View All Bestsellers</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;

import React from 'react';
import { INSTAGRAM_POSTS, PRODUCTS } from '@/data/products';
import { Instagram, ShoppingBag } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export const InstagramGallery: React.FC = () => {
  const { setQuickViewProduct } = useShop();

  const handleShopLook = (idx: number) => {
    // Map post index to a relevant product
    const mapped = PRODUCTS[idx % PRODUCTS.length];
    if (mapped) {
      setQuickViewProduct(mapped);
    }
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-500 hover:text-[#D4AF37] font-semibold transition-colors mb-2"
        >
          <Instagram size={14} />
          <span>@ct_collections</span>
        </a>
        <h2 className="font-playfair text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight">
          As Seen in the World
        </h2>
        <p className="text-xs text-neutral-500 mt-2 font-light">
          Tag your moments #CTCollections to be featured in our seasonal curation.
        </p>
      </div>

      {/* 5-Column Edge-to-Edge Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 px-2 sm:px-4">
        {INSTAGRAM_POSTS.map((post, idx) => (
          <div
            key={post.id}
            className="group relative aspect-square overflow-hidden bg-neutral-100 cursor-pointer"
            onClick={() => handleShopLook(idx)}
          >
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center text-white">
              <span className="text-[11px] font-mono tracking-wider text-[#D4AF37] mb-1">
                {post.tag}
              </span>
              <p className="font-playfair text-sm font-semibold mb-3">{post.title}</p>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 bg-white text-neutral-900 text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 hover:bg-[#D4AF37] transition-colors shadow-md"
              >
                <ShoppingBag size={12} />
                <span>Shop Look</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramGallery;

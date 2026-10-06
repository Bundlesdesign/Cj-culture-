import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/data/products';
import { AtelierBreadcrumb } from '@/components/AtelierBreadcrumb';

import categoryEveningGown from '@/assets/images/category_evening_gowns_1791277473510.jpg';
import categoryTailoredBlazer from '@/assets/images/category_tailored_blazers_1791277482580.jpg';
import categorySilkDress from '@/assets/images/category_silk_dresses_1791277492612.jpg';
import heroFashionEditorial from '@/assets/images/hero_fashion_editorial_1791277461414.jpg';
import lookbookCoutureAtelier from '@/assets/images/lookbook_couture_atelier_1791277502272.jpg';

export const Lookbook: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const { setQuickViewProduct } = useShop();

  const categories = [
    { id: 'all', name: 'All Collections' },
    { id: 'autumn', name: 'Autumn / Winter' },
    { id: 'evening', name: 'Gala Evening' },
    { id: 'tailoring', name: 'Architectural Suiting' },
    { id: 'atelier', name: 'Private Atelier' }
  ];

  const lookbookImages = [
    {
      id: 1,
      category: 'autumn',
      title: 'Look 01: The Sovereign Overcoat & Bias Silk',
      description: 'Double-faced virgin wool tailoring paired with fluid 22-momme Mulberry silk.',
      image: heroFashionEditorial,
      featured: true,
      productId: 'ct-02'
    },
    {
      id: 2,
      category: 'evening',
      title: 'Look 02: Aurelia Sculpted Column',
      description: 'Heavy silk crepe draping with hand-set boning and minimal train.',
      image: categoryEveningGown,
      featured: false,
      productId: 'ct-01'
    },
    {
      id: 3,
      category: 'tailoring',
      title: 'Look 03: Alabaster Peak Lapel Blazer',
      description: 'Super 140s virgin wool with bespoke horn buttons and relaxed shoulders.',
      image: categoryTailoredBlazer,
      featured: false,
      productId: 'ct-02'
    },
    {
      id: 4,
      category: 'autumn',
      title: 'Look 04: Desert Sand Silk Midi',
      description: 'Liquid movement with 90s-inspired cowl neckline and French seams.',
      image: categorySilkDress,
      featured: true,
      productId: 'ct-03'
    },
    {
      id: 5,
      category: 'atelier',
      title: 'Look 05: Atelier Couture Fitting',
      description: 'Behind the scenes at our atelier: hand-draped pleated chiffon cape.',
      image: lookbookCoutureAtelier,
      featured: true,
      productId: 'ct-06'
    },
    {
      id: 6,
      category: 'tailoring',
      title: 'Look 06: Pleated Wide-Leg Posture',
      description: 'Forward pleats tailored for statue-like verticality in motion.',
      image: 'https://images.unsplash.com/photo-1506629905844-f19e00b6c3b2?w=900&auto=format&fit=crop&q=80',
      featured: false,
      productId: 'ct-04'
    }
  ];

  const filteredImages =
    selectedCategory === 'all'
      ? lookbookImages
      : lookbookImages.filter((img) => img.category === selectedCategory);

  const handleShopLook = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      setQuickViewProduct(prod);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-100">
        <AtelierBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Lookbook' }]} />
      </div>

      {/* Editorial Header */}
      <section className="py-20 md:py-28 bg-[#0A0A0A] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-3">
            <Sparkles size={14} />
            <span>Autumn / Winter 2026 Collection</span>
          </div>
          <h1 className="font-playfair text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white mb-6">
            The Atelier Lookbook
          </h1>
          <p className="text-xs sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light">
            An intimate visual narrative capturing the dialogue between architectural line,
            fluid textile weight, and hand-finished couture craftsmanship.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 border-b border-neutral-100 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#0A0A0A] text-white shadow-xs'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook Gallery */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((item) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden bg-neutral-100 shadow-sm transition-all duration-500 ${
                  item.featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                onMouseEnter={() => setHoveredImage(item.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Scrim Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 ${
                      hoveredImage === item.id ? 'opacity-100' : 'opacity-85'
                    }`}
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white flex flex-col justify-end">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono mb-1">
                      CT Atelier Collection
                    </span>
                    <h3 className="font-playfair text-xl font-semibold mb-1 text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/80 font-light leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <button
                      onClick={() => handleShopLook(item.productId)}
                      className="inline-flex items-center justify-center gap-2 bg-white text-neutral-900 hover:bg-[#D4AF37] hover:text-black py-2.5 px-4 text-xs uppercase tracking-widest font-semibold transition-colors shadow-md"
                    >
                      <ShoppingBag size={14} />
                      <span>Shop this Look</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atelier Consultation CTA */}
      <section className="py-20 bg-[#FAF8F5] border-t border-neutral-100 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-playfair text-3xl font-normal text-neutral-900 mb-3">
            Bespoke Fitting & Commissions
          </h2>
          <p className="text-xs text-neutral-500 mb-8 font-light">
            Our atelier accepts private appointments in Lagos and Paris for bespoke tailoring,
            made-to-measure evening gowns, and private wardrobe consultations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="bg-[#0A0A0A] text-white hover:bg-[#D4AF37] hover:text-[#0A0A0A] py-3.5 px-8 text-xs uppercase tracking-widest font-semibold transition-colors shadow-md"
            >
              Shop Current Collection
            </Link>
            <Link
              to="/our-story"
              className="border border-neutral-300 hover:border-neutral-900 text-neutral-800 py-3.5 px-8 text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Discover Our Craft
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lookbook;

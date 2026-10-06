import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { ProductCategory } from '@/types/store';
import { AtelierBreadcrumb } from '@/components/AtelierBreadcrumb';

const CATEGORIES: ProductCategory[] = [
  'All',
  'Evening Wear',
  'Blazers & Suiting',
  'Silk & Satin',
  'Outerwear',
  'Knitwear & Tops'
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const COLORS = [
  { name: 'Noir Onyx', hex: '#111111' },
  { name: 'Alabaster Ivory', hex: '#F2EFE9' },
  { name: 'Desert Sand', hex: '#E3DAC9' },
  { name: 'Warm Camel', hex: '#B58D5D' },
  { name: 'Champagne Gold', hex: '#D4AF37' }
];

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as ProductCategory | null;

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    categoryParam && CATEGORIES.includes(categoryParam) ? categoryParam : 'All'
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category when query param changes
  useEffect(() => {
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryChange = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(2500);
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Size filter
      if (selectedSizes.length > 0 && !selectedSizes.some((s) => product.sizes.includes(s))) {
        return false;
      }
      // Color filter
      if (
        selectedColors.length > 0 &&
        !selectedColors.some((c) => product.colors.some((pc) => pc.name.toLowerCase().includes(c.toLowerCase())))
      ) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.fabric.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default order
    });
  }, [selectedCategory, selectedSizes, selectedColors, maxPrice, searchQuery, sortBy]);

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (maxPrice < 2500 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const breadcrumbItems =
    selectedCategory === 'All'
      ? [{ label: 'Home', href: '/' }, { label: 'Collections' }]
      : [
          { label: 'Home', href: '/' },
          { label: 'Collections', href: '/shop' },
          { label: selectedCategory }
        ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-100">
        <AtelierBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Page Header */}
      <div className="bg-[#FAF8F5] border-b border-neutral-200/60 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2 block">
            {selectedCategory === 'All'
              ? 'Atelier Permanent & Seasonal Collection'
              : `Atelier Collection · ${selectedCategory}`}
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-normal text-neutral-900 tracking-tight">
            {selectedCategory === 'All' ? 'The Complete Collection' : selectedCategory}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-xl mx-auto mt-3 font-light">
            {selectedCategory === 'All'
              ? 'Filter through sculpted evening gowns, double-faced cashmere coats, and bias-cut Italian silk slip dresses.'
              : `Curated silhouettes in ${selectedCategory}, meticulously cut and tailored in limited quantities.`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Control Bar: Search, Filter toggle, and Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search garments, fabrics..."
              className="w-full bg-[#FAF8F5] border border-neutral-200 px-3.5 py-2 text-xs focus:outline-none focus:border-[#D4AF37]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 border border-neutral-200 font-medium"
            >
              <SlidersHorizontal size={14} />
              <span>Filters ({activeFilterCount})</span>
            </button>

            {/* Results Counter */}
            <span className="text-neutral-500 tabular-nums">
              Showing <strong className="text-neutral-900 font-semibold">{filteredProducts.length}</strong> creations
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-400 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'newest'
                  )
                }
                className="bg-transparent border border-neutral-200 py-2 px-2.5 font-medium text-neutral-900 focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="featured">Featured Atelier Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">New Arrivals First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 py-3 border-b border-neutral-100 text-xs">
            <span className="text-neutral-400">Active:</span>
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 bg-[#FAF8F5] border border-neutral-200 px-2 py-0.5 text-neutral-800">
                {selectedCategory}
                <button onClick={() => handleCategoryChange('All')} className="text-neutral-400 hover:text-neutral-900">
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedSizes.map((s) => (
              <span key={s} className="inline-flex items-center gap-1 bg-[#FAF8F5] border border-neutral-200 px-2 py-0.5 text-neutral-800">
                Size {s}
                <button onClick={() => toggleSize(s)} className="text-neutral-400 hover:text-neutral-900">
                  <X size={12} />
                </button>
              </span>
            ))}
            {selectedColors.map((c) => (
              <span key={c} className="inline-flex items-center gap-1 bg-[#FAF8F5] border border-neutral-200 px-2 py-0.5 text-neutral-800">
                {c}
                <button onClick={() => toggleColor(c)} className="text-neutral-400 hover:text-neutral-900">
                  <X size={12} />
                </button>
              </span>
            ))}
            {maxPrice < 2500 && (
              <span className="inline-flex items-center gap-1 bg-[#FAF8F5] border border-neutral-200 px-2 py-0.5 text-neutral-800">
                Under ${maxPrice}
                <button onClick={() => setMaxPrice(2500)} className="text-neutral-400 hover:text-neutral-900">
                  <X size={12} />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-[#D4AF37] hover:underline font-semibold ml-2"
            >
              Reset All
            </button>
          </div>
        )}

        {/* Main Layout: Sidebar Filters (desktop) + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block space-y-8 pr-4">
            {/* Category Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-neutral-900 font-bold mb-3 pb-2 border-b border-neutral-100">
                Categories
              </h3>
              <ul className="space-y-2 text-xs">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => handleCategoryChange(cat)}
                      className={`text-left w-full transition-colors flex justify-between items-center py-0.5 ${
                        selectedCategory === cat
                          ? 'font-semibold text-[#D4AF37]'
                          : 'text-neutral-600 hover:text-neutral-950'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-[11px] text-neutral-400 font-mono">
                        {cat === 'All'
                          ? PRODUCTS.length
                          : PRODUCTS.filter((p) => p.category === cat).length}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-neutral-900 font-bold mb-3 pb-2 border-b border-neutral-100">
                Select Size
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`py-2 text-xs font-mono font-medium border text-center transition-colors ${
                      selectedSizes.includes(size)
                        ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-xs'
                        : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-neutral-900 font-bold mb-3 pb-2 border-b border-neutral-100">
                Palette & Shades
              </h3>
              <div className="space-y-2 text-xs">
                {COLORS.map((col) => {
                  const isChecked = selectedColors.includes(col.name);
                  return (
                    <label
                      key={col.name}
                      onClick={() => toggleColor(col.name)}
                      className="flex items-center gap-2.5 cursor-pointer text-neutral-700 hover:text-neutral-950"
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full border ${
                          isChecked ? 'ring-2 ring-neutral-900 ring-offset-1' : 'border-neutral-300'
                        }`}
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className={isChecked ? 'font-semibold text-neutral-950' : ''}>
                        {col.name}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center text-xs uppercase tracking-wider font-bold text-neutral-900 mb-3 pb-2 border-b border-neutral-100">
                <span>Maximum Price</span>
                <span className="font-mono text-[#D4AF37]">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="400"
                max="2500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#0A0A0A] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1 font-mono">
                <span>$400</span>
                <span>$2,500</span>
              </div>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-[#FAF8F5] border border-neutral-100 p-8">
                <p className="font-playfair text-2xl text-neutral-800 mb-2">
                  No creations match these criteria
                </p>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-6">
                  Try broadening your size, shade, or price filters, or reset all criteria to view the full atelier collection.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#0A0A0A] hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-white text-xs uppercase tracking-widest font-semibold px-6 py-3 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                <h3 className="font-playfair text-xl font-bold text-neutral-900">
                  Filter Catalog
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-neutral-400 hover:text-neutral-900"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-3">Categories</h4>
                <div className="space-y-1.5 text-xs">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`block w-full text-left py-1 ${
                        selectedCategory === cat ? 'font-bold text-[#D4AF37]' : 'text-neutral-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-3">Sizes</h4>
                <div className="grid grid-cols-4 gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`py-2 text-xs border text-center ${
                        selectedSizes.includes(size)
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 text-neutral-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-3">Colors</h4>
                <div className="space-y-2 text-xs">
                  {COLORS.map((col) => (
                    <label
                      key={col.name}
                      onClick={() => toggleColor(col.name)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 text-xs uppercase tracking-wider font-semibold border border-neutral-200"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#0A0A0A] text-white text-xs uppercase tracking-wider font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;

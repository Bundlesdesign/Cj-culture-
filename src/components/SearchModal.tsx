import React, { useState, useMemo } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/data/products';
import { Link } from 'react-router-dom';

const POPULAR_SEARCHES = ['Silk Gown', 'Tailored Blazer', 'Cashmere Coat', 'Pleated Dress', 'Trousers'];

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lower = searchTerm.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.tagline.toLowerCase().includes(lower) ||
        p.fabric.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
    );
  }, [searchTerm]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative min-h-screen flex flex-col justify-start pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
        <div className="bg-white shadow-2xl p-6 md:p-8 border border-neutral-100">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Search Atelier Catalog
            </span>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mt-6 mb-6">
            <Search
              size={22}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search silk, tailoring, gowns, coats..."
              className="w-full bg-[#FAF8F5] border border-neutral-200 pl-12 pr-10 py-4 text-base md:text-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#D4AF37]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Suggestions when empty */}
          {!searchTerm && (
            <div className="space-y-4 py-4">
              <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                Trending Searches:
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((query) => (
                  <button
                    key={query}
                    onClick={() => setSearchTerm(query)}
                    className="text-xs bg-[#FAF8F5] hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-neutral-700 px-3.5 py-1.5 transition-colors border border-neutral-200/60"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results list */}
          {searchTerm && (
            <div className="mt-4">
              <div className="flex justify-between items-center text-xs text-neutral-500 pb-3 border-b border-neutral-100">
                <span>
                  Found <strong className="text-neutral-900 font-semibold">{filteredResults.length}</strong> matching pieces
                </span>
                {filteredResults.length > 0 && (
                  <Link
                    to="/shop"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-[#D4AF37] hover:underline flex items-center gap-1"
                  >
                    <span>View all in Shop</span>
                    <ArrowRight size={12} />
                  </Link>
                )}
              </div>

              {filteredResults.length === 0 ? (
                <div className="text-center py-12 text-neutral-500">
                  <p className="font-playfair text-lg text-neutral-700 mb-1">
                    No matching pieces found for "{searchTerm}"
                  </p>
                  <p className="text-xs max-w-sm mx-auto">
                    Try searching for broader terms like "silk", "wool", "blazer", or browse our curated categories.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 max-h-[50vh] overflow-y-auto pr-1">
                  {filteredResults.map((product) => (
                    <div
                      key={product.id}
                      className="group flex gap-3 p-2 bg-[#FAF8F5] hover:bg-[#F4F1EA] transition-colors border border-transparent hover:border-neutral-200"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-20 object-cover object-center flex-shrink-0"
                      />
                      <div className="flex flex-col justify-between min-w-0 flex-1">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-neutral-400 block truncate">
                            {product.category}
                          </span>
                          <Link
                            to={`/product/${product.id}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="font-playfair text-xs font-semibold text-neutral-900 group-hover:text-[#D4AF37] transition-colors line-clamp-1"
                          >
                            {product.name}
                          </Link>
                          <span className="text-xs font-semibold text-neutral-900 font-mono block mt-1">
                            ${product.price.toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setQuickViewProduct(product);
                            setIsSearchOpen(false);
                          }}
                          className="text-[11px] text-neutral-500 hover:text-neutral-900 underline text-left"
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

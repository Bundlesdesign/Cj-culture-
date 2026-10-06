import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '@/types/store';
import { useShop } from '@/context/ShopContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { toggleWishlist, isInWishlist, setQuickViewProduct, addToCart } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const wishlisted = isInWishlist(product.id);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick add default size & color
    addToCart(product, product.sizes[0] || 'S', product.colors[0]?.name || 'Noir');
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with aspect ratio 3/4 */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4F1EA] transition-all duration-500">
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          {/* Primary Image */}
          <img
            src={primaryImage}
            alt={product.name}
            loading={priority ? 'eager' : 'lazy'}
            referrerPolicy="no-referrer"
            className={`h-full w-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered && secondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          />

          {/* Secondary Hover Image */}
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}
        </Link>

        {/* Top Badges (Stock & New) - Clean, refined unboxed typography */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.isNew && (
            <span className="text-[10px] tracking-widest uppercase font-semibold text-neutral-900 bg-white/90 backdrop-blur-sm px-2 py-0.5 shadow-sm">
              New Season
            </span>
          )}
          {product.stockStatus === 'low-stock' && (
            <span className="text-[10px] tracking-widest uppercase font-medium text-amber-900 bg-amber-50/90 backdrop-blur-sm px-2 py-0.5 border border-amber-200/50">
              Only {product.stockCount} Left
            </span>
          )}
          {product.stockStatus === 'made-to-order' && (
            <span className="text-[10px] tracking-widest uppercase font-medium text-neutral-800 bg-[#EFECE6]/90 backdrop-blur-sm px-2 py-0.5">
              Atelier Commission
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all duration-300 shadow-sm ${
            wishlisted
              ? 'text-red-500 scale-110'
              : 'text-neutral-700 hover:text-neutral-950 hover:bg-white'
          }`}
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Action Overlay (Slide-up on desktop hover) */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleQuickAdd}
            className="flex-1 flex items-center justify-center gap-2 bg-[#0A0A0A] text-white hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-xs uppercase tracking-wider py-2.5 px-3 font-medium transition-colors shadow-md"
          >
            <ShoppingBag size={14} />
            <span>Quick Bag ({product.sizes[0]})</span>
          </button>
          <button
            onClick={handleQuickView}
            aria-label="Quick View"
            className="flex h-9 w-9 items-center justify-center bg-white/90 hover:bg-white text-neutral-900 shadow-md transition-colors"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-1 flex flex-col">
        {/* Category kicker */}
        <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-neutral-500 mb-1">
          <span>{product.category}</span>
          {/* Subtle color dots */}
          <div className="flex items-center gap-1" title={`${product.colors.length} shades available`}>
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="w-2 h-2 rounded-full border border-neutral-300"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-playfair text-base font-semibold text-neutral-900 group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-1">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Tagline */}
        <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5 font-light">
          {product.tagline}
        </p>

        {/* Price in tabular numerals */}
        <div className="mt-2 flex items-baseline gap-2 tabular-nums">
          <span className="text-sm font-semibold text-neutral-900">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-neutral-400 line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Check, Sparkles, ChevronRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '@/data/products';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    setIsCartOpen
  } = useShop();

  const product = quickViewProduct;
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Reset variant selections when product opens
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'S');
      setSelectedColor(product.colors[0]?.name || 'Noir');
      setSelectedImageIdx(0);
      setQuantity(1);
      setIsZoomed(false);
    }
  }, [product]);

  if (!product) return null;

  const wishlisted = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  // Find "Complete the Look" products if defined
  const completeLookProducts = (product.completeTheLookIds || [])
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="min-h-full flex items-center justify-center p-4 md:p-6">
        <div className="relative bg-white max-w-4xl w-full shadow-2xl z-10 overflow-hidden">
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-neutral-500 hover:text-neutral-950 transition-colors rounded-full shadow-sm"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="relative bg-[#FAF8F5] flex flex-col justify-between p-6">
              {/* Main Image with Zoom */}
              <div
                className="relative aspect-[3/4] w-full overflow-hidden cursor-crosshair bg-neutral-100"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={product.images[selectedImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                  style={
                    isZoomed
                      ? {
                          transform: 'scale(1.8)',
                          transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                        }
                      : {}
                  }
                />
                {isZoomed && (
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 pointer-events-none">
                    Zoom Active
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-16 h-20 flex-shrink-0 overflow-hidden border-2 transition-all ${
                      selectedImageIdx === idx
                        ? 'border-[#0A0A0A] shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details Column */}
            <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
              <div>
                {/* Category & Stock */}
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-neutral-500 mb-2">
                  <span>{product.category}</span>
                  {product.stockStatus === 'low-stock' ? (
                    <span className="text-amber-800 font-medium">Only {product.stockCount} in stock</span>
                  ) : product.stockStatus === 'made-to-order' ? (
                    <span className="text-neutral-700 font-medium">Made to order</span>
                  ) : (
                    <span className="text-emerald-700 font-medium">In Stock</span>
                  )}
                </div>

                {/* Name */}
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4 tabular-nums">
                  <span className="text-xl font-bold text-neutral-900">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-400 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Color Selector */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-neutral-500 uppercase tracking-wider text-[11px] font-semibold">
                      Color: <strong className="text-neutral-900 font-medium capitalize">{selectedColor}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex items-center gap-2 px-2.5 py-1.5 border text-xs transition-all ${
                          selectedColor === color.name
                            ? 'border-neutral-900 bg-neutral-50 font-medium text-neutral-900 shadow-xs'
                            : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-neutral-300"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-neutral-500 uppercase tracking-wider text-[11px] font-semibold">
                      Select Size:
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs text-[#D4AF37] hover:underline font-medium"
                    >
                      Sizing Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs font-medium border text-center transition-all ${
                          selectedSize === size
                            ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-xs'
                            : 'border-neutral-200 text-neutral-800 hover:border-neutral-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-neutral-100">
                <div className="flex gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-neutral-200">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-neutral-500 hover:text-neutral-900"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-mono font-medium text-neutral-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-2 text-neutral-500 hover:text-neutral-900"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#0A0A0A] hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-white py-3 px-6 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg"
                  >
                    <ShoppingBag size={15} />
                    <span>Add to Shopping Bag</span>
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 border transition-colors ${
                      wishlisted
                        ? 'border-red-200 bg-red-50 text-red-500'
                        : 'border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-400'
                    }`}
                    aria-label="Wishlist toggle"
                  >
                    <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="text-xs text-neutral-500 hover:text-[#0A0A0A] flex items-center gap-1 font-medium group"
                  >
                    <span>View full product specifications</span>
                    <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                    <ShieldCheck size={12} />
                    <span>Complimentary Returns</span>
                  </div>
                </div>

                {/* Complete the look mini snippet */}
                {completeLookProducts.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-neutral-100 bg-[#FAF8F5] p-3">
                    <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-2 flex items-center gap-1">
                      <Sparkles size={11} className="text-[#D4AF37]" />
                      <span>Complete the Look</span>
                    </p>
                    <div className="flex gap-2">
                      {completeLookProducts.slice(0, 2).map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setQuickViewProduct(item)}
                          className="flex items-center gap-2 text-left bg-white p-1.5 border border-neutral-200 hover:border-[#D4AF37] transition-colors flex-1"
                        >
                          <img src={item.images[0]} alt={item.name} className="w-9 h-12 object-cover" />
                          <div className="min-w-0">
                            <p className="text-[11px] font-medium text-neutral-900 truncate">{item.name}</p>
                            <p className="text-[10px] text-neutral-500 font-mono">${item.price}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

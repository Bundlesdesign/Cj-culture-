import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/data/products';
import { Link } from 'react-router-dom';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setIsCartOpen
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveToCart = (product: typeof PRODUCTS[0]) => {
    addToCart(product, product.sizes[0] || 'S', product.colors[0]?.name || 'Noir');
    toggleWishlist(product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart size={18} className="text-red-500 fill-red-500" />
              <h2 className="font-playfair text-xl font-bold text-neutral-900">
                Your Wishlist
              </h2>
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium ml-1">
                ({wishlist.length} saved)
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
              aria-label="Close wishlist"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F4F1EA] flex items-center justify-center text-neutral-400 mb-4">
                  <Heart size={28} />
                </div>
                <p className="font-playfair text-xl text-neutral-800 mb-1">Your wishlist is empty</p>
                <p className="text-sm text-neutral-500 max-w-xs mb-6">
                  Save pieces you love to review them anytime or move them into your bag.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="bg-[#0A0A0A] text-white hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-xs uppercase tracking-widest font-semibold px-6 py-3 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div key={product.id} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => setIsWishlistOpen(false)}
                    className="w-20 h-26 bg-[#F4F1EA] flex-shrink-0 overflow-hidden"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-playfair text-sm font-semibold text-neutral-900 leading-snug line-clamp-1">
                          <Link
                            to={`/product/${product.id}`}
                            onClick={() => setIsWishlistOpen(false)}
                            className="hover:text-[#D4AF37] transition-colors"
                          >
                            {product.name}
                          </Link>
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-neutral-400 hover:text-red-600 transition-colors ml-2"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{product.category}</p>
                      <p className="font-semibold text-sm text-neutral-900 tabular-nums mt-1">
                        ${product.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="mt-3">
                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="w-full bg-[#0A0A0A] hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-white text-xs uppercase tracking-wider py-2 px-3 font-medium flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag size={13} />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer actions */}
          {wishlistedProducts.length > 0 && (
            <div className="p-6 border-t border-neutral-100 bg-[#FCFBF9]">
              <button
                onClick={() => {
                  wishlistedProducts.forEach((p) => {
                    addToCart(p, p.sizes[0] || 'S', p.colors[0]?.name || 'Noir');
                  });
                  setIsWishlistOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full bg-[#0A0A0A] hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-white py-3.5 px-4 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <span>Add All to Bag</span>
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

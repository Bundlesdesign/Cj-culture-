import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    discount,
    appliedPromo,
    shippingFee,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const FREE_SHIPPING_GOAL = 500;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_GOAL) * 100));
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_GOAL - cartSubtotal);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    if (applyPromoCode(promoInput)) {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#0A0A0A]" />
              <h2 className="font-playfair text-xl font-bold text-neutral-900">
                Shopping Bag
              </h2>
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium ml-1">
                ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
              aria-label="Close bag"
            >
              <X size={20} />
            </button>
          </div>

          {/* Complimentary Shipping Bar */}
          <div className="bg-[#FAF8F5] px-6 py-3 border-b border-neutral-100">
            <div className="flex items-center justify-between text-xs text-neutral-700 mb-1.5">
              {amountToFreeShipping > 0 ? (
                <span>
                  Add <strong className="font-semibold text-neutral-900">${amountToFreeShipping}</strong> more for complimentary delivery
                </span>
              ) : (
                <span className="text-emerald-800 font-medium">
                  ✓ Complimentary White-Glove delivery unlocked
                </span>
              )}
              <span className="text-[11px] text-neutral-400 font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full bg-neutral-200 h-1.5 overflow-hidden">
              <div
                className="bg-[#D4AF37] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F4F1EA] flex items-center justify-center text-neutral-400 mb-4">
                  <ShoppingBag size={28} />
                </div>
                <p className="font-playfair text-xl text-neutral-800 mb-1">Your bag is empty</p>
                <p className="text-sm text-neutral-500 max-w-xs mb-6">
                  Explore our curated seasonal collection and add pieces to your bag.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#0A0A0A] text-white hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-xs uppercase tracking-widest font-semibold px-6 py-3 transition-colors"
                >
                  Discover Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <Link
                    to={`/product/${item.product.id}`}
                    onClick={() => setIsCartOpen(false)}
                    className="w-20 h-26 bg-[#F4F1EA] flex-shrink-0 overflow-hidden"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-playfair text-sm font-semibold text-neutral-900 leading-snug line-clamp-1">
                          <Link
                            to={`/product/${item.product.id}`}
                            onClick={() => setIsCartOpen(false)}
                            className="hover:text-[#D4AF37] transition-colors"
                          >
                            {item.product.name}
                          </Link>
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors ml-2"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="text-xs text-neutral-500 mt-1 space-x-2">
                        <span>Size: <strong className="text-neutral-700">{item.size}</strong></span>
                        <span>·</span>
                        <span>Tone: <strong className="text-neutral-700">{item.color}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-neutral-200">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-neutral-500 hover:text-neutral-900 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-7 text-center text-xs font-mono font-medium text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-neutral-500 hover:text-neutral-900 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-medium text-sm text-neutral-900 tabular-nums">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area (if items exist) */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-neutral-100 bg-[#FCFBF9] space-y-4">
              {/* Promo code form */}
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-amber-50 border border-amber-200 px-3 py-2 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-900 font-medium">
                    <Tag size={13} />
                    <span>Promo applied: <strong>{appliedPromo}</strong></span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-amber-800 hover:text-red-700 underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Privilege code (e.g. COUTURE10)"
                    className="flex-1 bg-white border border-neutral-200 px-3 py-2 text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="bg-neutral-900 text-white hover:bg-neutral-800 text-xs uppercase px-3 py-2 font-medium tracking-wider"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Cost Calculations */}
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-900 tabular-nums">
                    ${cartSubtotal.toLocaleString()}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Privilege Discount</span>
                    <span className="font-medium tabular-nums">-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-medium text-neutral-900 tabular-nums">
                    {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                  </span>
                </div>
                <div className="border-t border-neutral-200 pt-2 flex justify-between text-sm font-semibold text-neutral-900">
                  <span>Total</span>
                  <span className="font-playfair text-base tabular-nums">
                    ${cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#0A0A0A] hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-white py-3.5 px-4 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <span>Proceed to Guest Checkout</span>
                <ArrowRight size={15} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400">
                <ShieldCheck size={13} />
                <span>Encrypted checkout · Bespoke packaging included</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

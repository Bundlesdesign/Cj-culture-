import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Truck, MessageCircle, ArrowLeft, ArrowRight, Printer } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { toast } from 'sonner';

export const GuestCheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    discount,
    shippingFee,
    cartTotal,
    createOrder,
    openWhatsAppConcierge
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Nigeria',
    notes: ''
  });

  const [deliveryOption, setDeliveryOption] = useState<'white-glove' | 'express'>('white-glove');
  const [paymentOption, setPaymentOption] = useState<'card' | 'transfer' | 'whatsapp'>('card');
  const [cardInfo, setCardInfo] = useState({
    number: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvv: '•••'
  });

  const [completedOrder, setCompletedOrder] = useState<ReturnType<typeof createOrder> | null>(null);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city) {
      toast.error('Please complete all required shipping fields');
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = () => {
    const order = createOrder({
      items: cart,
      subtotal: cartSubtotal,
      discount,
      shipping: shippingFee,
      total: cartTotal,
      customer: formData,
      paymentMethod:
        paymentOption === 'card'
          ? 'Secure Card'
          : paymentOption === 'transfer'
          ? 'Direct Bank Wire'
          : 'WhatsApp Concierge Invoice'
    });

    setCompletedOrder(order);
    setStep(3);
    toast.success('Your order has been confirmed!', {
      description: `Order ${order.orderId} is being prepared in our atelier.`
    });
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" onClick={handleClose} />

      <div className="min-h-full flex items-center justify-center p-4 md:p-6">
        <div className="relative bg-white max-w-3xl w-full shadow-2xl z-10 border border-neutral-100 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-3">
              <span className="font-luxury-bold text-lg text-neutral-900 tracking-wider">CT COLLECTIONS</span>
              <span className="text-neutral-300">|</span>
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                {step === 3 ? 'Order Receipt' : 'Guest Checkout'}
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Stepper indicator if not complete */}
          {step !== 3 && (
            <div className="px-6 py-3 bg-white border-b border-neutral-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  step === 1 ? 'bg-[#0A0A0A] text-white' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  1
                </span>
                <span className={step === 1 ? 'font-semibold text-neutral-900' : 'text-neutral-500'}>
                  Shipping Destination
                </span>
              </div>
              <div className="w-12 h-px bg-neutral-200" />
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  step === 2 ? 'bg-[#0A0A0A] text-white' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  2
                </span>
                <span className={step === 2 ? 'font-semibold text-neutral-900' : 'text-neutral-500'}>
                  Delivery & Payment
                </span>
              </div>
              <div className="w-12 h-px bg-neutral-200" />
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center text-[10px] font-bold">
                  3
                </span>
                <span>Confirmation</span>
              </div>
            </div>
          )}

          {/* Step 1: Shipping Address */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="p-6 md:p-8 space-y-5">
              <div className="border-b border-neutral-100 pb-3">
                <h3 className="font-playfair text-xl font-bold text-neutral-900">
                  Client & Shipping Details
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  No account required. We will send shipment tracking and fitting notes to your email.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-[11px] font-semibold text-neutral-600 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Lady Eleanor Vance"
                    className="w-full bg-[#FAF8F5] border border-neutral-200 px-3 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[11px] font-semibold text-neutral-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="eleanor@example.com"
                    className="w-full bg-[#FAF8F5] border border-neutral-200 px-3 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[11px] font-semibold text-neutral-600 mb-1">
                    Telephone (for courier dispatch) *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+234 704 819 9203"
                    className="w-full bg-[#FAF8F5] border border-neutral-200 px-3 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[11px] font-semibold text-neutral-600 mb-1">
                    Country / Region *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF8F5] border border-neutral-200 px-3 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="France">France</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Ghana">Ghana</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block uppercase tracking-wider text-[11px] font-semibold text-neutral-600 mb-1">
                    Street Address & Suite / Villa *
                  </label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="14 Victoria Island Boulevard, Penthouse 4"
                    className="w-full bg-[#FAF8F5] border border-neutral-200 px-3 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[11px] font-semibold text-neutral-600 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Lagos"
                    className="w-full bg-[#FAF8F5] border border-neutral-200 px-3 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[11px] font-semibold text-neutral-600 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="101241"
                    className="w-full bg-[#FAF8F5] border border-neutral-200 px-3 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block uppercase tracking-wider text-[11px] font-semibold text-neutral-600 mb-1">
                    Atelier Notes (Optional sizing adjustments, gate access)
                  </label>
                  <textarea
                    rows={2}
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Please include bespoke garment bag; ring gate bell upon delivery."
                    className="w-full bg-[#FAF8F5] border border-neutral-200 px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Order quick summary bar */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-xs text-neutral-600">
                <span>
                  Items ({cart.length}) · Total:{' '}
                  <strong className="text-neutral-900 font-mono text-sm">${cartTotal.toLocaleString()}</strong>
                </span>
                <button
                  type="submit"
                  className="bg-[#0A0A0A] hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-white py-3 px-8 text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-colors shadow-md"
                >
                  <span>Continue to Delivery</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Delivery & Payment */}
          {step === 2 && (
            <div className="p-6 md:p-8 space-y-6">
              {/* Delivery method selection */}
              <div>
                <h4 className="font-playfair text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <Truck size={17} className="text-[#D4AF37]" />
                  <span>Delivery Method</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label
                    onClick={() => setDeliveryOption('white-glove')}
                    className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-all ${
                      deliveryOption === 'white-glove'
                        ? 'border-neutral-900 bg-[#FAF8F5] shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === 'white-glove'}
                      onChange={() => setDeliveryOption('white-glove')}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">
                        White-Glove Atelier Courier
                      </p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Hand-delivered in archival tissue, garment hanger, and dust bag (2-3 business days)
                      </p>
                      <span className="text-[11px] text-emerald-800 font-medium block mt-1">
                        Complimentary on this order
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setDeliveryOption('express')}
                    className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-all ${
                      deliveryOption === 'express'
                        ? 'border-neutral-900 bg-[#FAF8F5] shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === 'express'}
                      onChange={() => setDeliveryOption('express')}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">Priority Express Dispatch</p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Next-day guaranteed courier delivery with dedicated security tracking
                      </p>
                      <span className="text-[11px] text-neutral-700 font-mono block mt-1">Included</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment selection */}
              <div>
                <h4 className="font-playfair text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <CreditCard size={17} className="text-[#D4AF37]" />
                  <span>Payment Preference</span>
                </h4>
                <div className="space-y-2.5">
                  {/* Card Option */}
                  <label
                    onClick={() => setPaymentOption('card')}
                    className={`block p-3.5 border cursor-pointer transition-all ${
                      paymentOption === 'card'
                        ? 'border-neutral-900 bg-[#FAF8F5] shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentOption === 'card'}
                          onChange={() => setPaymentOption('card')}
                        />
                        <span className="text-xs font-semibold text-neutral-900">
                          Encrypted Credit / Debit Card
                        </span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono">
                        Visa · Mastercard · Amex
                      </span>
                    </div>

                    {paymentOption === 'card' && (
                      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-neutral-200 text-xs">
                        <div className="col-span-2">
                          <label className="text-[10px] text-neutral-500 uppercase block mb-1">Card Number</label>
                          <input
                            type="text"
                            value={cardInfo.number}
                            onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                            className="w-full bg-white border border-neutral-200 px-2.5 py-1.5 font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-500 uppercase block mb-1">Exp / CVV</label>
                          <input
                            type="text"
                            value={`${cardInfo.expiry} · ${cardInfo.cvv}`}
                            readOnly
                            className="w-full bg-white border border-neutral-200 px-2.5 py-1.5 font-mono text-xs text-neutral-500"
                          />
                        </div>
                      </div>
                    )}
                  </label>

                  {/* WhatsApp Concierge Option */}
                  <label
                    onClick={() => setPaymentOption('whatsapp')}
                    className={`block p-3.5 border cursor-pointer transition-all ${
                      paymentOption === 'whatsapp'
                        ? 'border-neutral-900 bg-[#FAF8F5] shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentOption === 'whatsapp'}
                          onChange={() => setPaymentOption('whatsapp')}
                        />
                        <span className="text-xs font-semibold text-neutral-900">
                          WhatsApp Personal Concierge Invoice
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        VIP Recommended
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1 pl-5">
                      Confirm order now; our private client stylist will reach out on WhatsApp to finalize invoice & tailor measurements.
                    </p>
                  </label>

                  {/* Wire transfer */}
                  <label
                    onClick={() => setPaymentOption('transfer')}
                    className={`block p-3.5 border cursor-pointer transition-all ${
                      paymentOption === 'transfer'
                        ? 'border-neutral-900 bg-[#FAF8F5] shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentOption === 'transfer'}
                        onChange={() => setPaymentOption('transfer')}
                      />
                      <span className="text-xs font-semibold text-neutral-900">
                        Direct Atelier Bank Wire (Invoice Generated)
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order summary breakdown */}
              <div className="bg-[#FAF8F5] p-4 text-xs space-y-1.5 border border-neutral-200/50">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="tabular-nums font-mono">${cartSubtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Privilege Discount</span>
                    <span className="tabular-nums font-mono">-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>White-Glove Courier Delivery</span>
                  <span className="tabular-nums font-mono">
                    {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                  </span>
                </div>
                <div className="border-t border-neutral-200 pt-2 flex justify-between font-bold text-neutral-900 text-sm">
                  <span>Total Amount</span>
                  <span className="font-playfair text-base tabular-nums">${cartTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Shipping</span>
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="bg-[#0A0A0A] hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-white py-3.5 px-8 text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-colors shadow-lg"
                >
                  <span>Authorize & Place Order</span>
                  <ShieldCheck size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Order Confirmation Receipt */}
          {step === 3 && completedOrder && (
            <div className="p-6 md:p-8 space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 size={32} />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold bg-emerald-50 px-3 py-1 rounded">
                  Order Successfully Placed
                </span>
                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-neutral-900 mt-3 mb-1">
                  Thank You, {completedOrder.customer.fullName}
                </h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  Your order reference is{' '}
                  <strong className="text-neutral-900 font-mono text-sm">{completedOrder.orderId}</strong>. A
                  confirmation email with courier tracking has been sent to {completedOrder.customer.email}.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="text-left bg-[#FAF8F5] p-5 border border-neutral-200 text-xs space-y-3">
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Destination:</span>
                  <span className="font-medium text-neutral-900 text-right">
                    {completedOrder.customer.address}, {completedOrder.customer.city}, {completedOrder.customer.country}
                  </span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Payment Protocol:</span>
                  <span className="font-medium text-neutral-900">{completedOrder.paymentMethod}</span>
                </div>

                <div className="pt-2">
                  <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-2">
                    Itemized Allocation:
                  </p>
                  <div className="space-y-2">
                    {completedOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-neutral-800">
                        <div className="flex items-center gap-2">
                          <img src={item.product.images[0]} alt="" className="w-8 h-10 object-cover" />
                          <div>
                            <p className="font-medium text-neutral-900">{item.product.name}</p>
                            <p className="text-[10px] text-neutral-500">
                              Size {item.size} · {item.color} · Qty {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono tabular-nums font-medium">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-neutral-200 pt-3 flex justify-between font-bold text-sm text-neutral-900">
                  <span>Grand Total Paid:</span>
                  <span className="font-playfair font-bold text-base font-mono">
                    ${completedOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() =>
                    openWhatsAppConcierge(
                      `Hello CT Collections! I just placed order ${completedOrder.orderId} for $${completedOrder.total.toLocaleString()}. Please confirm tracking.`
                    )
                  }
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-6 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle size={16} />
                  <span>Connect with Atelier Stylist</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="border border-neutral-300 hover:border-neutral-900 text-neutral-800 py-3 px-6 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer size={15} />
                  <span>Print Formal Receipt</span>
                </button>

                <button
                  onClick={handleClose}
                  className="bg-[#0A0A0A] hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-white py-3 px-6 text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

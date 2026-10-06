import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export const WhatsAppButton: React.FC = () => {
  const { openWhatsAppConcierge } = useShop();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="mb-3 max-w-xs bg-white text-neutral-900 shadow-2xl border border-neutral-200 p-3 rounded-lg text-xs animate-fade-in relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-neutral-400 hover:text-neutral-700"
            aria-label="Dismiss message"
          >
            <X size={13} />
          </button>
          <p className="font-semibold text-neutral-900 mb-0.5 font-playfair text-sm">
            Atelier Private Stylist
          </p>
          <p className="text-[11px] text-neutral-600 leading-relaxed mb-2">
            Need tailored fit advice, custom commissions, or express checkout assistance?
          </p>
          <button
            onClick={() => {
              setShowTooltip(false);
              openWhatsAppConcierge();
            }}
            className="w-full bg-[#25D366] text-white py-1.5 px-3 rounded text-[11px] font-semibold hover:bg-[#20bd5a] transition-colors"
          >
            Chat on WhatsApp
          </button>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={() => openWhatsAppConcierge()}
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Connect with Atelier Stylist on WhatsApp"
        className="group relative flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
      >
        <MessageCircle size={24} className="fill-white" />
        <span className="hidden sm:inline-block text-xs font-semibold tracking-wider pr-1">
          Atelier Concierge
        </span>
        {/* Subtle ping ring */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
      </button>
    </div>
  );
};

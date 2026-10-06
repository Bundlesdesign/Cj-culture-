import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Instagram, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export const Footer: React.FC = () => {
  const { openWhatsAppConcierge, setIsSizeGuideOpen } = useShop();

  return (
    <footer className="bg-[#0A0A0A] text-white border-t border-neutral-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-900">
          {/* Col 1 & 2: Brand & Atelier */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-playfair text-2xl font-bold tracking-[0.2em] uppercase text-white">
                CT COLLECTIONS
              </span>
            </Link>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              Haute couture craftsmanship, sculpted evening wear, and modern sartorial tailoring.
              Every piece is cut from the world’s finest natural fibers and hand-finished with meticulous precision.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => openWhatsAppConcierge()}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp Concierge"
              >
                <MessageCircle size={17} />
              </button>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href="mailto:concierge@ctcollections.com"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-white flex items-center justify-center transition-colors"
                aria-label="Email Concierge"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Col 3: Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
              <li>
                <Link to="/shop?category=Evening%20Wear" className="hover:text-white transition-colors">
                  Evening Gowns
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Blazers%20%26%20Suiting" className="hover:text-white transition-colors">
                  Tailored Blazers
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Silk%20%26%20Satin" className="hover:text-white transition-colors">
                  Mulberry Silk Dresses
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Outerwear" className="hover:text-white transition-colors">
                  Cashmere Coats
                </Link>
              </li>
              <li>
                <Link to="/lookbook" className="hover:text-white transition-colors">
                  Autumn/Winter Lookbook
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Client Services */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-light">
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-white transition-colors text-left"
                >
                  Atelier Size Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => openWhatsAppConcierge('Hello! I would like to book a private fitting consultation.')}
                  className="hover:text-white transition-colors text-left"
                >
                  Private Fitting Bookings
                </button>
              </li>
              <li>
                <span className="text-neutral-500 cursor-default">
                  Complimentary White-Glove Shipping
                </span>
              </li>
              <li>
                <span className="text-neutral-500 cursor-default">
                  30-Day Bespoke Exchanges
                </span>
              </li>
              <li>
                <Link to="/our-story" className="hover:text-white transition-colors">
                  Atelier Heritage
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Atelier Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4">
              Private Atelier
            </h4>
            <div className="space-y-3 text-xs text-neutral-400 font-light">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span>Victoria Island, Lagos & 8ème Arrondissement, Paris</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-[#D4AF37] flex-shrink-0" />
                <span>+234 704 819 9203</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-[#D4AF37] flex-shrink-0" />
                <span>Certified Haute Couture Finishes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} CT Collections. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-400 cursor-pointer">Bespoke Invoicing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

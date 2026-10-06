import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import LoginDialog from './LoginDialog';

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  const {
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    openWhatsAppConcierge
  } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Shop All', path: '/shop' },
    { label: 'New Arrivals', path: '/#new-arrivals' },
    { label: 'Categories', path: '/#categories' },
    { label: 'Lookbook', path: '/lookbook' },
    { label: 'Our Story', path: '/our-story' }
  ];

  const isLightHero = location.pathname === '/' && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-neutral-100 py-3.5'
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Brand Wordmark (Display Serif) */}
            <div className="flex items-center">
              <Link
                to="/"
                className="group flex items-center gap-2.5 focus-visible:outline-none"
              >
                <span
                  className={`font-playfair text-xl sm:text-2xl font-bold tracking-[0.18em] uppercase transition-colors ${
                    scrolled
                      ? 'text-neutral-950 group-hover:text-[#D4AF37]'
                      : 'text-white group-hover:text-[#D4AF37]'
                  }`}
                >
                  CT COLLECTIONS
                </span>
              </Link>
            </div>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-medium">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`relative py-1 transition-colors duration-300 ${
                      scrolled
                        ? isActive
                          ? 'text-[#D4AF37] font-semibold'
                          : 'text-neutral-700 hover:text-neutral-950'
                        : isActive
                        ? 'text-[#D4AF37] font-semibold'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Zone 3: Primary Actions (Search, Wishlist, Bag, Login) */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search collection"
                className={`p-2 transition-colors ${
                  scrolled ? 'text-neutral-700 hover:text-neutral-950' : 'text-white/90 hover:text-white'
                }`}
              >
                <Search size={18} />
              </button>

              {/* Wishlist trigger */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                aria-label="View wishlist"
                className={`relative p-2 transition-colors ${
                  scrolled ? 'text-neutral-700 hover:text-neutral-950' : 'text-white/90 hover:text-white'
                }`}
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white tabular-nums">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Bag / Cart Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="View shopping bag"
                className={`relative flex items-center gap-2 py-1.5 px-3 rounded-full transition-all ${
                  scrolled
                    ? 'bg-neutral-900 text-white hover:bg-[#D4AF37] hover:text-neutral-950 shadow-xs'
                    : 'bg-white/15 backdrop-blur-md text-white hover:bg-white hover:text-neutral-950 border border-white/20'
                }`}
              >
                <ShoppingBag size={16} />
                <span className="text-xs font-semibold tabular-nums tracking-wide">
                  {cartCount}
                </span>
              </button>

              {/* Login trigger */}
              <button
                onClick={() => setShowLogin(true)}
                aria-label="Client Login"
                className={`hidden sm:flex p-2 transition-colors ${
                  scrolled ? 'text-neutral-700 hover:text-neutral-950' : 'text-white/90 hover:text-white'
                }`}
              >
                <User size={18} />
              </button>

              {/* Mobile menu hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation"
                className={`lg:hidden p-2 transition-colors ${
                  scrolled ? 'text-neutral-900' : 'text-white'
                }`}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-In Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl flex flex-col justify-between p-6">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                <span className="font-playfair text-lg font-bold tracking-widest text-neutral-900 uppercase">
                  CT COLLECTIONS
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-900"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-playfair text-xl font-medium text-neutral-900 hover:text-[#D4AF37] transition-colors py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-4 pt-6 border-t border-neutral-100 text-xs">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowLogin(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#0A0A0A] text-white uppercase tracking-widest font-semibold text-xs"
              >
                <User size={15} />
                <span>Client Sign In</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsAppConcierge();
                }}
                className="w-full text-center text-neutral-600 hover:text-neutral-950 py-2 border border-neutral-200"
              >
                Contact Personal Stylist on WhatsApp
              </button>

              <p className="text-[11px] text-neutral-400 text-center">
                © {new Date().getFullYear()} CT Collections Atelier
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Login Dialog preserved for user accounts */}
      <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
    </>
  );
};

export default Navigation;

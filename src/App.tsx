import React, { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';

import { ShopProvider } from './context/ShopContext';
import Index from './pages/Index';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Lookbook from './pages/Lookbook';
import OurStory from './pages/OurStory';
import NotFound from './pages/NotFound';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { SearchModal } from './components/SearchModal';
import { GuestCheckoutModal } from './components/GuestCheckoutModal';
import { WhatsAppButton } from './components/WhatsAppButton';

const queryClient = new QueryClient();

// Smooth editorial motion variants with compositor-only properties
const pageVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1], // refined cubic-bezier
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.18,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Automatic scroll restoration on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

// Animated route transitions container
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex-1 flex flex-col"
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <ShopProvider>
          <Toaster />
          <Sonner position="top-right" richColors />
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-inter selection:bg-[#D4AF37] selection:text-black">
              {/* Header Navigation */}
              <Navigation />

              {/* Main Animated Content View */}
              <main className="flex-1 flex flex-col">
                <AnimatedRoutes />
              </main>

              {/* Footer */}
              <Footer />

              {/* Global Interactive Drawers & Modals */}
              <CartDrawer />
              <WishlistDrawer />
              <QuickViewModal />
              <SizeGuideModal />
              <SearchModal />
              <GuestCheckoutModal />

              {/* Floating WhatsApp Concierge */}
              <WhatsAppButton />
            </div>
          </BrowserRouter>
        </ShopProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

import React from 'react';
import HeroSection from '@/components/HeroSection';
import NewArrivals from '@/components/NewArrivals';
import CategoryShowcase from '@/components/CategoryShowcase';
import FeaturedLookbook from '@/components/FeaturedLookbook';
import BestSellers from '@/components/BestSellers';
import Testimonials from '@/components/Testimonials';
import InstagramGallery from '@/components/InstagramGallery';
import Newsletter from '@/components/Newsletter';

export const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. New Arrivals */}
      <NewArrivals />

      {/* 3. Shop by Category (Large Image Tiles) */}
      <CategoryShowcase />

      {/* 4. Featured Collection / Lookbook Preview */}
      <FeaturedLookbook />

      {/* 5. Best Sellers */}
      <BestSellers />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. Instagram-Style Gallery */}
      <InstagramGallery />

      {/* 8. Newsletter Signup */}
      <Newsletter />
    </div>
  );
};

export default Index;

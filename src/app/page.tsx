'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EntryAnimation from '@/components/EntryAnimation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProductsSection from '@/components/ProductsSection';
import PricingSection from '@/components/PricingSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <>
      {/* Entry Animation */}
      <EntryAnimation onComplete={() => setAnimationComplete(true)} />

      {/* Main Content */}
      <div
        className={`transition-opacity duration-1000 ${animationComplete ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <Navbar />

        <main className="relative overflow-hidden">
          <HeroSection />
          <AboutSection />
          <ProductsSection />
          <PricingSection />
          <ReviewsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
}

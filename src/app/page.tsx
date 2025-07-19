'use client';

import { Toaster } from 'sonner';
import HeroSection from '@/components/hero-section';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
  return (
    <div className="min-h-screen">
      <CustomCursor />
      <HeroSection />
      <Toaster position="top-right" />
    </div>
  );
}
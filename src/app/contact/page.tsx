'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ResearchForm from '@/components/research-form';

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F3F1EB' }}>
      {/* Header */}
      <div className="border-b border-neutral-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/"
            className="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#111827] mb-4">
            Get Started with Premium Research
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 mb-8 lg:mb-12">
            Tell us about your research needs and we'll get back to you within 24 hours.
          </p>
        </div>

        <ResearchForm />
      </div>
    </div>
  );
}
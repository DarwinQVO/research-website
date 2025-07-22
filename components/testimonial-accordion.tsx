"use client";

import { useState } from "react";

interface TestimonialAccordionProps {
  testimonials: {
    quote: string;
    name: string;
    title: string;
    avatar: string;
    twitterUrl?: string;
  }[];
}

export function TestimonialAccordion({ testimonials }: TestimonialAccordionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-2">
      {testimonials.map((item, idx) => (
        <div
          key={idx}
          className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${
            expandedItems.has(idx) ? 'bg-white' : 'bg-gray-50'
          }`}
        >
          <button
            onClick={() => {
              const newExpanded = new Set(expandedItems);
              if (newExpanded.has(idx)) {
                newExpanded.delete(idx);
              } else {
                newExpanded.add(idx);
              }
              setExpandedItems(newExpanded);
            }}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-left">
                {item.twitterUrl ? (
                  <a 
                    href={item.twitterUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hover:underline"
                  >
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  </a>
                ) : (
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                )}
                <p className="text-xs text-gray-500">{item.title}</p>
              </div>
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${
                expandedItems.has(idx) ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedItems.has(idx) && (
            <div className="px-6 pb-4">
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
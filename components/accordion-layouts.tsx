"use client";

import { useState } from "react";

interface AccordionLayoutsProps {
  testimonials: {
    quote: string;
    name: string;
    title: string;
    avatar: string;
    twitterUrl?: string;
    showUrl?: string;
    showLogo?: string;
  }[];
}

export function AccordionLayouts({ testimonials }: AccordionLayoutsProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  // Minimal Compact Layout
  return (
    <div className="max-w-6xl mx-auto px-4 space-y-1">
      {testimonials.map((item, idx) => (
        <div
          key={idx}
          className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${
            expandedItems.has(idx) ? 'bg-white shadow-sm' : 'bg-gray-50'
          }`}
        >
          <button
            onClick={() => toggleExpanded(idx)}
            className="w-full px-4 py-3 flex items-center justify-between hover:border-gray-300 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-7 h-7 rounded-full object-cover"
              />
              <div className="flex items-center space-x-2">
                {item.twitterUrl ? (
                  <a 
                    href={item.twitterUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hover:underline"
                  >
                    <span className="text-xl font-medium text-gray-900">{item.name}</span>
                  </a>
                ) : (
                  <span className="text-xl font-medium text-gray-900">{item.name}</span>
                )}
                {item.showUrl ? (
                  <a 
                    href={item.showUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hover:underline"
                  >
                    <span className="text-base text-gray-500">{item.title}</span>
                  </a>
                ) : (
                  <span className="text-base text-gray-500">{item.title}</span>
                )}
              </div>
            </div>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${
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
            <div className="px-4 pb-3">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if desktop after component mounts (client-side only)
    const checkDesktop = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        setIsDesktop(true);
        return true;
      }
      return false;
    };

    if (!checkDesktop()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    
    if (!dot || !ring) return;

    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Mouse move handler - direct DOM manipulation, no state
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Move dot instantly
      dot.style.left = `${clientX}px`;
      dot.style.top = `${clientY}px`;
      
      // Move ring with slight delay for smooth effect
      ring.style.left = `${clientX}px`;
      ring.style.top = `${clientY}px`;
    };

    // Mouse down handler
    const handleMouseDown = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(0.8)';
      ring.style.transform = 'translate(-50%, -50%) scale(0.8)';
    };

    // Mouse up handler
    const handleMouseUp = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      ring.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    // Mouse enter/leave handlers for interactive elements
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a') || target.closest('button') || target.closest('[role="button"]')) {
        dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        ring.style.transform = 'translate(-50%, -50%) scale(1.5)';
      }
    };

    const handleMouseLeave = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      ring.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    // Handle window resize
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsDesktop(false);
        document.body.style.cursor = 'auto';
      } else {
        setIsDesktop(true);
        document.body.style.cursor = 'none';
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      // Cleanup
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      {/* Dot cursor */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 bg-blue-500 rounded-full transition-transform duration-100 ease-out"
        style={{
          left: '0px',
          top: '0px',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference'
        }}
      />
      
      {/* Ring cursor */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] w-8 h-8 border-2 border-blue-500 rounded-full transition-transform duration-200 ease-out"
        style={{
          left: '0px',
          top: '0px',
          transform: 'translate(-50%, -50%)',
          opacity: 0.5
        }}
      />
    </>
  );
}
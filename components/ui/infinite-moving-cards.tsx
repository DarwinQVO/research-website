"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    avatar: string;
    twitterUrl?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const addAnimation = React.useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, []);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "120s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            className="relative w-[280px] sm:w-[350px] max-w-full shrink-0 rounded-2xl border border-b-0 border-gray-200 bg-white/80 backdrop-blur-sm px-6 sm:px-8 py-4 sm:py-6 md:w-[450px] shadow-sm min-h-[140px] sm:min-h-[160px] flex"
            key={item.name}
          >
            <blockquote className="flex flex-col justify-between h-full w-full">
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <div className="relative z-20 flex-1">
                <span className="text-sm sm:text-base leading-[1.6] font-normal text-gray-700">
                  &ldquo;{item.quote}&rdquo;
                </span>
              </div>
              <div className="relative z-20 flex flex-row items-center mt-3 sm:mt-4">
                {item.twitterUrl ? (
                  <a 
                    href={item.twitterUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-row items-center hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover mr-3 sm:mr-4 flex-shrink-0 ring-2 ring-gray-100"
                    />
                    <div className="flex flex-col justify-center min-h-[40px] sm:min-h-[48px]">
                      <span className="text-xs sm:text-sm leading-[1.4] font-medium text-gray-900">
                        {item.name}
                      </span>
                      <span className="text-xs sm:text-sm leading-[1.4] font-normal text-gray-500 mt-0.5">
                        {item.title}
                      </span>
                    </div>
                    <X className="w-4 h-4 ml-2 text-gray-400" />
                  </a>
                ) : (
                  <>
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover mr-3 sm:mr-4 flex-shrink-0 ring-2 ring-gray-100"
                    />
                    <div className="flex flex-col justify-center min-h-[40px] sm:min-h-[48px]">
                      <span className="text-xs sm:text-sm leading-[1.4] font-medium text-gray-900">
                        {item.name}
                      </span>
                      <span className="text-xs sm:text-sm leading-[1.4] font-normal text-gray-500 mt-0.5">
                        {item.title}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
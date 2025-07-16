'use client';

import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function HeroSection() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentDefinition, setCurrentDefinition] = useState(0);
  const [isHoveringPopup, setIsHoveringPopup] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [displayedName, setDisplayedName] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isTypingName, setIsTypingName] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [expandedBelief, setExpandedBelief] = useState<string | null>(null);
  const [isHoveringBelief, setIsHoveringBelief] = useState(false);
  const researcherRef = useRef<HTMLSpanElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const fullText = "Hi, I am";
  const fullName = "Eugenio.";
  
  const definitions = [
    {
      source: "Merriam-Webster",
      text: "Researcher (noun)\nre·search·er | \\ ri-ˈsər-cher \\\n\n\"One who observes or studies by close examination and systematic inquiry.\"",
      url: "https://www.merriam-webster.com/dictionary/researcher",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Merriam-Webster_logo.svg/1200px-Merriam-Webster_logo.svg.png"
    },
    {
      source: "Marshall McLuhan", 
      text: "\"We are back once more in the age of the hunter. This time the hunter is a fact‑finder, a **researcher** and a discoverer.\"",
      url: "https://en.wikipedia.org/wiki/Marshall_McLuhan",
      icon: "https://miro.medium.com/v2/resize:fit:610/1*I5JLIox9pYCaMFfj6yEmLA.jpeg"
    }
  ];

  const beliefs = {
    caro: {
      name: "Caro",
      quote: "\"Just remember,\" he said. \"Turn every page. Never assume anything. Turn every goddamned page.\"",
      source: "Working: Researching, Interviewing, Writing",
      icon: "https://dims.apnews.com/dims4/default/271da34/2147483647/strip/true/crop/3000x2000+0+0/resize/599x399!/quality/90/?url=https%3A%2F%2Fstorage.googleapis.com%2Fafs-prod%2Fmedia%2F1a013a9483c84557a8452dae35311214%2F3000.jpeg",
      url: "#"
    },
    hamming: {
      name: "Hamming", 
      quote: "\"…I am inclined to believe that, in the long-haul, books which leave out what's not essential are more important than books which tell you everything because you don't want to know everything. I don't want to know that much about penguins is the usual reply. You just want to know the essence.\"",
      source: "You and Your Research",
      icon: "https://alchetron.com/cdn/richard-hamming-947c76c9-7e4c-407c-a36a-bbab67c3138-resize-750.jpeg",
      url: "#"
    },
    tufte: {
      name: "Tufte",
      quote: "\"Graphical excellence is that which gives to the viewer the greatest number of ideas in the shortest time with the least ink in the smallest space.\"",
      source: "(Tufte, The Visual Display of Quantitative Information, p.51)",
      icon: "https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.upp-prod-eu.s3.amazonaws.com%2Fb5631804-f4d3-11e2-a62e-00144feabdc0?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1",
      url: "#"
    }
  };

  // Typewriter effect for "Hi, I am"
  useEffect(() => {
    if (isTyping && displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (displayedText.length === fullText.length && isTyping) {
      setIsTyping(false);
      // Start typing "Eugenio." after a brief pause
      setTimeout(() => {
        setIsTypingName(true);
      }, 300);
    }
  }, [displayedText, isTyping, fullText]);

  // Typewriter effect for "Eugenio."
  useEffect(() => {
    if (isTypingName && displayedName.length < fullName.length) {
      const timeout = setTimeout(() => {
        setDisplayedName(fullName.slice(0, displayedName.length + 1));
      }, 120);
      return () => clearTimeout(timeout);
    } else if (displayedName.length === fullName.length && isTypingName) {
      setIsTypingName(false);
    }
  }, [displayedName, isTypingName, fullName]);

  // No positioning needed - popup uses CSS positioning

  // Show arrows initially then fade
  useEffect(() => {
    if (showPopup) {
      setShowArrows(true);
      const timer = setTimeout(() => {
        setShowArrows(false);
      }, 2000); // Show for 2 seconds then fade
      return () => clearTimeout(timer);
    }
  }, [showPopup]);


  // Force prevent any horizontal scrollbar
  useEffect(() => {
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.maxWidth = '100vw';
    document.body.style.overflowX = 'hidden';
    document.body.style.maxWidth = '100vw';
    
    // Also prevent on window resize
    const preventScroll = () => {
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
    };
    
    window.addEventListener('resize', preventScroll);
    
    return () => {
      window.removeEventListener('resize', preventScroll);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showPopup) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          setCurrentDefinition((prev) => (prev - 1 + definitions.length) % definitions.length);
          setShowArrows(true); // Show arrows when navigating
          setTimeout(() => setShowArrows(false), 1000);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          setCurrentDefinition((prev) => (prev + 1) % definitions.length);
          setShowArrows(true); // Show arrows when navigating
          setTimeout(() => setShowArrows(false), 1000);
        } else if (e.key === 'Escape') {
          setShowPopup(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPopup, definitions.length]);

  const testimonials = [
    {
      name: "Lenny Rachitsky",
      content: "The difference between a good interview and a great one is preparation, and Eugenio helps me make sure I don’t miss a thing",
      image: "https://imagedelivery.net/EvWH1r9fvzmakmVsplSnog/bd4f9270-e762-4aa0-901d-bc1562ac4700/public"
    },
    {
      name: "David Perell",
      content: "Eugenio has the learning and researching gift. He’s the one-stop shop for all things podcast research",
      image: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc333aba4-058d-418c-b30f-a945b67ff7cf_1738x1738.jpeg"
    },
    {
      name: "Sam Parr",
      content: "Eugenio is the best researcher I know. He’s a master at finding the right information and making it actionable",
      image: "https://miro.medium.com/v2/resize:fit:1024/0*y6ZQkgFIAd2auGvP"
    }
  ];

  const companies = [
    "TechCorp", "StartupX", "GlobalTech", "DataFlow", "InnovateNow", "ResearchCo"
  ];

  return (
    <section className="w-full min-h-screen flex py-8 lg:py-0" style={{ backgroundColor: '#F3F1EB', scrollBehavior: 'auto', overflowX: 'hidden' }}>
      <div className="w-full" style={{ overflowAnchor: 'none' }}>
        <div className="lg:relative lg:flex lg:min-h-screen grid grid-cols-1 lg:grid-cols-1 gap-8" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
          {/* Left Column - Text */}
          <div className="flex flex-col px-6 md:px-8 lg:pl-16 lg:pr-8 lg:min-h-screen lg:justify-start lg:py-16 lg:w-1/2" style={{ maxWidth: '100%', overflow: 'hidden' }}>
            <div className="w-full lg:max-w-none" style={{ maxWidth: '460px' }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight font-semibold text-slate-900 mb-6">
                <span className="inline-block">
                  {displayedText}
                  {isTyping && <span className="animate-pulse">|</span>}
                </span>
                <br />
                <span className="text-blue-600">
                  {displayedName}
                  {isTypingName && <span className="animate-pulse">|</span>}
                </span>
              </h1>
              
              <div className="max-w-[460px] text-base sm:text-lg text-slate-600 mb-8 lg:mb-10 leading-relaxed relative">
                <p>
                  I&apos;m a{' '}
                  <span 
                    ref={researcherRef}
                    className="relative inline-block cursor-pointer text-blue-600 font-medium hover:text-blue-700 transition-colors border-b border-dashed border-blue-400 hover:border-blue-600"
                    onMouseEnter={() => {
                      if (closeTimeoutRef.current) {
                        clearTimeout(closeTimeoutRef.current);
                      }
                      setShowPopup(true);
                    }}
                    onMouseLeave={() => {
                      closeTimeoutRef.current = setTimeout(() => {
                        if (!isHoveringPopup) {
                          setShowPopup(false);
                        }
                      }, 300);
                    }}
                  >
                    researcher
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                  </span>
                  . These are my beliefs:
                </p>
                
                {/* Popup positioned outside of p tag to fix hydration error */}
                {showPopup && (
                  <div 
                    ref={popupRef}
                    className="absolute -top-[200px] left-0 w-[320px] min-h-[180px] bg-white border border-slate-200 rounded-lg shadow-lg p-4 z-50"
                    style={{ transformOrigin: 'bottom center' }}
                    onMouseEnter={() => {
                      if (closeTimeoutRef.current) {
                        clearTimeout(closeTimeoutRef.current);
                      }
                      setIsHoveringPopup(true);
                    }}
                    onMouseLeave={() => {
                      setIsHoveringPopup(false);
                      closeTimeoutRef.current = setTimeout(() => {
                        setShowPopup(false);
                        setIsHoveringPopup(false);
                      }, 300);
                    }}
                  >
                    {/* Arrow pointing down to "researcher" */}
                    <div className="absolute top-full left-[60px] w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-slate-200"></div>
                    <div className="absolute top-full left-[60px] translate-y-[-1px] w-0 h-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-white"></div>
                    
                    {/* Definition content - flexible height */}
                    <div className="pb-12">
                      <div className="flex items-start gap-3">
                        <img 
                          src={definitions[currentDefinition].icon} 
                          alt={definitions[currentDefinition].source}
                          className="w-6 h-6 rounded-full object-cover flex-shrink-0 mt-0.5"
                        />
                        <div className="flex-1">
                          <span className="text-xs text-slate-500 font-medium mb-1 block">{definitions[currentDefinition].source}</span>
                          <span 
                            className="text-sm text-slate-700 leading-relaxed whitespace-pre-line block"
                            dangerouslySetInnerHTML={{
                              __html: definitions[currentDefinition].text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Navigation dots - positioned absolutely at bottom */}
                    {definitions.length > 1 && (
                      <div className="absolute bottom-4 left-4 flex items-center gap-1">
                        {definitions.map((_, index) => (
                          <button 
                            key={index}
                            onClick={() => setCurrentDefinition(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentDefinition 
                                ? 'bg-blue-600' 
                                : 'bg-slate-300 hover:bg-slate-400'
                            }`}
                            aria-label={`Go to definition ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* View source link - positioned absolutely at bottom right */}
                    <a 
                      href={definitions[currentDefinition].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
                    >
                      View source
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                
                {/* Beliefs List */}
                <div className="mt-6 space-y-2" style={{ overflowAnchor: 'none' }}>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-600 font-medium">1)</span>
                    <span className="text-slate-600">Turn every page.</span>
                  </div>
                  
                  <div className="relative"
                       onMouseEnter={() => {
                         setExpandedBelief('caro');
                         setIsHoveringBelief(true);
                       }}
                       onMouseLeave={() => {
                         setExpandedBelief(null);
                         setIsHoveringBelief(false);
                       }}>
                    <div className="flex items-start gap-1 flex-wrap">
                      <span className="text-slate-600 font-medium">(</span>
                      <span className="text-blue-600 font-medium border-b border-dashed border-blue-400 hover:border-blue-600 transition-colors cursor-pointer">
                        Caro
                      </span>
                      <span className="text-slate-600 font-medium">)</span>
                    </div>
                    
                    {/* Caro's Expanded Quote */}
                    {expandedBelief === 'caro' && (
                      <div className="mt-3 p-4 bg-white/90 border border-slate-200/50 rounded-lg shadow-sm pointer-events-none" style={{ maxWidth: '350px' }}>
                        <div className="flex items-start gap-3">
                          <img 
                            src={beliefs.caro.icon}
                            alt={beliefs.caro.name}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <p className="text-slate-700 text-sm leading-relaxed mb-2 italic">
                              {beliefs.caro.quote}
                            </p>
                            <p className="text-slate-600 text-xs leading-relaxed mb-2">
                              {beliefs.caro.source}
                            </p>
                            <cite className="text-xs text-slate-500 font-medium">
                              By {beliefs.caro.name}
                            </cite>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-slate-600 font-medium">2)</span>
                    <span className="text-slate-600">Less is more.</span>
                  </div>
                  
                  <div className="relative"
                       onMouseLeave={() => {
                         setExpandedBelief(null);
                       }}>
                    <div className="flex items-start gap-1 flex-wrap mt-1">
                      <span className="text-slate-600 font-medium">(</span>
                      <span 
                        className="text-blue-600 font-medium border-b border-dashed border-blue-400 hover:border-blue-600 transition-colors cursor-pointer"
                        onMouseEnter={() => setExpandedBelief('hamming')}
                      >
                        Hamming
                      </span>
                      <span className="text-slate-600 font-medium">)</span>
                      <span className="text-slate-600 mx-1">|</span>
                      <span className="text-slate-600 font-medium">(</span>
                      <span 
                        className="text-blue-600 font-medium border-b border-dashed border-blue-400 hover:border-blue-600 transition-colors cursor-pointer"
                        onMouseEnter={() => setExpandedBelief('tufte')}
                      >
                        Tufte
                      </span>
                      <span className="text-slate-600 font-medium">)</span>
                    </div>
                    
                    {/* Expanded Quotes - empujan contenido hacia abajo solo en columna izquierda */}
                    {expandedBelief === 'hamming' && (
                      <div className="mt-3 p-4 bg-white/90 border border-slate-200/50 rounded-lg shadow-sm pointer-events-none" style={{ maxWidth: '350px' }}>
                        <div className="flex items-start gap-3">
                          <img 
                            src={beliefs.hamming.icon}
                            alt={beliefs.hamming.name}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <p className="text-slate-700 text-sm leading-relaxed mb-2 italic">
                              {beliefs.hamming.quote}
                            </p>
                            <p className="text-slate-600 text-xs leading-relaxed mb-2">
                              {beliefs.hamming.source}
                            </p>
                            <cite className="text-xs text-slate-500 font-medium">
                              By Richard {beliefs.hamming.name}
                            </cite>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {expandedBelief === 'tufte' && (
                      <div className="mt-3 p-4 bg-white/90 border border-slate-200/50 rounded-lg shadow-sm pointer-events-none" style={{ maxWidth: '350px' }}>
                        <div className="flex items-start gap-3">
                          <img 
                            src={beliefs.tufte.icon}
                            alt={beliefs.tufte.name}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <p className="text-slate-700 text-sm leading-relaxed mb-2 italic">
                              {beliefs.tufte.quote}
                            </p>
                            <p className="text-slate-600 text-xs leading-relaxed mb-2">
                              {beliefs.tufte.source}
                            </p>
                            <cite className="text-xs text-slate-500 font-medium">
                              By Edward {beliefs.tufte.name}
                            </cite>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
              </div>
              
              <Link
                href="/contact"
                className="research-hover inline-flex items-center px-6 h-[44px] bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-md transition-colors duration-200 w-fit focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              {/* Logo Wall - Only under left column */}
              <div className="mt-12 lg:mt-14 pt-8 lg:pt-10 border-t border-slate-200">
                <p className="text-xs tracking-widest text-slate-500 mb-4 lg:mb-6 uppercase">
                  Used by Leading Companies
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:gap-x-8 lg:gap-y-4">
                  {companies.map((company, index) => (
                    <div 
                      key={index}
                      className="text-slate-700 opacity-70 font-medium text-sm lg:text-base hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Testimonials */}
          <div className="flex flex-col px-6 md:px-8 lg:px-0 lg:pr-16 lg:absolute lg:top-0 lg:right-0 lg:w-1/2 lg:h-screen lg:justify-center" style={{ minWidth: '400px', maxWidth: '500px' }}>
            <div 
              className="overflow-y-auto h-[400px] sm:h-[500px] lg:h-[580px] pr-2 space-y-2"
              aria-label="Customer testimonials"
              style={{ width: '100%' }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`research-hover ${
                    index % 2 === 0 ? 'border-slate-100' : 'bg-slate-50/50 border-slate-200'
                  } border rounded-xl shadow-sm p-4 lg:p-5`}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#F3F1EB' : 'rgba(248, 250, 252, 0.5)',
                    width: '100%',
                    minWidth: '350px',
                    maxWidth: '450px'
                  }}
                >
                  <div className="flex gap-3 lg:gap-4 items-center mb-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <p className="font-medium text-slate-900 text-sm lg:text-base">{testimonial.name}</p>
                  </div>
                  <p className="text-slate-700 text-sm lg:text-base leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
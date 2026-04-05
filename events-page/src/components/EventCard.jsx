import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

const EventCard = React.memo(({ event, index, isRight }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  
  const images = event.images && event.images.length > 0 ? event.images : [];
  
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0,
    rootMargin: "0px 0px -30px 0px"
  });

  // Auto-play logic for carousel
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  const slideAnim = isRight ? { x: 50 } : { x: -50 };
  
  const desktopAnim = {
    hidden: { opacity: 0, ...slideAnim },
    visible: { opacity: 1, x: 0 }
  };
  
  const mobileAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const anim = isMobile ? mobileAnim : desktopAnim;
  const finalAnim = shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : anim;

  const handleDotClick = (e, idx) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(idx);
  };

  return (
    <motion.div
      ref={ref}
      className="relative w-full bg-ieee-surface border border-ieee-border rounded-xl shadow-lg flex flex-col md:grid md:grid-cols-12 overflow-hidden"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={finalAnim}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6, boxShadow: "0 0 0 2px #00A3FF, 0 0 45px rgba(0,163,255,0.45)" }}
    >
      {/* Image Container - Dynamic Carousel */}
      {(!imgFailed && images.length > 0) && (
        <div 
          className="w-full h-[250px] md:h-full md:col-span-5 md:col-start-1 md:row-start-1 overflow-hidden relative"
          style={{
            WebkitMaskImage: isMobile 
              ? 'linear-gradient(to bottom, black 30%, transparent 95%)'
              : 'linear-gradient(to right, black 25%, transparent 90%)',
            maskImage: isMobile 
              ? 'linear-gradient(to bottom, black 30%, transparent 95%)'
              : 'linear-gradient(to right, black 25%, transparent 90%)'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <motion.img 
                src={images[currentImageIndex]} 
                alt={`${event.name} view ${currentImageIndex + 1}`}
                loading="lazy"
                className="w-full h-full object-cover object-center"
                animate={{ 
                  scale: [1, 1.08],
                  x: [0, 5],
                  y: [0, -5]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  ease: "linear" 
                }}
                onError={() => setImgFailed(true)}
              />
            </motion.div>
          </AnimatePresence>

          {/* Dot Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-6 md:left-8 flex gap-2.5 z-20">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => handleDotClick(e, i)}
                  className={`group relative h-1.5 transition-all duration-500 rounded-full overflow-hidden ${
                    i === currentImageIndex ? 'w-8 bg-ieee-blue' : 'w-3 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Show image ${i + 1}`}
                >
                  {i === currentImageIndex && (
                    <motion.div 
                      className="absolute inset-0 bg-white/30"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: "linear" }}
                      style={{ originX: 0 }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Text Content - No overall gradient, minimal overlap */}
      <div className="relative p-8 lg:p-10 flex flex-col justify-center flex-grow md:col-span-8 md:col-start-5 md:row-start-1 z-10 -mt-4 md:mt-0">
        <div className="flex items-center justify-between mb-5">
          <span 
            className="px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase font-display"
            style={{
              backgroundColor: `${event.categoryColor}1A`,
              border: `1px solid ${event.categoryColor}`,
              color: event.categoryColor
            }}
            aria-label={`Category: ${event.category}`}
          >
            {event.category}
          </span>
          <span className="text-ieee-muted text-sm font-display font-medium tracking-wide">{event.year}</span>
        </div>

        <h3 className="font-display font-bold text-2xl sm:text-[28px] text-white mb-2 tracking-tight">
          {event.name}
        </h3>
        
        <p className="text-ieee-blue/80 font-medium italic text-[14px] mb-6">
          {event.date}
        </p>

        <p className="font-body text-[15px] sm:text-[16px] leading-[1.7] text-[#9ca3af] mb-8 flex-grow">
          {event.description}
        </p>

        <button className="group self-start flex items-center gap-2 text-ieee-blue hover:text-ieee-cyan transition-colors text-[15px] font-semibold mt-auto focus:outline-none focus:ring-2 focus:ring-ieee-blue rounded px-2 py-1 -ml-2" aria-label={`Explore ${event.name}`}>
          Explore Event
          <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>
      </div>
    </motion.div>
  );
});

export default EventCard;

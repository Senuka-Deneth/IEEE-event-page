import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

const EventCard = React.memo(({ event, index, isRight }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0,
    rootMargin: "0px 0px -30px 0px"
  });

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

  return (
    <motion.div
      ref={ref}
      className="relative w-full bg-ieee-surface border border-ieee-border rounded-xl shadow-lg flex flex-col md:grid md:grid-cols-[4fr_6fr] overflow-hidden"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={finalAnim}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -6, boxShadow: "0 0 0 2px #00A3FF, 0 0 45px rgba(0,163,255,0.45)" }}
    >
      {/* Card Content */}
      {(!imgFailed && event.image) && (
        <div className="w-full h-[250px] md:h-full bg-[#031124] overflow-hidden relative border-b md:border-b-0 md:border-r border-ieee-border/30">
          <img 
            src={event.image} 
            alt={event.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.04]"
            onError={() => setImgFailed(true)}
          />
        </div>
      )}

      <div className="p-8 lg:p-10 flex flex-col justify-center flex-grow">
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

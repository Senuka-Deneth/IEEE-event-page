import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function CurvedArrow({ fromRight }) {
  const shouldReduceMotion = useReducedMotion();
  
  // X values represent percentages of the full flex container width
  const startX = fromRight ? 76 : 24;
  const endX = fromRight ? 24 : 76;
  
  const pathData = `M ${startX},0 C ${startX},65 ${endX},35 ${endX},100`;

  return (
    <div className="w-full h-24 lg:h-32 hidden lg:block relative -my-3 z-20 pointer-events-none">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-80"
      >
        <motion.path
          d={pathData}
          stroke="#00A3FF"
          strokeWidth="6"
          strokeOpacity="0.2"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d={pathData}
          stroke="#00A3FF"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="8 6"
          animate={shouldReduceMotion ? {} : { strokeDashoffset: [28, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <circle cx={startX} cy="0" r="3" fill="#00D4FF" />
        <circle cx={startX} cy="0" r="8" fill="rgba(0,212,255,0.3)" />
      </svg>
      
      {/* Arrow Head pointing down at the end of the vertical tangent */}
      <div 
        className="absolute bottom-0 w-4 h-4 flex items-center justify-center text-ieee-blue"
        style={{ left: `${endX}%`, transform: 'translate(-50%, 50%)', opacity: 0.8 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 20L4 8H20L12 20Z" />
        </svg>
      </div>
    </div>
  );
}

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function CurvedArrow({ fromRight }) {
  const shouldReduceMotion = useReducedMotion();
  
  // X values represent percentages of the full flex container width
  // Since card is 48% wide, its center sits at roughly 24% from its anchor edge.
  const startX = fromRight ? 76 : 24;
  const endX = fromRight ? 24 : 76;
  
  const pathData = `M ${startX},0 C ${startX},65 ${endX},35 ${endX},100`;

  return (
    <div className="w-full h-24 lg:h-32 hidden lg:block relative -my-3 z-0 pointer-events-none">
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
        <circle cx={endX} cy="100" r="3" fill="#00D4FF" />
        <circle cx={endX} cy="100" r="8" fill="rgba(0,212,255,0.3)" />
      </svg>
    </div>
  );
}

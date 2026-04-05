import React from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';
import { EVENTS } from '../data/events';

export default function Roadmap() {
  return (
    <section className="relative py-24 px-4 bg-ieee-bg overflow-hidden" id="roadmap">
      {/* Premium Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Floating Ambient Orbs */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-ieee-blue/5 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-2/3 -right-20 w-[500px] h-[500px] bg-ieee-cyan/5 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-ieee-blue/[0.02] rounded-full blur-[180px]"
        />

        {/* Decorative Circuit Nodes on the sides */}
        <div className="hidden lg:block absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="absolute group"
              style={{
                top: `${15 + i * 15}%`,
                left: i % 2 === 0 ? '5%' : '92%',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-sm bg-ieee-blue/20 border border-ieee-blue/40 rotate-45 mb-2" />
              <div 
                className={`h-24 w-px bg-gradient-to-b from-ieee-blue/20 to-transparent ${i % 2 === 0 ? 'ml-0.5' : 'ml-0.5'}`} 
                style={{ opacity: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto flex flex-col items-center z-10">
        {EVENTS.map((event, index) => {
          const isRight = index % 2 === 0;
          
          return (
            <React.Fragment key={event.id}>
              <div className="w-full relative z-10">
                <EventCard event={event} index={index} isRight={isRight} />
              </div>
              
              {/* Visual element to separate each event */}
              {index !== EVENTS.length - 1 && (
                <div className="flex justify-center items-center py-6 sm:py-10 w-full">
                  <div className="flex items-center gap-4 w-full max-w-sm opacity-60">
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent to-ieee-blue/40"></div>
                    <div className="w-2 h-2 rounded-full bg-ieee-cyan shadow-[0_0_10px_var(--tw-colors-ieee-cyan)]"></div>
                    <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent to-ieee-blue/40"></div>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}

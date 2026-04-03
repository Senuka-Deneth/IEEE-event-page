import React from 'react';
import EventCard from './EventCard';
import { EVENTS } from '../data/events';

export default function Roadmap() {
  return (
    <section className="relative py-24 px-4 bg-ieee-bg overflow-hidden" id="roadmap">
      <div className="relative max-w-5xl mx-auto flex flex-col items-center">
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

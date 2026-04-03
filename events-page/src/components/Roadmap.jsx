import React from 'react';
import EventCard from './EventCard';
import CurvedArrow from './CurvedArrow';
import { EVENTS } from '../data/events';

export default function Roadmap() {
  return (
    <section className="relative py-24 px-4 bg-ieee-bg overflow-hidden" id="roadmap">
      <div className="relative max-w-6xl mx-auto flex flex-col items-center sm:gap-6 lg:gap-0">
        {EVENTS.map((event, index) => {
          const isRight = event.side === "right"; 
          
          return (
            <React.Fragment key={event.id}>
              <div 
                className={`relative flex w-full z-10 ${isRight ? "justify-end" : "justify-start"}`}
              >
                <div className="w-[98%] sm:w-[85%] md:w-[70%] lg:w-[48%] flex relative my-4 lg:my-0">
                  <EventCard event={event} index={index} isRight={isRight} />
                </div>
              </div>
              
              {index !== EVENTS.length - 1 && (
                 <CurvedArrow fromRight={isRight} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}

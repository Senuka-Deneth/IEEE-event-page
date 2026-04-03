import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

function AnimatedCounter({ target, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (!inView) return;
    
    let startTime = null;
    const intTarget = parseInt(target, 10);
    
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * intTarget));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsBar() {
  const stats = [
    { target: 14, label: "Events", suffix: "+" },
    { target: 5000, label: "Participants", suffix: "+" },
    { target: 10, label: "Years", suffix: "+" },
    { target: 20, label: "Awards", suffix: "+" },
  ];

  return (
    <section className="bg-ieee-surface border-y border-ieee-border py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-center gap-y-10">
        {stats.map((stat, i) => (
          <React.Fragment key={stat.label}>
            <div className="flex flex-col items-center w-[45%] md:w-auto">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </h2>
              <p className="text-ieee-muted font-body text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
            {i !== stats.length - 1 && (
              <div className="hidden md:block w-[1px] h-16 bg-ieee-border" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

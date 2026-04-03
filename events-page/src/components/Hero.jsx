import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Hero() {
  const canvasRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const MAX_PARTICLES = 60;
    const CONN_DIS = 120;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.7;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 163, 255, 0.6)';
        ctx.fill();
      }
    }

    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONN_DIS) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 163, 255, ${0.5 * (1 - dist / CONN_DIS)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  return (
    <section className="relative min-h-[40vh] py-32 flex flex-col justify-center items-center overflow-hidden bg-ieee-bg text-center px-4">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.p 
          className="text-ieee-blue tracking-[0.2em] uppercase font-semibold text-sm mb-6 font-body"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          — IEEE UOM Student Branch —
        </motion.p>
        
        <motion.h1 
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-4 tracking-tight"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          A Legacy of Innovation
        </motion.h1>
        
        <motion.p 
          className="text-ieee-muted font-body text-lg sm:text-xl max-w-2xl mb-8"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Explore the events that define IEEE UOM
        </motion.p>
        
        <motion.div 
          className="h-[2px] w-[60px] bg-ieee-blue origin-left"
          initial={shouldReduceMotion ? { opacity: 0 } : { scaleX: 0 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "circOut" }}
        />
      </div>
    </section>
  );
}

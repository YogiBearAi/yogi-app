'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Typewriter effect component
const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span>{text}</span>;
  }

  const letters = Array.from(text);
  
  return (
    <motion.div className="inline-block">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: delay + index * 0.05,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function Mission() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const textShake = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-gray-900 overflow-hidden"
    >
      {/* Grunge texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle radial gradient for depth */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-gray-800/50 via-gray-900/80 to-black pointer-events-none"
      />

      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-[6rem] font-serif text-white/80 leading-none select-none">
            Project Yogi
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
          {/* Left Column - Yogi's Story */}
          <div className="space-y-12">
            <div className="relative">
              <div className="space-y-8 bg-gray-800/30 p-8 rounded-lg backdrop-blur-sm border border-gray-700/30">
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                  <p className="text-2xl font-medium text-white">
                    "Two weeks ago, I lost my best friend, Yogi."
                  </p>

                  <p>
                    "He wasn't just a dog. He was my shadow, my anchor, my reminder that no matter how dark things got, I wasn't alone. Through the sleepless nights, the endless grind, the moments of doubt—he was there. Watching. Present. Unwavering."
                  </p>

                  <blockquote className="text-xl md:text-2xl font-medium text-blue-400 border-l-4 border-blue-500 pl-4 my-8">
                    "When I lost everything, when I had nothing left—he stayed. He didn't judge. He didn't leave. He just knew."
                  </blockquote>

                  <p>
                    "In those darkest moments, when the weight of life felt crushing, his presence was a reminder: Keep going. Stay strong. You're not done yet."
                  </p>

                  <p>
                    "And when he was gone, the silence was deafening. The emptiness overwhelming. That's when the real question hit me—what about those who never had a Yogi?"
                  </p>
                </div>
              </div>

              <motion.div
                style={{ opacity: imageOpacity }}
                className="aspect-square w-full relative rounded-lg overflow-hidden mt-8"
              >
                <Image
                  src="/images/yogi-grayscale.jpg"
                  alt="Yogi"
                  width={800}
                  height={800}
                  className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-1000"
                  priority
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column - The Gut Punch */}
          <motion.div 
            className="space-y-12"
            animate={{
              x: textShake.get() ? [-0.5, 0.5, -0.5, 0.5, 0] : 0
            }}
            transition={{
              duration: 0.2
            }}
          >
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl text-white font-bold leading-relaxed">
                  Most men are alone
                </h2>

                <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed">
                  No one teaching them how to fight through the struggle.
                </p>

                <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed">
                  So they drift. They sedate. They stay weak.
                </p>

                <blockquote className="text-2xl md:text-3xl font-bold text-white my-8 border-l-4 border-blue-500 pl-6">
                  You either build yourself into a man who can carry the weight of his own life—or you collapse under it.
                </blockquote>

                <p className="text-2xl md:text-3xl text-blue-400 font-bold">
                  Project Yogi is here to make sure that never happens.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-xl text-gray-400 mb-6">
                Find your roadmap. Start your journey.
              </p>
              
              <Link
                href="/questionnaire"
                className="inline-block px-12 py-6 bg-blue-600 text-white text-xl font-bold rounded-lg shadow-lg hover:shadow-blue-500/20 transform transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Take the Assessment →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
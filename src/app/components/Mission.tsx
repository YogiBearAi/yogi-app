'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

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
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Left Column - The Mission */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight"
              >
                Millions of Young Men Are Lost.
              </h2>

              <h3 
                className="text-2xl md:text-3xl font-bold text-gray-400 leading-tight"
              >
                No purpose.
                <br />
                No structure.
                <br />
                No one pushing them forward.
              </h3>
            </div>

            <div className="space-y-8">
              <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed">
                They told us to be good boys. Follow the rules. Go to school. Get a job.
                <span className="block mt-2 text-white">
                  But they never taught us how to be <TypewriterText text="strong" delay={1} />.
                  How to think for <TypewriterText text="ourselves" delay={1.5} />.
                  How to fight for something <TypewriterText text="bigger" delay={2} />.
                </span>
              </p>

              <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed">
                No one handed us a roadmap. No one told us the truth.
              </p>

              <p className="text-xl md:text-2xl text-white font-bold leading-relaxed">
                So now we build our own path.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                No One Is Coming to Save You.
                <br />
                <span className="text-blue-400">
                  So We Built the Roadmap Ourselves.
                </span>
              </h2>

              <h3 className="text-xl md:text-2xl text-gray-300 font-medium">
                Discipline. Responsibility. Brotherhood.
                <br />
                Project Yogi isn't just a system—it's a blueprint to rebuild yourself from the ground up.
              </h3>
            </div>
          </div>

          {/* Right Column - Yogi's Story */}
          <div className="relative">
            <div className="space-y-8">
              {/* Project Yogi title */}
              <div className="text-center mb-12">
                <h2 className="text-[6rem] font-serif text-white/80 leading-none select-none">
                  Project Yogi
                </h2>
              </div>

              <div className="relative z-10 space-y-8 bg-gray-800/30 p-8 rounded-lg backdrop-blur-sm border border-gray-700/30">
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                  <p>
                    "Two weeks ago, I lost my best friend, Yogi.
                    He wasn't just a dog. He was my shadow, my anchor, my reminder that no matter how bad things got, I wasn't alone."
                  </p>

                  <p>
                    "When I lost everything, when I had nothing left—he stayed. He didn't judge. He didn't leave. He just knew."
                  </p>

                  <p>
                    "And when he was gone, I realized something: What if I had never had him?
                    What if I went through everything I've been through, completely alone?"
                  </p>

                  <p className="text-white font-medium">
                    "That's when it hit me—this is what I have to build.
                    This is my mission. This is Project Yogi."
                  </p>
                </div>
              </div>
            </div>

            {/* Animated silhouette */}
            {mounted && (
              <motion.div
                className="absolute -bottom-24 right-0 opacity-5 pointer-events-none"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.05, 0.07, 0.05],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  width="400"
                  height="400"
                  viewBox="0 0 400 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-96 h-96"
                >
                  {/* Simple dog silhouette path */}
                  <path
                    d="M200 100c-20 0-40 10-50 30-10 20-10 40 0 60 10 20 30 30 50 30s40-10 50-30c10-20 10-40 0-60-10-20-30-30-50-30z"
                    fill="currentColor"
                    className="text-white"
                  />
                </svg>
              </motion.div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <p className="text-xl text-gray-400 mb-8">
            You can stay lost. Or you can start building. Your move.
          </p>
          
          {mounted && (
            <motion.button
              className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/20"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Smooth scroll to next section
                window.scrollTo({
                  top: window.innerHeight * 2,
                  behavior: 'smooth'
                });
              }}
            >
              Take the First Step
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
} 
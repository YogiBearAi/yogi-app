'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Particle component for the background effect
const Particle = ({ delay = 0 }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-white/10 rounded-full"
      initial={{
        opacity: 0,
        scale: 0,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 2, 0],
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
      }}
      transition={{
        duration: 3,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      {/* Logo placeholder */}
      <div className="absolute top-8 left-8 z-20">
        <Link href="/">
          <span className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-200">
            Project Yogi
          </span>
        </Link>
      </div>

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <Particle key={i} delay={i * 0.2} />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-wider text-white mb-12 uppercase"
        >
          We Help Lost Young Men
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
            Find Meaning
          </span>
        </motion.h1>

        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <p className="text-xl md:text-2xl italic font-serif text-gray-300 mb-4">
            "When we are no longer able to change a situation, we are challenged to change ourselves."
          </p>
          <cite className="text-sm text-gray-400">– Viktor Frankl</cite>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8"
        >
          <Link
            href="/questionnaire"
            className="inline-block px-12 py-5 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 active:scale-95"
          >
            Take the Assessment
          </Link>
        </motion.div>

        {/* Animated gradient background */}
        <div
          className="absolute inset-0 -z-10 animate-gradient-slow"
          style={{
            background: `
              radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, rgba(249, 168, 212, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 0% 100%, rgba(147, 197, 253, 0.1) 0%, transparent 50%)
            `
          }}
        />
      </div>
    </div>
  );
} 
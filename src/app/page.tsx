'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-indigo-100/50 animate-gradient-shift"></div>
      
      <div className="text-center p-8 relative z-10 max-w-4xl mx-auto">
        {/* Main headline with animation */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight"
        >
          You Want to Be Better.
          <br />
          Here's How You Start.
        </motion.h1>

        {/* Subheading with animation */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          This self-assessment will give you an honest, data-driven look at where you stand—physically, mentally, financially, and spiritually.
        </motion.p>

        {/* Progress steps */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">✅</span>
            <span className="text-gray-700">Self-Assessment (5 Min)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <span className="text-gray-700">See Your Score & Plan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <span className="text-gray-700">Take Action</span>
          </div>
        </motion.div>

        {/* CTA Button with animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href="/questionnaire"
            className="inline-block px-10 py-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 animate-pulse"
          >
            Take the Assessment →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Mission from './components/Mission';

export default function Home() {
  return (
    <main>
      <Hero />
      <Mission />
    </main>
  );
}

'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { calendlyLink } from '@/config/content';
import RotatingHeadlineWord from './RotatingHeadlineWord';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: '-60px' });

  return (
    <section className="relative overflow-hidden pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center border-0 border-none shadow-none">
      <div className="absolute inset-0 -z-10">
        <AnimatedGradientBackground Breathing containerClassName="absolute inset-0 w-full h-full" />
      </div>
      <div className="max-w-7xl mx-auto w-full relative z-10" ref={contentRef}>
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Badge */}
          {/* <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-gray-200 text-sm font-medium mb-8 border border-white/20 backdrop-blur-sm"
          >
            <motion.span
              className="w-2 h-2 bg-emerald-400 rounded-full mr-2"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.75, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            Agentic AI Solutions Studio
          </motion.div> */}

          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 text-balance tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            AI Solutions That
            <span className="block mt-2 text-cyan-200">
              <RotatingHeadlineWord className="text-cyan-200" /> Real Results
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg sm:text-xl text-gray-300 mb-12 text-balance max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
             AI voice systems, smart automation, video content creation, social marketing, and custom websites: the complete stack for businesses that scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.45 }}
          >
            <motion.a
              href={calendlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:bg-gray-100 transition-colors duration-300"
              whileHover={{ y: -3, transition: { duration: 0.25 } }}
              whileTap={{ scale: 0.98, transition: { duration: 0.2 } }}
            >
              Book a Call
            </motion.a>
            <motion.div whileHover={{ transition: { duration: 0.25 } }}>
              <Link
                href="/#services"
                className="inline-block bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-colors duration-300 backdrop-blur-sm"
              >
                See Our Services
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

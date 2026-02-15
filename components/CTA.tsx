'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { calendlyLink } from '@/config/content';

export default function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/80">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#253c80] mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to Get Started?
        </motion.h2>
        <motion.p
          className="text-xl text-[#253c80] mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Book a call to discuss how we can help transform your business with AI
          solutions.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.a
            href={calendlyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#253c80] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-[#253c80]/25 hover:bg-[#1e3170] transition-colors inline-block"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Book a Call
          </motion.a>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className="inline-block bg-white text-[#253c80] px-8 py-4 rounded-xl font-semibold text-lg border-2 border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/config/content';
import { AnimatedSection } from './AnimatedSection';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#253c80] mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-[#253c80]">Everything you need to know</p>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-2 rounded-2xl overflow-hidden transition-colors duration-300 ${
                openIndex === index ? 'border-[#253c80]/40 shadow-lg shadow-[#253c80]/5' : 'border-gray-100 hover:border-[#253c80]/20'
              }`}
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50/50 transition-colors"
                whileHover={{ x: 2 }}
              >
                <span className="font-semibold text-[#253c80] pr-8">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#253c80] flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.span>
              </motion.button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-[#253c80] leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

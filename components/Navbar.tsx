'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calendlyLink } from '@/config/content';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100/80"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900 text-[#253c80]">keel</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#services"
              className="text-gray-700 hover:text-[#253c80] transition-colors font-medium"
            >
              Services
            </Link>
            {/* <Link
              href="/case-studies"
              className="text-gray-700 hover:text-[#253c80] transition-colors font-medium"
            >
              Case Studies
            </Link> */}
            <Link
              href="/about"
              className="text-gray-700 hover:text-[#253c80] transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-[#253c80] transition-colors font-medium"
            >
              Contact
            </Link>
            <motion.a
              href={calendlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#253c80] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#1e3170] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Call
            </motion.a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden py-4 space-y-4 border-t border-gray-100"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="/#services"
                className="block text-gray-700 hover:text-[#253c80] transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              {/* <Link
                href="/case-studies"
                className="block text-gray-700 hover:text-[#253c80] transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Case Studies
              </Link> */}
              <Link
                href="/about"
                className="block text-gray-700 hover:text-[#253c80] transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block text-gray-700 hover:text-[#253c80] transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <a
                href={calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#0f172a] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1e3170] transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Book a Call
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

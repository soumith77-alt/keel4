'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';

import { faqs } from '@/config/content';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';

/**
 * Two-column: sticky heading on the left, accordion on the right. The
 * open/close logic is unchanged from the original — only the layout and
 * treatment moved onto the dark system.
 */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <Section spacing="lg">
      <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions, answered"
              lead="If yours isn't here, ask on the call, we'd rather overexplain than oversell."
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          <dl className="divide-y divide-white/[0.08] border-y border-line/10">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-trigger-${index}`;

              return (
                <div key={faq.question}>
                  <dt>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-start justify-between gap-5 py-5 text-left sm:gap-6 sm:py-6"
                    >
                      <span className="type-h3 text-fg">{faq.question}</span>
                      <motion.span
                        aria-hidden
                        animate={
                          reduceMotion ? undefined : { rotate: isOpen ? 45 : 0 }
                        }
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-0.5 shrink-0 text-accent-700"
                      >
                        <Plus className="h-5 w-5" strokeWidth={1.5} />
                      </motion.span>
                    </button>
                  </dt>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.dd
                        id={panelId}
                        aria-labelledby={buttonId}
                        initial={
                          reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }
                        }
                        animate={
                          reduceMotion
                            ? { opacity: 1 }
                            : { height: 'auto', opacity: 1 }
                        }
                        exit={
                          reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="type-body measure pb-7 text-fg-muted text-pretty">
                          {faq.answer}
                        </p>
                      </motion.dd>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </Section>
  );
}

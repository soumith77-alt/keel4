'use client';

import { motion } from 'framer-motion';
import { AnimatedSection, StaggerContainer, StaggerItem } from './AnimatedSection';

const steps = [
  {
    number: '1',
    title: 'Discovery Call',
    description: 'We understand your goals, challenges, and current processes to identify the best AI solution.',
  },
  {
    number: '2',
    title: 'Custom Solution Design',
    description: 'We design a tailored solution that fits your business needs and integrates seamlessly.',
  },
  {
    number: '3',
    title: 'Build & Deploy',
    description: 'Our team builds, tests, and deploys your solution with ongoing support and optimization.',
  },
  {
    number: '4',
    title: 'Measure & Optimize',
    description: 'We track performance metrics and continuously optimize to ensure maximum ROI.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/80">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#253c80] mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-xl text-[#253c80] max-w-2xl mx-auto">
            A streamlined process from concept to deployment
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StaggerItem key={index} className="relative">
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-14 left-full w-full h-0.5 bg-[#253c80]/20 -z-10"
                  style={{ width: 'calc(100% - 3rem)' }}
                />
              )}
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-[#253c80]/30 transition-all duration-300 h-full"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="w-16 h-16 bg-[#253c80]/10 rounded-2xl flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <span className="text-2xl font-bold text-[#253c80]">{step.number}</span>
                </motion.div>
                <h3 className="text-xl font-bold text-[#253c80] mb-3">{step.title}</h3>
                <p className="text-[#253c80]">{step.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

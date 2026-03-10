'use client';

import { useEffect } from 'react';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ui/services';
import { services, faqs } from '@/config/content';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

const NAV_OFFSET = 64; // navbar height

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

function scrollToServices() {
  const el = document.getElementById('services');
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export default function Home() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const run = () => {
      if (window.location.hash === '#services') scrollToServices();
    };
    run();
    const t1 = setTimeout(run, 150);
    const t2 = setTimeout(run, 400);
    const t3 = setTimeout(run, 800);
    const onHashChange = () => {
      if (window.location.hash === '#services') scrollToServices();
    };
    window.addEventListener('hashchange', onHashChange);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <div className="h-full min-h-[120px] bg-white" aria-hidden />
      <ServicesSection services={services} />
      <HowItWorks />
      <FAQ />
      <CTA />
    </>
  );
}

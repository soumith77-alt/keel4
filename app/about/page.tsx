import Link from 'next/link';
import { calendlyLink } from '@/config/content';

export const metadata = {
  title: 'About Keel - Agentic AI Solutions Studio',
  description: 'Keel is an Agentic AI Solutions Studio building Voice AI systems, business automations, UGC content, AI video, and high-converting websites. Real results in 2–4 weeks.',
  alternates: { canonical: 'https://saykeel.com/about' },
  openGraph: {
    title: 'About Keel - Agentic AI Solutions Studio',
    description: 'We build Voice AI, automations, UGC content, and websites for businesses that scale. Real measurable results.',
    url: 'https://saykeel.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Keel - Agentic AI Solutions Studio',
    description: 'Voice AI, automations, UGC content, and websites for businesses that scale.',
  },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Keel',
  url: 'https://saykeel.com/about',
  description: 'Keel is an Agentic AI Solutions Studio building Voice AI, automations, UGC content, AI video, and websites.',
  mainEntity: {
    '@type': 'Organization',
    name: 'Keel',
    url: 'https://saykeel.com',
    email: 'hello@saykeel.com',
    description: 'We build premium AI solutions that drive measurable business outcomes. Voice AI, automations, UGC ads, AI video, and websites.',
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-[#253c80] mb-6">
            About Keel
          </h1>
          <p className="text-xl text-[#253c80]">
            Agentic AI Solutions Studio
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-16">
          <div className="space-y-8 text-[#253c80] leading-relaxed">
            <p className="text-xl text-[#253c80] font-semibold">
              We build premium AI solutions that drive measurable business outcomes.
            </p>
            
            <p>
              Keel started with a simple mission: help businesses leverage AI to solve real problems and achieve real results. 
              We are not here to sell buzzwords or ship half-finished experiments. We are a focused studio that designs and builds AI systems that work in the real world.
            </p>

            <p>
              Our expertise spans Voice AI, autonomous automations, UGC content, AI video, and modern web development. 
              Every build is created with conversion, performance, and clarity in mind, so it does not just look impressive, it actually moves your numbers.
            </p>

            <h2 className="text-3xl font-bold text-[#253c80] mt-12 mb-6">
              Our Approach
            </h2>

            <p>
            Our approach starts with outcomes, not deliverables. We begin by understanding your goals, current bottlenecks, and the metrics that matter most. Then we design and build a solution around that, with clean execution and measurable impact.
            </p>

            <p>
            We move fast, iterate quickly, and hold a high bar for quality. Most clients start seeing results in weeks, not months.
            </p>

            <h2 className="text-3xl font-bold text-[#253c80] mt-12 mb-6">
              Why Choose Keel
            </h2>

            <ul className="space-y-4 list-none">
              <li className="flex items-start">
                <span className="text-[#253c80] mr-3 text-xl">✓</span>
                <span><strong>Proven Results:</strong> Our clients see 30-50% improvements in key metrics</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#253c80] mr-3 text-xl">✓</span>
                <span><strong>Fast Deployment:</strong> Most solutions launch within 2-4 weeks</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#253c80] mr-3 text-xl">✓</span>
                <span><strong>Modern Tech:</strong> Built with cutting-edge AI and web technologies</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#253c80] mr-3 text-xl">✓</span>
                <span><strong>Ongoing Support:</strong> We optimize and maintain solutions long-term</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>

      {/* CTA — same style as Ready to get started (full-width grey, blue heading & button) */}
      <section className="w-full bg-gray-100 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#253c80] tracking-tight mb-4">
              Let&apos;s Work Together
            </h2>
            <p className="text-lg text-[#253c80] mb-8">
              Book a call to discuss how we can help transform your business.
            </p>
            <a
              href={calendlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#253c80] text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#1e3170] transition-colors shadow-lg shadow-[#253c80]/20"
            >
              Book a Call
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

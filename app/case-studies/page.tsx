import Link from "next/link";
import { caseStudies } from "@/config/content";

export const metadata = {
  title: "Case Studies - Real AI Results | Keel",
  description:
    "Real results from real clients. Keel's Voice AI reduced no-shows by 18%, automations cut onboarding from 2 hours to 15 minutes, and UGC campaigns achieved 3x ROAS.",
  alternates: { canonical: 'https://saykeel.com/case-studies' },
  openGraph: {
    title: 'Case Studies - Real AI Results | Keel',
    description: 'Voice AI, automations, and UGC results: 40% more bookings, 80% less manual work, 3x ROAS.',
    url: 'https://saykeel.com/case-studies',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies - Real AI Results | Keel',
    description: 'Real results: 40% more bookings, 80% less manual work, 3x ROAS.',
  },
};

const caseStudiesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Keel AI Case Studies',
  description: "Real results from businesses using Keel's AI voice agents, automations, and UGC campaigns.",
  url: 'https://saykeel.com/case-studies',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Article',
        name: 'Dental Clinic Increases Bookings by 40%',
        description: "Premier Dental Care implemented a 24/7 AI receptionist. Result: 40% increase in appointments booked, 87% call-to-booking conversion rate, 18% reduction in no-shows.",
        url: 'https://saykeel.com/case-studies#dental-clinic',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Article',
        name: 'SaaS Platform Automates 80% of Onboarding',
        description: "TechFlow Inc. used Keel's agentic AI to automate end-to-end customer onboarding. Result: 80% reduction in manual work, 2-hour process reduced to 15 minutes.",
        url: 'https://saykeel.com/case-studies#saas-platform',
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Article',
        name: 'E-commerce Brand Achieves 3x ROAS with UGC Campaign',
        description: "StyleCo launched an authentic UGC ad campaign with Keel. Result: 3x return on ad spend, 45% lower cost per acquisition, 2.5x higher conversion rates.",
        url: 'https://saykeel.com/case-studies#ecommerce-brand',
      },
    },
  ],
};

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesSchema) }}
      />
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Case Studies
          </h1>
          <p className="text-xl text-gray-600">
            Real results from real clients
          </p>
        </div>

        <div className="space-y-16">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              id={study.id}
              className="scroll-mt-28 border-b border-gray-100 pb-16 last:border-0 last:pb-0"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-[#253c80] uppercase">
                  {study.service}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-500">{study.industry}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {study.title}
              </h2>
              <p className="text-gray-600 mb-4">{study.challenge}</p>
              <p className="text-gray-700 mb-6">{study.solution}</p>
              <ul className="space-y-2 mb-8">
                {study.results.map((result, idx) => (
                  <li key={idx} className="flex items-start text-gray-700">
                    <span className="text-[#253c80] mr-2">✓</span>
                    {result}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/#services"
            className="inline-flex items-center text-[#253c80] font-semibold hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}

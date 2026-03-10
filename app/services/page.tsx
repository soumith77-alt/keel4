import { services } from '@/config/content';
import ServicesPageGrid from '@/components/ServicesPageGrid';

export const metadata = {
  title: 'AI Services - Voice AI, Automations, UGC & Websites | Keel',
  description: 'Keel offers Voice AI agents, agentic business automations, UGC ad campaigns & AI video, and high-converting website development. Full-stack AI solutions that drive measurable results.',
  alternates: { canonical: 'https://saykeel.com/services' },
  openGraph: {
    title: 'AI Services - Voice AI, Automations, UGC & Websites | Keel',
    description: 'Full-stack AI solutions: Voice AI agents, automations, UGC ads & AI video, and high-converting websites.',
    url: 'https://saykeel.com/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Services | Keel',
    description: 'Voice AI, automations, UGC ads & AI video, and websites for businesses that scale.',
  },
};

const serviceCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Keel AI Services',
  description: 'Voice AI, Agentic AI Automations, UGC Ads & AI Video, and Website Building services by Keel.',
  url: 'https://saykeel.com/services',
  numberOfItems: 4,
  itemListElement: [
    { '@type': 'ListItem', position: 1, item: { '@type': 'Service', name: 'Voice AI', url: 'https://saykeel.com/services/voice-ai', description: 'Inbound and outbound AI voice agents that answer calls, book appointments, and reactivate leads 24/7.' } },
    { '@type': 'ListItem', position: 2, item: { '@type': 'Service', name: 'Agentic AI Automations', url: 'https://saykeel.com/services/agentic-automations', description: 'Autonomous AI agents that handle complex workflows, data processing, and business operations end-to-end.' } },
    { '@type': 'ListItem', position: 3, item: { '@type': 'Service', name: 'UGC Ads & AI Video', url: 'https://saykeel.com/services/ugc-video', description: 'Authentic UGC ads and AI-powered video that drive engagement and conversion at scale.' } },
    { '@type': 'ListItem', position: 4, item: { '@type': 'Service', name: 'Website Building', url: 'https://saykeel.com/services/websites', description: 'Premium, conversion-optimized websites built with modern tech and AI-enhanced performance.' } },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalogSchema) }}
      />
    <main className="bg-white min-h-screen">
    <section
      id="services"
      className="pt-[100px] sm:pt-[120px] pb-20 px-4 sm:px-6 lg:px-8 w-full bg-white min-h-screen"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-left mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 tracking-tight">
            How Can I Help?
          </h1>
          <p className="text-sm sm:text-base text-gray-500 font-light max-w-2xl">
            Let&apos;s turn your vision into something amazing.
          </p>
        </div>

        <ServicesPageGrid services={services} />
      </div>
    </section>
    </main>
    </>
  );
}

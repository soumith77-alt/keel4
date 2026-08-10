import { services } from '@/config/content';
import ServicesPageGrid from '@/components/ServicesPageGrid';
import FinalCTA from '@/components/FinalCTA';
import { Section } from '@/components/ui/section';
import PageHero from '@/components/ui/page-hero';

export const metadata = {
  title: 'AI Services - Voice, Automations, Video, Websites & SaaS | Keel',
  description: 'Keel builds Voice AI agents, agentic business automations, UGC and AI video, conversion websites, and launch ready SaaS products.',
  alternates: { canonical: 'https://saykeel.com/services' },
  openGraph: {
    title: 'AI Services - Voice, Automations, Video, Websites & SaaS | Keel',
    description: 'Five connected disciplines: Voice AI, automations, AI video, conversion websites, and SaaS products.',
    url: 'https://saykeel.com/services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Services | Keel',
    description: 'Voice AI, automations, AI video, conversion websites, and SaaS products.',
  },
};

const serviceCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Keel AI Services',
  description: 'Voice AI, Agentic AI Automations, UGC Ads & AI Video, Conversion Websites, and SaaS Product Development by Keel.',
  url: 'https://saykeel.com/services',
  numberOfItems: 5,
  itemListElement: [
    { '@type': 'ListItem', position: 1, item: { '@type': 'Service', name: 'Voice AI', url: 'https://saykeel.com/services/voice-ai', description: 'Inbound and outbound AI voice agents that answer calls, book appointments, and reactivate leads 24/7.' } },
    { '@type': 'ListItem', position: 2, item: { '@type': 'Service', name: 'Agentic AI Automations', url: 'https://saykeel.com/services/agentic-automations', description: 'Autonomous AI agents that handle complex workflows, data processing, and business operations end to end.' } },
    { '@type': 'ListItem', position: 3, item: { '@type': 'Service', name: 'UGC Ads & AI Video', url: 'https://saykeel.com/services/ugc-video', description: 'Authentic UGC ads and AI powered video that drive engagement and conversion at scale.' } },
    { '@type': 'ListItem', position: 4, item: { '@type': 'Service', name: 'Conversion Websites', url: 'https://saykeel.com/services/websites', description: 'Premium, conversion focused websites built with modern tech and AI enhanced performance.' } },
    { '@type': 'ListItem', position: 5, item: { '@type': 'Service', name: 'SaaS Products', url: 'https://saykeel.com/services/saas-products', description: 'Launch ready SaaS products designed, engineered, integrated, and shipped as one system.' } },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalogSchema) }}
      />

      <PageHero
        eyebrow="Services"
        title="One system. Five surfaces."
        lead="Voice answers. Automations move the data. Video creates demand. Websites convert it. SaaS turns the system into a product."
        className="pb-6"
      />

      <Section spacing="md">
        {/* Same missing level as /work: PageHero's <h1> went straight to the
            cards' <h3>. This is the <h2> that was skipped. */}
        <h2 className="type-h2 mb-8 text-fg text-balance">
          Five disciplines, one system
        </h2>
        <ServicesPageGrid services={services} />
      </Section>

      <FinalCTA />
    </>
  );
}

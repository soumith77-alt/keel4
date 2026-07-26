import { services } from '@/config/content';
import ServicesPageGrid from '@/components/ServicesPageGrid';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/ui/reveal';
import GlowBackdrop from '@/components/ui/glow-backdrop';

export const metadata = {
  title: 'AI Services - Voice AI, Automations, UGC & Websites | Keel',
  description: 'Keel offers Voice AI agents, agentic business automations, UGC ad campaigns & AI video, and high converting website development. Full stack AI solutions that drive measurable results.',
  alternates: { canonical: 'https://saykeel.com/services' },
  openGraph: {
    title: 'AI Services - Voice AI, Automations, UGC & Websites | Keel',
    description: 'Full stack AI solutions: Voice AI agents, automations, UGC ads & AI video, and high converting websites.',
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
  description: 'Voice AI, Agentic AI Automations, UGC Ads & AI Video, and Conversion Websites services by Keel.',
  url: 'https://saykeel.com/services',
  numberOfItems: 4,
  itemListElement: [
    { '@type': 'ListItem', position: 1, item: { '@type': 'Service', name: 'Voice AI', url: 'https://saykeel.com/services/voice-ai', description: 'Inbound and outbound AI voice agents that answer calls, book appointments, and reactivate leads 24/7.' } },
    { '@type': 'ListItem', position: 2, item: { '@type': 'Service', name: 'Agentic AI Automations', url: 'https://saykeel.com/services/agentic-automations', description: 'Autonomous AI agents that handle complex workflows, data processing, and business operations end to end.' } },
    { '@type': 'ListItem', position: 3, item: { '@type': 'Service', name: 'UGC Ads & AI Video', url: 'https://saykeel.com/services/ugc-video', description: 'Authentic UGC ads and AI powered video that drive engagement and conversion at scale.' } },
    { '@type': 'ListItem', position: 4, item: { '@type': 'Service', name: 'Conversion Websites', url: 'https://saykeel.com/services/websites', description: 'Premium, conversion focused websites built with modern tech and AI enhanced performance.' } },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalogSchema) }}
      />

      <section className="relative isolate overflow-hidden bg-surface px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
        <div
          aria-hidden
          className="absolute inset-0 z-base opacity-[0.4] [background-image:linear-gradient(to_right,rgba(91,119,201,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(91,119,201,0.16)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]"
        />
        <GlowBackdrop variant="hero" className="z-base" />

        <div className="relative z-raised mx-auto w-full max-w-content">
          <Reveal>
            <span className="type-label inline-flex items-center gap-2.5 border border-white/[0.12] bg-white/[0.04] px-3.5 py-2 text-brand-200">
              Services
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="type-display mt-7 max-w-4xl text-fg text-balance">
              One system. Four surfaces.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="type-body-lg measure mt-7 text-fg-muted text-pretty">
              Voice answers and books. Automations move the data. Video fills the
              top of the funnel. The site converts what arrives.
            </p>
          </Reveal>
        </div>
      </section>

      <Section spacing="lg">
        <ServicesPageGrid services={services} />
      </Section>
    </>
  );
}

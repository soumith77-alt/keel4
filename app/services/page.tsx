import { SITE_URL, additionalServices, primaryServices, services } from '@/config/content';
import ServicesPageGrid from '@/components/ServicesPageGrid';
import FinalCTA from '@/components/FinalCTA';
import { Section } from '@/components/ui/section';
import PageHero from '@/components/ui/page-hero';

const DESCRIPTION =
  'Keeel designs and builds SaaS products, custom CRMs and business systems, websites, and the automation and integrations that connect them.';

export const metadata = {
  title: 'Services - Products, CRMs, Websites & Automation',
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: 'Services | Keeel',
    description: DESCRIPTION,
    url: `${SITE_URL}/services`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | Keeel',
    description: DESCRIPTION,
  },
};

const serviceCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Keeel services',
  description: DESCRIPTION,
  url: `${SITE_URL}/services`,
  numberOfItems: services.length,
  itemListElement: services.map((service, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: service.title,
      url: `${SITE_URL}/services/${service.slug}`,
      description: service.description,
    },
  })),
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
        title="What we design and build."
        lead="Four kinds of work, often in the same project: a product, the business system behind it, the website in front of it, and the integrations between them."
      />

      <Section spacing="md" className="pt-4 sm:pt-6">
        <h2 className="type-h3 mb-6 text-fg">Solutions</h2>
        <ServicesPageGrid services={primaryServices} />

        <h2 className="type-h3 mb-6 mt-16 text-fg">Additional capabilities</h2>
        <ServicesPageGrid services={additionalServices} />
      </Section>

      <FinalCTA />
    </>
  );
}

import { notFound } from 'next/navigation';

import { services } from '@/config/content';
import ServiceLayout from '@/components/ServiceLayout';

type ServiceWithDemo = (typeof services)[0] & {
  demoAudioUrl?: string;
  demoVideoUrl?: string;
};

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: `${service.title} - AI Solutions | Keel`,
    description: service.description,
    alternates: { canonical: `https://saykeel.com/services/${service.slug}` },
    openGraph: {
      title: `${service.title} - Keel`,
      description: service.description,
      url: `https://saykeel.com/services/${service.slug}`,
      type: 'website' as const,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${service.title} - Keel`,
      description: service.description,
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug) as
    | ServiceWithDemo
    | undefined;

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Keel',
      url: 'https://saykeel.com',
    },
    url: `https://saykeel.com/services/${service.slug}`,
    audience: {
      '@type': 'BusinessAudience',
      audienceType: service.useCases.join(', '),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://saykeel.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: 'https://saykeel.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://saykeel.com/services/${service.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServiceLayout service={service} />
    </>
  );
}

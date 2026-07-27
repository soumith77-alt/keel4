import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { projects, calendlyLink } from '@/config/content';
import { Section } from '@/components/ui/section';
import PageHero from '@/components/ui/page-hero';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ProjectCard';

export const metadata = {
  title: 'Work - AI Systems We’ve Built | Keel',
  description:
    'Selected Keel engagements: AI voice agents, business automations, UGC campaigns, and conversion focused websites, with the outcomes each delivered.',
  alternates: { canonical: 'https://saykeel.com/work' },
  openGraph: {
    title: 'Work - AI Systems We’ve Built | Keel',
    description:
      'Selected engagements across voice AI, automations, video, and websites.',
    url: 'https://saykeel.com/work',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work | Keel',
    description:
      'Selected engagements across voice AI, automations, video, and websites.',
  },
};

const workSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Keel Work',
  url: 'https://saykeel.com/work',
  description: 'Selected AI engagements delivered by Keel.',
};

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }}
      />

      <PageHero
        eyebrow="Work"
        title="Systems we’ve shipped."
        lead="Each engagement scoped to a metric, built end to end, and measured against what it was supposed to move."
      />

      <Section spacing="lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                Design my AI system
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/services">See what we build</Link>
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

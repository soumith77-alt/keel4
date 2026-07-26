import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { projects, calendlyLink } from '@/config/content';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import GlowBackdrop from '@/components/ui/glow-backdrop';
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

      <section className="relative isolate overflow-hidden bg-surface px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
        <div
          aria-hidden
          className="absolute inset-0 z-base opacity-[0.4] [background-image:linear-gradient(to_right,rgba(91,119,201,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(91,119,201,0.16)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]"
        />
        <GlowBackdrop variant="hero" className="z-base" />

        <div className="relative z-raised mx-auto w-full max-w-content">
          <Reveal>
            <span className="type-label inline-flex items-center gap-2.5 border border-white/[0.12] bg-white/[0.04] px-3.5 py-2 text-brand-200">
              Work
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="type-display mt-7 max-w-4xl text-fg text-balance">
              Systems we&apos;ve shipped.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="type-body-lg measure mt-7 text-fg-muted text-pretty">
              Each engagement scoped to a metric, built end to end, and measured
              against what it was supposed to move.
            </p>
          </Reveal>
        </div>
      </section>

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
              <Link href="/case-studies">Read the case studies</Link>
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

import { projectChapterEnv, projects } from '@/config/content';
import PageHero from '@/components/ui/page-hero';
import { ProjectChapter } from '@/components/FeaturedWork';
import FinalCTA from '@/components/FinalCTA';

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
        className="pb-4"
      />

      {/**
        * The card grid is gone.
        *
        * /work was the last page still running the old website's design: a
        * two-column grid of white cards with a cropped thumbnail in each. It
        * showed the same projects as the homepage in a completely different
        * visual language, which made the homepage chapters look like a
        * one-off rather than like how Keel presents work.
        *
        * It now uses the SAME `<ProjectChapter>` the homepage does — same
        * 16:10 stage, same fact structure, same alternation, same rhythm. The
        * only difference between the two pages is how many chapters run.
        */}
      <h2 className="sr-only">Selected engagements</h2>

      {projects.map((project, i) => (
        <ProjectChapter
          key={project.slug}
          project={project}
          index={i}
          env={projectChapterEnv(i)}
          media={i % 2 === 0 ? 'right' : 'left'}
          priority={i === 0}
          showDetails
        />
      ))}

      <FinalCTA />
    </>
  );
}

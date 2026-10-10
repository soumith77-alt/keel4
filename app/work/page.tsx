import { SITE_URL, projectChapterEnv, projects } from '@/config/content';
import PageHero from '@/components/ui/page-hero';
import { ProjectChapter } from '@/components/FeaturedWork';
import FinalCTA from '@/components/FinalCTA';

const DESCRIPTION =
  'Selected Keeel projects: SaaS platforms, marketplaces, websites and automation, with what we built for each.';

export const metadata = {
  title: 'Work - Products and Systems We’ve Built',
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/work` },
  openGraph: {
    title: 'Work | Keeel',
    description: DESCRIPTION,
    url: `${SITE_URL}/work`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work | Keeel',
    description: DESCRIPTION,
  },
};

const workSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Keeel Work',
  url: `${SITE_URL}/work`,
  description: DESCRIPTION,
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
        title="Products and systems we’ve built."
        lead="Platforms, marketplaces, websites and automation, each designed and built end to end."
        className="pb-4"
      />

      {/**
        * The card grid is gone.
        *
        * /work was the last page still running the old website's design: a
        * two-column grid of white cards with a cropped thumbnail in each. It
        * showed the same projects as the homepage in a completely different
        * visual language, which made the homepage chapters look like a
        * one-off rather than like how Keeel presents work.
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

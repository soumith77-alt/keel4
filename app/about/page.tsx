import { Section } from '@/components/ui/section';
import PageHero from '@/components/ui/page-hero';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';
import FinalCTA from '@/components/FinalCTA';

export const metadata = {
  title: 'About Keel - Agentic AI Solutions Studio',
  description:
    'Keel is an Agentic AI Solutions Studio building Voice AI systems, business automations, UGC content, AI video, and high converting websites. Real results in 2 to 4 weeks.',
  alternates: { canonical: 'https://saykeel.com/about' },
  openGraph: {
    title: 'About Keel - Agentic AI Solutions Studio',
    description:
      'We build Voice AI, automations, UGC content, and websites for businesses that scale. Real measurable results.',
    url: 'https://saykeel.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Keel - Agentic AI Solutions Studio',
    description:
      'Voice AI, automations, UGC content, and websites for businesses that scale.',
  },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Keel',
  url: 'https://saykeel.com/about',
  description:
    'Keel is an Agentic AI Solutions Studio building Voice AI, automations, UGC content, AI video, and websites.',
  mainEntity: {
    '@type': 'Organization',
    name: 'Keel',
    url: 'https://saykeel.com',
    email: 'hello@saykeel.com',
    description:
      'We build premium AI solutions that drive measurable business outcomes. Voice AI, automations, UGC ads, AI video, and websites.',
  },
};

/**
 * ABOUT — the same system as every other route.
 *
 * This page used to run its own design language: the old heavy display face,
 * a four-up grid of glow cards, its own spacing rhythm, and a bespoke navy
 * CTA band with a radial highlight that appeared nowhere else. Read next to
 * the homepage it looked like the previous version of the website, which is
 * precisely what a visitor moving between the two would conclude.
 *
 * Nothing here is About-specific any more. It uses the shared type roles, the
 * shared section rhythm, the shared border and label system, and the shared
 * final CTA — and its one expressive moment ("a number") is the same editorial
 * serif the homepage gives to "compound", used once, on purpose.
 */

/**
 * FOUR COMMITMENTS. Not three principles AND four commitments.
 *
 * The page previously ran both lists, and they said the same things twice:
 * "Move in weeks" beside "Fast deployment", "Build the whole system" beside
 * "One system, not four projects". Two sections, eight items, four ideas.
 * This is the merge — every idea kept, said once.
 */
const COMMITMENTS = [
  {
    n: '01',
    title: 'Find the number first',
    body: 'Goals and bottlenecks before tools. If a build won’t move the metric, we say so before you pay for it.',
  },
  {
    n: '02',
    title: 'One system, not four projects',
    body: 'Voice, automation, video and web are designed to feed each other rather than sit in separate silos.',
  },
  {
    n: '03',
    title: 'Move in weeks',
    body: 'Most solutions launch within 2 to 4 weeks. Voice agents can be live in as little as one week.',
  },
  {
    n: '04',
    title: 'Stay after launch',
    body: 'Most of the gain arrives from tuning against real traffic, not from the first release.',
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <PageHero
        eyebrow="About"
        title="We build AI that moves a number."
        lead="We solve real business problems with AI without buzzwords or half-finished experiments."
        className="pb-12"
      />

      {/* One section, not three. The statement and four commitments say each
          idea once, without repeating the homepage workflow illustration. */}
      <Section tone="raised" spacing="md">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="type-label flex items-center gap-3 text-signal">
                <span aria-hidden className="h-px w-8 bg-accent-600" />
                How we work
              </span>
              <h2 className="type-h2 mt-4 text-fg text-balance">
                Start with the metric, not with the tech.
              </h2>
              <p className="type-body measure mt-5 text-fg-muted text-pretty">
                Four commitments shape every engagement, and they are the things
                we expect to be held to.
              </p>
            </Reveal>

          </div>

          <RevealGroup className="grid self-start border-t border-line/15 lg:col-span-7">
            {COMMITMENTS.map((item) => (
              <RevealItem
                key={item.title}
                className="grid gap-2 border-b border-line/15 py-6 sm:grid-cols-[auto_1fr_1.5fr] sm:items-baseline sm:gap-x-8"
              >
                <span className="type-mono-sm text-fg-subtle">{item.n}</span>
                <h3 className="type-h4 text-fg">{item.title}</h3>
                <p className="type-body text-fg-muted text-pretty">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}

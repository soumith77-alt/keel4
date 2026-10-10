import { Section } from '@/components/ui/section';
import PageHero from '@/components/ui/page-hero';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/reveal';
import FinalCTA from '@/components/FinalCTA';
import { CONTACT_EMAIL, SITE_URL } from '@/config/content';

const DESCRIPTION =
  'Keeel is a product and software studio. We design and build SaaS products, custom CRMs and business systems, websites, and the automation that connects them.';

export const metadata = {
  title: 'About - Product & Software Studio',
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'About Keeel - Product & Software Studio',
    description: DESCRIPTION,
    url: `${SITE_URL}/about`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Keeel - Product & Software Studio',
    description: DESCRIPTION,
  },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Keeel',
  url: `${SITE_URL}/about`,
  description: DESCRIPTION,
  mainEntity: {
    '@type': 'Organization',
    name: 'Keeel',
    url: SITE_URL,
    email: CONTACT_EMAIL,
    description: DESCRIPTION,
  },
};

/**
 * Four commitments, each one something the rest of the site can back up.
 * The previous set promised a 2 to 4 week launch for every project, which
 * does not hold for a SaaS build or a CRM, and "stay after launch", which
 * implied support is included. Support is offered separately (see the FAQ).
 */
const COMMITMENTS = [
  {
    n: '01',
    title: 'Start with the problem',
    body: 'The users, the workflow and the scope come before the tools. If something shouldn’t be built, we say so before you pay for it.',
  },
  {
    n: '02',
    title: 'One system, not separate projects',
    body: 'Product, website, CRM and integrations are designed to work together rather than sit in separate silos.',
  },
  {
    n: '03',
    title: 'Ship working software',
    body: 'A deployed, usable product at handoff, not a deck or a disconnected prototype.',
  },
  {
    n: '04',
    title: 'You own what we build',
    body: 'Repositories, accounts, documentation and credentials stay with you from handoff.',
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
        title="We build products and the systems behind them."
        lead="Keeel is a product and software studio. We design and build SaaS products, custom CRMs, websites and the workflows that connect them, and use AI where it genuinely helps."
        className="pb-12"
      />

      {/* One section, not three. The statement and four commitments say each
          idea once, without repeating the homepage workflow illustration. */}
      <Section tone="raised" spacing="md">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="type-label text-signal">How we work</span>
              <h2 className="type-h2 mt-4 text-fg text-balance">
                Start with the work, not with the tech.
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

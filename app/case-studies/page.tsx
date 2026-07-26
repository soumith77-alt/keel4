import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { caseStudies, calendlyLink } from "@/config/content";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import GlowBackdrop from "@/components/ui/glow-backdrop";

export const metadata = {
  title: "Case Studies - Real AI Results | Keel",
  description:
    "Real results from real clients. Keel's Voice AI reduced no shows by 18%, automations cut onboarding from 2 hours to 15 minutes, and UGC campaigns achieved 3x ROAS.",
  alternates: { canonical: 'https://saykeel.com/case-studies' },
  openGraph: {
    title: 'Case Studies - Real AI Results | Keel',
    description: 'Voice AI, automations, and UGC results: 40% more bookings, 80% less manual work, 3x ROAS.',
    url: 'https://saykeel.com/case-studies',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies - Real AI Results | Keel',
    description: 'Real results: 40% more bookings, 80% less manual work, 3x ROAS.',
  },
};

const caseStudiesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Keel AI Case Studies',
  description: "Real results from businesses using Keel's AI voice agents, automations, and UGC campaigns.",
  url: 'https://saykeel.com/case-studies',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Article',
        name: 'Dental Clinic Increases Bookings by 40%',
        description: "Premier Dental Care implemented a 24/7 AI receptionist. Result: 40% increase in appointments booked, 87% call to booking conversion rate, 18% reduction in no shows.",
        url: 'https://saykeel.com/case-studies#dental-clinic',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Article',
        name: 'SaaS Platform Automates 80% of Onboarding',
        description: "TechFlow Inc. used Keel's agentic AI to automate end to end customer onboarding. Result: 80% reduction in manual work, two hour process reduced to 15 minutes.",
        url: 'https://saykeel.com/case-studies#saas-platform',
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Article',
        name: 'Ecommerce Brand Achieves 3x ROAS with UGC Campaign',
        description: "StyleCo launched an authentic UGC ad campaign with Keel. Result: 3x return on ad spend, 45% lower cost per acquisition, 2.5x higher conversion rates.",
        url: 'https://saykeel.com/case-studies#ecommerce-brand',
      },
    },
  ],
};

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesSchema) }}
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
              Case studies
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="type-display mt-7 max-w-4xl text-fg text-balance">
              What the systems actually did.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="type-body-lg measure mt-7 text-fg-muted text-pretty">
              Engagements start to finish, the problem, what we built, and the
              numbers that came out the other side.
            </p>
          </Reveal>
        </div>
      </section>

      <Section spacing="lg">
        <div className="space-y-4">
          {caseStudies.map((study, i) => (
            <Reveal key={study.id} delay={i * 0.05}>
              <GlowCard>
                <article id={study.id} className="scroll-mt-28 p-7 sm:p-9">
                  <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-7">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="type-label text-brand-300">
                          {study.service}
                        </span>
                        <span aria-hidden className="h-1 w-1 rounded-full bg-white/20" />
                        <span className="type-label text-fg-subtle">
                          {study.industry}
                        </span>
                      </div>

                      <h2 className="type-h2 mt-5 text-fg text-balance">
                        {study.title}
                      </h2>

                      <dl className="mt-7 space-y-5">
                        <div>
                          <dt className="type-label mb-1.5 text-fg-subtle">
                            Client
                          </dt>
                          <dd className="text-sm text-fg-muted">{study.client}</dd>
                        </div>
                        <div>
                          <dt className="type-label mb-1.5 text-fg-subtle">
                            Challenge
                          </dt>
                          <dd className="text-sm leading-relaxed text-fg-muted">
                            {study.challenge}
                          </dd>
                        </div>
                        <div>
                          <dt className="type-label mb-1.5 text-fg-subtle">
                            What we built
                          </dt>
                          <dd className="text-sm leading-relaxed text-fg-muted">
                            {study.solution}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="lg:col-span-5">
                      <span className="type-label text-fg-subtle">Results</span>
                      <ul className="mt-4 space-y-px">
                        {study.results.map((result) => (
                          <li
                            key={result}
                            className="border-t border-white/[0.08] py-4 text-sm text-fg first:border-t-0"
                          >
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </GlowCard>
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
              <Link href="/#services">See our services</Link>
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

import { ArrowRight, Clock, Mail, MessageCircle } from 'lucide-react';

import ContactForm from '@/components/ContactForm';
import FAQ from '@/components/FAQ';
import { CONTACT_EMAIL, SITE_URL, projectBookingLink, whatsappLink, faqs } from '@/config/content';
import { Section } from '@/components/ui/section';
import PageHero from '@/components/ui/page-hero';
import { Button } from '@/components/ui/button';
import { GlowCard } from '@/components/ui/glow-card';

const DESCRIPTION =
  'Tell Keeel about the product, website, CRM or workflow you have in mind. We reply within one business day.';

export const metadata = {
  title: 'Contact - Discuss Your Project',
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: 'Contact Keeel - Discuss Your Project',
    description: DESCRIPTION,
    url: `${SITE_URL}/contact`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Keeel - Discuss Your Project',
    description: DESCRIPTION,
  },
};

/**
 * Moved here from the homepage along with the FAQ section itself. The schema
 * must stay on the same page as the visible Q&A — Google treats FAQPage
 * markup without matching on-page content as a violation.
 */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Keeel',
  url: `${SITE_URL}/contact`,
  description: DESCRIPTION,
  mainEntity: {
    '@type': 'Organization',
    name: 'Keeel',
    url: SITE_URL,
    email: CONTACT_EMAIL,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: CONTACT_EMAIL,
      availableLanguage: 'English',
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow="Contact"
        title="Discuss your project."
        lead="Tell us about the product, website, CRM or workflow you have in mind. We reply within one business day."
        className="pb-20"
      />

      <Section spacing="md">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Form */}
          <div className="lg:col-span-7">
            <GlowCard>
              <div className="p-7 sm:p-9">
                <h2 className="type-h4 text-fg">Send us a message</h2>
                <p className="type-small mt-2 text-fg-muted">
                  A few lines is enough. We&apos;ll come back with questions
                  and a view on how we&apos;d approach it.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Direct routes */}
          <div className="lg:col-span-5">
            <div className="space-y-4 lg:sticky lg:top-28">
              {/* Shown only when a general project booking link exists. The
                  current Cal.com event is a voice agent demo, so it is not
                  offered as a general project call. */}
              {projectBookingLink && (
                <GlowCard>
                  <div className="p-7">
                    <h2 className="type-h4 text-fg">Prefer to pick a time?</h2>
                    <p className="type-small mt-3 text-fg-muted">
                      A 30 minute call to talk through what you want to build.
                    </p>
                    <Button asChild size="lg" className="mt-6 w-full">
                      <a href={projectBookingLink} target="_blank" rel="noopener noreferrer">
                        Book a call
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </a>
                    </Button>
                  </div>
                </GlowCard>
              )}

              <div className="rounded-panel border border-hairline bg-surface-raised p-7">
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <Mail
                      className="mt-0.5 h-5 w-5 shrink-0 text-signal"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <div>
                      <span className="type-label block text-fg-subtle">Email</span>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="type-small mt-1 inline-flex min-h-[44px] items-center text-fg transition-colors duration-base hover:text-signal"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <MessageCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-signal"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <div>
                      <span className="type-label block text-fg-subtle">
                        WhatsApp
                      </span>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="type-small mt-1 inline-flex min-h-[44px] items-center text-fg transition-colors duration-base hover:text-signal"
                      >
                        Message us directly
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Clock
                      className="mt-0.5 h-5 w-5 shrink-0 text-signal"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <div>
                      <span className="type-label block text-fg-subtle">
                        Response time
                      </span>
                      <p className="type-small mt-1 text-fg-muted">
                        Within one business day.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <FAQ />
    </>
  );
}

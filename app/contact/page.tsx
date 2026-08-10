import { ArrowRight, Clock, Mail, MessageCircle } from 'lucide-react';

import ContactForm from '@/components/ContactForm';
import FAQ from '@/components/FAQ';
import { calendlyLink, whatsappLink, faqs } from '@/config/content';
import { Section } from '@/components/ui/section';
import PageHero from '@/components/ui/page-hero';
import { Button } from '@/components/ui/button';
import { GlowCard } from '@/components/ui/glow-card';

export const metadata = {
  title: 'Contact Keel - Book a Free AI Discovery Call',
  description:
    'Get in touch with Keel. Book a free 30 minute discovery call to discuss how AI voice agents, automations, or UGC content can grow your business.',
  alternates: { canonical: 'https://saykeel.com/contact' },
  openGraph: {
    title: 'Contact Keel - Book a Free AI Discovery Call',
    description:
      'Book a free 30 minute discovery call. AI voice agents, automations, UGC content, and websites.',
    url: 'https://saykeel.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Keel - Book a Free AI Discovery Call',
    description:
      'Book a free 30 minute call with Keel to discuss AI solutions for your business.',
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
  name: 'Contact Keel',
  url: 'https://saykeel.com/contact',
  description:
    'Book a free 30 minute discovery call or send a message to discuss your AI solution needs.',
  mainEntity: {
    '@type': 'Organization',
    name: 'Keel',
    url: 'https://saykeel.com',
    email: 'hello@saykeel.com',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'hello@saykeel.com',
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
        title="Let’s scope your system."
        lead="Book a call or send a message. We reply within one business day, and we’ll tell you if AI isn’t the right answer."
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
                  Tell us what you&apos;re trying to fix and we&apos;ll come back
                  with a view on whether we can help.
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
              <GlowCard>
                <div className="p-7">
                  <h2 className="type-h4 text-fg">Prefer to pick a time?</h2>
                  <p className="type-small mt-3 text-fg-muted">
                    A 30 minute walkthrough. We&apos;ll show live examples and
                    discuss how this maps onto your business.
                  </p>
                  <Button asChild size="lg" className="mt-6 w-full">
                    <a
                      href={calendlyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book a call
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </a>
                  </Button>
                </div>
              </GlowCard>

              <div className="rounded-panel border border-line/15 bg-fg/[0.02] p-7">
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <Mail
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent-700"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <div>
                      <span className="type-label block text-fg-subtle">Email</span>
                      <a
                        href="mailto:hello@saykeel.com"
                        className="type-small mt-1 inline-flex min-h-[44px] items-center text-fg transition-colors duration-base hover:text-accent-600"
                      >
                        hello@saykeel.com
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <MessageCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent-700"
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
                        className="type-small mt-1 inline-flex min-h-[44px] items-center text-fg transition-colors duration-base hover:text-accent-600"
                      >
                        Message us directly
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Clock
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent-700"
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

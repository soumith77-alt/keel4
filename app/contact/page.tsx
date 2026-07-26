import { ArrowRight, Clock, Mail, MessageCircle } from 'lucide-react';

import ContactForm from '@/components/ContactForm';
import { calendlyLink, whatsappLink } from '@/config/content';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { GlowCard } from '@/components/ui/glow-card';
import GlowBackdrop from '@/components/ui/glow-backdrop';

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

      <section className="relative isolate overflow-hidden bg-surface px-5 pb-20 pt-36 sm:px-8 sm:pt-44">
        <div
          aria-hidden
          className="absolute inset-0 z-base opacity-[0.4] [background-image:linear-gradient(to_right,rgba(91,119,201,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(91,119,201,0.16)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]"
        />
        <GlowBackdrop variant="hero" className="z-base" />

        <div className="relative z-raised mx-auto w-full max-w-content">
          <Reveal>
            <span className="type-label inline-flex items-center gap-2.5 border border-white/[0.12] bg-white/[0.04] px-3.5 py-2 text-brand-200">
              Contact
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="type-display mt-7 max-w-3xl text-fg text-balance">
              Let&apos;s scope your system.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="type-body-lg measure mt-7 text-fg-muted text-pretty">
              Book a call or send a message. We reply within one business day,
              and we&apos;ll tell you if AI isn&apos;t the right answer.
            </p>
          </Reveal>
        </div>
      </section>

      <Section spacing="lg">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Form */}
          <div className="lg:col-span-7">
            <GlowCard>
              <div className="p-7 sm:p-9">
                <h2 className="type-h3 text-fg">Send us a message</h2>
                <p className="mt-2 text-sm text-fg-muted">
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
                  <h2 className="type-h3 text-fg">Prefer to pick a time?</h2>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
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

              <div className="rounded-panel border border-white/[0.1] bg-white/[0.02] p-7">
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <Mail
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-300"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <div>
                      <span className="type-label block text-fg-subtle">Email</span>
                      <a
                        href="mailto:hello@saykeel.com"
                        className="mt-1 block text-sm text-fg transition-colors duration-base hover:text-brand-200"
                      >
                        hello@saykeel.com
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <MessageCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-300"
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
                        className="mt-1 block text-sm text-fg transition-colors duration-base hover:text-brand-200"
                      >
                        Message us directly
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Clock
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-300"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <div>
                      <span className="type-label block text-fg-subtle">
                        Response time
                      </span>
                      <p className="mt-1 text-sm text-fg-muted">
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
    </>
  );
}

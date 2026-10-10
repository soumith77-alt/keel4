import { CONTACT_EMAIL, projectBookingLink } from '@/config/content';
import ContactForm from '@/components/ContactForm';
import { Reveal } from '@/components/ui/reveal';
import { Eyebrow } from '@/components/ui/keel';

/**
 * FINAL CTA — one complete enquiry, sent from here.
 *
 * This used to be a two-question brief that navigated to /contact for name
 * and email: two steps, and a visitor could reasonably believe they had sent
 * something when they had not. It is now the real form in its compact
 * layout, posting to the same endpoint as /contact.
 *
 * `id="start"` is where the hero's "Start a project" lands. "Book a call"
 * appears only once a general project booking link is configured.
 */
export default function FinalCTA() {
  return (
    <section id="start" aria-labelledby="cta-heading" className="section-y bg-surface">
      <div className="site-container">
        <div className="grid gap-10 overflow-hidden rounded-[28px] border border-hairline bg-surface-raised p-6 shadow-glow-sm sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Start a project</Eyebrow>
            <h2 id="cta-heading" className="type-h2 mt-4 text-fg text-balance">
              What are you ready to build?
            </h2>
            <p className="type-body-lg mt-5 max-w-[28rem] text-fg-muted text-pretty">
              Tell us about the product, website, or workflow you have in mind.
            </p>
            <ul className="mt-8 space-y-2 text-[0.9375rem] text-fg-muted">
              <li>
                Prefer email?{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-fg underline decoration-fg/30 underline-offset-4 transition-colors hover:decoration-accent-500"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              {projectBookingLink && (
                <li>
                  Or{' '}
                  <a
                    href={projectBookingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-fg underline decoration-fg/30 underline-offset-4 hover:decoration-accent-500"
                  >
                    book a call
                  </a>
                </li>
              )}
            </ul>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-7">
            <ContactForm compact />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

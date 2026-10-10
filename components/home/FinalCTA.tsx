'use client';

import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

import { CONTACT_EMAIL, projectBookingLink, projectTypes } from '@/config/content';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

/**
 * FINAL CTA with a two-question brief.
 *
 * This is a NAVIGATION step, not a submission. The site is a static export,
 * so the brief is carried into /contact as query parameters, where the real
 * form opens with the project type selected and the description filled in.
 * Nothing is sent from here and the copy under the button says so.
 *
 * It is a real GET form with action="/contact", so it works without
 * JavaScript; with JavaScript it navigates client-side. Both fields are
 * optional — an empty brief simply opens the contact form.
 *
 * "Book a call" only appears if a general project booking link is
 * configured. The existing Cal.com event is a voice agent demo and is not
 * offered here (see `projectBookingLink` in config/content.ts).
 */
export default function FinalCTA() {
  const router = useRouter();
  const groupId = useId();
  const noteId = useId();
  const helpId = useId();
  const [type, setType] = useState('');
  const [note, setNote] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (note.trim()) params.set('note', note.trim());
    const qs = params.toString();
    router.push(qs ? `/contact?${qs}` : '/contact');
  };

  return (
    <section aria-labelledby="cta-heading" className="section-y bg-surface">
      <div className="site-container">
        <div className="grid gap-10 overflow-hidden rounded-[28px] border border-hairline bg-surface-raised p-6 shadow-glow-sm sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
          <Reveal className="lg:col-span-5">
            <p className="type-label text-signal">Start a project</p>
            <h2 id="cta-heading" className="type-h2 mt-4 text-fg text-balance">
              What are you ready to build?
            </h2>
            <p className="type-body-lg mt-5 max-w-[28rem] text-fg-muted text-pretty">
              Tell us about the product, website, or workflow you have in mind.
            </p>
            <p className="mt-8 text-[0.9375rem] text-fg-muted">
              Prefer email?{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-fg underline decoration-fg/30 underline-offset-4 transition-colors hover:decoration-emerald"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-7">
            <form action="/contact" method="get" onSubmit={submit} aria-describedby={helpId}>
              <fieldset>
                <legend className="text-[0.9375rem] font-semibold text-fg">
                  What kind of project is it?{' '}
                  <span className="font-normal text-fg-subtle">(optional)</span>
                </legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {projectTypes.map((option) => {
                    const id = `${groupId}-${option.replace(/\W+/g, '-')}`;
                    const selected = type === option;
                    return (
                      <div key={option}>
                        <input
                          type="radio"
                          id={id}
                          name="type"
                          value={option}
                          checked={selected}
                          onChange={() => setType(option)}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={id}
                          className={cn(
                            'flex min-h-[44px] cursor-pointer items-center rounded-pill border px-4 text-[0.9375rem] transition-colors duration-fast ease-micro',
                            'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#146C50]',
                            selected
                              ? 'border-emerald bg-emerald font-medium text-white'
                              : 'border-hairline bg-surface text-fg-muted hover:border-line/25 hover:text-fg',
                          )}
                        >
                          {option}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-7">
                <label htmlFor={noteId} className="text-[0.9375rem] font-semibold text-fg">
                  A short description{' '}
                  <span className="font-normal text-fg-subtle">(optional)</span>
                </label>
                <textarea
                  id={noteId}
                  name="note"
                  rows={3}
                  maxLength={600}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. A client portal where customers can track orders and download invoices."
                  className="mt-3 w-full resize-none rounded-card border border-hairline bg-surface px-4 py-3 text-base text-fg transition-colors duration-fast placeholder:text-fg-subtle hover:border-line/25 focus:border-emerald focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#146C50]"
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Discuss your project
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
                {projectBookingLink && (
                  <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                    <a href={projectBookingLink} target="_blank" rel="noopener noreferrer">
                      Book a call
                    </a>
                  </Button>
                )}
              </div>
              <p id={helpId} className="mt-4 text-sm text-fg-subtle text-pretty">
                Next, you’ll add your name and email on the contact form. Nothing
                is sent until you submit it there.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

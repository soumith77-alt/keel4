'use client';

import { useId, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

import { calendlyLink } from '@/config/content';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * THE FINAL CTA — a compact brief, not a fourth oversized headline.
 *
 * The page already carries three display-scale headlines by the time a
 * visitor reaches the bottom. A fourth one asking them to "get in touch"
 * adds volume and no information. Two fields do more work: they qualify the
 * conversation and they give the visitor something to do.
 *
 * WHERE IT GOES. This site is a static export (`next.config.mjs` +
 * `wrangler.jsonc`), so there is no server action to post to. Rather than
 * fake a submission, the brief is carried into /contact as query parameters
 * and the full form there opens pre-filled. That is a real handoff, it works
 * with JavaScript disabled at the form level (the fields are a real <form>
 * with a GET-shaped fallback), and the visitor is told exactly what happens
 * before they press the button.
 *
 * The chips are real radio inputs. They could have been buttons with
 * `aria-pressed`, but radios give arrow-key navigation, the required-group
 * semantic and native form validation for free — and a segmented choice is
 * exactly what a radio group is for.
 */

const FOCUSES = [
  { value: 'revenue', label: 'Revenue' },
  { value: 'operations', label: 'Operations' },
  { value: 'customer-experience', label: 'Customer experience' },
  { value: 'product', label: 'Product' },
  { value: 'content', label: 'Content' },
];

export default function BriefForm() {
  const router = useRouter();
  const groupId = useId();
  const noteId = useId();
  const errorId = useId();

  const [focus, setFocus] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const noteRef = useRef<HTMLInputElement>(null);
  const firstChipRef = useRef<HTMLInputElement>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate in reading order and move focus to the first thing that is
    // wrong — an error message nobody is taken to is an error message nobody
    // reads.
    if (!focus) {
      setError('Choose what your next system should improve.');
      firstChipRef.current?.focus();
      return;
    }
    if (note.trim().length < 3) {
      setError('Add a line about the current bottleneck.');
      noteRef.current?.focus();
      return;
    }

    setError(null);
    const params = new URLSearchParams({ focus, note: note.trim() });
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <Section
      tone="none"
      spacing="lg"
      className="theme-obsidian overflow-hidden bg-surface text-fg"
      id="brief"
    >

      <div className="relative z-raised grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <span className="type-label text-fg-subtle">Next step</span>
          <h2 className="type-h2 mt-5 text-fg text-balance">
            What should your next system improve?
          </h2>
          <p className="type-body measure-tight mt-4 text-fg-muted text-pretty">
            Two answers is enough to start. We&apos;ll come back with where a
            system would help — and where it wouldn&apos;t.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-7">
          <form onSubmit={submit} noValidate>
            <fieldset>
              <legend className="type-mono-sm text-fg-subtle">
                Area to improve
              </legend>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {FOCUSES.map((option, i) => {
                  const id = `${groupId}-${option.value}`;
                  const selected = focus === option.value;
                  return (
                    <div key={option.value}>
                      {/* `sr-only` rather than `hidden`: the input has to stay
                          focusable and reachable, it just isn't what gets
                          painted. The visible chip is the <label>. */}
                      <input
                        ref={i === 0 ? firstChipRef : undefined}
                        type="radio"
                        id={id}
                        name="focus"
                        value={option.value}
                        checked={selected}
                        onChange={() => {
                          setFocus(option.value);
                          setError(null);
                        }}
                        className="peer sr-only"
                        aria-describedby={error ? errorId : undefined}
                      />
                      <label
                        htmlFor={id}
                        className={cn(
                          'flex min-h-[44px] cursor-pointer items-center rounded-pill border px-4 text-sm transition-colors duration-fast ease-micro',
                          // The focus ring has to live on the LABEL, because
                          // the input it belongs to is visually hidden.
                          'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-500',
                          selected
                            ? 'border-accent-500 bg-accent-500 font-semibold text-ink'
                            : 'border-line/20 text-fg-muted hover:border-line/40 hover:bg-fg/[0.06]',
                        )}
                      >
                        {option.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-7">
              <label htmlFor={noteId} className="type-mono-sm block text-fg-subtle">
                Briefly describe the current bottleneck
              </label>
              <input
                ref={noteRef}
                id={noteId}
                name="note"
                type="text"
                value={note}
                maxLength={160}
                onChange={(e) => {
                  setNote(e.target.value);
                  setError(null);
                }}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                placeholder="e.g. after-hours calls go to voicemail and never come back"
                className="mt-3 h-14 w-full rounded-card border border-line/20 bg-fg/[0.05] px-4 text-base text-fg transition-colors duration-fast ease-micro placeholder:text-fg-subtle hover:border-line/35 focus:border-accent-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
              />
            </div>

            {/* `role="alert"` so the message is announced when it appears,
                and it is tied to both controls via aria-describedby. */}
            {error && (
              <p
                id={errorId}
                role="alert"
                className="type-body mt-3 text-signal"
              >
                {error}
              </p>
            )}

            <p className="type-small mt-6 text-fg-muted text-pretty">
              Next, you&apos;ll review these answers on the contact form and add
              your name and email. Nothing is sent yet.
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button type="submit" size="lg" variant="inverse" className="w-full sm:w-auto">
                Continue to contact form
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full border-line/25 bg-fg/[0.06] text-fg hover:border-line/40 hover:bg-fg/[0.12] sm:w-auto"
              >
                <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                  Book a call
                </a>
              </Button>
            </div>

          </form>
        </Reveal>
      </div>
    </Section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

import { CONTACT_EMAIL, contactTypes } from '@/config/content';

/**
 * The homepage brief and every service page hand off here with `type` (one
 * of `contactTypes`) and `note` (a short description) as query parameters.
 * A recognised `type` pre-selects the dropdown; `note` opens the details
 * field. Unknown values are ignored rather than guessed at.
 */
export default function ContactForm() {
  const [prefilled, setPrefilled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    details: '',
  });

  /**
   * HONEYPOT. Never shown, never focusable, never announced — a human cannot
   * fill this in, so anything arriving with it populated is a bot. A public
   * POST endpoint attracts automated traffic within weeks; this is the
   * cheapest defence and costs a real visitor nothing — no captcha, no extra
   * request, no third-party script.
   *
   * IT IS DELIBERATELY UNCONTROLLED, read from the DOM at submit time rather
   * than mirrored into React state. The first version was a controlled input
   * and it did not work: React tracks the value setter on its inputs, so
   * anything that writes `input.value` directly — which is exactly what a
   * headless bot does — never fires `onChange`, leaves the state empty, and
   * sails through the check. Reading the node at submit catches the value
   * however it got there.
   */
  const honeypotRef = useRef<HTMLInputElement>(null);

  /**
   * Read the handoff params from `window.location` rather than
   * `useSearchParams`. The hook forces the component under a Suspense
   * boundary in a static export, and a `fallback` of nothing meant the form's
   * card rendered EMPTY on first paint and then grew to full height once the
   * boundary resolved — a 0.118 layout shift, on the page whose entire job is
   * to be filled in. Nothing here is needed before mount, so an effect reading
   * the URL directly is both simpler and stable.
   */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const note = params.get('note')?.trim();
    const service = type && (contactTypes as readonly string[]).includes(type) ? type : '';
    if (!service && !note) return;

    setFormData((prev) => ({
      ...prev,
      service: prev.service || service,
      details: prev.details || note || '',
    }));
    // The notice is only for carried-over text; a pre-selected dropdown is
    // self-evident.
    if (note) setPrefilled(true);
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  /**
   * This used to `console.log` the payload, wait a second and report success —
   * a form that silently discarded every enquiry while telling the sender it
   * had arrived. The homepage brief now routes people here, so it had to
   * actually deliver.
   *
   * The site is a static export, so there is no server action available. Two
   * real paths instead:
   *   · NEXT_PUBLIC_FORM_ENDPOINT set → POST the payload to it (Formspree,
   *     a Worker, whatever is wired up).
   *   · Not set → hand off to the visitor's mail client, pre-composed. Not
   *     elegant, but the message genuinely reaches hello@saykeel.com, which
   *     the previous version did not.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // A filled honeypot is a bot. Report success and send nothing — telling
    // it that it failed just teaches it to try again differently.
    if (honeypotRef.current?.value) {
      setSubmitStatus('success');
      setIsSubmitting(false);
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      } else {
        const subject = `New project enquiry — ${formData.service || 'General'}`;
        const body = [
          `Name: ${formData.name}`,
          `Email: ${formData.email}`,
          formData.company ? `Business: ${formData.company}` : null,
          `Service: ${formData.service}`,
          '',
          formData.details,
        ]
          .filter((line) => line !== null)
          .join('\n');
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
          subject,
        )}&body=${encodeURIComponent(body)}`;
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        details: '',
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {/* Positioned off-screen rather than `display: none` — some bots skip
          hidden inputs but fill anything they can find in the DOM.
          `tabIndex={-1}` and `aria-hidden` keep it away from keyboard users
          and screen readers, and autocomplete is off so a browser never
          helpfully fills it in for a real person. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="_gotcha">Leave this field empty</label>
        <input
          type="text"
          id="_gotcha"
          name="_gotcha"
          ref={honeypotRef}
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <div className="space-y-6">
        {prefilled && (
          <p
            role="status"
            className="type-body rounded-control border border-[#146C50]/25 bg-mint p-4 text-fg-muted"
          >
            We&apos;ve carried your description over into the details below.
            Add your name and email and it&apos;s ready to send.
          </p>
        )}

        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-[0.9375rem] font-medium text-fg">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-control border border-hairline bg-surface-raised px-4 py-3 text-base text-fg transition-colors duration-fast placeholder:text-fg-subtle hover:border-line/25 focus:border-emerald focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#146C50]"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-[0.9375rem] font-medium text-fg">
            Work email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-control border border-hairline bg-surface-raised px-4 py-3 text-base text-fg transition-colors duration-fast placeholder:text-fg-subtle hover:border-line/25 focus:border-emerald focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#146C50]"
            placeholder="you@company.com"
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="mb-2 block text-[0.9375rem] font-medium text-fg">
            Business name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full rounded-control border border-hairline bg-surface-raised px-4 py-3 text-base text-fg transition-colors duration-fast placeholder:text-fg-subtle hover:border-line/25 focus:border-emerald focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#146C50]"
            placeholder="Your company name"
          />
        </div>

        {/* Service Dropdown */}
        <div>
          <label htmlFor="service" className="mb-2 block text-[0.9375rem] font-medium text-fg">
            What are you looking to build? *
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full rounded-control border border-hairline bg-surface-raised px-4 py-3 text-base text-fg transition-colors duration-fast placeholder:text-fg-subtle hover:border-line/25 focus:border-emerald focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#146C50]"
          >
            <option value="">Select a project type</option>
            {contactTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Details */}
        <div>
          <label htmlFor="details" className="mb-2 block text-[0.9375rem] font-medium text-fg">
            Details
          </label>
          <textarea
            id="details"
            name="details"
            rows={5}
            value={formData.details}
            onChange={handleChange}
            className="w-full rounded-control border border-hairline bg-surface-raised px-4 py-3 text-base text-fg transition-colors duration-fast placeholder:text-fg-subtle hover:border-line/25 focus:border-emerald focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#146C50] resize-none"
            placeholder="What are you building, who is it for, and what does it need to connect to?"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-[3.25rem] w-full rounded-pill bg-emerald px-8 text-base font-semibold text-white shadow-accent transition-colors duration-fast hover:bg-emerald-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Sending…' : 'Send message'}
        </button>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div
            role="status"
            className="rounded-control border border-[#146C50]/25 bg-mint p-4 text-fg"
          >
            {process.env.NEXT_PUBLIC_FORM_ENDPOINT
              ? "Thank you! We'll get back to you within one business day."
              : "Your email client should have opened with the message ready — send it and we'll reply within one business day."}
          </div>
        )}

        {/* Error Message */}
        {/* `role="alert"` — the success block had `role="status"` and this had
            nothing, so a screen-reader user submitting a form that failed got
            no indication at all: no announcement, and the visual red block is
            the only signal. A failed submission is exactly the case that must
            be announced. */}
        {submitStatus === 'error' && (
          <div
            role="alert"
            className="rounded-control border border-destructive/30 bg-destructive/10 p-4 text-fg"
          >
            Something went wrong. Please try again or email us directly at {CONTACT_EMAIL}
          </div>
        )}
      </div>
    </form>
  );
}

'use client';

import { useEffect, useState } from 'react';

const serviceOptions = [
  'Voice AI',
  'Agentic AI Automations',
  'UGC Ads',
  'Animation / AI Video',
  'Conversion Websites',
  'Multiple Services',
  'Not Sure Yet'
];

/**
 * The homepage brief hands off here. It carries `focus` (the area the visitor
 * chose) and `note` (their one line about the bottleneck) as query params,
 * and this is where they land: `note` becomes the opening line of the details
 * field, prefixed with the chosen area so the context is not lost.
 *
 * `focus` deliberately does NOT map onto the service dropdown — "Revenue" is
 * not a service, and guessing that revenue means Voice AI would put words in
 * the visitor's mouth. It stays as stated context.
 */
const FOCUS_LABELS: Record<string, string> = {
  revenue: 'Revenue',
  operations: 'Operations',
  'customer-experience': 'Customer experience',
  product: 'Product',
  content: 'Content',
};

export default function ContactForm() {
  const [prefilled, setPrefilled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    details: ''
  });

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
    const focus = params.get('focus');
    const note = params.get('note');
    if (!focus && !note) return;

    const area = focus ? FOCUS_LABELS[focus] : null;
    const details = [
      area ? `Area to improve: ${area}.` : null,
      note?.trim() || null,
    ]
      .filter(Boolean)
      .join('\n\n');

    if (!details) return;
    setFormData((prev) => (prev.details ? prev : { ...prev, details }));
    setPrefilled(true);
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
        const subject = `New enquiry — ${formData.service || 'General'}`;
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
        window.location.href = `mailto:hello@saykeel.com?subject=${encodeURIComponent(
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
      <div className="space-y-6">
        {prefilled && (
          <p
            role="status"
            className="type-body rounded-control border border-accent-600/40 bg-accent-500/10 p-4 text-fg-muted"
          >
            We&apos;ve carried your answers over into the details below. Add
            your name and email and it&apos;s ready to send.
          </p>
        )}

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-fg-muted mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-line/15 rounded-control focus:border-accent-600 focus:outline-none transition-colors"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-fg-muted mb-2">
            Work Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-line/15 rounded-control focus:border-accent-600 focus:outline-none transition-colors"
            placeholder="you@company.com"
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-fg-muted mb-2">
            Business Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-line/15 rounded-control focus:border-accent-600 focus:outline-none transition-colors"
            placeholder="Your company name"
          />
        </div>

        {/* Service Dropdown */}
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-fg-muted mb-2">
            What do you need? *
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-line/15 rounded-control focus:border-accent-600 focus:outline-none transition-colors bg-surface"
          >
            <option value="">Select a service</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Details */}
        <div>
          <label htmlFor="details" className="block text-sm font-medium text-fg-muted mb-2">
            Details
          </label>
          <textarea
            id="details"
            name="details"
            rows={5}
            value={formData.details}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-line/15 rounded-control focus:border-accent-600 focus:outline-none transition-colors resize-none"
            placeholder="Tell us about your project, goals, or questions..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-ink text-white px-8 py-4 rounded-card font-semibold type-body hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div
            role="status"
            className="bg-green-50 border-2 border-green-200 rounded-control p-4 text-green-800"
          >
            {process.env.NEXT_PUBLIC_FORM_ENDPOINT
              ? "Thank you! We'll get back to you within one business day."
              : "Your email client should have opened with the message ready — send it and we'll reply within one business day."}
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="bg-red-50 border-2 border-red-200 rounded-control p-4 text-red-800">
            Something went wrong. Please try again or email us directly at hello@saykeel.com
          </div>
        )}
      </div>
    </form>
  );
}

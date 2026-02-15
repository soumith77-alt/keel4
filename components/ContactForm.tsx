'use client';

import { useState } from 'react';

const serviceOptions = [
  'Voice AI',
  'Agentic AI Automations',
  'UGC Ads',
  'Animation / AI Video',
  'Website Building',
  'Multiple Services',
  'Not Sure Yet'
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // TODO: Replace with actual form submission endpoint
    // For now, just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setSubmitStatus('success');
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      service: '',
      details: ''
    });
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
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#253c80] mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#253c80] focus:outline-none transition-colors"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#253c80] mb-2">
            Work Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#253c80] focus:outline-none transition-colors"
            placeholder="you@company.com"
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-[#253c80] mb-2">
            Business Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#253c80] focus:outline-none transition-colors"
            placeholder="Your company name"
          />
        </div>

        {/* Service Dropdown */}
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-[#253c80] mb-2">
            What do you need? *
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#253c80] focus:outline-none transition-colors bg-white"
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
          <label htmlFor="details" className="block text-sm font-medium text-[#253c80] mb-2">
            Details
          </label>
          <textarea
            id="details"
            name="details"
            rows={5}
            value={formData.details}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#253c80] focus:outline-none transition-colors resize-none"
            placeholder="Tell us about your project, goals, or questions..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#253c80] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1e3170] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-green-800">
            Thank you! We&apos;ll get back to you within one business day.
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-red-800">
            Something went wrong. Please try again or email us directly at hello@saykeel.com
          </div>
        )}
      </div>
    </form>
  );
}

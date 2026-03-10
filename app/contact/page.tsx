import ContactForm from '@/components/ContactForm';
import { calendlyLink } from '@/config/content';

export const metadata = {
  title: 'Contact Keel - Book a Free AI Discovery Call',
  description: 'Get in touch with Keel. Book a free 30-minute discovery call to discuss how AI voice agents, automations, or UGC content can grow your business.',
  alternates: { canonical: 'https://saykeel.com/contact' },
  openGraph: {
    title: 'Contact Keel - Book a Free AI Discovery Call',
    description: 'Book a free 30-minute discovery call. AI voice agents, automations, UGC content, and websites.',
    url: 'https://saykeel.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Keel - Book a Free AI Discovery Call',
    description: 'Book a free 30-minute call with Keel to discuss AI solutions for your business.',
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Keel',
  url: 'https://saykeel.com/contact',
  description: 'Book a free 30-minute discovery call or send a message to discuss your AI solution needs.',
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
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-[#253c80] mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-[#253c80] max-w-2xl mx-auto">
            Book a call or send us a message. We&apos;ll get back to you within one business day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-[#253c80] mb-6">
              Send us a message
            </h2>
            <ContactForm />
          </div>

          {/* Calendly / Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-[#253c80] mb-6">
              Prefer to pick a time?
            </h2>
            <div className="bg-gray-50 rounded-xl p-8 mb-8">
              <p className="text-[#253c80] mb-6">
                Book a 30-minute walkthrough. We&apos;ll show live examples and discuss how we can help your business.
              </p>
              <a
                href={calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#0f172a] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1e3170] transition-all hover:scale-105 shadow-lg shadow-[#253c80]/25 w-full text-center"
              >
                Book a Call
              </a>
              <p className="text-sm text-[#253c80]/80 mt-4 text-center">
                If the calendar doesn&apos;t load,{' '}
                <a href={calendlyLink} target="_blank" rel="noopener noreferrer" className="text-[#253c80] hover:underline">
                  open it in a new tab
                </a>
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#253c80] mb-2">Email</h3>
                <a href="mailto:hello@saykeel.com" className="text-[#253c80] hover:underline">
                  hello@saykeel.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-[#253c80] mb-2">Response Time</h3>
                <p className="text-[#253c80]">
                  We typically respond within one business day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

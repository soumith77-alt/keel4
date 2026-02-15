import { calendlyLink } from "@/config/content";
import VoiceAIHeroWithOrb from "@/components/VoiceAIHeroWithOrb";

type Service = {
  title: string;
  description: string;
  shortDescription?: string;
  outcomeStatement?: string;
  outcomes: { metric: string; label: string }[];
  features: string[];
  useCases: string[];
  demoAudioUrl?: string;
};

const FEATURE_CARDS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    title: "24/7 AI Call Answering",
    description: "A natural, human sounding voice that picks up every call, greets customers warmly, answers common questions, and supports your business with clear, accurate information.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    title: "Appointment Booking",
    description: "Connects with your calendar to book, reschedule, and confirm appointments instantly.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "CRM & Tool Integrations",
    description: "Works with your PMS, CRM, and marketing tools so your data stays in sync across your systems.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    title: "Custom Call Flows",
    description: "Routes calls based on types, urgency, or location, so every customer reaches the right place quickly.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Call Analytics Dashboard",
    description: "View every call, booking, and conversion in one dashboard. See what is working and where customers drop off.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Human Escalation",
    description: "When a call needs a personal touch, it transfers smoothly to your front desk team.",
  },
];

export default function VoiceAIServicePage({
  service,
}: {
  service: Service & { demoAudioUrl?: string };
}) {
  const headline = service.outcomeStatement || "Inbound voice agents, Outbound voice agents, Lead reactivation agents";
  const subtext = service.shortDescription
    ? `${service.shortDescription} Premium solutions that turn every opportunity into growth.`
    : "24/7 AI call answering that converts leads into booked clients. Premium solutions that turn every opportunity into growth.";

  return (
    <div className="min-h-screen bg-white">
      {/* Full-width hero — edge-to-edge blue, extends under navbar */}
      {service.demoAudioUrl ? (
        <section id="demo" className="scroll-mt-24 w-full bg-[#253c80] pt-28 sm:pt-32">
          <VoiceAIHeroWithOrb
            headline={headline}
            subtext={subtext}
            audioSrc={service.demoAudioUrl}
            outcomes={service.outcomes}
          />
        </section>
      ) : null}
      <div className={`mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 pb-24 ${service.demoAudioUrl ? "pt-12 sm:pt-16" : "pt-28"}`}>
        {!service.demoAudioUrl ? (
          <section className="max-w-4xl mb-24">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#253c80] tracking-tight mb-4">
              Voice AI
            </h1>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#253c80] tracking-tight leading-[1.05] mb-6">
              {headline}
            </h2>
            <p className="text-lg sm:text-xl text-[#253c80] leading-relaxed max-w-2xl mb-10">
              {subtext}
            </p>
            {service.outcomes.length > 0 ? (
              <div className="flex flex-nowrap gap-6 sm:gap-10 lg:gap-12 mb-10 overflow-x-auto" aria-labelledby="results-heading-fallback">
                <h2 id="results-heading-fallback" className="sr-only">Measurable Results</h2>
                {service.outcomes.map((outcome, i) => (
                  <div key={i} className="flex flex-col flex-shrink-0">
                    <span className="text-2xl sm:text-3xl font-bold text-[#253c80] tracking-tight leading-none mb-0.5">
                      {outcome.metric}
                    </span>
                    <span className="text-[#253c80] text-xs sm:text-sm font-medium capitalize">
                      {outcome.label}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
            <a
              href={calendlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#253c80] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#1e3170] transition-colors shadow-xl"
            >
              Book a Call
            </a>
          </section>
        ) : null}

        {/* Divider */}
        <div className="border-t border-slate-200 mb-24" aria-hidden />

        {/* More than just a call bot — grey section */}
      </div>

      <section className="w-full bg-gray-100 py-16 sm:py-20" aria-labelledby="features-heading">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-[#253c80] text-center mb-12">
            More than just a call bot.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURE_CARDS.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="text-[#253c80] mb-4">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-[#253c80] mb-2">
                  {card.title}
                </h3>
                <p className="text-[#253c80] text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-[#253c80] mt-8">
            Need something custom? We can deploy and integrate with your existing systems.
          </p>
        </div>
      </section>

      {/* AI Receptionist vs Hiring Another Front Desk — white section */}
      <section className="w-full bg-white py-16 sm:py-20" aria-labelledby="comparison-heading">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 id="comparison-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#253c80] tracking-tight mb-4">
              AI Receptionist vs Hiring Another Front Desk
            </h2>
            <p className="text-xl text-[#253c80]">
              See the Difference in One Glance
            </p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-[#253c80]">Feature</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#253c80]">keel AI</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#253c80]">Human Staff</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-medium text-[#253c80]">Availability</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-2 text-green-600">
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      24/7 coverage
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-2 text-red-600">
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Limited to office hours, missed calls = missed patients
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-medium text-[#253c80]">Response rate</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-2 text-green-600">
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Answers in 2 seconds, no hold time or ring delay
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-2 text-red-600">
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Varies, busy, away, or juggling multiple calls
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-medium text-[#253c80]">Follow-ups &amp; reminders</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-2 text-green-600">
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Automatic, sends confirmations and no-show reminders
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-2 text-red-600">
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Manual, time-consuming and easy to miss
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-medium text-[#253c80]">Training required</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-2 text-green-600">
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      None, ready on day 1
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-2 text-red-600">
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Ongoing, hiring, onboarding, retraining
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-4 px-6 font-medium text-[#253c80]">Scalability</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-2 text-green-600">
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Instant, handles multiple calls at once
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-2 text-red-600">
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      One call at a time
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA — full-width grey background */}
      <section className="w-full bg-gray-100 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#253c80] tracking-tight mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-[#253c80] mb-8">
              Book a call. We&apos;ll walk through your setup and show you a live flow.
            </p>
            <a
              href={calendlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#253c80] text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#1e3170] transition-colors shadow-lg shadow-[#253c80]/20"
            >
              Book a Call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

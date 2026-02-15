import Link from "next/link";
import { caseStudies } from "@/config/content";

export const metadata = {
  title: "Case Studies - Keel",
  description:
    "Real results from real clients. See how Keel has helped businesses with Voice AI, automations, UGC, and more.",
};

export default function CaseStudiesPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Case Studies
          </h1>
          <p className="text-xl text-gray-600">
            Real results from real clients
          </p>
        </div>

        <div className="space-y-16">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              id={study.id}
              className="scroll-mt-28 border-b border-gray-100 pb-16 last:border-0 last:pb-0"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-[#253c80] uppercase">
                  {study.service}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-500">{study.industry}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {study.title}
              </h2>
              <p className="text-gray-600 mb-4">{study.challenge}</p>
              <p className="text-gray-700 mb-6">{study.solution}</p>
              <ul className="space-y-2 mb-8">
                {study.results.map((result, idx) => (
                  <li key={idx} className="flex items-start text-gray-700">
                    <span className="text-[#253c80] mr-2">✓</span>
                    {result}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/#services"
            className="inline-flex items-center text-[#253c80] font-semibold hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

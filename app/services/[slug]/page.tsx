import { notFound } from 'next/navigation';
import { services } from '@/config/content';
import Link from 'next/link';
import { calendlyLink } from '@/config/content';
import VoiceDemoPlayer from '@/components/VoiceDemoPlayer';
import VoiceAIServicePage from '@/components/VoiceAIServicePage';
import AgenticAutomationsHero from '@/components/AgenticAutomationsHero';
import UGCVideoHeroWithVideo from '@/components/UGCVideoHeroWithVideo';
import WebsiteBuildingHero from '@/components/WebsiteBuildingHero';

type ServiceWithDemo = (typeof services)[0] & { demoAudioUrl?: string; demoVideoUrl?: string };

/** Agentic Automations feature cards — distinct cards like Voice AI, white bg */
const AGENTIC_FEATURE_CARDS = [
  { title: 'End-to-end workflow automation', desc: 'From trigger to completion — AI agents orchestrate multi-step processes without manual intervention.', icon: 'workflow' },
  { title: 'Multi-step decision making', desc: 'Agents evaluate conditions, branch logic, and take action based on context and rules.', icon: 'branch' },
  { title: 'API integrations & data sync', desc: 'Connect to your tools and systems. Sync data, trigger actions, and keep everything in harmony.', icon: 'plug' },
  { title: 'Error handling & retries', desc: 'Automatic retries, fallbacks, and alerts when something fails — built for reliability.', icon: 'shield' },
  { title: 'Custom logic & rules', desc: 'Define your business rules. Agents execute exactly how you want, every time.', icon: 'cog' },
  { title: 'Performance monitoring', desc: 'Track runs, success rates, and latency. Know what\'s working and where to optimize.', icon: 'chart' },
  { title: 'Data processing pipelines', desc: 'Transform, validate, and move data between systems at scale.', icon: 'database' },
  { title: 'Customer onboarding flows', desc: 'Automate welcome sequences, setup tasks, and first-time user journeys.', icon: 'users' },
  { title: 'Report generation', desc: 'Generate and distribute reports on schedule — no manual export needed.', icon: 'document' },
];

/** UGC Video feature cards — distinct cards like Voice AI reference, white bg */
const UGC_FEATURE_CARDS = [
  { title: 'Creator sourcing & UGC ad campaigns', desc: 'We make UGC content that your audience trusts and buys from.', icon: 'users' },
  { title: 'AI video generation & 2D/3D animation', desc: 'From concept to final cut — AI-powered video and animation that brings your vision to life.', icon: 'film' },
  { title: 'Motion graphics & explainers', desc: 'Clear, engaging motion graphics that explain complex ideas and capture attention.', icon: 'sparkles' },
  { title: 'Content strategy & multi-platform distribution', desc: 'Strategic content plans that perform across YouTube, Meta, TikTok, and more.', icon: 'globe' },
  { title: 'Performance tracking & ROAS reporting', desc: 'Track what works. Clear metrics on engagement, conversion, and return on ad spend.', icon: 'chart' },
  { title: 'Product demos, tutorials & brand storytelling', desc: 'Showcase products, teach users, and tell your brand story through video.', icon: 'video' },
  { title: 'SaaS products & mobile apps', desc: 'Product-led video that drives signups, onboarding, and retention.', icon: 'device' },
  { title: 'Product launches & marketing campaigns', desc: 'Launch videos and campaign creative that cut through the noise.', icon: 'rocket' },
  { title: 'Educational content & social media', desc: 'Educational videos and social content that build trust and authority.', icon: 'academic' },
];

/** Website Building feature cards — distinct cards like Voice AI reference, white bg */
const WEBSITES_FEATURE_CARDS = [
  { title: 'Next.js & modern frameworks', desc: 'Built with Next.js and modern tooling for fast, scalable, and maintainable sites.', icon: 'code' },
  { title: 'Mobile-first responsive design', desc: 'Sites that look and perform great on every device, from phone to desktop.', icon: 'device' },
  { title: 'Fast load times & performance', desc: 'Optimized assets, minimal JS, and performance best practices for speed that converts.', icon: 'bolt' },
  { title: 'SaaS landing pages', desc: 'High-converting landing pages that capture signups and communicate value clearly.', icon: 'window' },
  { title: 'E-commerce stores', desc: 'Online stores that are fast, secure, and built to grow with your catalog.', icon: 'cart' },
  { title: 'Portfolio sites', desc: 'Clean, professional portfolios that showcase your work and win clients.', icon: 'briefcase' },
];

function AgenticFeatureIcon({ icon }: { icon: string }) {
  const cls = 'w-6 h-6';
  const stroke = { stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } as const;
  switch (icon) {
    case 'workflow':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M3.75 12h16.5M3.75 6.75h16.5M3.75 17.25h16.5M6 9v6M12 9v6M18 9v6" /></svg>;
    case 'branch':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M9 6l6 6-6 6" /><path d="M3 12h12" /></svg>;
    case 'plug':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M12 6v6M9 9h6M15 2v4M9 2v4M7 14h10M12 14v4" /></svg>;
    case 'shield':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
    case 'cog':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    case 'chart':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M3 13h2v6H3v-6zM9 7h2v12H9V7zM15 10h2v9h-2v-9zM21 4h2v15h-2V4z" /></svg>;
    case 'database':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>;
    case 'users':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
    case 'boxes':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
    case 'document':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
    case 'film':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>;
    case 'sparkles':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
    case 'globe':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
    case 'video':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
    case 'device':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
    case 'rocket':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>;
    case 'academic':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>;
    case 'code':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
    case 'bolt':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
    case 'window':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>;
    case 'cart':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
    case 'briefcase':
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    default:
      return <svg className={cls} viewBox="0 0 24 24" {...stroke}><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
  }
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: `${service.title} - AI Solutions | Keel`,
    description: service.description,
    alternates: { canonical: `https://saykeel.com/services/${service.slug}` },
    openGraph: {
      title: `${service.title} - Keel`,
      description: service.description,
      url: `https://saykeel.com/services/${service.slug}`,
      type: 'website' as const,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${service.title} - Keel`,
      description: service.description,
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug) as ServiceWithDemo | undefined;

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: { '@type': 'Organization', name: 'Keel', url: 'https://saykeel.com' },
    url: `https://saykeel.com/services/${service.slug}`,
    audience: { '@type': 'BusinessAudience', audienceType: service.useCases.join(', ') },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://saykeel.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://saykeel.com/services' },
      { '@type': 'ListItem', position: 3, name: service.title, item: `https://saykeel.com/services/${service.slug}` },
    ],
  };

  const isVoiceAI = service.slug === 'voice-ai';
  const isAgenticAutomations = service.slug === 'agentic-automations';
  const isUgcVideo = service.slug === 'ugc-video';
  const isWebsites = service.slug === 'websites';
  const hasVideoDemo = service.slug === 'ugc-video';
  const useFullWidthCta = isAgenticAutomations || isUgcVideo || isWebsites;
  const demoAudioUrl = isVoiceAI ? service.demoAudioUrl : null;
  const demoVideoUrl = hasVideoDemo ? service.demoVideoUrl : null;

  const pageContent = (
    <>
      {/* Agentic AI: full-width edge-to-edge hero */}
      {isAgenticAutomations && (
        <section className="scroll-mt-24 w-full bg-[#253c80] pt-28 sm:pt-32">
          <AgenticAutomationsHero
            title={service.title}
            headline={service.outcomeStatement || 'Automate repetitive workflows end-to-end.'}
            subtext={service.description}
            outcomes={service.outcomes}
            videoSrc={isAgenticAutomations ? service.demoVideoUrl : undefined}
          />
        </section>
      )}

      {/* UGC Video: full-width hero with video on right, dark blue background */}
      {isUgcVideo && demoVideoUrl && (
        <section className="scroll-mt-24 w-full bg-[#253c80] pt-28 sm:pt-32">
          <UGCVideoHeroWithVideo
            title={service.title}
            headline={service.outcomeStatement || 'Performance-driven content at scale.'}
            subtext={service.description}
            videoSrc={demoVideoUrl}
            outcomes={service.outcomes}
          />
        </section>
      )}

      {/* Website Building: blue hero, same layout as UGC (left content, right image) */}
      {isWebsites && (
        <section className="scroll-mt-24 w-full bg-[#253c80] pt-28 sm:pt-32">
          <WebsiteBuildingHero
            title={service.title}
            headline={service.outcomeStatement || 'High-converting websites engineered for growth.'}
            subtext={service.description}
            outcomes={service.outcomes}
          />
        </section>
      )}
      <div className={isAgenticAutomations || isUgcVideo || isWebsites ? 'pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8' : 'pt-32 pb-20 px-4 sm:px-6 lg:px-8'}>
      {/* Generic hero for services without custom hero */}
      {!isAgenticAutomations && !isUgcVideo && !isWebsites && (
        <section className="max-w-4xl mx-auto text-center mb-20">
          <div className="text-6xl mb-6">{service.icon}</div>
          <h1 className="text-5xl sm:text-6xl font-bold text-[#253c80] mb-6">
            {service.title}
          </h1>
          <p className="text-xl sm:text-2xl text-[#253c80] mb-10 max-w-3xl mx-auto">
            {service.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isVoiceAI ? (
            <>
              <a
                href="#listen-to-demo"
                className="bg-[#253c80] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1e3170] transition-all hover:scale-105 shadow-lg shadow-[#253c80]/25"
              >
                Listen to a Demo
              </a>
              <a
                href={calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#253c80] px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-[#253c80] transition-all hover:scale-105"
              >
                Book a Call
              </a>
            </>
          ) : hasVideoDemo ? (
            <>
              <a
                href="#watch-demo"
                className="bg-[#253c80] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1e3170] transition-all hover:scale-105 shadow-lg shadow-[#253c80]/25"
              >
                Watch a Demo
              </a>
              <a
                href={calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#253c80] px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-[#0f172a] transition-all hover:scale-105"
              >
                Book a Call
              </a>
            </>
          ) : (
            <>
              <a
                href={calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#253c80] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1e3170] transition-all hover:scale-105 shadow-lg shadow-[#253c80]/25"
              >
                Book a Call
              </a>
              <Link
                href="/contact"
                className="bg-white text-[#253c80] px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-[#253c80] transition-all hover:scale-105"
              >
                Get a Demo
              </Link>
            </>
          )}
        </div>
      </section>
      )}

      {/* Voice AI: Listen to a demo section */}
      {isVoiceAI && demoAudioUrl && (
        <section
          id="listen-to-demo"
          className="max-w-2xl mx-auto mb-20 scroll-mt-24"
          aria-labelledby="demo-heading"
        >
          <h2 id="demo-heading" className="sr-only">
            Listen to a Voice AI demo
          </h2>
          <VoiceDemoPlayer src={demoAudioUrl} title="Listen to a demo" />
        </section>
      )}

      {/* UGC video is now in hero; no separate section needed */}

      {/* Outcomes Section — skip for Agentic, UGC Video, Websites (moved to hero) */}
      {!isAgenticAutomations && !isUgcVideo && !isWebsites && (
        <section className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-[#253c80] text-center mb-12">
            Measurable Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.outcomes.map((outcome, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#253c80]/10 to-[#3d5aa0]/10 rounded-xl p-8 text-center"
              >
                <div className="text-5xl font-bold text-[#253c80] mb-2">
                  {outcome.metric}
                </div>
                <div className="text-[#253c80] font-medium">
                  {outcome.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features Section — white bg, distinct cards for Agentic & UGC (like Voice AI reference) */}
      {isAgenticAutomations ? (
        <section className="w-full bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#253c80] text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AGENTIC_FEATURE_CARDS.map((card, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
                >
                  <div className="text-[#253c80] mb-4">
                    <AgenticFeatureIcon icon={card.icon} />
                  </div>
                  <h3 className="text-lg font-bold text-[#253c80] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[#253c80] text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : isUgcVideo ? (
        <section className="w-full bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#253c80] text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {UGC_FEATURE_CARDS.map((card, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
                >
                  <div className="text-[#253c80] mb-4">
                    <AgenticFeatureIcon icon={card.icon} />
                  </div>
                  <h3 className="text-lg font-bold text-[#253c80] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[#253c80] text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : isWebsites ? (
        <section className="w-full bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#253c80] text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {WEBSITES_FEATURE_CARDS.map((card, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
                >
                  <div className="text-[#253c80] mb-4">
                    <AgenticFeatureIcon icon={card.icon} />
                  </div>
                  <h3 className="text-lg font-bold text-[#253c80] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[#253c80] text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-[#253c80] mb-8">
              Key Features
            </h2>
            <ul className="space-y-4">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#253c80] mr-3 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[#253c80] text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#253c80] mb-8">
              Perfect For
            </h2>
            <ul className="space-y-4">
              {service.useCases.map((useCase, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#253c80] mr-3 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[#253c80] text-lg">{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </section>
      )}

      {/* CTA Section — rounded block for services without full-width CTA */}
      {!useFullWidthCta && (
        <section className="max-w-4xl mx-auto bg-gradient-to-br from-[#0f172a] to-[#1e3170] rounded-2xl p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Book a call to discuss how {service.title} can transform your business.
          </p>
          <a
            href={calendlyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#0f172a] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all hover:scale-105 shadow-lg"
          >
            Book a Call
          </a>
        </section>
      )}
      </div>

      {/* Full-width grey CTA (Voice AI style) — Agentic, UGC Video, Websites */}
      {useFullWidthCta && (
        <section className="w-full bg-gray-100 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#253c80] tracking-tight mb-4">
                Ready to get started?
              </h2>
              <p className="text-lg text-[#253c80] mb-8">
                {isAgenticAutomations && "Book a call. We'll walk through your setup and show you how automations can streamline your operations."}
                {isUgcVideo && "Book a call. We'll walk through your content goals and show you how video can drive engagement and conversion."}
                {isWebsites && "Book a call. We'll walk through your vision and show you how a high-converting site can grow your business."}
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
      )}
    </>
  );

  const schemaScripts = (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );

  if (isVoiceAI) {
    return (
      <>
        {schemaScripts}
        <VoiceAIServicePage service={service} />
      </>
    );
  }
  return (
    <>
      {schemaScripts}
      {pageContent}
    </>
  );
}

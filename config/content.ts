// Content configuration - easy to edit and maintain

/**
 * The live domain. It has three e's; `saykeel.com` (two) has no web host, so
 * canonical URLs, the sitemap and structured data must use this value.
 * The mailbox is different on purpose: hello@saykeel.com is the Google
 * Workspace address that actually receives mail.
 */
export const SITE_URL = 'https://saykeeel.com';
export const CONTACT_EMAIL = 'hello@saykeel.com';

/**
 * Services. `tier` decides where a service is surfaced:
 *   'primary'    — the four offerings in the navigation, homepage and footer.
 *   'additional' — capabilities that keep their own detail page but are not
 *                  featured as a headline offering (voice, video).
 * Order matters: primary services render in this order everywhere.
 */
export type Service = {
  id: string;
  title: string;
  /** Short name for menus. */
  navLabel: string;
  tier: 'primary' | 'additional';
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  features: string[];
  outcomes: { metric: string; label: string }[];
  useCases: string[];
  outcomeStatement?: string;
  /** Category value pre-selected on the contact form for this service. */
  contactType: string;
  /** Detail pages for closely related capabilities. */
  related?: { label: string; slug: string }[];
  demoAudioUrl?: string;
  demoVideoUrl?: string;
  image?: string;
};

export const services: Service[] = [
  {
    id: 'saas-products',
    title: 'SaaS & Digital Products',
    navLabel: 'SaaS & digital products',
    tier: 'primary',
    slug: 'saas-products',
    description:
      'Product strategy, interface design and full stack engineering for MVPs, customer platforms, learning platforms (LMS) and subscription products, designed, built and shipped as one product.',
    shortDescription: 'Turn a product idea into software people can use.',
    icon: 'code',
    features: [
      'Product strategy & technical architecture',
      'UX, interface design & prototyping',
      'Full stack product engineering',
      'AI features & third party integrations',
      'Authentication, billing & analytics',
      'Launch support & iteration'
    ],
    outcomes: [],
    useCases: [
      'MVPs for new products',
      'Customer platforms and marketplaces',
      'Learning platforms and LMS',
      'Subscription products'
    ],
    image: '/football-intelligence-os.webp',
    outcomeStatement: 'MVPs, customer platforms, learning platforms (LMS), subscription products.',
    contactType: 'SaaS product',
  },
  {
    id: 'crm-business-systems',
    title: 'CRMs & Business Systems',
    navLabel: 'CRMs & business systems',
    tier: 'primary',
    slug: 'crm-business-systems',
    description:
      'Custom CRMs, client portals, dashboards and internal tools, designed around how your team already works and connected to the tools you rely on.',
    shortDescription: 'Build around the way your team actually works.',
    icon: 'database',
    features: [
      'Pipelines & records shaped to your process',
      'Client portals',
      'Dashboards & reporting',
      'Roles & permissions',
      'Integrations & data migration',
      'Workflow automation'
    ],
    outcomes: [],
    useCases: [
      'Teams outgrowing spreadsheets and shared inboxes',
      'Sales or delivery spread across several tools',
      'Businesses that need a client facing portal'
    ],
    outcomeStatement: 'Custom CRMs, client portals, dashboards, internal tools.',
    contactType: 'CRM or internal tool',
  },
  {
    id: 'websites',
    title: 'Websites & Digital Experiences',
    navLabel: 'Websites & digital experiences',
    tier: 'primary',
    slug: 'websites',
    description:
      'Marketing websites, ecommerce and booking experiences, designed and built on modern frameworks, fast on every device and connected to the tools behind them.',
    shortDescription: 'A website that earns attention and makes the next step clear.',
    icon: 'globe2',
    features: [
      'Next.js & modern frameworks',
      'Mobile first responsive design',
      'Fast load times & performance'
    ],
    outcomes: [],
    useCases: [
      'Marketing websites',
      'Ecommerce stores',
      'Booking experiences'
    ],
    outcomeStatement: 'Marketing websites, ecommerce, booking experiences.',
    contactType: 'Website',
  },
  {
    id: 'agentic-automations',
    title: 'Automation & Integrations',
    navLabel: 'Automation & integrations',
    tier: 'primary',
    // Slug kept from the previous "Agentic AI Automations" page so existing
    // links and search results keep resolving.
    slug: 'agentic-automations',
    description:
      'Workflow automation and data sync between the tools you already use, with AI assistants and voice agents where they genuinely help.',
    shortDescription: 'Connect your tools and keep work moving.',
    icon: 'bot',
    features: [
      'End to end workflow automation',
      'Multi step decision making',
      'API integrations & data sync',
      'Error handling & retries',
      'Custom logic & rules',
      'Performance monitoring'
    ],
    outcomes: [],
    useCases: [
      'Website enquiries into your CRM',
      'Data sync between tools',
      'Customer onboarding flows',
      'Report generation'
    ],
    image: '/ai-automation.webp',
    outcomeStatement: 'Workflow automation, data sync, AI assistants, voice capabilities.',
    contactType: 'Automation',
    related: [{ label: 'Voice agents', slug: 'voice-ai' }],
  },
  {
    id: 'voice-ai',
    title: 'Voice AI',
    navLabel: 'Voice agents',
    tier: 'additional',
    slug: 'voice-ai',
    description: 'Intelligent voice assistants that answer calls, book appointments, and handle customer inquiries 24/7.',
    shortDescription: '24/7 AI call answering that converts leads into booked clients.',
    icon: 'mic',
    features: [
      'Answers calls in under 2 seconds',
      'Natural, human like conversations',
      'Calendar integration & booking',
      'CRM sync & lead capture',
      'Custom call flows & routing',
      'Analytics dashboard'
    ],
    outcomes: [],
    useCases: [
      'Medical & dental practices',
      'Service businesses',
      'SaaS companies',
      'Ecommerce support'
    ],
    // Path to voice demo (file in public/audio/)
    demoAudioUrl: '/audio/voice_ai_audio.mp4',
    image: '/voice_ai_poster.webp',
    outcomeStatement: 'Inbound voice agents, Outbound voice agents, Lead reactivation agents.',
    contactType: 'Voice agent',
    related: [{ label: 'Automation & integrations', slug: 'agentic-automations' }],
  },
  {
    id: 'ugc-video',
    title: 'UGC Ads & AI Video',
    navLabel: 'Video & UGC',
    tier: 'additional',
    slug: 'ugc-video',
    description: 'Authentic UGC ads and AI powered video that drive engagement and conversion. From creator content to motion graphics and product demos.',
    shortDescription: 'UGC ad campaigns and AI video that feel authentic and drive results.',
    icon: 'clapperboard',
    features: [
      'Creator sourcing & UGC ad campaigns',
      'AI video generation & 2D/3D animation',
      'Motion graphics & explainers',
      'Content strategy & multi platform distribution',
      'Performance tracking & ROAS reporting',
      'Product demos, tutorials & brand storytelling'
    ],
    outcomes: [],
    useCases: [
      'SaaS products & mobile apps',
      'Product launches & marketing campaigns',
      'Educational content & social media'
    ],
    demoVideoUrl: '/video/demo-video.mp4',
    image: '/ai-video-creative.webp',
    outcomeStatement: 'Performance driven content at scale.',
    contactType: 'Video or UGC',
  },
];

export const primaryServices = services.filter((s) => s.tier === 'primary');
export const additionalServices = services.filter((s) => s.tier === 'additional');

/**
 * The light/dark rhythm of the work chapters, by POSITION.
 *
 * Lives here rather than in components/FeaturedWork.tsx because /work is a
 * server component: a non-component export imported across a "use client"
 * boundary arrives as a client reference and is not callable on the server.
 * Keyed to position, not to project, so it survives a reorder.
 */
export const projectChapterEnvs = ['paper', 'raised'] as const;

export function projectChapterEnv(index: number) {
  return projectChapterEnvs[index % projectChapterEnvs.length];
}

/**
 * FAQ answers say only what the site can stand behind. The previous set
 * promised "30 to 50% improvements" and a blanket 2 to 4 week launch, neither
 * of which had a source, and neither of which holds for a SaaS build or CRM.
 */
export const faqs = [
  {
    question: 'How does a project start?',
    answer: 'With a conversation about the problem, the people who will use what we build, and the scope. We agree what the first version includes before any build work begins.'
  },
  {
    question: 'How long does a project take?',
    answer: 'It depends on scope. A marketing website and a multi tenant platform are very different builds, so we give you a timeline once the first version is defined rather than before.'
  },
  {
    question: 'Can you integrate with our existing tools?',
    answer: 'Yes. We integrate with popular CRMs, calendars, payment processors, and marketing tools, and build custom integrations where a project needs them.'
  },
  {
    question: 'Who owns the code and accounts?',
    answer: 'You do. Repositories, accounts, documentation and credentials stay with you from handoff.'
  },
  {
    question: 'Do you provide ongoing support?',
    answer: 'Yes, as a separate arrangement. We offer maintenance plans, performance monitoring, and optimization after launch, scoped to what you need.'
  }
];

/**
 * BOOKING LINKS — two, because they book different things.
 *
 * `voiceDemoBookingLink` is the existing Cal.com event at /ai-voice-agent-demo
 * (titled "KEEEL AI", 30 minutes). It is the right link on the Voice AI page and
 * nowhere else: the slug promises a voice agent demo, which is not what someone
 * asking about a SaaS build or a website wants to book.
 *
 * `projectBookingLink` is a general project call. No such event exists yet, so
 * it is null and every "Book a call" for a general project is hidden; the
 * contact form is the primary path. Create a project-call event type and set
 * NEXT_PUBLIC_PROJECT_BOOKING_LINK to bring the secondary CTA back site wide.
 */
export const voiceDemoBookingLink =
  process.env.NEXT_PUBLIC_CALENDLY_LINK || 'https://cal.com/manyam-soumith-reddy-eba1qt/ai-voice-agent-demo';

export const projectBookingLink: string | null =
  process.env.NEXT_PUBLIC_PROJECT_BOOKING_LINK || null;

// WhatsApp: include country code, no + or spaces (e.g. 15551234567)
export const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_LINK || 'https://wa.me/918977287631';

/**
 * Project categories for enquiries. The homepage brief and the contact form
 * share this list so a choice made on one arrives selected on the other.
 */
export const projectTypes = [
  'SaaS product',
  'CRM or internal tool',
  'Website',
  'Automation',
  'Something else',
] as const;

/** The contact form also accepts the additional capabilities. */
export const contactTypes = [
  'SaaS product',
  'CRM or internal tool',
  'Website',
  'Automation',
  'Voice agent',
  'Video or UGC',
  'Something else',
] as const;

/**
 * Feature cards per service, keyed by slug.
 *
 * These lived as three hard-coded arrays inside app/services/[slug]/page.tsx,
 * which meant adding or editing a service required a code change. Icons are
 * referenced by name and resolved through components/ui/icon.tsx.
 */
export const serviceFeatureCards: Record<
  string,
  { title: string; desc: string; icon: string }[]
> = {
  'voice-ai': [
    { title: 'Answers in under 2 seconds', desc: 'No hold music, no voicemail. Every caller reaches something that can actually help.', icon: 'bolt' },
    { title: 'Natural, human like conversation', desc: 'Handles interruptions, accents, and follow up questions without sounding like a phone tree.', icon: 'mic' },
    { title: 'Calendar integration & booking', desc: 'Checks real availability and books the appointment while the caller is still on the line.', icon: 'calendar' },
    { title: 'CRM sync & lead capture', desc: 'Every call creates or updates a contact, with the transcript and outcome attached.', icon: 'database' },
    { title: 'Custom call flows & routing', desc: 'Escalate to a human, route by intent, or branch on business hours, your rules.', icon: 'branch' },
    { title: 'Analytics dashboard', desc: 'Call volume, answer rate, booking rate, and where conversations fall down.', icon: 'chart' },
    { title: 'Medical & dental practices', desc: 'After hours coverage and no show reduction for appointment driven clinics.', icon: 'users' },
    { title: 'Service businesses', desc: 'Capture every job enquiry, even when the whole team is out on site.', icon: 'briefcase' },
    { title: 'SaaS & ecommerce support', desc: 'Deflect routine questions and hand off the ones that need a person.', icon: 'headphones' },
  ],
  'agentic-automations': [
    { title: 'End to end workflow automation', desc: 'From trigger to completion, AI agents orchestrate multi step processes without manual intervention.', icon: 'workflow' },
    { title: 'Multi step decision making', desc: 'Agents evaluate conditions, branch logic, and take action based on context and rules.', icon: 'branch' },
    { title: 'API integrations & data sync', desc: 'Connect to your tools and systems. Sync data, trigger actions, and keep everything in harmony.', icon: 'plug' },
    { title: 'Error handling & retries', desc: 'Automatic retries, fallbacks, and alerts when something fails, built for reliability.', icon: 'shield' },
    { title: 'Custom logic & rules', desc: 'Define your business rules. Agents execute exactly how you want, every time.', icon: 'cog' },
    { title: 'Performance monitoring', desc: "Track runs, success rates, and latency. Know what's working and where to optimize.", icon: 'chart' },
    { title: 'Data processing pipelines', desc: 'Transform, validate, and move data between systems at scale.', icon: 'database' },
    { title: 'Customer onboarding flows', desc: 'Automate welcome sequences, setup tasks, and first time user journeys.', icon: 'users' },
    { title: 'Report generation', desc: 'Generate and distribute reports on schedule, no manual export needed.', icon: 'document' },
  ],
  'ugc-video': [
    { title: 'Creator sourcing & UGC ad campaigns', desc: 'We make UGC content that your audience trusts and buys from.', icon: 'users' },
    { title: 'AI video generation & 2D/3D animation', desc: 'From concept to final cut, AI powered video and animation that brings your vision to life.', icon: 'film' },
    { title: 'Motion graphics & explainers', desc: 'Clear, engaging motion graphics that explain complex ideas and capture attention.', icon: 'sparkles' },
    { title: 'Content strategy & distribution', desc: 'Strategic content plans that perform across YouTube, Meta, TikTok, and more.', icon: 'globe' },
    { title: 'Performance tracking & ROAS reporting', desc: 'Track what works. Clear metrics on engagement, conversion, and return on ad spend.', icon: 'chart' },
    { title: 'Demos, tutorials & brand storytelling', desc: 'Showcase products, teach users, and tell your brand story through video.', icon: 'video' },
    { title: 'SaaS products & mobile apps', desc: 'Product led video that drives signups, onboarding, and retention.', icon: 'device' },
    { title: 'Launches & marketing campaigns', desc: 'Launch videos and campaign creative that cut through the noise.', icon: 'rocket' },
    { title: 'Educational & social content', desc: 'Educational videos and social content that build trust and authority.', icon: 'academic' },
  ],
  websites: [
    { title: 'Next.js & modern frameworks', desc: 'Built with Next.js and modern tooling for fast, scalable, and maintainable sites.', icon: 'code' },
    { title: 'Mobile first responsive design', desc: 'Sites that look and perform great on every device, from phone to desktop.', icon: 'device' },
    { title: 'Fast load times & performance', desc: 'Optimized assets, minimal JS, and performance best practices for speed that converts.', icon: 'bolt' },
    { title: 'Marketing websites', desc: 'Clear positioning, a page structure that leads somewhere, and a design that holds attention.', icon: 'window' },
    { title: 'Ecommerce stores', desc: 'Online stores that are fast, secure, and built to grow with your catalog.', icon: 'cart' },
    { title: 'Booking & enquiry flows', desc: 'The step after the page: a booking, a quote request or an enquiry that lands where your team works.', icon: 'calendar' },
  ],
  'crm-business-systems': [
    { title: 'Pipelines shaped to your process', desc: 'Stages, records and fields that match how your team actually sells or delivers.', icon: 'workflow' },
    { title: 'Client portals', desc: 'A place for clients to see progress, share files and approve work without email chains.', icon: 'users' },
    { title: 'Dashboards & reporting', desc: 'The numbers your team checks every week, in one place and up to date.', icon: 'chart' },
    { title: 'Roles & permissions', desc: 'Each person sees and edits what their role needs, enforced in the data layer.', icon: 'shield' },
    { title: 'Integrations & data migration', desc: 'Bring records over from spreadsheets and existing tools, and keep them in sync.', icon: 'plug' },
    { title: 'Workflow automation', desc: 'Follow ups, assignments and notifications that run when a record changes.', icon: 'cog' },
  ],
  'saas-products': [
    { title: 'Product strategy & architecture', desc: 'Define the users, jobs, data model, and technical shape before engineering begins.', icon: 'branch' },
    { title: 'UX & interface design', desc: 'Turn complex product logic into clear flows, prototypes, and a scalable interface system.', icon: 'window' },
    { title: 'Full stack engineering', desc: 'Build the application, APIs, database, and deployment layer as one maintainable product.', icon: 'code' },
    { title: 'AI features & integrations', desc: 'Add useful AI capabilities and connect the tools your product depends on.', icon: 'sparkles' },
    { title: 'Authentication, billing & analytics', desc: 'The commercial product foundation: users, permissions, subscriptions, events, and reporting.', icon: 'chart' },
    { title: 'Learning platforms (LMS)', desc: 'Courses, cohorts, progress tracking and certificates, for training teams or selling education.', icon: 'academic' },
    { title: 'Launch & iteration', desc: 'Ship the first version, observe real usage, and turn what users do into the next build cycle.', icon: 'rocket' },
  ],
};

/**
 * Projects / portfolio.
 *
 * Every field is optional except slug/title/summary, and the /work routes read
 * straight from this array, so adding work is a data-only edit with no code
 * change. Entries below are short summaries — expand challenge/approach/results
 * as each engagement gets written up properly.
 */
export type Project = {
  slug: string;
  title: string;
  client?: string;
  service: string;
  year: string;
  /**
   * The one-line version, 12 words max. This is what cards render — the
   * summaries below run to 85-122 words each, which is what made the site
   * read as text heavy. `summary` is now detail, shown only on /work.
   */
  claim: string;
  summary: string;
  /**
   * Homepage chapter copy. ONE sentence each — the content limits in the brief
   * cap a homepage project at one challenge line, one system line and one
   * attributable status. Anything longer belongs in `summary` on /work.
   */
  challenge?: string;
  systemBuilt?: string;
  /**
   * Homepage "Selected work" fields. `category` is the kind of product;
   * `purpose` is one sentence on the problem it solves; `built` lists what
   * Keeel actually delivered, each line traceable to `summary`; `scope` is an
   * optional size-of-work fact — scope, never a commercial result.
   */
  category?: string;
  purpose?: string;
  built?: string[];
  /** Two to three very short phrases for the homepage card. */
  highlights?: string[];
  /**
   * A focused region of `image` for the homepage card, in the full image's
   * pixels — one meaningful part of the product rather than the whole
   * dashboard, which the hero already shows.
   */
  focus?: { x: number; y: number; w: number; h: number; label: string };
  scope?: string;
  /**
   * Honest project state, NOT a result claim. Allowed vocabulary: Built,
   * Deployed, In pilot, Shipped, In development — optionally followed by an
   * attributable observation ("39 institutions audited"). Never a percentage,
   * a revenue figure or a time-saved number unless it is measured and
   * sourced. If you cannot attribute it, use the bare status.
   */
  status?: string;
  /**
   * Project visual. A real interface crop, render or branded still. Projects
   * without one render as text only; never substitute a stock image.
   */
  image?: string;
  /**
   * An 800px-wide variant of `image`, used as the small end of a `srcset`.
   * Next's <Image> is unavailable here — `output: 'export'` ships without the
   * optimiser — so responsive sources are hand-authored. Generate with:
   *   cwebp -q 80 -resize 800 0 <source> -o <name>-800.webp
   */
  imageSmall?: string;
  /**
   * Intrinsic pixel dimensions of `image`. Required wherever `image` is set —
   * without them the browser cannot reserve the box and every chapter
   * contributes to cumulative layout shift.
   */
  imageWidth?: number;
  imageHeight?: number;
  /**
   * How the image meets its frame.
   *   'contain' — dense product UI. Nothing is cropped through interface text.
   *   'cover'   — only when the crop is a deliberate composition.
   * There is no single right answer for a mixed set of screenshots, which is
   * why the old blanket `object-cover object-top` rendered a 1536px dashboard
   * as unreadable pixel soup.
   */
  fit?: 'contain' | 'cover';
  /** Optional looping clip; takes precedence over `image`. */
  video?: string;
  results?: { metric: string; label: string }[];
  featured?: boolean;
  /** Set false once the entry describes real, shippable work. */
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'football-intelligence-os',
    title: 'Football Intelligence OS',
    claim:
      'Squads, training, matchday and finances in one operations layer.',
    service: 'SaaS & digital products',
    category: 'SaaS platform · Club operations',
    purpose:
      'Gives clubs without a performance department one reliable picture of every player.',
    built: [
      'Squads, calendar, training, matchday, attendance, finances and messaging in one platform',
      'Player profiles built from attendance, wellness and match data, with a confidence score',
      'Access control enforced at the data layer, so medical information stays restricted',
    ],
    highlights: ['Club operations in one place', 'Living player profiles', 'Data-layer access control'],
    focus: { x: 541, y: 212, w: 971, h: 472, label: 'Tactical board, recent match and key player profile' },
    year: '2026',
    summary:
      'A platform for football clubs and academies that runs the whole operation in one place: squads, calendar, training, matchday, attendance, availability, finances and messaging. Clubs without a performance department have no reliable picture of a player, so every event logged here builds one, turning attendance, wellness and match data into a living player profile with a confidence score attached. Access is enforced at the data layer rather than in the interface, so sensitive medical information stays visible only to the people entitled to see it.',
    challenge:
      'Clubs without a performance department have no reliable picture of a player.',
    systemBuilt:
      'One operations layer where attendance, wellness and match data build a living player profile.',
    status: 'Built',
    image: '/football-intelligence-os.webp',
    imageSmall: '/football-intelligence-os-800.webp',
    imageWidth: 1536,
    imageHeight: 1024,
    fit: 'contain',
    featured: true,
  },
  {
    slug: 'ivr-audit-engine',
    title: 'University IVR audit engine',
    claim:
      'A voice agent maps a whole phone tree, then scores caller friction.',
    service: 'Automation & integrations',
    category: 'Automation · Voice audit',
    purpose:
      'Maps a university phone menu by calling it, then scores how hard it is for a caller to get help.',
    built: [
      'A voice agent that dials in and walks every menu branch live',
      'A weighted friction model over the paths it genuinely reached',
      'A single page report for each institution',
    ],
    highlights: ['Live phone-tree crawling', 'Friction scoring', 'Report per institution'],
    focus: { x: 115, y: 95, w: 875, h: 535, label: 'Call tree mapped from live calls, coloured by outcome' },
    scope: '39 institutions audited',
    year: '2026',
    summary:
      'A voice agent calls a university switchboard, presses every option until the whole menu tree is mapped, scores how much pain a real caller goes through, and turns that into a single page report with a booking link at the end. A phone tree cannot be scraped: there is no API and no sitemap, only dial, listen, press and hang up, so every branch is a separate live call and the shape of the tree is unknown until you are already inside it. A weighted friction model scores only the paths that were genuinely walked, and options that were announced but never dialled are excluded from every number.',
    challenge:
      'A phone tree has no API or sitemap. It can only be mapped by dialling, listening and pressing each option.',
    systemBuilt:
      'A voice agent that walks every branch live, then scores caller friction across the paths it genuinely reached.',
    status: 'Built · 39 institutions audited',
    image: '/ivr-audit-engine.webp',
    imageSmall: '/ivr-audit-engine-800.webp',
    imageWidth: 1448,
    imageHeight: 1086,
    fit: 'contain',
    results: [
      { metric: '39', label: 'Institutions audited' },
      { metric: '405', label: 'Live call minutes crawled' },
      { metric: '$50', label: 'Total build and validation cost' },
    ],
    featured: true,
  },
  {
    slug: 'artizyn',
    title: 'Artizyn',
    claim:
      'A two-way trades marketplace across PACA, on subscriptions not commission.',
    service: 'SaaS & digital products',
    category: 'Marketplace platform · Trades',
    purpose:
      'A two-way trades marketplace across the PACA region that takes no commission.',
    built: [
      'A two-way marketplace across nineteen trades',
      'Subscription billing across three tiers instead of commission',
      'Matching, messaging, reviews and payment inside the platform',
    ],
    highlights: ['Two-way marketplace', 'Subscription billing', 'Matching, chat and payments'],
    focus: { x: 518, y: 85, w: 607, h: 445, label: 'A client project workspace: brief, budget and matching status' },
    year: '2026',
    summary:
      'A marketplace connecting building professionals with clients across the PACA region, working in both directions. Clients post projects for free and receive offers, while artisans also publish their own available services for clients to browse and contact directly. Most trade marketplaces run one way and take a cut of every job, which pushes artisans off the platform the moment a relationship forms, so this one earns from monthly subscriptions across three tiers and takes no commission at all. Matching, messaging, reviews and payment all sit inside the platform, across nineteen trades.',
    challenge:
      'Commission-based trade marketplaces push artisans off the platform the moment a relationship forms.',
    systemBuilt:
      'A two-way marketplace earning from subscriptions instead of commission, with matching, messaging, reviews and payment inside it.',
    status: 'Built · 19 trades',
    image: '/artizyn-marketplace.webp',
    imageSmall: '/artizyn-marketplace-800.webp',
    imageWidth: 1448,
    imageHeight: 1086,
    fit: 'contain',
    featured: true,
  },
  {
    slug: 'oxacan',
    title: 'Oxacan',
    claim:
      'Quote to cash for Swiss contractors, without leaving the tool.',
    service: 'SaaS & digital products',
    year: '2026',
    summary:
      'A platform for building and electrical contractors that carries a job from quote to cash without ever leaving the tool, across five pillars: estimating, site management, finance, client relationships and staff. Contractors normally run all of that across disconnected pieces, which costs real money in retyped data, margin errors that arrive unannounced and invoicing that waits on financial tracking nobody has. Here, winning a bid automatically generates the site tasks, material orders and schedule from the quoted lines, hours logged on site feed live margin against estimate, and an intelligence layer runs across every module: drafting quotes, reading meeting minutes for actions and deadlines, and raising a flag when margin starts trending the wrong way. Built for the Swiss and francophone market.',
    featured: true,
  },
  {
    slug: 'amitsells',
    title: 'Amitsells',
    claim:
      'A phone-first marketing site built to turn visitors into enquiries.',
    service: 'Websites',
    year: '2026',
    summary:
      'A fast marketing site built to turn visitors into enquiries, with clear positioning, a layout designed for phones first, and the technical groundwork for search in place from launch.',
  },
  {
    slug: 'virtual-try-on',
    title: 'Virtual try on',
    claim:
      'Shoppers see garments and eyewear on themselves from one photo.',
    service: 'Automation & integrations',
    year: '2026',
    summary:
      'A try before you buy experience that lets shoppers see garments and sunglasses on themselves from a single photo, built to cut the hesitation and the returns that hold back selling clothing online.',
  },
  {
    slug: 'rfq-automation',
    title: 'RFQ automation',
    claim:
      'Inbound request in, priced structured quote out, no retyping.',
    service: 'Automation & integrations',
    year: '2026',
    summary:
      'An agent that reads incoming requests for quote, pulls out the line items and specifications, prices them against internal data and returns a structured quote, removing the manual retyping that makes quoting slow and inconsistent.',
  },
  {
    slug: 'salon-voice-agent',
    title: 'Salon voice agent',
    claim:
      'Answers every call around the clock and books while they wait.',
    service: 'Voice agents',
    year: '2026',
    summary:
      'A phone agent that answers every call around the clock, checks real availability and books the appointment while the caller is still on the line, so a busy chair never costs the salon a booking.',
  },
  {
    slug: 'real-estate-lead-followup',
    title: 'Real estate lead follow up',
    claim:
      'Every property enquiry qualified, nurtured and routed automatically.',
    service: 'Automation & integrations',
    year: '2026',
    summary:
      'Automated follow up for property enquiries, on a steady cadence. Every lead gets qualified, nurtured and routed to the right agent instead of going cold in an inbox.',
  },
];

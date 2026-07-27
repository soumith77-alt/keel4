// Content configuration - easy to edit and maintain

export const services = [
  {
    id: 'voice-ai',
    title: 'Voice AI',
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
    overlayImage: '/voice_ai_poster.webp',
    outcomeStatement: 'Inbound voice agents, Outbound voice agents, Lead reactivation agents.',
  },
  {
    id: 'agentic-automations',
    title: 'Agentic AI Automations',
    slug: 'agentic-automations',
    description: 'Autonomous AI agents that handle complex workflows, data processing, and business operations end to end.',
    shortDescription: 'AI agents that work autonomously to automate your business processes.',
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
      'Data processing pipelines',
      'Customer onboarding flows',
      'Report generation'
    ],
    image: '/ai-automation.webp',
    overlayImage: '/ai-automation.webp',
    outcomeStatement: 'Automate repetitive workflows end to end.',
  },
  {
    id: 'ugc-video',
    title: 'UGC Ads & AI Video',
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
    overlayImage: '/ai-video-creative.webp',
    outcomeStatement: 'Performance driven content at scale.',
  },
  {
    id: 'websites',
    title: 'Conversion Websites',
    slug: 'websites',
    description: 'Premium, conversion focused websites built with modern tech and AI enhanced performance.',
    shortDescription: 'High performance websites that convert visitors into customers.',
    icon: 'globe2',
    features: [
      'Next.js & modern frameworks',
      'Mobile first responsive design',
      'Fast load times & performance'
    ],
    outcomes: [],
    useCases: [
      'SaaS landing pages',
      'Ecommerce stores',
      'Portfolio sites'
    ],
    image: '/websites.webp',
    overlayImage: '/websites.webp',
    outcomeStatement: 'High converting websites engineered for growth.',
  },
  {
    id: 'saas-products',
    title: 'SaaS Products',
    slug: 'saas-products',
    description: 'End to end SaaS product development, from product strategy and UX through engineering, integrations, launch, and iteration.',
    shortDescription: 'Launch ready SaaS products designed, built, and shipped as one system.',
    icon: 'code',
    features: [
      'Product strategy & technical architecture',
      'UX, interface design & prototyping',
      'Full stack product engineering',
      'AI features & third party integrations',
      'Authentication, billing & analytics',
      'Launch support & continuous iteration'
    ],
    outcomes: [],
    useCases: [
      'New SaaS ventures',
      'Internal operations products',
      'AI native software'
    ],
    image: '/football-intelligence-os.png',
    overlayImage: '/football-intelligence-os.png',
    outcomeStatement: 'From product logic to launch ready software.',
  }
];


export const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'Premier Dental Care',
    content: 'Keel transformed our patient booking process. We never miss a call, and our conversion rate speaks for itself.',
    avatar: '/placeholder-avatar-1.jpg'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Founder',
    company: 'TechFlow Inc.',
    content: 'The AI automations we built together save us 20+ hours per week. Game changing technology.',
    avatar: '/placeholder-avatar-2.jpg'
  },
  {
    name: 'Emily Watson',
    role: 'Marketing Director',
    company: 'StyleCo',
    content: 'Our UGC campaign exceeded all expectations. Authentic content that actually converts.',
    avatar: '/placeholder-avatar-3.jpg'
  }
];

export const faqs = [
  {
    question: 'How quickly can we get started?',
    answer: 'Most projects launch within 2 to 4 weeks. Voice AI implementations can go live in as little as 1 week with our streamlined setup process.'
  },
  // {
  //   question: 'Do you work with businesses outside of healthcare?',
  //   answer: 'Absolutely. While we have deep expertise in healthcare, we work with SaaS companies, ecommerce brands, service businesses, and more across industries.'
  // },
  {
    question: 'Can you integrate with our existing tools?',
    answer: 'Yes. We integrate with popular CRMs, calendars, payment processors, and marketing tools. Custom integrations are available for enterprise clients.'
  },
  {
    question: 'What kind of results can we expect?',
    answer: 'Results vary by service and industry, but clients typically see 30 to 50% improvements in key metrics like conversion rates, time saved, or cost reduction within the first quarter.'
  },
  {
    question: 'Do you provide ongoing support?',
    answer: 'Yes. We offer maintenance plans, performance monitoring, and optimization services to ensure your solutions continue delivering value.'
  }
];

export const calendlyLink = process.env.NEXT_PUBLIC_CALENDLY_LINK || 'https://cal.com/manyam-soumith-reddy-eba1qt/ai-voice-agent-demo';

// WhatsApp: include country code, no + or spaces (e.g. 15551234567)
export const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_LINK || 'https://wa.me/918977287631';

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
    { title: 'SaaS landing pages', desc: 'High converting landing pages that capture signups and communicate value clearly.', icon: 'window' },
    { title: 'Ecommerce stores', desc: 'Online stores that are fast, secure, and built to grow with your catalog.', icon: 'cart' },
    { title: 'Portfolio sites', desc: 'Clean, professional portfolios that showcase your work and win clients.', icon: 'briefcase' },
  ],
  'saas-products': [
    { title: 'Product strategy & architecture', desc: 'Define the users, jobs, data model, and technical shape before engineering begins.', icon: 'branch' },
    { title: 'UX & interface design', desc: 'Turn complex product logic into clear flows, prototypes, and a scalable interface system.', icon: 'window' },
    { title: 'Full stack engineering', desc: 'Build the application, APIs, database, and deployment layer as one maintainable product.', icon: 'code' },
    { title: 'AI features & integrations', desc: 'Add useful AI capabilities and connect the tools your product depends on.', icon: 'sparkles' },
    { title: 'Authentication, billing & analytics', desc: 'The commercial product foundation: users, permissions, subscriptions, events, and reporting.', icon: 'chart' },
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
   * Project visual. A real interface crop, render, diagram or branded still —
   * this is what should carry the composition. Until one exists the card
   * falls back to the Keel system object keyed to `service`, which is an
   * honest diagram rather than a fabricated screenshot.
   */
  image?: string;
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
    service: 'SaaS Products',
    year: '2026',
    summary:
      'A platform for football clubs and academies that runs the whole operation in one place: squads, calendar, training, matchday, attendance, availability, finances and messaging. Clubs without a performance department have no reliable picture of a player, so every event logged here builds one, turning attendance, wellness and match data into a living player profile with a confidence score attached. Access is enforced at the data layer rather than in the interface, so sensitive medical information stays visible only to the people entitled to see it.',
    image: '/football-intelligence-os.png',
    featured: true,
  },
  {
    slug: 'ivr-audit-engine',
    title: 'University IVR audit engine',
    claim:
      'A voice agent maps a whole phone tree, then scores caller friction.',
    service: 'Voice AI',
    year: '2026',
    summary:
      'A voice agent calls a university switchboard, presses every option until the whole menu tree is mapped, scores how much pain a real caller goes through, and turns that into a single page report with a booking link at the end. A phone tree cannot be scraped: there is no API and no sitemap, only dial, listen, press and hang up, so every branch is a separate live call and the shape of the tree is unknown until you are already inside it. A weighted friction model scores only the paths that were genuinely walked, and options that were announced but never dialled are excluded from every number.',
    image: '/ivr-audit-engine.webp',
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
    service: 'SaaS Products',
    year: '2026',
    summary:
      'A marketplace connecting building professionals with clients across the PACA region, working in both directions. Clients post projects for free and receive offers, while artisans also publish their own available services for clients to browse and contact directly. Most trade marketplaces run one way and take a cut of every job, which pushes artisans off the platform the moment a relationship forms, so this one earns from monthly subscriptions across three tiers and takes no commission at all. Matching, messaging, reviews and payment all sit inside the platform, across nineteen trades.',
    image: '/artizyn-marketplace.webp',
    featured: true,
  },
  {
    slug: 'oxacan',
    title: 'Oxacan',
    claim:
      'Quote to cash for Swiss contractors, without leaving the tool.',
    service: 'Conversion Websites',
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
    service: 'Conversion Websites',
    year: '2026',
    summary:
      'A fast marketing site built to turn visitors into enquiries, with clear positioning, a layout designed for phones first, and the technical groundwork for search in place from launch.',
  },
  {
    slug: 'virtual-try-on',
    title: 'Virtual try on',
    claim:
      'Shoppers see garments and eyewear on themselves from one photo.',
    service: 'Agentic AI Automations',
    year: '2026',
    summary:
      'A try before you buy experience that lets shoppers see garments and sunglasses on themselves from a single photo, built to cut the hesitation and the returns that hold back selling clothing online.',
  },
  {
    slug: 'rfq-automation',
    title: 'RFQ automation',
    claim:
      'Inbound request in, priced structured quote out, no retyping.',
    service: 'Agentic AI Automations',
    year: '2026',
    summary:
      'An agent that reads incoming requests for quote, pulls out the line items and specifications, prices them against internal data and returns a structured quote, removing the manual retyping that makes quoting slow and inconsistent.',
  },
  {
    slug: 'salon-voice-agent',
    title: 'Salon voice agent',
    claim:
      'Answers every call around the clock and books while they wait.',
    service: 'Voice AI',
    year: '2026',
    summary:
      'A phone agent that answers every call around the clock, checks real availability and books the appointment while the caller is still on the line, so a busy chair never costs the salon a booking.',
  },
  {
    slug: 'real-estate-lead-followup',
    title: 'Real estate lead follow up',
    claim:
      'Every property enquiry qualified, nurtured and routed automatically.',
    service: 'Agentic AI Automations',
    year: '2026',
    summary:
      'Automated follow up for property enquiries, on a steady cadence. Every lead gets qualified, nurtured and routed to the right agent instead of going cold in an inbox.',
  },
];

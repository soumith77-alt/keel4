// Content configuration - easy to edit and maintain

export const services = [
  {
    id: 'voice-ai',
    title: 'Voice AI',
    slug: 'voice-ai',
    description: 'Intelligent voice assistants that answer calls, book appointments, and handle customer inquiries 24/7.',
    shortDescription: '24/7 AI call answering that converts leads into booked clients.',
    icon: '🎤',
    features: [
      'Answers calls in under 2 seconds',
      'Natural, human-like conversations',
      'Calendar integration & booking',
      'CRM sync & lead capture',
      'Custom call flows & routing',
      'Analytics dashboard'
    ],
    outcomes: [
      { metric: '40%', label: 'More appointments captured' },
      { metric: '87%', label: 'Conversion rate' },
      { metric: '18%', label: 'Fewer no-shows' }
    ],
    useCases: [
      'Medical & dental practices',
      'Service businesses',
      'SaaS companies',
      'E-commerce support'
    ],
    // Path to voice demo (file in public/audio/)
    demoAudioUrl: '/audio/voice_ai_audio.mp4',
    image: '/voice_ai.gif',
    overlayImage: '/voice_ai.gif',
    outcomeStatement: 'Inbound voice agents, Outbound voice agents, Lead reactivation agents.',
  },
  {
    id: 'agentic-automations',
    title: 'Agentic AI Automations',
    slug: 'agentic-automations',
    description: 'Autonomous AI agents that handle complex workflows, data processing, and business operations end-to-end.',
    shortDescription: 'AI agents that work autonomously to automate your business processes.',
    icon: '🤖',
    features: [
      'End-to-end workflow automation',
      'Multi-step decision making',
      'API integrations & data sync',
      'Error handling & retries',
      'Custom logic & rules',
      'Performance monitoring'
    ],
    outcomes: [
      { metric: '80%', label: 'Time saved on manual tasks' },
      { metric: '99.9%', label: 'Automation reliability' },
      { metric: '24/7', label: 'Continuous operation' }
    ],
    useCases: [
      'Data processing pipelines',
      'Customer onboarding flows',
      'Report generation'
    ],
    demoVideoUrl: '/data/agentic_ai.mp4',
    image: '/ai-automation.jpg',
    overlayImage: '/ai-automation.jpg',
    outcomeStatement: 'Automate repetitive workflows end-to-end.',
  },
  {
    id: 'ugc-video',
    title: 'UGC Ads & AI Video',
    slug: 'ugc-video',
    description: 'Authentic UGC ads and AI-powered video that drive engagement and conversion. From creator content to motion graphics and product demos.',
    shortDescription: 'UGC ad campaigns and AI video that feel authentic and drive results.',
    icon: '🎬',
    features: [
      'Creator sourcing & UGC ad campaigns',
      'AI video generation & 2D/3D animation',
      'Motion graphics & explainers',
      'Content strategy & multi-platform distribution',
      'Performance tracking & ROAS reporting',
      'Product demos, tutorials & brand storytelling'
    ],
    outcomes: [
      { metric: '3x', label: 'Higher engagement rates' },
      { metric: '45%', label: 'Lower cost per acquisition' },
      { metric: '60%', label: 'Higher video completion rates' }
    ],
    useCases: [
      'SaaS products & mobile apps',
      'Product launches & marketing campaigns',
      'Educational content & social media'
    ],
    demoVideoUrl: '/video/demo-video.mp4',
    image: '/ugc-ads.jpg',
    overlayImage: '/ugc-ads.jpg',
    outcomeStatement: 'Performance-driven content at scale.',
  },
  {
    id: 'websites',
    title: 'Website Building',
    slug: 'websites',
    description: 'Premium, conversion-optimized websites built with modern tech and AI-enhanced performance.',
    shortDescription: 'High-performance websites that convert visitors into customers.',
    icon: '🌐',
    features: [
      'Next.js & modern frameworks',
      'Mobile-first responsive design',
      'Fast load times & performance'
    ],
    outcomes: [
      { metric: '50%', label: 'Faster load times' },
      { metric: '35%', label: 'Higher conversion rates' },
      { metric: '90+', label: 'Lighthouse score' }
    ],
    useCases: [
      'SaaS landing pages',
      'E-commerce stores',
      'Portfolio sites'
    ],
    image: '/websites.jpg',
    overlayImage: '/websites.jpg',
    outcomeStatement: 'High-converting websites engineered for growth.',
  }
];

export const caseStudies = [
  {
    id: 'dental-clinic',
    title: 'Dental Clinic Increases Bookings by 40%',
    client: 'Premier Dental Care',
    industry: 'Healthcare',
    service: 'Voice AI',
    challenge: 'Missing 30% of after-hours calls, leading to lost patients.',
    solution: 'Implemented 24/7 AI receptionist with calendar integration.',
    results: [
      '40% increase in appointments booked',
      '87% call-to-booking conversion rate',
      '18% reduction in no-shows'
    ],
    image: '/placeholder-case-study-1.jpg'
  },
  {
    id: 'saas-platform',
    title: 'SaaS Platform Automates 80% of Onboarding',
    client: 'TechFlow Inc.',
    industry: 'SaaS',
    service: 'Agentic AI Automations',
    challenge: 'Manual onboarding process taking 2+ hours per customer.',
    solution: 'Built autonomous AI agent handling end-to-end onboarding.',
    results: [
      '80% reduction in manual work',
      '2-hour process reduced to 15 minutes',
      '99.9% automation reliability'
    ],
    image: '/placeholder-case-study-2.jpg'
  },
  {
    id: 'ecommerce-brand',
    title: 'E-commerce Brand 3x ROAS with UGC Campaign',
    client: 'StyleCo',
    industry: 'E-commerce',
    service: 'UGC Ads & AI Video',
    challenge: 'Low-performing ad creative with high acquisition costs.',
    solution: 'Launched authentic UGC ad campaign across platforms.',
    results: [
      '3x return on ad spend',
      '45% lower cost per acquisition',
      '2.5x higher conversion rates'
    ],
    image: '/placeholder-case-study-3.jpg'
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
    content: 'The AI automations we built together save us 20+ hours per week. Game-changing technology.',
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
    answer: 'Most projects launch within 2-4 weeks. Voice AI implementations can go live in as little as 1 week with our streamlined setup process.'
  },
  // {
  //   question: 'Do you work with businesses outside of healthcare?',
  //   answer: 'Absolutely. While we have deep expertise in healthcare, we work with SaaS companies, e-commerce brands, service businesses, and more across industries.'
  // },
  {
    question: 'Can you integrate with our existing tools?',
    answer: 'Yes. We integrate with popular CRMs, calendars, payment processors, and marketing tools. Custom integrations are available for enterprise clients.'
  },
  {
    question: 'What kind of results can we expect?',
    answer: 'Results vary by service and industry, but clients typically see 30-50% improvements in key metrics like conversion rates, time saved, or cost reduction within the first quarter.'
  },
  {
    question: 'Do you provide ongoing support?',
    answer: 'Yes. We offer maintenance plans, performance monitoring, and optimization services to ensure your solutions continue delivering value.'
  }
];

export const socialProof = [
  { name: 'TechFlow', logo: '/logo-placeholder-1.svg' },
  { name: 'Premier Dental', logo: '/logo-placeholder-2.svg' },
  { name: 'StyleCo', logo: '/logo-placeholder-3.svg' },
  { name: 'HealthPlus', logo: '/logo-placeholder-4.svg' },
  { name: 'CloudSync', logo: '/logo-placeholder-5.svg' }
];

export const calendlyLink = process.env.NEXT_PUBLIC_CALENDLY_LINK || 'https://cal.com/manyam-soumith-reddy-eba1qt/ai-voice-agent-demo';

// WhatsApp: include country code, no + or spaces (e.g. 15551234567)
export const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_LINK || 'https://wa.me/918977287631';

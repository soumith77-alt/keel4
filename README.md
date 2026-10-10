# Keeel - Product & Software Studio

The marketing site for Keeel (https://saykeeel.com), a studio that designs and builds SaaS products, CRMs and business systems, websites, and automation. Next.js 14 static export, TypeScript, TailwindCSS, deployed as Cloudflare assets (`wrangler.jsonc`).

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
KEEEL/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout with Navbar/Footer
│   ├── globals.css        # Global styles
│   ├── services/          # Service pages (dynamic routes)
│   │   └── [slug]/
│   ├── case-studies/      # Case studies page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── not-found.tsx      # 404 page
├── components/            # Reusable React components
│   ├── Navbar.tsx        # Navigation with sticky CTA
│   ├── Hero.tsx          # Hero section
│   ├── ServicesGrid.tsx  # Services grid
│   ├── HowItWorks.tsx    # Process steps
│   ├── CaseStudies.tsx   # Case study cards
│   ├── Testimonials.tsx  # Client testimonials
│   ├── FAQ.tsx           # FAQ accordion
│   ├── CTA.tsx           # Call-to-action section
│   ├── ContactForm.tsx   # Contact form component
│   └── Footer.tsx        # Footer
├── config/
│   └── content.ts        # Content configuration (easy to edit)
└── public/               # Static assets
```

## 🎨 Components

All components are reusable and located in `/components`. Each component is:
- Fully typed with TypeScript
- Responsive (mobile-first)
- Accessible
- Performance optimized

### Key Components

- **Navbar**: Sticky navigation with mobile menu and CTA button
- **Hero**: Eye-catching hero section with gradient background
- **ServicesGrid**: Grid of service cards linking to service pages
- **HowItWorks**: 4-step process visualization
- **CaseStudies**: Featured case study cards
- **Testimonials**: Client testimonials grid
- **FAQ**: Accordion-style FAQ section
- **CTA**: Conversion-focused call-to-action section
- **ContactForm**: Form with validation (ready for backend integration)
- **Footer**: Site footer with links and contact info

## 📝 Content Management

All content is managed in `/config/content.ts` for easy editing:

- **Services**: Service details, features, outcomes, use cases
- **Case Studies**: Client stories and results
- **Testimonials**: Client testimonials
- **FAQs**: Frequently asked questions
- **Social Proof**: Company logos (placeholder)

To edit content, simply update the arrays in `content.ts`. No code changes needed!

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CALENDLY_LINK=https://calendly.com/your-link
```

### Booking links

- `NEXT_PUBLIC_CALENDLY_LINK` is the voice agent demo event, used only on `/services/voice-ai`.
- `NEXT_PUBLIC_PROJECT_BOOKING_LINK` is a general project call. It is unset, so "Book a call" is hidden site wide. Set it to bring that CTA back.

### Form submission

`ContactForm.tsx` POSTs JSON to `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree, set in `.env.production`), falling back to a pre-composed `mailto:` when unset. It has a honeypot field. The homepage brief and service pages hand off to `/contact` with `?type=` and `?note=`.

## 🎯 Pages

- **Home** (`/`): Full homepage with all sections
- **Services** (`/services/[slug]`): Dynamic service pages
  - Primary: `/services/saas-products`, `/services/crm-business-systems`, `/services/websites`, `/services/agentic-automations` (Automation & Integrations)
  - Additional: `/services/voice-ai`, `/services/ugc-video`
- **Case Studies** (`/case-studies`): All case studies
- **About** (`/about`): About page
- **Contact** (`/contact`): Contact page with form and Calendly

## 🎨 Design System

Tokens live in `app/globals.css` and `tailwind.config.ts`, with measured contrast ratios documented there.

- **Colours**: page `#F6F5F0`, surface `#FFFFFF`, text `#111814`, secondary `#526158`, emerald `#146C50` (`#6FD3A5` for green text on dark), mint `#E5F1EA`, border `#DDE3DB`, dark `#101A15`
- **Typography**: Instrument Sans (all text), IBM Plex Mono (labels and metadata only), with a fluid `.type-*` scale
- **Layout**: `.site-container` (1240px column, 20–56px gutters), `.section-y` (~56px mobile, ~120px desktop)
- **Motion**: 180ms controls, 300ms panels, 480ms reveals with a 12px rise; honours `prefers-reduced-motion`

## ⚡ Performance

- Image optimization with Next.js Image component
- Lazy loading where appropriate
- Minimal dependencies
- Optimized bundle size
- Fast page loads

## 🔍 SEO

- Semantic HTML structure
- Meta tags in layout and pages
- Open Graph tags
- Accessible navigation
- Proper heading hierarchy

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized for all screen sizes

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion (optional, minimal usage)
- **Deployment**: Vercel-ready

## 📦 Dependencies

- `next`: React framework
- `react` & `react-dom`: UI library
- `framer-motion`: Animations (optional)
- `tailwindcss`: Styling
- `typescript`: Type safety

## 🚢 Deployment

The site is ready to deploy to Vercel:

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## 📄 License

All rights reserved.

## 📧 Contact

hello@saykeel.com

# Keel - Agentic AI Solutions Studio

A premium, conversion-focused marketing website built with Next.js, TypeScript, and TailwindCSS.

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
KEEL/
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

### Calendly Integration

Update the `calendlyLink` in `/config/content.ts` or set `NEXT_PUBLIC_CALENDLY_LINK` environment variable.

### Form Submission

The contact form currently logs to console. To connect to a backend:

1. Update `ContactForm.tsx` handleSubmit function
2. Add your API endpoint
3. Handle success/error states

## 🎯 Pages

- **Home** (`/`): Full homepage with all sections
- **Services** (`/services/[slug]`): Dynamic service pages
  - `/services/voice-ai`
  - `/services/agentic-automations`
  - `/services/ugc`
  - `/services/animation`
  - `/services/websites`
- **Case Studies** (`/case-studies`): All case studies
- **About** (`/about`): About page
- **Contact** (`/contact`): Contact page with form and Calendly

## 🎨 Design System

- **Primary Color**: Indigo (`#6366f1`)
- **Typography**: Inter font family
- **Spacing**: TailwindCSS default scale
- **Shadows**: Soft, subtle shadows for depth
- **Animations**: Subtle hover effects and transitions

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

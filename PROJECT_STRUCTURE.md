# Project Structure Overview

## 📂 Complete File Structure

```
KEEL/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (Navbar + Footer wrapper)
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global TailwindCSS styles
│   ├── not-found.tsx            # 404 page
│   ├── about/
│   │   └── page.tsx             # About page
│   ├── case-studies/
│   │   └── page.tsx             # Case studies listing
│   ├── contact/
│   │   └── page.tsx             # Contact page with form
│   └── services/
│       └── [slug]/
│           └── page.tsx         # Dynamic service pages
│
├── components/                   # Reusable React components
│   ├── Navbar.tsx              # Sticky navigation with mobile menu
│   ├── Hero.tsx                # Hero section with gradient
│   ├── ServicesGrid.tsx        # Services grid (5 services)
│   ├── HowItWorks.tsx          # 4-step process
│   ├── CaseStudies.tsx         # Case study cards
│   ├── Testimonials.tsx        # Client testimonials
│   ├── FAQ.tsx                 # FAQ accordion
│   ├── CTA.tsx                 # Call-to-action section
│   ├── ContactForm.tsx         # Contact form component
│   └── Footer.tsx              # Site footer
│
├── config/
│   └── content.ts              # Content configuration (EDIT HERE!)
│
├── public/                      # Static assets (add images/logos here)
│
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts          # TailwindCSS config
├── postcss.config.mjs          # PostCSS config
├── next.config.mjs              # Next.js config
├── .eslintrc.json              # ESLint config
├── .gitignore                   # Git ignore rules
├── README.md                    # Project documentation
└── PROJECT_STRUCTURE.md         # This file
```

## 🎯 Component Breakdown

### Core Layout Components
- **Navbar**: Fixed sticky nav with mobile menu, includes "Book a Call" CTA
- **Footer**: Site footer with links, services, company info

### Homepage Sections
- **Hero**: Large hero with gradient background, headline, CTAs, social proof
- **ServicesGrid**: Grid of 5 service cards linking to service pages
- **HowItWorks**: 4-step visual process
- **CaseStudies**: Featured case study cards (3 shown, links to full page)
- **Testimonials**: 3-column testimonial grid
- **FAQ**: Accordion-style FAQ section
- **CTA**: Final conversion section with gradient background

### Page-Specific Components
- **ContactForm**: Reusable form component (Name, Email, Company, Service dropdown, Details)

## 📄 Pages

### Homepage (`/`)
- Full-featured landing page with all sections
- SEO optimized
- Conversion-focused

### Service Pages (`/services/[slug]`)
Dynamic pages for:
- `/services/voice-ai`
- `/services/agentic-automations`
- `/services/ugc`
- `/services/animation`
- `/services/websites`

Each includes:
- Hero section
- Outcomes/metrics
- Features list
- Use cases
- CTA section

### Other Pages
- `/case-studies` - All case studies
- `/about` - About page
- `/contact` - Contact page with form + Calendly

## ⚙️ Configuration

### Content (`config/content.ts`)
**Easy to edit!** Contains:
- `services[]` - All service data
- `caseStudies[]` - Case study data
- `testimonials[]` - Testimonial data
- `faqs[]` - FAQ data
- `socialProof[]` - Logo data
- `calendlyLink` - Calendly URL

### Styling (`tailwind.config.ts`)
- Primary accent color: `#6366f1` (indigo)
- Custom color palette
- Extended theme

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_CALENDLY_LINK=https://calendly.com/your-link
```

## 🎨 Design System

- **Colors**: Indigo accent (`accent`), neutral grays
- **Typography**: Inter font (via Next.js)
- **Spacing**: TailwindCSS scale
- **Shadows**: Soft, subtle
- **Animations**: Hover effects, transitions (Framer Motion optional)

## 🚀 Getting Started

1. Install: `npm install`
2. Run dev: `npm run dev`
3. Edit content: `config/content.ts`
4. Add images: `public/` folder
5. Deploy: Push to Vercel

## 📝 Notes

- All components are TypeScript typed
- Mobile-first responsive design
- SEO metadata on all pages
- Accessible navigation and forms
- Performance optimized
- Easy to maintain and extend

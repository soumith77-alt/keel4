import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { CONTACT_EMAIL, SITE_URL, services } from "@/config/content";

/**
 * THREE FAMILIES, THREE JOBS. Nothing else is loaded.
 *
 * The site previously ran FOUR: Clash Display for headings, Inter for body,
 * JetBrains Mono for labels — and, unintentionally, the browser's default
 * serif, because `font-serif` was used for the word "compound" in the hero
 * while tailwind.config.ts declared no `serif` key. That is why the one
 * expressive moment on the homepage looked like a stray Times italic dropped
 * into a technical composition.
 *
 * Clash Display is gone. Its geometric weight is what made /about read as the
 * old website while the homepage read as the new one, and pairing a display
 * face with Inter meant headings and body shared no relationship at all.
 * Instrument Sans covers both roles, so the whole site is now ONE voice with
 * two deliberate accents:
 *
 *   Instrument Sans   navigation, headings, body, buttons, controls
 *   IBM Plex Mono     metadata, state labels, step numbers, annotations
 *
 * Instrument Serif was loaded for one italic word per page and has been
 * dropped: three exceptions is not a system, and next to a serif wordmark it
 * read as a third unrelated voice. Emphasis is size, weight and colour.
 *
 * Instrument Sans is variable (400–700 in a single file), so the four weights
 * the design uses cost one request rather than four.
 */
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// The system voice: step names, payloads, metadata. Never a paragraph.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const TITLE = "Keeel — Product & Software Studio";
const DESCRIPTION =
  "Keeel designs and builds SaaS products, custom CRMs and business systems, and websites, with the integrations and automation that connect them.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Keeel",
  },
  description: DESCRIPTION,
  keywords: [
    "product studio",
    "software studio",
    "SaaS development",
    "MVP development",
    "LMS development",
    "custom CRM development",
    "business systems",
    "client portal development",
    "internal tools",
    "website design and development",
    "workflow automation",
    "systems integration",
  ],
  authors: [{ name: "Keeel", url: SITE_URL }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon-256.png",
    apple: "/favicon-256.png",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: "Keeel",
    locale: "en_US",
    images: [
      {
        url: "/brand_logo_og.jpg",
        // The asset is square: 1200x1200.
        width: 1200,
        height: 1200,
        alt: "Keeel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/brand_logo_og.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Keeel",
  url: SITE_URL,
  logo: `${SITE_URL}/brand_logo_og.jpg`,
  description: DESCRIPTION,
  email: CONTACT_EMAIL,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: CONTACT_EMAIL,
    availableLanguage: "English",
  },
  knowsAbout: [
    "SaaS product development",
    "Custom CRM development",
    "Business systems",
    "Website design and development",
    "Workflow automation",
    "Systems integration",
    "Voice agents",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        url: `${SITE_URL}/services/${service.slug}`,
      },
    })),
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Keeel",
  url: SITE_URL,
  description: DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${plexMono.variable}`}
      // The script below adds `js` to this element before React hydrates, so
      // the server HTML and the hydrating DOM differ on className by design.
      // Rendering `js` on the server instead would defeat the no-JS fallback:
      // globals.css hides .reveal only under html.js, so content would be
      // stuck at opacity:0 whenever the bundle fails to run.
      suppressHydrationWarning
    >
      <head>
        {/* Set synchronously before first paint. Reveal animations only engage
            when this class is present, so a JS failure leaves content visible
            rather than stuck at opacity:0. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}

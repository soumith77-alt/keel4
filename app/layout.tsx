import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://saykeel.com"),
  title: {
    default: "Keel - Agentic AI Solutions Studio",
    template: "%s | Keel",
  },
  description:
    "Keel builds AI voice agents, autonomous business automations, UGC ad campaigns, AI video, and high converting websites for businesses that scale. Most projects launch in 2 to 4 weeks.",
  keywords: [
    "AI voice agent",
    "agentic AI automation",
    "AI solutions studio",
    "voice AI for business",
    "AI automation agency",
    "UGC ads AI",
    "AI video production",
    "website development AI",
    "business automation",
    "lead reactivation AI",
    "conversational AI",
    "AI receptionist",
  ],
  authors: [{ name: "Keel", url: "https://saykeel.com" }],
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
    title: "Keel - Agentic AI Solutions Studio",
    description:
      "AI voice agents, business automations, UGC ads & AI video, and websites. The complete AI stack for businesses that scale.",
    type: "website",
    url: "https://saykeel.com",
    siteName: "Keel",
    locale: "en_US",
    images: [
      {
        url: "/brand_logo_og.jpg",
        width: 1200,
        height: 630,
        alt: "Keel - Agentic AI Solutions Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keel - Agentic AI Solutions Studio",
    description:
      "AI voice agents, business automations, UGC ads & AI video, and websites that scale.",
    images: ["/brand_logo_og.jpg"],
  },
  alternates: {
    canonical: "https://saykeel.com",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Keel",
  alternateName: "Saykeel",
  url: "https://saykeel.com",
  logo: "https://saykeel.com/brand_logo_og.jpg",
  description:
    "Agentic AI Solutions Studio. We build Voice AI systems, autonomous business automations, UGC ad campaigns, AI video, and high converting websites for businesses that want to scale.",
  email: "hello@saykeel.com",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "hello@saykeel.com",
    availableLanguage: "English",
  },
  knowsAbout: [
    "Voice AI",
    "Agentic AI",
    "Business Automation",
    "UGC Advertising",
    "AI Video Production",
    "Website Development",
    "Lead Generation",
    "Conversational AI",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Solutions",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Voice AI",
          description:
            "Inbound and outbound AI voice agents that answer calls, book appointments, and reactivate leads 24/7.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Agentic AI Automations",
          description:
            "Autonomous AI agents that handle complex workflows, data processing, and business operations end to end.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UGC Ads & AI Video",
          description:
            "Authentic UGC ads and AI powered video that drive engagement and conversion at scale.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Conversion Websites",
          description:
            "Premium, conversion focused websites built with modern tech and AI enhanced performance.",
        },
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Keel",
  url: "https://saykeel.com",
  description:
    "Agentic AI Solutions Studio, Voice AI, automations, UGC ads, AI video, and websites for businesses that scale.",
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

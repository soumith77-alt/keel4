import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keel - Agentic AI Solutions Studio",
  description: "Premium AI solutions: Voice AI, Agentic Automations, UGC Ads, Animation, and Website Building. Turn every opportunity into growth.",
  icons: {
    icon: "/brand_logo.png",
    apple: "/brand_logo.png",
  },
  openGraph: {
    title: "Keel - Agentic AI Solutions Studio",
    description: "Premium AI solutions: Voice AI, Agentic Automations, UGC Ads, Animation, and Website Building.",
    type: "website",
    images: ["/brand_logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}

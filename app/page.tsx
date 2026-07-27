"use client";

import { useEffect } from "react";
import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import ServicesSection from "@/components/ui/services";
import { services } from "@/config/content";
import FeaturedWork from "@/components/FeaturedWork";
import DeliveryTrust from "@/components/DeliveryTrust";
import CTA from "@/components/CTA";

const NAV_OFFSET = 72; // navbar height

/**
 * Five sections, alternating light and navy:
 *   Hero (light) → Services (light) → Proof (DARK) → Work (light)
 *   → CTA (DARK)
 *
 * The light/dark boundaries are HARD CUTS. A SceneShift band used to sit at
 * each one, wiping navy up over the canvas as you scrolled. In practice it
 * rendered as an empty full-width navy strip — 128px and 160px of stretched
 * dead colour, twice — which read as filler rather than as a transition. The
 * abrupt inversion is the effect; it does not need a runway.
 *
 * Testimonials and FAQ were removed from this page — the testimonials are
 * placeholders, and the FAQ (with its FAQPage JSON-LD) moved to /contact
 * where it answers real pre-sales questions.
 */

function scrollToServices() {
  const el = document.getElementById("services");
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Home() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const run = () => {
      if (window.location.hash === "#services") scrollToServices();
    };
    run();
    const t1 = setTimeout(run, 150);
    const t2 = setTimeout(run, 400);
    const t3 = setTimeout(run, 800);
    const onHashChange = () => {
      if (window.location.hash === "#services") scrollToServices();
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return (
    <>
      <Hero />
      <ServicesSection services={services} />
      <ProofStrip />
      <DeliveryTrust />
      <FeaturedWork />
      <CTA />
    </>
  );
}

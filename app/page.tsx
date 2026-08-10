"use client";

import { useEffect } from "react";
import HeroSignal from "@/components/hero/HeroSignal";
import ServicesSection from "@/components/ui/services";
import { services } from "@/config/content";
import FeaturedWork from "@/components/FeaturedWork";
import ProcessLog from "@/components/ProcessLog";
import DeliveryTrust from "@/components/DeliveryTrust";
import BriefForm from "@/components/BriefForm";

const NAV_OFFSET = 72; // navbar height

/**
 * Homepage order, and the tone rhythm it produces:
 *
 *   1 Hero            light   headline + the system console
 *   2 Services        light   the five surfaces, one stage
 *   3 Selected work   light   three cinematic chapters
 *   4 How Keeel thinks raised  the process, with an artefact per step
 *   5 Trust           light   handoff commitments + deployment surfaces
 *   6 Brief           NAVY    the compact intake form
 *
 * The light/dark boundaries are HARD CUTS. A SceneShift band used to wipe
 * navy up over the canvas at each one and rendered as an empty full-width
 * strip of dead colour; the abrupt inversion is the effect and it does not
 * need a runway.
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
      <HeroSignal />
      <ServicesSection services={services} />
      <FeaturedWork />
      <ProcessLog />
      <DeliveryTrust />
      <BriefForm />
    </>
  );
}

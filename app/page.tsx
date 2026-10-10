import Hero from '@/components/home/Hero';
import SelectedWork from '@/components/home/SelectedWork';
import Solutions from '@/components/home/Solutions';
import Process from '@/components/home/Process';
import Ownership from '@/components/home/Ownership';
import FinalCTA from '@/components/home/FinalCTA';

/**
 * Homepage order and tone:
 *
 *   1 Hero            page    copy + product showcase
 *   2 Selected work   page    real products, immediately after the hero
 *   3 Solutions       page    the four offerings, asymmetric grid
 *   4 Process         white   four stages
 *   5 Ownership       dark    the one #0e1836 section
 *   6 Final CTA       page    two-question brief → /contact
 */
export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Solutions />
      <Process />
      <Ownership />
      <FinalCTA />
    </>
  );
}

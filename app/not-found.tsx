import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import GlowBackdrop from '@/components/ui/glow-backdrop';

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-surface px-5 py-32 sm:px-8">
      <GlowBackdrop variant="hero" className="z-base" />

      <div className="relative z-raised mx-auto w-full max-w-content">
        <span className="type-label text-brand-300">Error 404</span>
        <h1 className="type-display mt-6 max-w-3xl text-fg text-balance">
          That page doesn&apos;t exist.
        </h1>
        <p className="type-body-lg measure mt-6 text-fg-muted text-pretty">
          The link may be out of date, or the page has moved. Everything we build
          is still one click away.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back home
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/#services">See our services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

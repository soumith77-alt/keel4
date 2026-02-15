import { services } from '@/config/content';
import ServicesPageGrid from '@/components/ServicesPageGrid';

export const metadata = {
  title: 'Services - Keel',
  description: 'How Can I Help? Voice AI, Agentic Automations, UGC Ads & AI Video, Website Building. Premium AI solutions that drive measurable results.',
};

export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen">
    <section
      id="services"
      className="pt-[100px] sm:pt-[120px] pb-20 px-4 sm:px-6 lg:px-8 w-full bg-white min-h-screen"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-left mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 tracking-tight">
            How Can I Help?
          </h1>
          <p className="text-sm sm:text-base text-gray-500 font-light max-w-2xl">
            Let&apos;s turn your vision into something amazing.
          </p>
        </div>

        <ServicesPageGrid services={services} />
      </div>
    </section>
    </main>
  );
}

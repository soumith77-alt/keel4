import Link from 'next/link';
import { calendlyLink } from '@/config/content';

export default function Footer() {
  return (
    <footer className="bg-[#253c80] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white mb-4 inline-block">
              keel
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Agentic AI Solutions Studio. Building premium AI solutions that drive measurable results.
            </p>
            <a
              href={calendlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className=" text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#1e3170] transition-colors"
            >
              Book a Call
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/voice-ai" className="hover:text-white transition-colors">
                  Voice AI
                </Link>
              </li>
              <li>
                <Link href="/services/agentic-automations" className="hover:text-white transition-colors">
                  Agentic Automations
                </Link>
              </li>
              <li>
                <Link href="/services/ugc-video" className="hover:text-white transition-colors">
                  UGC Ads & AI Video
                </Link>
              </li>
              <li>
                <Link href="/services/websites" className="hover:text-white transition-colors">
                  Website Building
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {/* <li>
                <Link href="/case-studies" className="hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li> */}
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800/80 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} keel. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-4 sm:mt-0">
            Contact: <a href="mailto:hello@saykeel.com" className="hover:text-white">hello@saykeel.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

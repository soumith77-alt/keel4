import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#253c80] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#1e3170] transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

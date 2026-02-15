// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     formats: ['image/avif', 'image/webp'],
//   },
//   async redirects() {
//     return [
//       { source: '/services/ugc', destination: '/services/ugc-video', permanent: true },
//       { source: '/services/animation', destination: '/services/ugc-video', permanent: true },
//     ];
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export"
};

module.exports = nextConfig;

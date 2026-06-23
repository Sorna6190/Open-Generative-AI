/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js and its ecosystem ship ESM that benefits from transpilation in Next.
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
  experimental: {
    // Keep large 3D libs out of the RSC bundle where possible.
    optimizePackageImports: ['@react-three/drei', 'framer-motion'],
  },
};

export default nextConfig;

import bundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  images: {
    domains: ['nextjs.org', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true
  },
  webpack: (config) => {
    config.optimization.minimize = true;
    return config;
  }
};

export default process.env.ANALYZE 
  ? bundleAnalyzer({
      enabled: true
    })(nextConfig)
  : nextConfig;

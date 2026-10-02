import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // El CSS (pequeño) va dentro del HTML: el navegador pinta sin esperar una descarga aparte.
    inlineCss: true,
  },
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

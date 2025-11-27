/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ← AGREGAR ESTA LÍNEA
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "habitat.horizontsoftware.com.ar",
      },
    ],
  },
}

export default nextConfig
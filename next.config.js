/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.medscapestatic.com",
      }
    ]
  }
}

module.exports = nextConfig

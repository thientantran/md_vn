/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.medscapestatic.com",
      },{
        protocol: "https",
        hostname: 'github.com',
      },{
        protocol: "https",
        hostname: 'lh3.googleusercontent.com'
      }
    ],
    domains:[
      'utfs.io'
    ]
}
}

module.exports = nextConfig

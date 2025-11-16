/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    METLIFE_CASHLESS_SERVICE: process.env.METLIFE_CASHLESS_SERVICE,

    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.zaynaxhealth.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};

module.exports = nextConfig;

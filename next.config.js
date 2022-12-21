/** @type {import('next').NextConfig} */
module.exports = {
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  swcMinify: false,
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "i.imgur.com",
      "avatars.githubusercontent.com",
      "githubusercontent.com",
      "lh3.googleusercontent.com",
      "googleusercontent.com",
    ],
  },
};

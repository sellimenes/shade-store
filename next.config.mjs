/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "i.ibb.co" }, { hostname: "ae-pic-a1.aliexpress-media.com" }, {hostname: "helifrag.com"}],
  },
};

export default nextConfig;

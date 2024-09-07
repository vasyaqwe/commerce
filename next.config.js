import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev"
/** @type {import('next').NextConfig} */
module.exports = {
   images: {
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
         {
            protocol: "https",
            hostname: "cdn.shopify.com",
            pathname: "/s/files/**",
         },
      ],
   },
}
if (process.env.NODE_ENV === "development") {
   await setupDevPlatform()
}

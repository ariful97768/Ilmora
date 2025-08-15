import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(
        "https://lh3.googleusercontent.com/a/ACg8ocK4LArs19HD4bbE_9ocQZs30q92nDI0IWHQCba2ZypUlCvX0fc=s96-c"
      ),
    ],
  },
};

export default nextConfig;

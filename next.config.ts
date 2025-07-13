import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
        search: "",
      },
    ],
  },
  // images: {
  //   remotePatterns: [new URL("https://lh3.googleusercontent.com/a/**")],
  // },
};

export default nextConfig;

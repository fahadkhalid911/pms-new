/** @type {import('next').NextConfig} */
let authHost;
try {
  authHost = process.env.AUTH_URL ? new URL(process.env.AUTH_URL).host : undefined;
} catch {
  authHost = undefined;
}

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: authHost ? [authHost] : [],
    },
  },
  reactStrictMode: true,
  output: "standalone",
  serverExternalPackages: ["bcryptjs", "@prisma/client"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

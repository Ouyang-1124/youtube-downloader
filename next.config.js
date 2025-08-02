/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出用于Netlify部署
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['img.youtube.com', 'i.ytimg.com'],
    unoptimized: true, // 静态导出需要禁用图片优化
  },
  // 确保支持 ES 模块
  experimental: {
    esmExternals: 'loose',
  },
  // 优化 ytdl-core 的 webpack 配置
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
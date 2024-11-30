/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/blog", // 本地路径
        destination: "https://api.vercel.app/blog", // 代理到远程 API
      },

      {
        source: "/api/user/list", // 本地路径，以 `/api` 开头的所有请求
        destination: "http://localhost:3000/user/list", // 转发到目标地址（本地服务）
      },
  
      // dashboard
      {
        source: '/api/:path*',
        destination: 'https://proapi.azurewebsites.net/:path*', // Target API
      },

    ];
  },
};

export default nextConfig;

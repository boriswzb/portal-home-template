import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 静态导出：`npm run build` 后产出 out/ 目录，可直接丢到任意静态服务器 / Nginx / GitHub Pages。
  // 若要在 Node 上跑 SSR（比如需要 API 路由），删掉下面这行 output 即可。
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;

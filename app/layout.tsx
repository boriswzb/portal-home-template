import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/hooks/use-theme';
import { I18nProvider } from '@/lib/hooks/use-i18n';

export const metadata: Metadata = {
  title: '门户主页样式模板 · Portal Home Template',
  description: '深色科技风的 React 门户首页模板：Hero + 主入口卡片 + 功能网格。',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // 注意：这里写死 class="dark"，是为了静态导出首屏就是深色，避免闪白。
    // ThemeProvider 挂载后会根据 localStorage / 系统偏好接管。
    <html lang="zh-CN" className="dark" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

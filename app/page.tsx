'use client';

/**
 * ═══════════════════════════════════════════════════════════════════════
 *  门户主页 —— 静态展示模板
 * ═══════════════════════════════════════════════════════════════════════
 *
 * 这是一个纯静态展示页：没有任何接口请求、没有实时轮询、没有后端依赖。
 * `npm run build` 直接产出 out/ 目录，丢到任意静态服务器即可。
 *
 * 入场动画用的是纯 CSS（globals.css 里的 .animate-fade-up / .delay-*），
 * 不依赖 framer-motion 之类的动画库，静态导出后同样正常播放。
 *
 * 怎么改成你自己的站：
 *
 *  1. 改下面的 SITE（站名 / 标语 / 页脚）
 *  2. 改 PRIMARY_ENTRY（页面中间那张主入口卡片）
 *  3. 改 FEATURES（功能卡片列表）—— 加一项就多一张卡，布局自动适配
 *  4. 改 TOOL_LINKS（导航栏右侧图标入口）
 *  5. 换卡片图片：把 6 张图替换成你自己的，放在 public/ 下
 *  6. 换配色：改 app/globals.css 里 :root 和 .dark 的 CSS 变量
 *
 * 卡片数量说明：
 *   - 3 的倍数 → 整齐的 3 列网格
 *   - 不是 3 的倍数 → 最后一张自动跨两列并改成横向图文，最后一行不留空洞
 */

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calculator,
  Gamepad2,
  Layers,
  LayoutDashboard,
  Sparkles,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react';
import { useI18n } from '@/lib/hooks/use-i18n';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useTheme } from '@/lib/hooks/use-theme';
import { cn } from '@/lib/cn';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type Feature = {
  key: string;
  href: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  cta: string;
  /** 卡片预览图，放在 public/ 下。没有图就留空字符串，会显示纯色占位。 */
  image: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  accentShadow: string;
};

/* ═══════════════════════════════════════════════════════════════════════
   ① 站点基本信息 —— 换成你自己的
   ═══════════════════════════════════════════════════════════════════════ */

const SITE = {
  name: 'Your Brand',
  badge: '演示站点 · 门户首页模板',
  slogan: '一站式的产品与工具入口',
  subtitle: 'A clean, dark-themed portal home for whatever you are building',
  featureHint: '可持续新增 · 按需扩展',
  footerNote: 'Built with Next.js + Tailwind CSS. Free to reuse and modify.',
  icp: 'ICP 备案号占位',
};

/* ═══════════════════════════════════════════════════════════════════════
   ② 主入口卡片 —— 页面视觉重心，放最重要的那个功能
   ═══════════════════════════════════════════════════════════════════════ */

const PRIMARY_ENTRY = {
  href: '/app',
  icon: BookOpen,
  title: '核心产品',
  tag: '核心功能',
  description:
    '这里放你最重要的那个入口。用一两句话说明它能做什么、解决什么问题，以及用户点进去之后会发生什么。',
  highlights: [
    { icon: Layers, text: '第一个卖点' },
    { icon: Monitor, text: '第二个卖点' },
    { icon: Sparkles, text: '第三个卖点' },
  ],
  cta: '立即进入',
};

/* ═══════════════════════════════════════════════════════════════════════
   ③ 功能卡片列表 —— 加一项就多一张卡
   ═══════════════════════════════════════════════════════════════════════ */

const FEATURES: Feature[] = [
  {
    key: 'f1',
    href: '/feature-one',
    title: '示例功能一',
    subtitle: 'FEATURE ONE',
    description:
      '这张卡片的说明文字。建议写清楚它提供什么能力、适合什么场景，让用户一眼判断要不要点进去。',
    tag: '标签',
    cta: '进入查看',
    image: '/placeholder/one.jpg',
    accentText: 'text-amber-600 dark:text-amber-400',
    accentBg: 'bg-amber-500/15',
    accentBorder: 'border-amber-500/25',
    accentShadow: 'hover:shadow-amber-500/10',
  },
  {
    key: 'f2',
    href: '/feature-two',
    title: '示例功能二',
    subtitle: 'FEATURE TWO',
    description:
      '同上的说明文字。这里可以用两三句话描述产品价值，长度控制在四行以内视觉最舒服。',
    tag: '标签',
    cta: '进入查看',
    image: '/placeholder/two.jpg',
    accentText: 'text-orange-600 dark:text-orange-400',
    accentBg: 'bg-orange-500/15',
    accentBorder: 'border-orange-500/25',
    accentShadow: 'hover:shadow-orange-500/10',
  },
  {
    key: 'f3',
    href: '/feature-three',
    title: '示例功能三',
    subtitle: 'FEATURE THREE',
    description:
      '继续描述这个功能。卡片图片建议用 16:9 的截图或渲染图，整体视觉会更统一。',
    tag: '标签',
    cta: '进入查看',
    image: '/placeholder/three.jpg',
    accentText: 'text-cyan-600 dark:text-cyan-400',
    accentBg: 'bg-cyan-500/15',
    accentBorder: 'border-cyan-500/25',
    accentShadow: 'hover:shadow-cyan-500/10',
  },
  {
    key: 'f4',
    href: '/feature-four',
    title: '示例功能四',
    subtitle: 'FEATURE FOUR',
    description:
      '第四个功能。注意每张卡片的 accent 配色可以不同，用来区分不同的功能类别，但建议整体色系统一。',
    tag: '标签',
    cta: '进入查看',
    image: '/placeholder/four.jpg',
    accentText: 'text-violet-600 dark:text-violet-400',
    accentBg: 'bg-violet-500/15',
    accentBorder: 'border-violet-500/25',
    accentShadow: 'hover:shadow-violet-500/10',
  },
  {
    key: 'f5',
    href: '/feature-five',
    title: '示例功能五',
    subtitle: 'FEATURE FIVE',
    description:
      '第五个功能。如果功能数量不是 3 的倍数，最后一张卡会自动变成跨两列的横向布局。',
    tag: '标签',
    cta: '进入查看',
    image: '/placeholder/five.jpg',
    accentText: 'text-teal-600 dark:text-teal-300',
    accentBg: 'bg-teal-500/15',
    accentBorder: 'border-teal-500/25',
    accentShadow: 'hover:shadow-teal-500/10',
  },
  {
    key: 'f6',
    href: '/feature-six',
    title: '示例功能六',
    subtitle: 'FEATURE SIX',
    description:
      '最后一张卡片。它同时也是「卡片数量不是 3 的倍数时自动跨列」的演示：把 FEATURES 里的项删到 4 个，就能看到效果。',
    tag: '标签',
    cta: '进入查看',
    image: '/placeholder/six.jpg',
    accentText: 'text-sky-600 dark:text-sky-400',
    accentBg: 'bg-sky-500/15',
    accentBorder: 'border-sky-500/25',
    accentShadow: 'hover:shadow-sky-500/10',
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   ④ 导航栏右侧图标入口
   ═══════════════════════════════════════════════════════════════════════ */

const TOOL_LINKS = [
  { href: '/tools/one', title: '工具入口一', icon: Calculator },
  { href: '/tools/two', title: '工具入口二', icon: LayoutDashboard },
];

/* ═══════════════════════════════════════════════════════════════════════
   ⑤ 页面
   ═══════════════════════════════════════════════════════════════════════ */

export default function PortalHomePage() {
  const { t } = useI18n();
  const { theme, setTheme } = useTheme();
  const PrimaryIcon = PRIMARY_ENTRY.icon;

  return (
    <div className="flex min-h-[100dvh] w-full flex-col bg-background">
      {/* ═══ 导航栏 ═══ */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 md:px-6">
          <a href="/" className="group flex shrink-0 items-center gap-2">
            <svg viewBox="0 0 40 40" className="h-8 w-8 shrink-0 md:h-9 md:w-9" aria-hidden="true">
              <defs>
                <linearGradient id="ig" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
                <linearGradient id="ag" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
              <path d="M8 28 Q8 10 20 10 L20 32 Q8 32 8 28Z" fill="url(#ig)" opacity="0.9" />
              <path d="M20 10 Q32 10 32 28 Q32 32 20 32Z" fill="url(#ag)" opacity="0.9" />
            </svg>
            <span className="text-sm font-bold tracking-tight text-foreground md:text-base">
              {SITE.name}
            </span>
          </a>

          <div className="flex items-center gap-1 md:gap-2">
            <LanguageSwitcher />

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="切换主题"
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              </TooltipTrigger>
              <TooltipContent>切换主题</TooltipContent>
            </Tooltip>

            <div className="h-4 w-[1px] bg-border/60" />

            {TOOL_LINKS.map(({ href, title, icon: Icon }) => (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <a
                    href={href}
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>{title}</TooltipContent>
              </Tooltip>
            ))}

          </div>
        </div>
      </nav>

      {/* ═══ 主体 ═══ */}
      <main className="w-full flex-1">
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-16 md:px-6 md:pt-16">
          {/* ── Hero ── */}
          <div className="animate-fade-up-lg mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground">
              <Sparkles className="size-3 text-amber-500" />
              {SITE.badge}
            </div>
            <h1 className="mb-3 text-2xl font-bold tracking-tight text-foreground md:text-4xl">
              {t('home.slogan') || SITE.slogan}
            </h1>
            <p className="text-sm text-muted-foreground md:text-base">{SITE.subtitle}</p>
          </div>

          {/* ── 主入口卡片 ── */}
          <div className="animate-fade-up delay-150 mt-8 md:mt-10">
            <a
              href={PRIMARY_ENTRY.href}
              className="group relative block w-full overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card p-5 text-left transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 md:p-7"
            >
              <div className="flex items-start gap-4 md:gap-5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/15 md:size-14">
                  <PrimaryIcon className="size-6 text-primary md:size-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-bold text-foreground md:text-xl">
                      {PRIMARY_ENTRY.title}
                    </h2>
                    <span className="shrink-0 rounded-full border border-primary/25 bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
                      {PRIMARY_ENTRY.tag}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground md:text-sm">
                    {PRIMARY_ENTRY.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                    {PRIMARY_ENTRY.highlights.map(({ icon: Icon, text }) => (
                      <span key={text} className="inline-flex items-center gap-1">
                        <Icon className="size-3" /> {text}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="hidden shrink-0 items-center gap-1 self-center rounded-lg bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground transition-all group-hover:gap-2 sm:flex">
                  {PRIMARY_ENTRY.cta}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary sm:hidden">
                {PRIMARY_ENTRY.cta}
                <ArrowRight className="size-3.5" />
              </div>
            </a>
          </div>

          {/* ── 功能卡片网格 ── */}
          <div className="animate-fade-up delay-250 mt-10 md:mt-12">
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Gamepad2 className="size-4 text-muted-foreground" />
                功能应用
              </h2>
              <span className="text-[11px] text-muted-foreground">{SITE.featureHint}</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {FEATURES.map((f, i) => {
                // 卡片数不是 3 的倍数时，最后一张跨两列并转横向，最后一行不留空洞
                const isWide = i === FEATURES.length - 1 && FEATURES.length % 3 !== 0;

                const media = (
                  <div
                    className={cn(
                      'relative overflow-hidden bg-black',
                      isWide
                        ? 'aspect-[16/9] w-full lg:aspect-auto lg:h-full lg:w-[52%] lg:shrink-0'
                        : 'aspect-[16/9] w-full',
                    )}
                  >
                    {f.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={f.image}
                        alt={f.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-muted">
                        <span className="text-xs text-muted-foreground">{f.tag}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <div className="absolute left-3 top-3">
                      <span
                        className={cn(
                          'rounded-full border px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm',
                          f.accentBg,
                          f.accentText,
                          f.accentBorder,
                        )}
                      >
                        {f.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-[11px] font-medium tracking-wide text-white/65">
                          {f.subtitle}
                        </div>
                        <h3 className="truncate text-base font-semibold text-white md:text-lg">
                          {f.title}
                        </h3>
                      </div>
                      <ArrowUpRight className="size-4 shrink-0 text-white/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                );

                const copy = (
                  <div className={cn('flex flex-1 flex-col p-4 md:p-5', isWide && 'lg:justify-center')}>
                    <p className="line-clamp-4 text-[13px] leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                    <span
                      className={cn(
                        'mt-3 inline-flex items-center gap-1 text-[13px] font-medium',
                        f.accentText,
                      )}
                    >
                      {f.cta}
                      <ArrowRight className="size-3" />
                    </span>
                  </div>
                );

                return (
                  <a
                    key={f.key}
                    href={f.href}
                    style={{ animationDelay: `${250 + i * 70}ms` }}
                    className={cn(
                      'animate-fade-up group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-foreground/20 hover:shadow-lg',
                      f.accentShadow,
                      isWide && 'lg:col-span-2',
                    )}
                  >
                    {isWide ? (
                      <div className="flex flex-1 flex-col lg:flex-row">
                        {media}
                        {copy}
                      </div>
                    ) : (
                      <>
                        {media}
                        {copy}
                      </>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* ═══ 页脚 ═══ */}
      <footer className="w-full border-t border-border/60 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-[11px] text-muted-foreground sm:flex-row md:px-6">
          <span>{SITE.name}</span>
          <span>{SITE.footerNote}</span>
          <span>{SITE.icp}</span>
        </div>
      </footer>
    </div>
  );
}

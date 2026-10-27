# 门户主页样式模板 · Portal Home Template

一个深色科技风的门户首页模板，直接从实际运行的站点上抽出来的样式脚手架。
可以拿来当新站点的主页起点——改文案、换图、换色就能用。

> 纯静态导出，没有后端依赖、没有接口调用、没有实时轮询。

## 预览

- 深色 / 浅色主题切换（跟随 localStorage 记忆）
- 中文 / English 切换
- Hero 标语区
- 主入口大卡片（视觉重心）
- 功能卡片网格：3 列自适应，卡片数为非 3 的倍数时最后一张自动跨两列
- 纯 CSS 入场动画，无动画库依赖
- 响应式：手机 1 列 / 平板 2 列 / 桌面 3 列

## 快速开始

```bash
npm install
npm run dev        # http://localhost:3000
```

构建静态站点：

```bash
npm run build      # 产出 out/ 目录
```

把 `out/` 整个目录丢到任何静态服务器（Nginx / GitHub Pages / Vercel / 对象存储）即可，
不需要 Node 运行时。

## 怎么改成你自己的站

几乎所有内容都集中在 `app/page.tsx` 顶部的几个常量里，不需要碰 JSX：

| 想改什么 | 改哪里 |
| --- | --- |
| 站名 / 标语 / 页脚 / 备案号 | `SITE` |
| 页面中间那张主入口卡片 | `PRIMARY_ENTRY` |
| 功能卡片列表 | `FEATURES`（加一项就多一张卡） |
| 导航栏右侧图标入口 | `TOOL_LINKS` |
| 卡片图片 | 替换 `public/placeholder/*.jpg`，文件名对应 `FEATURES[].image` |
| 配色 | `app/globals.css` 里 `:root`（浅色）和 `.dark`（深色）的 CSS 变量 |
| 默认主题 | `app/layout.tsx` 的 `<html className="dark">` + `lib/hooks/use-theme.tsx` |
| 默认语言 / 文案字典 | `lib/i18n.ts` |

### 加一张功能卡片

往 `FEATURES` 数组里追加一个对象就行，布局会自动适配：

```tsx
{
  key: 'my-app',                       // 唯一标识
  href: '/my-app/',                    // 点击跳转地址
  title: '我的应用',
  subtitle: 'MY APP',                  // 图片左下角的小字
  description: '一两句话说明这个应用能做什么。',
  tag: '标签',                         // 图片左上角的角标
  cta: '进入查看',                     // 卡片底部的文字链接
  image: '/placeholder/one.jpg',       // public/ 下的图片路径
  accentText: 'text-amber-600 dark:text-amber-400',
  accentBg: 'bg-amber-500/15',
  accentBorder: 'border-amber-500/25',
  accentShadow: 'hover:shadow-amber-500/10',
}
```

`accent*` 四个字段控制这张卡片的强调色（角标底色 / 角标文字 / 角标描边 / 悬浮阴影）。
想换成蓝色系就把 `amber` 换成 `blue`，其余同理。

### 换配色

`app/globals.css` 用的是 Tailwind v4 的 CSS 变量方案。
改 `--primary` 就能换掉主色（主入口卡片的按钮、图标、渐变都跟着变）：

```css
.dark {
  --primary: oklch(0.62 0.19 259);          /* 主色 */
  --background: oklch(0.145 0 0);           /* 页面背景 */
  --card: oklch(0.205 0 0);                 /* 卡片背景 */
  --muted-foreground: oklch(0.708 0 0);     /* 次要文字 */
}
```

## 目录结构

```
app/
  layout.tsx            根布局（主题 + i18n Provider）
  page.tsx              主页 —— 要改的内容基本都在这里
  globals.css           Tailwind + 主题变量 + 动画工具类
components/
  language-switcher.tsx 语言切换下拉
  ui/tooltip.tsx        基于 radix-ui 的 Tooltip
lib/
  cn.ts                 clsx + tailwind-merge 的类名合并工具
  i18n.ts               语言列表 + 文案字典
  hooks/
    use-theme.tsx       主题状态（localStorage 持久化）
    use-i18n.tsx        语言状态（localStorage 持久化）
public/
  placeholder/          6 张渐变占位图（换成你自己的截图）
```

## 技术栈

- Next.js 16（App Router，`output: 'export'` 静态导出）
- React 19
- Tailwind CSS v4
- lucide-react（图标）
- radix-ui（Tooltip 原语）

## 注意

- 卡片里的 `href` 是示例路径（`/feature-one` 等），换成你自己的真实路由，
  否则点进去是 404。
- `public/placeholder/` 里是自动生成的渐变占位图，建议换成真实的 16:9 截图。
- 如果不需要语言切换，把 `LanguageSwitcher` 从 `page.tsx` 的导航栏里删掉即可，
  `lib/i18n.ts` 和 `use-i18n` 也可以一并移除。
- 如果不需要主题切换，删掉导航栏里那个太阳/月亮按钮即可，主题会固定为
  `layout.tsx` 里 `<html>` 上的 class。

## License

MIT — 随便用，随便改。

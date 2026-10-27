'use client';

import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/hooks/use-i18n';
import { SUPPORTED_LOCALES } from '@/lib/i18n';
import { cn } from '@/lib/cn';

/** 导航栏语言切换下拉。加语言只需改 lib/i18n.ts 的 SUPPORTED_LOCALES。 */
export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
      >
        {SUPPORTED_LOCALES.find((l) => l.code === locale)?.shortLabel ?? locale}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[120px] overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
          {SUPPORTED_LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
              }}
              className={cn(
                'w-full px-4 py-2 text-left text-sm transition-colors hover:bg-accent',
                locale === l.code && 'bg-accent text-primary',
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

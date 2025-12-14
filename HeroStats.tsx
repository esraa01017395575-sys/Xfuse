// components/HeroStats.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function CountUp({
  target,
  durationMs = 2500,
  decimals = 0,
  prefix = '',
  suffix = '',
}: {
  target: number;
  durationMs?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStarted(true)),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      setVal(target * easeOutCubic(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, durationMs]);

  // صياغة القيمة (يشمل حالة M+ للملايين)
  const text =
    suffix === 'M+'
      ? `${prefix}${Number(val.toFixed(decimals))}${suffix}`
      : `${prefix}${decimals ? val.toFixed(decimals) : Math.round(val)}${suffix}`;

  return (
    <div
      ref={ref}
      className="gradient-text font-extrabold tracking-normal text-3xl md:text-4xl font-bold font-normal text-[38px] mx-[0px] my-[-22px]"
    >
      {text}
    </div>
  );
}

export function HeroStats() {
  const { t, isRTL } = useLanguage();

  // استخدام الترجمات الصحيحة مع fallback
  const stats = [
    { 
      target: 98, 
      decimals: 0, 
      suffix: '%', 
      label: t('hero.stats.satisfaction') || (isRTL ? 'رضا العملاء' : 'Customer Satisfaction')
    },
    { 
      target: 3.2, 
      decimals: 1, 
      suffix: 'x', 
      label: t('hero.stats.roas') || (isRTL ? 'متوسط عائد الإنفاق الإعلاني' : 'Avg. ROAS')
    },
    { 
      target: 1, 
      decimals: 0, 
      prefix: '', 
      suffix: 'M+', 
      label: t('hero.stats.adSpend') || (isRTL ? 'إنفاق إعلاني مُدار' : 'Ad Spend Managed')
    },
    { 
      target: 150, 
      decimals: 0, 
      suffix: '+', 
      label: t('hero.stats.campaigns') || (isRTL ? 'حملة ناجحة' : 'Successful Campaigns')
    },
  ];

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-center items-center max-w-5xl mx-auto"
      style={{ fontFamily: isRTL ? '"El Messiri", system-ui, sans-serif' : undefined }}
    >
      {stats.map((s, i) => (
        <div key={i} className="text-center select-none">
          <CountUp target={s.target} decimals={s.decimals} prefix={(s as any).prefix || ''} suffix={s.suffix} />
          <div className="mt-[23px] text-[11px] md:text-xs text-gray-700 leading-snug max-w-[120px] mx-auto">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

// ===== Types =====
export interface TimelineEvent {
  id?: string;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
}

export interface ScrollTimelineProps {
  events: TimelineEvent[];
  title?: string;
  subtitle?: string;
  animationOrder?: "sequential" | "staggered" | "simultaneous";
  cardAlignment?: "alternating" | "left" | "right";
  lineColor?: string;
  activeColor?: string;
  progressIndicator?: boolean;
  cardVariant?: "default" | "elevated" | "outlined" | "filled";
  cardEffect?: "none" | "glow" | "shadow" | "bounce";
  parallaxIntensity?: number;
  progressLineWidth?: number;
  progressLineCap?: "round" | "square";
  dateFormat?: "text" | "badge";
  className?: string;
  revealAnimation?:
    | "fade"
    | "slide"
    | "scale"
    | "flip"
    | "none";
  connectorStyle?: "dots" | "line" | "dashed";
  perspective?: boolean;
  darkMode?: boolean;
  id?: string;
}

// ===== Utility (احتياطي) =====
function toTextClass(token?: string) {
  if (!token) return "text-primary";
  if (token.startsWith("bg-"))
    return token.replace(/^bg-/, "text-");
  if (token.startsWith("text-")) return token;
  return "";
}

// ===== Card component (أصغر فونت/أبعاد) =====
function StepCard({
  number,
  event,
  variant = "default",
  effect = "none",
}: {
  number: number;
  event: TimelineEvent;
  variant?: ScrollTimelineProps["cardVariant"];
  effect?: ScrollTimelineProps["cardEffect"];
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "0px 0px -4% 0px" },
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      if (ref.current) io.unobserve(ref.current);
    };
  }, []);

  const variantClasses = {
    default: "bg-white border border-gray-100",
    elevated: "bg-white border border-gray-200 shadow-md",
    outlined: "bg-white border-2 border-purple-200",
    filled: "bg-purple-50 border border-purple-200",
  } as const;

  const effectClasses = {
    none: "",
    glow: "hover:shadow-[0_0_12px_rgba(109,40,217,0.22)]",
    shadow: "hover:shadow-lg hover:-translate-y-0.5",
    bounce: "hover:scale-[1.01] active:scale-[0.99]",
  } as const;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 110 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 110 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`w-[16rem] md:w-[18rem] max-w-[92vw] rounded-3xl shadow-lg px-4 py-3 ${
        variantClasses[variant]
      } ${effectClasses[effect]}`}
    >
      <div className="flex items-start gap-2.5 px-[1px] py-[0px]">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 text-white text-[13px] font-bold shadow-sm">
          {String(number).padStart(2, "0")}
        </span>
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">
            {event.title}
          </h3>
          {event.subtitle && (
            <p className="mt-1 text-[11px] md:text-xs font-medium text-purple-600">
              {event.subtitle}
            </p>
          )}
          <p className="mt-1.5 md:text-sm leading-relaxed tracking-wide text-gray-600 text-[15px] p-[0px]">
            {event.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ===== Main: مسار S + توزيع منتظم + حد أدنى للمسافة بين الكروت =====
export function ScrollTimelineCore({
  events,
  title,
  subtitle,
  className = "",
  id,
  connectorStyle = "dashed",
  progressLineWidth = 6,
  progressLineCap = "round",
  progressIndicator = true,
  cardVariant = "default",
  cardEffect = "none",
}: ScrollTimelineProps) {
  const { t, isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [pathLength, setPathLength] = useState(0);
  const [comet, setComet] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [cardPositions, setCardPositions] = useState<
    { x: number; y: number }[]
  >([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!pathRef.current) return;
    
    // تأخير صغير للتأكد من تحميل SVG بالكامل
    const initPath = () => {
      if (!pathRef.current) return;
      
      try {
        const len = pathRef.current.getTotalLength();
        setPathLength(len);
        
        const unsub = smooth.on("change", (v) => {
          if (!pathRef.current) return;
          try {
            const L = len * Math.min(Math.max(v, 0), 1);
            const pt = pathRef.current.getPointAtLength(L);
            setComet({ x: pt.x, y: pt.y });
          } catch (error) {
            console.warn('Error getting point at length:', error);
          }
        });
        
        return unsub;
      } catch (error) {
        console.warn('Error getting total length:', error);
        return null;
      }
    };

    // محاولة فورية
    const unsub1 = initPath();
    
    // محاولة بعد تأخير للتأكد من التحميل
    const timer = setTimeout(() => {
      if (pathLength === 0) {
        const unsub2 = initPath();
        return unsub2;
      }
    }, 200);
    
    return () => {
      if (unsub1) unsub1();
      clearTimeout(timer);
    };
  }, [smooth]);

  useEffect(() => {
    if (
      !pathRef.current ||
      pathLength === 0 ||
      !events ||
      events.length === 0
    )
      return;

    const vbW = 800;
    const vbH = 1200;
    const count = events.length;

    // توزيع منتظم على طول المسار
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < count; i++) {
      const tVal = (i + 1) / (count + 1);
      const L = pathLength * tVal;
      const p = pathRef.current.getPointAtLength(L);
      pts.push({ x: (p.x / vbW) * 100, y: (p.y / vbH) * 100 });
    }

    // حد أدنى للمسافة الرأسية لمنع التراكب (خصوصاً 5 و6)
    const MIN_SPACING_Y = 9; // % من ارتفاع الـ viewBox
    for (let i = 1; i < pts.length; i++) {
      if (pts[i].y - pts[i - 1].y < MIN_SPACING_Y) {
        pts[i].y = pts[i - 1].y + MIN_SPACING_Y;
      }
    }

    // Clamp داخل الحاوية
    for (let i = 0; i < pts.length; i++) {
      pts[i].y = Math.min(pts[i].y, 96);
      pts[i].x = Math.max(12, Math.min(pts[i].x, 88)); // زيادة الحواف للموبايل
    }

    setCardPositions(pts);
  }, [pathLength, events]);

  const dashOffset = useTransform(
    smooth,
    [0, 1],
    [pathLength || 1000, 0], // fallback value if pathLength is 0
  );

  // تحديث موضع المؤشر بطريقة أكثر استقرارًا
  const progressValue = useTransform(smooth, [0, 1], [0, 1]);

  useEffect(() => {
    if (!pathRef.current || pathLength === 0) return;
    
    const unsubscribe = progressValue.on("change", (v) => {
      if (!pathRef.current) return;
      
      try {
        const L = pathLength * Math.min(Math.max(v, 0), 1);
        const pt = pathRef.current.getPointAtLength(L);
        setComet({ x: pt.x, y: pt.y });
      } catch (error) {
        // Fallback: calculate approximate position
        const approximateX = 400; // center of viewbox
        const approximateY = v * 1200; // scale with progress
        setComet({ x: approximateX, y: approximateY });
      }
    });
    
    return () => unsubscribe();
  }, [progressValue, pathLength]);

  const baseColorClass = "text-purple-300";

  // لو اللغة عربي، نطبّق فونت El Messiri (تأكدي إنه متحمّل)
  const sectionStyle = isRTL
    ? { fontFamily: '"El Messiri", system-ui, sans-serif' }
    : undefined;

  return (
    <section
      className={`relative bg-white ${isRTL ? "rtl" : "ltr"} ${className}`}
      id={id}
      style={sectionStyle}
    >
      <div className="text-center py-10 px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-[50px] font-normal">
            {title}
          </span>
        </h2>
        {subtitle && (
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto mt-2">
            {subtitle}
          </p>
        )}
      </div>

      <div
        ref={containerRef}
        className="relative h-[1800px] md:h-[1650px] lg:h-[1800px] px-6 sm:px-8 md:px-12"
      >
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 800 1200"
        >
          <defs>
            <linearGradient
              id="tl-grad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#6D28D9" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
          </defs>

          {/* المسار الأساسي */}
          <path
            d="M 400 0 C 740 200, 60 400, 400 600 S 740 800, 400 1000 S 60 1200, 400 1200"
            fill="none"
            stroke="currentColor"
            className={`${baseColorClass} ${
              connectorStyle === "dots"
                ? "[stroke-dasharray:2_12]"
                : connectorStyle === "dashed"
                  ? "[stroke-dasharray:20_20]"
                  : ""
            }`}
            strokeWidth={progressLineWidth}
            strokeLinecap={progressLineCap}
            opacity={0.35}
          />

          {/* تقدم الرسم */}
          <motion.path
            ref={pathRef}
            d="M 400 0 C 740 200, 60 400, 400 600 S 740 800, 400 1000 S 60 1200, 400 1200"
            fill="none"
            stroke="url(#tl-grad)"
            strokeWidth={progressLineWidth}
            strokeLinecap={progressLineCap}
            strokeDasharray={pathLength || 1000}
            style={{ 
              strokeDashoffset: dashOffset,
              willChange: 'stroke-dashoffset' // تحسين للأداء
            }}
          />

          {/* المؤشر */}
          {progressIndicator && pathLength > 0 && (
            <g 
              transform={`translate(${comet.x}, ${comet.y})`}
              style={{ willChange: 'transform' }} // تحسين للأداء
            >
              <motion.circle
                r={7}
                fill="url(#tl-grad)"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <circle
                r={16}
                fill="none"
                stroke="#A855F7"
                strokeOpacity={0.35}
              />
            </g>
          )}
        </svg>

        {/* الكروت */}
        {events.map((ev, i) => {
          const pos = cardPositions[i];
          if (!pos) return null;
          return (
            <div
              key={ev.id || i}
              className="absolute"
              style={{
                left: `clamp(10%, ${pos.x}% , 90%)`, // تحسين للموبايل
                top: `clamp(6%, ${pos.y}% , 96%)`,
                transform: "translate(-50%, -50%)",
                zIndex: i + 1,
              }}
            >
              <StepCard
                number={i + 1}
                event={ev}
                variant={cardVariant}
                effect={cardEffect}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ===== ClientJourney: محتوى الكروت عبر مفاتيح الترجمة =====
export function ClientJourney({ id }: { id?: string }) {
  const { t } = useLanguage();

  // helper: fallback لو المفتاح مش موجود
  const tt = (key: string, fallback: string) => {
    const v = t(key);
    return v && v !== key ? v : fallback;
  };

  const title = tt("journey.title", "Your Success Journey");
  const subtitle = tt("journey.subtitle", "");

  const events: TimelineEvent[] = [
    {
      year: "01",
      title: tt("journey.step1.title", "Discovery"),
      description: tt(
        "journey.step1.desc",
        "We begin by deeply understanding your brand, goals, and target audience to lay the groundwork for a successful partnership.",
      ),
    },
    {
      year: "02",
      title: tt("journey.step2.title", "Strategy"),
      description: tt(
        "journey.step2.desc",
        "A custom, data-driven marketing plan is crafted specifically for your business to achieve your objectives.",
      ),
    },
    {
      year: "03",
      title: tt("journey.step3.title", "Implementation"),
      description: tt(
        "journey.step3.desc",
        "Our team executes the strategy across all chosen digital channels, turning our plan into action.",
      ),
    },
    {
      year: "04",
      title: tt("journey.step4.title", "Monitoring"),
      description: tt(
        "journey.step4.desc",
        "We track campaign performance in real-time, allowing us to gather valuable insights and respond quickly.",
      ),
    },
    {
      year: "05",
      title: tt("journey.step5.title", "Reporting"),
      description: tt(
        "journey.step5.desc",
        "You receive detailed, transparent reports on key metrics and campaign progress, so you're always in the loop.",
      ),
    },
    {
      year: "06",
      title: tt("journey.step6.title", "Optimization"),
      description: tt(
        "journey.step6.desc",
        "We continually refine our approach based on performance data to maximize your return on investment (ROI) and drive sustainable growth.",
      ),
    },
  ];

  return (
    <ScrollTimelineCore
      events={events}
      title={title}
      subtitle={subtitle}
      connectorStyle="dashed"
      progressIndicator
      id={id}
      // cardVariant="elevated"
      // cardEffect="shadow"
    />
  );
}
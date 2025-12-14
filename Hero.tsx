// components/Hero.tsx
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { HeroStats } from "./HeroStats";
import { ArrowRight } from "lucide-react";

interface HeroProps {}

export function Hero({}: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t, isRTL } = useLanguage();

  const images = [
    "https://i.postimg.cc/MZNPgktN/Untitled-design2222.webp",
    "https://i.postimg.cc/qBzDmBc2/Untitled-design1.webp",
  ];

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentImageIndex((p) => (p + 1) % images.length),
      4000,
    );
    return () => clearInterval(interval);
  }, [images.length]);

  const getCardAnimationProps = (index: number) => {
    const isCurrent = currentImageIndex === index;
    const isNext =
      currentImageIndex ===
      (index - 1 + images.length) % images.length;
    const isPrev =
      currentImageIndex === (index + 1) % images.length;

    if (isCurrent)
      return {
        scale: 1,
        x: 0,
        zIndex: 1,
        opacity: 1,
        rotateY: 0,
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
      };
    if (isNext)
      return {
        scale: 0.9,
        x: isRTL ? -40 : 40,
        zIndex: 0,
        opacity: 0.8,
        rotateY: isRTL ? -10 : 10,
        boxShadow:
          "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
      };
    if (isPrev)
      return {
        scale: 0.9,
        x: isRTL ? 40 : -40,
        zIndex: 0,
        opacity: 0.8,
        rotateY: isRTL ? 10 : -10,
        boxShadow:
          "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
      };
    return {
      scale: 0.8,
      x: 0,
      zIndex: -1,
      opacity: 0,
      rotateY: 0,
      boxShadow: "none",
    };
  };

  const scrollToFirst = (ids: string[]) => {
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      }
    }
  };

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden w-full pt-20 ${isRTL ? "rtl" : ""}`}
      style={{
        background: "var(--pale-lavender)",
        fontFamily: isRTL
          ? '"El Messiri", system-ui, sans-serif'
          : undefined,
      }}
    >
      {/* Background shapes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-24 h-24 bg-purple-200/30 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-200/30 rounded-full animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative z-10">
        <div
          className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isRTL ? "rtl" : ""}`}
        >
          {/* Left Content */}
          <div
            className={`text-center mx-auto ${isRTL ? "lg:text-center" : "lg:text-center"}`}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, delay: 0.1 }}
              className="text-5xl md:text-6xl mb-4 tracking-tight"
            >
              <span className="gradient-text text-[rgba(124,21,21,0)] text-left">
                XFUSE
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, delay: 0.18 }}
              className="text-2xl md:text-4xl mb-4 text-gray-800"
            >
              {t("hero.title.start")}{" "}
              <span className="gradient-text text-center">
                {t("hero.title.highlight")}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, delay: 0.26 }}
              className={`text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl ${isRTL ? "lg:mr-0" : "lg:ml-0"} mx-auto`}
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* UPDATED CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, delay: 0.34 }}
              className="mb-8"
            >
              <button
                className="relative group px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg overflow-hidden"
                onClick={() =>
                  scrollToFirst(["client-journey"])
                }
              >
                {/* Rotating gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-xl animate-spin-slow opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-[2px] bg-white rounded-[10px]"></div>

                {/* Button content */}
                <span
                  className={`relative flex items-center justify-center text-gradient font-semibold ${isRTL ? "flex-row-reverse" : ""} whitespace-nowrap`}
                >
                  {t("hero.cta.secondary")}
                  <ArrowRight
                    className={`h-4 w-4 md:h-5 md:w-5 ${isRTL ? "mr-2 scale-x-[-1]" : "ml-2"}`}
                  />
                </span>
              </button>
            </motion.div>

            {/* Stats */}
            <section className="mt-12">
              <HeroStats />
            </section>
          </div>

          {/* Right Content - Alternating Image Cards */}
          <div
            className={`relative flex justify-center pr-[35px] ${isRTL ? "lg:justify-start" : "lg:justify-end"}`}
          >
            <div className="relative w-72 h-[22rem] md:w-80 md:h-96">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 glassmorphism rounded-2xl shadow-2xl overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, z: -100 }}
                  animate={getCardAnimationProps(index)}
                  transition={{
                    duration: 1.0,
                    ease: "easeInOut",
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={t(
                      "hero.image.alt",
                      `Marketing showcase ${index + 1}`,
                    )}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchpriority={
                      index === 0 ? "high" : "auto"
                    }
                    width="320"
                    height="384"
                    onLoad={(e) => {
                      // تحسين الأداء بتجهيز الصورة التالية
                      if (index === currentImageIndex) {
                        const nextIndex =
                          (index + 1) % images.length;
                        const nextImage = new Image();
                        nextImage.src = images[nextIndex];
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
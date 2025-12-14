"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Target, Lightbulb } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useScrollAnimation, fadeInUpVariants, staggerChildrenVariants, scaleInVariants } from "../hooks/useScrollAnimation";

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

function GlowingCard({ children, className = "", glowColor = "#8b5cf6" }: GlowingCardProps) {
  const { ref, controls } = useScrollAnimation();
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={scaleInVariants}
      className={`relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg ${className}`}
      style={{
        boxShadow: `0 10px 40px ${glowColor}20, 0 0 0 1px ${glowColor}10`
      }}
    >
      {children}
    </motion.div>
  );
}

export function About() {
  const { language, t, isRTL } = useLanguage();
  const headerAnimation = useScrollAnimation();
  const visionMissionHeaderAnimation = useScrollAnimation();
  const cardsAnimation = useScrollAnimation();

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={headerAnimation.ref}
          initial="hidden"
          animate={headerAnimation.controls}
          variants={fadeInUpVariants}
          className="text-center mb-16"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-4 motion-element text-center">
            <span className="text-black dark:text-slate-200 text-center">{t('about.title.prefix')} </span>
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent motion-element">
              {t('about.title.highlight')}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 no-underline text-center">
            {t('about.tagline')}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              {t('about.description')}
            </p>
          </motion.div>
        </motion.div>

        {/* Vision & Mission Section Header */}
        <motion.div
          ref={visionMissionHeaderAnimation.ref}
          initial="hidden"
          animate={visionMissionHeaderAnimation.controls}
          variants={fadeInUpVariants}
          className="text-center mb-16"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-[30px] bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent text-center text-[40px] mt-[0px] mr-[0px] ml-[0px]">
            {t('about.visionMissionTitle')}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            {t('about.visionMissionDescription')}
          </p>
        </motion.div>

        {/* Vision & Mission Cards */}
        <motion.div
          ref={cardsAnimation.ref}
          initial="hidden"
          animate={cardsAnimation.controls}
          variants={staggerChildrenVariants}
          className="grid md:grid-cols-2 gap-8" 
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Mission Card */}
          <motion.div variants={scaleInVariants}>
            <GlowingCard className="p-8 text-center" glowColor="#10b981">
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-purple-400 to-blue-400 to-teal-400 p-3 mb-6 shadow-lg mx-auto">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl mb-4 text-slate-800 dark:text-slate-200">
                {t('about.mission')}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {t('about.missionContent')}
              </p>
            </GlowingCard>
          </motion.div>

          {/* Vision Card */}
          <motion.div variants={scaleInVariants}>
            <GlowingCard className="p-8 text-center" glowColor="#8b5cf6">
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-purple-400 to-blue-400 p-3 mb-6 shadow-lg mx-auto">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl mb-4 text-slate-800 dark:text-slate-200">
                {t('about.vision')}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {t('about.visionContent')}
              </p>
            </GlowingCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
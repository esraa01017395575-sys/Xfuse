import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Target, Lightbulb, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface WhyChooseProps {}

export function WhyChoose({}: WhyChooseProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, isRTL } = useLanguage();

  const pillars = [
    {
      icon: Target,
      title: t('whyChoose.strategy.title'),
      description: t('whyChoose.strategy.desc'),
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Lightbulb,
      title: t('whyChoose.creativity.title'),
      description: t('whyChoose.creativity.desc'),
      gradient: "from-pink-500 to-purple-500"
    },
    {
      icon: TrendingUp,
      title: t('whyChoose.roi.title'),
      description: t('whyChoose.roi.desc'),
      gradient: "from-blue-500 to-purple-500"
    },
  ];

  return (
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.34 }}
          className={`text-center mb-16 ${isRTL ? 'rtl' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl mb-6">
            {t('whyChoose.title.start')} <span className="gradient-text">{t('whyChoose.title.highlight')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('whyChoose.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.3,
                delay: isInView ? index * 0.08 : 0
              }}
              className="text-center group"
            >
              {/* Icon container */}
              <motion.div
                whileHover={{
                  scale: 1.04,
                  transition: { duration: 0.14 }
                }}
                className="relative inline-block mb-6"
              >
                {/* Glowing background effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${pillar.gradient} rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`relative w-20 h-20 bg-gradient-to-r ${pillar.gradient} rounded-2xl flex items-center justify-center shadow-2xl`}>
                  <pillar.icon className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              {/* Content */}
              <h3 className="text-2xl mb-4 text-white">
                {pillar.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {pillar.description}
              </p>

              {/* Decorative element */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: isInView ? 0.5 + index * 0.1 : 0
                }}
                className={`mt-6 mx-auto w-16 h-1 bg-gradient-to-r ${pillar.gradient} rounded-full origin-left`}
              />
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{
              y: -2,
              scale: 1.02,
              transition: { duration: 0.16 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg text-white">
              {t('whyChoose.cta')}
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

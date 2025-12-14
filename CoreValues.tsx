import { motion } from 'motion/react';
import { useRef } from 'react';
import { BarChart3, Palette, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimation, fadeInUpVariants, staggerChildrenVariants, scaleInVariants } from '../hooks/useScrollAnimation';

interface CoreValuesProps {}

export function CoreValues({}: CoreValuesProps) {
  const { t, isRTL } = useLanguage();
  const headerAnimation = useScrollAnimation();
  const valuesAnimation = useScrollAnimation();

  const values = [
    {
      icon: BarChart3,
      title: t('values.results.title'),
      description: t('values.results.desc'),
    },
    {
      icon: Palette,
      title: t('values.innovation.title'),
      description: t('values.innovation.desc'),
    },
    {
      icon: TrendingUp,
      title: t('values.collaboration.title'),
      description: t('values.collaboration.desc'),
    },
  ];

  return (
    <section className={`py-24 bg-gray-50 dark:bg-slate-900 ${isRTL ? 'rtl' : ''}`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={headerAnimation.ref}
          initial="hidden"
          animate={headerAnimation.controls}
          variants={fadeInUpVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6">
            <span className="text-black dark:text-slate-200">{t('values.title')}</span>{' '}
            <span className="gradient-text">{t('values.highlight')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('values.subtitle')}
          </p>
        </motion.div>

        <motion.div
          ref={valuesAnimation.ref}
          initial="hidden"
          animate={valuesAnimation.controls}
          variants={staggerChildrenVariants}
          className="grid md:grid-cols-3 gap-8"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={scaleInVariants}
              className="text-center group bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Icon Badge */}
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.15 }
                }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 mb-6 shadow-lg mx-auto"
              >
                <value.icon className="w-10 h-10 text-white stroke-2" />
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl mb-4 text-gray-900 dark:text-slate-200 font-semibold">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
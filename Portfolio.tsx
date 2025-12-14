"use client";

import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PortfolioProps {
  className?: string;
}

export function Portfolio({ className = '' }: PortfolioProps) {
  const { t, isRTL } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Portfolio categories
  const categories = [
    { id: 'all', label: t('portfolio.categories.all', 'الكل') },
    { id: 'branding', label: t('portfolio.categories.branding', 'الهوية البصرية') },
    { id: 'web', label: t('portfolio.categories.web', 'تطوير المواقع') },
    { id: 'social', label: t('portfolio.categories.social', 'وسائل التواصل') },
    { id: 'design', label: t('portfolio.categories.design', 'التصميم') }
  ];

  // Portfolio items
  const portfolioItems = [
    {
      id: 1,
      title: 'Social Media Platform Analysis',
      category: 'social',
      image: 'https://i.postimg.cc/bv2scP3f/9.png',
      description: t('portfolio.items.social_analysis', 'تحليل منصات وسائل التواصل الاجتماعي')
    },
    {
      id: 2,
      title: 'Performance Analytics Dashboard',
      category: 'web',
      image: 'https://i.postimg.cc/9Md00B6x/6.png',
      description: t('portfolio.items.analytics', 'لوحة تحكم تحليلات الأداء')
    },
    {
      id: 3,
      title: 'Corporate Branding - Mintaz',
      category: 'branding',
      image: 'https://i.postimg.cc/c44C1wXm/15.png',
      description: t('portfolio.items.mintaz_branding', 'الهوية البصرية لشركة منتاز')
    },
    {
      id: 4,
      title: 'Content Strategy',
      category: 'social',
      image: 'https://i.postimg.cc/d1wvHcfB/13.png',
      description: t('portfolio.items.content_strategy', 'استراتيجية المحتوى')
    },
    {
      id: 5,
      title: 'Brand Identity Design',
      category: 'branding',
      image: 'https://i.postimg.cc/P5Djdqsy/530390404-1059564409540517-2902563206887170841-n.jpg',
      description: t('portfolio.items.brand_identity', 'تصميم الهوية البصرية')
    },
    {
      id: 6,
      title: 'UX/UI Design',
      category: 'design',
      image: 'https://i.postimg.cc/bJCMxXfd/1.png',
      description: t('portfolio.items.ux_ui', 'تصميم تجربة وواجهة المستخدم')
    },
    {
      id: 7,
      title: 'Corporate Branding - Xfuse',
      category: 'branding',
      image: 'https://i.postimg.cc/ZqLXqBf8/8.png',
      description: t('portfolio.items.xfuse_branding', 'الهوية البصرية لشركة Xfuse')
    },
    {
      id: 8,
      title: 'UI/UX Design',
      category: 'design',
      image: 'https://i.postimg.cc/TYWSDH7Y/10.png',
      description: t('portfolio.items.ui_ux_alt', 'تصميم واجهة المستخدم')
    },
    {
      id: 9,
      title: 'Brand Identity - Cveez',
      category: 'branding',
      image: 'https://i.postimg.cc/jd0VZbJJ/4.png',
      description: t('portfolio.items.cveez_branding', 'الهوية البصرية لشركة Cveez')
    }
  ];

  // Filter items based on selected category
  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <section 
      ref={ref}
      className={`py-24 bg-gradient-to-br from-purple-50 via-white to-pink-50 overflow-hidden ${className} ${isRTL ? 'rtl' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6">
            {t('portfolio.title', 'معرض')} <span className="gradient-text">{t('portfolio.highlight', 'أعمالنا')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('portfolio.subtitle', 'اكتشف مجموعة متنوعة من مشاريعنا المبتكرة التي حققت نتائج استثنائية لعملائنا')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1 * index,
                layout: { duration: 0.3 }
              }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay content */}
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white">
                    <h3 className="text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-200">{item.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Card content */}
              <div className="p-6">
                <h3 className="text-xl mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            {t('portfolio.cta.text', 'هل تريد رؤية المزيد من أعمالنا؟')}
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            {t('portfolio.cta.button', 'عرض جميع المشاريع')}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
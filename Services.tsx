// components/Services.tsx

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  useScrollAnimation,
  fadeInUpVariants,
  slideInFromLeftVariants,
  slideInFromRightVariants,
} from "../hooks/useScrollAnimation";

interface ServicesProps {}

export function Services({}: ServicesProps) {
  const { t, isRTL } = useLanguage();
  const headerAnimation = useScrollAnimation();
  const tabsAnimation = useScrollAnimation();
  const contentAnimation = useScrollAnimation();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: isRTL ? "الخطة التجارية" : "Business Plan",
      shortLabel: isRTL ? "خطة" : "Business",
      content: {
        title: isRTL
          ? "هوية العلامة التجارية واستراتيجيتها"
          : "Brand Identity & Strategy",
        description: isRTL
          ? "تطوير كامل للعلامة التجارية من المفهوم إلى التنفيذ."
          : "Complete brand development from concept to execution.",
        features: isRTL
          ? [
              "تصميم الشعار",
              "إرشادات العلامة التجارية",
              "الهوية البصرية",
              "استراتيجية العلامة التجارية",
            ]
          : [
              "Logo Design",
              "Brand Guidelines",
              "Visual Identity",
              "Brand Strategy",
            ],
        image:
          "https://i.postimg.cc/WpH3vy2y/assets-task-01k4ts4j85f8asp7vy7te51kd2-1757540537-img-1-1.webp",
      },
    },
    {
      label: isRTL
        ? "إدارة وسائل التواصل الاجتماعي"
        : "Social Media Management",
      shortLabel: isRTL ? "سوشيال ميديا" : "Social",
      content: {
        title: isRTL
          ? "حلول كاملة لوسائل التواصل الاجتماعي"
          : "Complete Social Media Solutions",
        description: isRTL
          ? "إدارة شاملة لوسائل التواصل الاجتماعي وبناء مجتمع حول علامتك التجارية."
          : "End-to-end social media management and community building.",
        features: isRTL
          ? [
              "إنشاء المحتوى",
              "إدارة المجتمع",
              "الاستماع الاجتماعي",
              "استراتيجية التفاعل",
            ]
          : [
              "Content Creation",
              "Community Management",
              "Social Listening",
              "Engagement Strategy",
            ],
        image:
          "https://i.postimg.cc/mrvvjQR8/Chat-GPT-Image-Sep-11-2025-01-07-26-AM.png",
      },
    },
    {
      label: isRTL ? "المحتوى الإبداعي" : "Creative Content",
      shortLabel: isRTL ? "محتوى" : "Creative",
      content: {
        title: isRTL
          ? "إنشاء محتوى جذاب"
          : "Engaging Content Creation",
        description: isRTL
          ? "محتوى جذاب يحقق التفاعل والمبيعات."
          : "Compelling content that drives engagement and conversions.",
        features: isRTL
          ? [
              "إنتاج الفيديو",
              "التصميم الجرافيكي",
              "كتابة المحتوى",
              "التصوير الفوتوغرافي",
            ]
          : [
              "Video Production",
              "Graphic Design",
              "Copywriting",
              "Photography",
            ],
        image:
          "https://i.postimg.cc/44DYc0r9/Chat-GPT-Image-Sep-11-2025-01-07-17-AM.png",
      },
    },
    {
      label: isRTL ? "الإعلانات" : "Advertising",
      shortLabel: isRTL ? "إعلانات" : "Ads",
      content: {
        title: isRTL
          ? "شراء إعلانات متقدم"
          : "Advanced Media Buying",
        description: isRTL
          ? "حملات إعلانية استراتيجية تحقق عائد استثمار قابل للقياس."
          : "Strategic advertising campaigns that deliver measurable ROI.",
        features: isRTL
          ? [
              "تصميم الإعلانات",
              "الاستهداف",
              "تتبع الأداء",
              "التحسين",
            ]
          : [
              "Ad Design",
              "Targeting",
              "Performance Tracking",
              "Optimization",
            ],
        image:
          "https://i.postimg.cc/vBWWj6xQ/Chat-GPT-Image-Sep-11-2025-01-39-11-AM.png",
      },
    },
    {
      label: isRTL ? "بحوث السوق" : "Market Research",
      shortLabel: isRTL ? "أبحاث" : "Research",
      content: {
        title: isRTL
          ? "بحوث السوق والرؤى"
          : "Market Research & Insights",
        description: isRTL
          ? "بحوث مبنية على البيانات لتوجيه الاستراتيجية وتقليل المخاطر."
          : "Data-driven research to guide strategy and reduce risk.",
        features: isRTL
          ? [
              "تحليل ا��منافسين",
              "تقسيم الجمهور",
              "الاستبيانات والمقابلات",
              "تقارير الرؤى",
            ]
          : [
              "Competitor Analysis",
              "Audience Segmentation",
              "Surveys & Interviews",
              "Insights Report",
            ],
        image:
          "https://i.postimg.cc/ZYp3K3RZ/Chat-GPT-Image-Sep-11-2025-01-21-14-AM.png",
      },
    },
  ];

  return (
    <section
      id="services"
      className={`py-24 bg-white ${isRTL ? "rtl" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={headerAnimation.ref}
          initial="hidden"
          animate={headerAnimation.controls}
          variants={fadeInUpVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6">
            {isRTL ? (
              <span className="gradient-text">
                {t("services.highlight", "خدماتنا")}
              </span>
            ) : (
              <>
                {t("services.title", "Our")}{" "}
                <span className="gradient-text">
                  {t("services.highlight", "Services")}
                </span>
              </>
            )}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t(
              "services.subtitle",
              "Comprehensive digital marketing solutions tailored to your business needs",
            )}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          ref={tabsAnimation.ref}
          initial="hidden"
          animate={tabsAnimation.controls}
          variants={fadeInUpVariants}
          className="flex justify-center mb-12 px-2 sm:px-4"
        >
          <div className="inline-flex items-center justify-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg rounded-full shadow-lg border border-gray-200/50 dark:border-slate-700/50 px-2 sm:px-3 py-1.5 sm:py-2 max-w-[95vw] overflow-x-auto mobile-nav-scrollbar">
            <div className={`flex items-center gap-1 sm:gap-2 min-w-max ${isRTL ? 'flex-row-reverse' : ''}`}>
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.label}
                  onClick={() => setActiveTab(index)}
                  className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap flex-shrink-0
                    ${activeTab === index 
                      ? 'text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-md transform scale-105' 
                      : 'text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'}`}
                  whileHover={{ scale: activeTab === index ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`${tab.label} service tab`}
                  aria-current={activeTab === index ? 'page' : undefined}
                >
                  <span className="hidden lg:inline">{tab.label}</span>
                  <span className="lg:hidden">{tab.shortLabel}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0.9, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content - Enhanced Card */}
          <motion.div
            variants={slideInFromLeftVariants}
            initial="hidden"
            animate="visible"
            className="relative rounded-2xl p-8 bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            {/* Card Header with Purple Badge */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-3 h-12 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 mb-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-purple-700 font-medium">
                    {tabs[activeTab].label}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl text-gray-900">
                  {tabs[activeTab].content.title}
                </h3>
              </div>
            </div>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {tabs[activeTab].content.description}
            </p>

            {/* Features List */}
            <ul
              className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}
            >
              {tabs[activeTab].content.features.map(
                (feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{
                      opacity: 0,
                      x: isRTL ? 10 : -10,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.05,
                    }}
                    className={`flex items-center ${isRTL ? "space-x-reverse space-x-3" : "space-x-3"}`}
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">
                      {feature}
                    </span>
                  </motion.li>
                ),
              )}
            </ul>
          </motion.div>

          {/* Right - Enhanced Image Frame */}
          <motion.div
            variants={slideInFromRightVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* تغيير الـaspect-video إلى aspect-[16/10] لضبط نسبة العرض إلى الارتفاع */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 aspect-[16/10]">
              <ImageWithFallback
                src={tabs[activeTab].content.image}
                alt={`${tabs[activeTab].label} service illustration`}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
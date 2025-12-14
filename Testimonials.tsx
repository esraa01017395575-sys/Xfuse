import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TestimonialsProps {}

export function Testimonials({}: TestimonialsProps) {
  const { t, isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      quote: t('testimonials.hadeer.quote', 'XFUSE transformed our digital presence completely. Their data-driven approach increased our leads by 340% in just 6 months. The team\'s creativity and strategic thinking exceeded all our expectations.'),
      author: t('testimonials.hadeer.author', 'Hadeer Mahfouze'),
      role: t('testimonials.hadeer.role', 'Executive Assistant Director'),
      company: t('testimonials.hadeer.company', 'CVeeez'),
      rating: 5
    },
    {
      id: 2,
      quote: t('testimonials.mohamed.quote', 'Working with XFUSE has been a game-changer for our business. Their bilingual expertise and understanding of both local and international markets helped us expand successfully across the region.'),
      author: t('testimonials.mohamed.author', 'Dr.Mohamed'),
      role: t('testimonials.mohamed.role', 'Founder'),
      company: t('testimonials.mohamed.company', 'Clinc DEntii'),
      rating: 5
    },
  ];

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id="testimonials" className={`py-24 bg-gray-50 ${isRTL ? 'rtl' : ''}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-center">
            <span className="gradient-text text-center">{t('testimonials.title')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial display */}
          <div className={`relative bg-white rounded-3xl shadow-xl p-8 md:p-12 min-h-[400px] flex items-center ${isRTL ? 'rtl' : ''}`} dir={isRTL ? "rtl" : "ltr"}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="w-full text-center"
              >
                {/* Quote icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-8">
                  <Quote className="w-8 h-8 text-white" />
                </div>

                {/* Stars */}
                <div className={`flex justify-center mb-6 ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic text-center">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                {/* Author info */}
                <div className="text-center">
                  <div className="text-xl text-gray-900 mb-1">
                    {testimonials[currentIndex].author}
                  </div>
                  <div className="text-purple-600 mb-1">
                    {testimonials[currentIndex].role}
                  </div>
                  <div className="text-gray-500">
                    {testimonials[currentIndex].company}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <motion.button
            onClick={prevTestimonial}
            className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 group`}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.12 }}
          >
            <ChevronLeft className={`w-6 h-6 text-gray-600 group-hover:text-purple-600 transition-colors ${isRTL ? 'rotate-180' : ''}`} />
          </motion.button>

          <motion.button
            onClick={nextTestimonial}
            className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 group`}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.12 }}
          >
            <ChevronRight className={`w-6 h-6 text-gray-600 group-hover:text-purple-600 transition-colors ${isRTL ? 'rotate-180' : ''}`} />
          </motion.button>

          {/* Dots indicator */}
          <div className={`flex justify-center mt-8 ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-purple-600' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: index === currentIndex ? 1.2 : 1,
                  opacity: index === currentIndex ? 1 : 0.6,
                }}
                transition={{ duration: 0.15 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
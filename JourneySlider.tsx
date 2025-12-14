import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useScrollAnimation, fadeInUpVariants } from '../hooks/useScrollAnimation';
import { ArrowRight, Target, Lightbulb, Rocket } from 'lucide-react';

interface JourneySliderProps {}

export function JourneySlider({}: JourneySliderProps) {
  const { t, isRTL } = useLanguage();
  const headerAnimation = useScrollAnimation();
  const ctaAnimation = useScrollAnimation();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={`py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden ${isRTL ? 'rtl' : ''}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-400/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-400/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={headerAnimation.ref}
          initial="hidden"
          animate={headerAnimation.controls}
          variants={fadeInUpVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl mb-6 text-white">
            {t('journey.title')}
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {t('journey.subtitle')}
          </p>
        </motion.div>

        {/* Floating Icons */}
        <div className="flex justify-center items-center mb-16 relative">
          <div className="flex space-x-8 md:space-x-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-float">
                <Target className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-gray-900">1</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative"
              style={{ animationDelay: '1s' }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl animate-float">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-gray-900">2</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="relative"
              style={{ animationDelay: '2s' }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-float">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-gray-900">3</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          ref={ctaAnimation.ref}
          initial="hidden"
          animate={ctaAnimation.controls}
          variants={fadeInUpVariants}
          className="text-center"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl text-white mb-6">
              {isRTL ? 'مستعد لبدء رحلتك الرقمية؟' : 'Ready to Start Your Digital Journey?'}
            </h3>
            <p className="text-gray-200 mb-8 leading-relaxed">
              {isRTL 
                ? 'دعنا نساعدك على تحويل رؤيتك إلى واقع رقمي ناجح. فريقنا من الخبراء مستعد لمرافقتك في كل خطوة.'
                : 'Let us help you transform your vision into a successful digital reality. Our team of experts is ready to accompany you every step of the way.'
              }
            </p>
            
            <motion.button
              onClick={scrollToContact}
              className="relative group px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <span className={`relative flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                {isRTL ? 'ابدأ الآن' : 'Start Now'}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 scale-x-[-1]' : 'ml-2'} group-hover:translate-x-1 transition-transform duration-200`} />
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
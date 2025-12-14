import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {}

export function Footer({}: FooterProps) {
  const { t, isRTL } = useLanguage();

  const quickLinks = [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.portfolio'), href: '#portfolio' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const services = [
    t('footer.service.social'),
    t('footer.service.content'),
    t('footer.service.mediaBuying'),
    t('footer.service.dataAnalysis'),
  ];

  const legalLinks = [
    { label: t('footer.legal.privacy'), href: '#' },
    { label: t('footer.legal.terms'), href: '#' },
    { label: t('footer.legal.cookies'), href: '#' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className={`bg-gray-900 text-white ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.28 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Left - Logo and Tagline */}
          <div>
            <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-10 h-10 rounded-xl gradient-text relative">
                
                
              </div>
              <span className={`text-2xl gradient-text ${isRTL ? 'mr-3' : 'ml-3'}`}>XFUSE</span>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-sm">
              {t('footer.description')}
            </p>
          </div>

          {/* Middle - Quick Links */}
          <div>
            <h4 className="text-lg mb-6 text-white">{t('footer.links')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 group"
                    whileHover={{ x: isRTL ? -4 : 4 }}
                    transition={{ duration: 0.12 }}
                  >
                    <span className="relative">
                      {link.label}
                      <motion.div
                        className={`absolute bottom-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300 ${isRTL ? 'right-0' : 'left-0'}`}
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.12 }}
                      />
                    </span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Services */}
          <div>
            <h4 className="text-lg mb-6 text-white">{t('footer.services')}</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <motion.div
                    className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer group"
                    whileHover={{ x: isRTL ? -4 : 4 }}
                    transition={{ duration: 0.12 }}
                  >
                    <span className="relative">
                      {service}
                      <motion.div
                        className={`absolute bottom-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300 ${isRTL ? 'right-0' : 'left-0'}`}
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.12 }}
                      />
                    </span>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400">
              {t('footer.rights')}
            </div>

            {/* Legal Links */}
            <div className={`flex space-x-6 ${isRTL ? 'space-x-reverse' : ''}`}>
              {legalLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm group"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.12 }}
                >
                  <span className="relative">
                    {link.label}
                    <motion.div
                      className={`absolute bottom-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300 ${isRTL ? 'right-0' : 'left-0'}`}
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.12 }}
                    />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
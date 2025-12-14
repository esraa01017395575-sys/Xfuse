import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { motion } from 'motion/react';
import logoImg from 'figma:asset/1cf52cf31caa52fb5b01f610b1758425d370151f.png';

export function Navbar() {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = {
    en: [
      { id: 'home', label: 'Home', href: '#' },
      { id: 'services', label: 'Services', href: '#services' },
      { id: 'journey', label: 'Journey', href: '#client-journey' },
      { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
      { id: 'testimonials', label: 'Testimonials', href: '#testimonials' },
      { id: 'contact', label: 'Contact', href: '#contact' },
    ],
    ar: [
      { id: 'home', label: 'الرئيسية', href: '#' },
      { id: 'services', label: 'الخدمات', href: '#services' },
      { id: 'journey', label: 'الرحلة', href: '#client-journey' },
      { id: 'portfolio', label: 'الأعمال', href: '#portfolio' },
      { id: 'testimonials', label: 'الآراء', href: '#testimonials' },
      { id: 'contact', label: 'اتصل بنا', href: '#contact' },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // تحديد القسم النشط بناءً على موقع التمرير
      const sections = ['home', 'services', 'client-journey', 'portfolio', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId === 'home' ? '' : sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // تشغيل عند التحميل

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80; // ارتفاع navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const currentNavItems = navItems[language];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        duration: 0.36,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-320 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* الشعار */}
          <a 
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center group"
            aria-label={language === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Go to homepage'}
          >
            <img 
              src={logoImg} 
              alt="XFUSE Logo" 
              className="h-10 w-auto transition-transform duration-280 group-hover:scale-105"
            />
          </a>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            {currentNavItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative text-sm transition-colors duration-280 pb-1 ${
                  activeSection === item.id
                    ? 'text-purple-600'
                    : 'text-gray-700 hover:text-purple-600'
                }`}
                aria-label={item.label}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Navigation Links - Mobile (Horizontal Scrollable) */}
          <div className="flex lg:hidden flex-1 overflow-x-auto mobile-nav-scrollbar mx-4">
            <div className="flex items-center gap-4 px-2">
              {currentNavItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative text-sm whitespace-nowrap transition-colors duration-280 pb-1 ${
                    activeSection === item.id
                      ? 'text-purple-600'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                  aria-label={item.label}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSectionMobile"
                      className="absolute -bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* زر تبديل اللغة */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white hover:shadow-lg transition-all duration-280 transform hover:scale-105"
            aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Globe className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline text-sm">
              {language === 'ar' ? 'EN' : 'عربي'}
            </span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
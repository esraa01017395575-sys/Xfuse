import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { CoreValues } from './components/CoreValues';
import { Services } from './components/Services';
import { ImageRing3D } from './components/ImageRing3D';
import { ClientJourney } from './components/ClientJourney';
import { Testimonials } from './components/Testimonials';
import { TrustedPartners } from './components/TrustedPartners';
import { WhyChoose } from './components/WhyChoose';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';
import { useEffect } from 'react';

function AppContent() {
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    // إضافة viewport meta للاستجابة الصحيحة
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
      document.head.appendChild(meta);
    }

    // تحديث attributes الخاصة بـ HTML للدعم الكامل للغة العربية
    const html = document.documentElement;
    html.lang = language;
    html.dir = isRTL ? 'rtl' : 'ltr';
    
    // إضافة classes للـ body
    document.body.className = isRTL ? 'rtl' : 'ltr';
    
    // إضافة meta tags للـ SEO
    document.title = language === 'ar' ? 
      'XFUSE - وكالة التسويق الرقمي | تصميم مواقع وتطبيقات' : 
      'XFUSE - Digital Marketing Agency | Web Design & Development';
    
    // إضافة أو تحديث meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', language === 'ar' ? 
      'XFUSE وكالة تسويق رقمي متخصصة في تصميم المواقع، تطوير التطبيقات، والهوية البصرية. نحول رؤيتك إلى واقع رقمي ناجح.' :
      'XFUSE is a digital marketing agency specializing in web design, app development, and brand identity. We transform your vision into successful digital reality.'
    );
    
    // إزالة noindex إذا وُجد
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta && robotsMeta.getAttribute('content')?.includes('noindex')) {
      robotsMeta.remove();
    }
    
    // إضافة Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', document.title);
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', metaDescription.getAttribute('content') || '');
    
  }, [language, isRTL]);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead />
      <main>
        <Navbar />
        <Hero />
        <CoreValues />
        <Services />
        <ClientJourney id="client-journey" />
        <ImageRing3D id="portfolio" />
        <Testimonials />
        <TrustedPartners />
        <WhyChoose />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
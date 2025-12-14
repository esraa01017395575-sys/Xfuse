import { useLanguage } from '../contexts/LanguageContext';
import { useEffect } from 'react';

export function SEOHead() {
  const { language } = useLanguage();

  useEffect(() => {
    // إضافة preconnect links للتحسين الفوري
    const addPreconnect = (href: string, crossorigin: boolean = false) => {
      const existing = document.querySelector(`link[rel="preconnect"][href="${href}"]`);
      if (!existing) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = href;
        if (crossorigin) link.crossOrigin = 'anonymous';
        document.head.insertBefore(link, document.head.firstChild);
      }
    };

    // إضافة preconnect links (يجب أن تكون في أول العناصر)
    addPreconnect('https://fonts.googleapis.com', true);
    addPreconnect('https://fonts.gstatic.com', true);
    addPreconnect('https://i.postimg.cc', true);

    // تحسين تحميل الخطوط - دمج الخطوط في طلب واحد
    const optimizedFontsUrl = 'https://fonts.googleapis.com/css2?family=Playpen+Sans:wght@400;700&family=Sansita+Swashed:wght@400;700&display=swap';
    
    const existingFontLink = document.querySelector(`link[href*="fonts.googleapis.com"]`);
    if (!existingFontLink) {
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = optimizedFontsUrl;
      fontLink.media = 'print';
      fontLink.onload = function() { 
        this.media = 'all'; 
      };
      document.head.appendChild(fontLink);
      
      // Fallback للمتصفحات القديمة
      const noscript = document.createElement('noscript');
      const fallbackLink = document.createElement('link');
      fallbackLink.rel = 'stylesheet';
      fallbackLink.href = optimizedFontsUrl;
      noscript.appendChild(fallbackLink);
      document.head.appendChild(noscript);
    }

    // إضافة Schema.org structured data
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "XFUSE",
      "description": language === 'ar' ? 
        "وكالة تسويق رقمي متخصصة في تصميم المواقع وتطوير التطبيقات" :
        "Digital marketing agency specializing in web design and app development",
      "url": "https://xfuse-agency.com",
      "logo": "https://xfuse-agency.com/logo.png",
      "sameAs": [
        "https://www.linkedin.com/company/xfuse-agency",
        "https://www.instagram.com/xfuse.agency",
        "https://www.facebook.com/xfuse.agency"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+966-XXX-XXXX",
        "contactType": "customer service",
        "availableLanguage": ["Arabic", "English"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Riyadh",
        "addressCountry": "SA"
      },
      "founder": {
        "@type": "Person",
        "name": "XFUSE Team"
      },
      "knowsAbout": [
        "Web Design",
        "App Development", 
        "Digital Marketing",
        "Brand Identity",
        "UI/UX Design",
        "E-commerce Solutions"
      ],
      "serviceArea": {
        "@type": "Place",
        "name": "Saudi Arabia"
      }
    };

    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // إضافة Twitter Card meta tags
    const addMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[name="${property}"]`) || 
                 document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (property.startsWith('twitter:') || property.startsWith('og:')) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Twitter Cards
    addMetaTag('twitter:card', 'summary_large_image');
    addMetaTag('twitter:site', '@xfuse_agency');
    addMetaTag('twitter:title', document.title);
    addMetaTag('twitter:description', 
      document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
    );

    // Open Graph Image
    addMetaTag('og:image', 'https://xfuse-agency.com/og-image.jpg');
    addMetaTag('og:image:width', '1200');
    addMetaTag('og:image:height', '630');
    addMetaTag('og:type', 'website');
    addMetaTag('og:url', window.location.href);
    addMetaTag('og:site_name', 'XFUSE');

    // Additional SEO meta tags
    addMetaTag('author', 'XFUSE Agency');
    addMetaTag('robots', 'index, follow, max-image-preview:large');
    addMetaTag('googlebot', 'index, follow');
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href.split('#')[0]);

    return () => {
      // Cleanup
      const scriptToRemove = document.getElementById('structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [language]);

  return null;
}
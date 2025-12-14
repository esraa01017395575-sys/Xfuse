import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Language = "en" | "ar";

interface TranslationObject {
  [key: string]: string;
}

interface Translations {
  en: TranslationObject;
  ar: TranslationObject;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<
  LanguageContextType | undefined
>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguage must be used within a LanguageProvider",
    );
  }
  return context;
};

// Translation objects
const translations: Translations = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.testimonials": "Testimonials",
    "nav.contact": "Contact",
    "nav.main": "Main navigation",
    "nav.logo": "XFUSE logo - Go to homepage",
    "nav.goto": "Navigate to",
    "nav.section": "section",
    "nav.language": "Switch language to",

    // Hero
    "hero.title.start": "Transform Your Brand with",
    "hero.title.highlight": "Digital Excellence",
    "hero.subtitle":
      "We craft innovative digital marketing strategies that drive growth, engagement, and measurable results for your business.",
    "hero.cta.primary": "Explore Our Work",
    "hero.cta.secondary": "Start Your Journey",
    "hero.stats.projects": "Successful Projects",
    "hero.stats.clients": "Happy Clients",
    "hero.stats.growth": "Average Growth",
    "hero.stats.campaigns": "Successful Campaigns",
    "hero.stats.adSpend": "Ad Spend Managed",
    "hero.stats.roas": "Average ROAS",
    "hero.stats.satisfaction": "Client Satisfaction",

    // About
    "about.title.prefix": "About",
    "about.title.highlight": "XFUSE",
    "about.tagline": "Your Digital Marketing Partner",
    "about.description":
      "At XFUSE, we believe in the power of strategic digital marketing to transform businesses. Our team of experts combines creativity with data-driven insights to deliver exceptional results that drive growth and build lasting relationships with your audience.",
    "about.visionMissionTitle": "Our Vision & Mission",
    "about.visionMissionDescription":
      "Our commitment to excellence drives everything we do.",
    "about.vision": "Our Vision",
    "about.visionContent":
      "To become the leading digital marketing agency that transforms businesses through innovative strategies, creative excellence, and data-driven growth solutions that build lasting brand presence in the digital landscape.",
    "about.mission": "Our Mission",
    "about.missionContent":
      "Empowering businesses with comprehensive digital marketing services including social media management, strategic branding, and advanced data analysis to drive measurable results and sustainable growth in today's competitive market.",

    // Core Values
    "values.title": "Our Core",
    "values.highlight": "Values",
    "values.subtitle":
      "The principles that guide our work and define our commitment to excellence",
    "values.innovation.title": "Innovation",
    "values.innovation.desc":
      "We stay ahead of digital trends and embrace cutting-edge technologies.",
    "values.results.title": "Results-Driven",
    "values.results.desc":
      "Every strategy is designed to deliver measurable impact and ROI.",
    "values.collaboration.title": "Collaboration",
    "values.collaboration.desc":
      "We work closely with our clients as partners in their success.",
    "values.transparency.title": "Transparency",
    "values.transparency.desc":
      "Clear communication and honest reporting in everything we do.",

    // Services
    "services.title": "Our",
    "services.highlight": "Services",
    "services.subtitle":
      "Comprehensive digital marketing solutions tailored to your business needs",
    "services.strategy.title": "Digital Strategy",
    "services.strategy.desc":
      "Comprehensive planning and roadmap development",
    "services.social.title": "Social Media",
    "services.social.desc":
      "Engaging content and community management",
    "services.content.title": "Content Marketing",
    "services.content.desc":
      "Strategic content creation and distribution",
    "services.analytics.title": "Analytics & Insights",
    "services.analytics.desc":
      "Data-driven performance optimization",

    // Portfolio
    "portfolio.title": "Portfolio",
    "portfolio.highlight": "Showcase",
    "portfolio.subtitle":
      "Explore our successful campaigns and creative solutions that delivered exceptional results",

    // Client Journey - Updated
    "journey.title": "Your Journey to Digital Success",
    "journey.subtitle":
      "From initial understanding to continuous growth, we guide you through every stage of your digital marketing journey.",
    "journey.step1.title": "Discovery",
    "journey.step1.desc":
      "We begin by deeply understanding your brand, goals, and target audience to lay the groundwork for a successful partnership.",
    "journey.step2.title": "Strategy",
    "journey.step2.desc":
      "A custom, data-driven marketing plan is crafted specifically for your business to achieve your objectives.",
    "journey.step3.title": "Implementation",
    "journey.step3.desc":
      "Our team executes the strategy across all chosen digital channels, turning our plan into action.",
    "journey.step4.title": "Monitoring",
    "journey.step4.desc":
      "We track campaign performance in real-time, allowing us to gather valuable insights and respond quickly.",
    "journey.step5.title": "Reporting",
    "journey.step5.desc":
      "You receive detailed, transparent reports on key metrics and campaign progress, so you're always in the loop.",
    "journey.step6.title": "Optimization",
    "journey.step6.desc":
      "We continually refine our approach based on performance data to maximize your return on investment (ROI) and drive sustainable growth.",

    // Team Members
    "team.taqy.name": "Taqy",
    "team.taqy.role": "Moderator",
    "team.taqy.desc":
      "Taqy ensures a smooth and welcoming start to your journey.",
    "team.madonna.name": "Madonna",
    "team.madonna.role": "PR Partner",
    "team.madonna.desc":
      "Madonna is your dedicated partner, ready to meet your needs within the company.",
    "team.moaz.name": "Moaz",
    "team.moaz.role": "PR Partner",
    "team.moaz.desc":
      "Moaz is also committed to fulfilling your requests and ensuring your satisfaction.",
    "team.esraa.name": "Esraa",
    "team.esraa.role": "Data Analyst & Market Researcher",
    "team.esraa.desc":
      "Esraa transforms numbers into actionable insights to drive your strategy.",
    "team.nour.name": "Nour",
    "team.nour.role": "Content Creator",
    "team.nour.desc":
      "Nour crafts innovative strategies and creates captivating content.",
    "team.ibrahim.name": "Ibrahim",
    "team.ibrahim.role": "Graphic Designer",
    "team.ibrahim.desc":
      "Ibrahim brings your vision to life with powerful and stunning visuals.",
    "team.khalifa.name": "Prof. Khalifa",
    "team.khalifa.role": "Final Reviewer",
    "team.khalifa.desc":
      "Prof. Khalifa ensures every detail is perfect before launch.",

    // Testimonials
    "testimonials.title": "What Our Clients Say",
    "testimonials.subtitle":
      "Discover how we've helped businesses transform their digital presence and achieve remarkable growth",

    // Testimonial Data
    "testimonials.hadeer.quote":
      "XFUSE doesn't just create campaigns, they create experiences. Their innovative approach to social media marketing helped us build a community of loyal customers who truly connect with our brand.",
    "testimonials.hadeer.author": "Hadeer Mahfouz",
    "testimonials.hadeer.role": "Executive Assistant",
    "testimonials.hadeer.company": "CVeeez",
    "testimonials.mohamed.quote":
      "The level of dedication and expertise XFUSE brings to every project is remarkable. They took our small business and helped us compete with industry giants through smart digital strategies.",
    "testimonials.mohamed.author": "Dr. Mohamed",
    "testimonials.mohamed.role": "Founder",
    "testimonials.mohamed.company": "Denty Clinic",

    // Contact
    "contact.title": "Let's Start Your",
    "contact.highlight": "Digital Journey",
    "contact.subtitle":
      "Ready to transform your brand? Get in touch with our team today.",
    "contact.form.title": "Contact Form",
    "contact.form.name": "Full Name",
    "contact.form.email": "Email Address",
    "contact.form.company": "Company Name",
    "contact.form.message": "Tell us about your project",
    "contact.form.submit": "Send Message",

    // Contact Info Labels
    "contact.info.mail": "Mail",
    "contact.info.phone": "Phone",

    // Why Choose XFUSE
    "whyChoose.title.start": "Why Choose",
    "whyChoose.title.highlight": "XFUSE?",
    "whyChoose.subtitle":
      "Three core pillars that set us apart in the digital marketing landscape",
    "whyChoose.strategy.title": "Strategy",
    "whyChoose.strategy.desc":
      "Data-driven approaches tailored to your goals.",
    "whyChoose.creativity.title": "Creativity",
    "whyChoose.creativity.desc":
      "Stunning visuals that capture attention.",
    "whyChoose.roi.title": "ROI Focus",
    "whyChoose.roi.desc":
      "Measurable results that grow your business.",
    "whyChoose.cta": "Start Your Digital Journey",

    // Trusted Partners
    "trustedPartners.title.start": "Trusted by",
    "trustedPartners.title.highlight": "Industry Leaders",
    "trustedPartners.subtitle":
      "Join the growing list of successful businesses that trust XFUSE",
    "trustedPartners.stats.campaigns": "Successful Campaigns",
    "trustedPartners.stats.adSpend": "Ad Spend Managed",
    "trustedPartners.stats.roas": "Average ROAS",
    "trustedPartners.stats.satisfaction": "Client Satisfaction",

    // Footer
    "footer.description":
      "Empowering businesses with data-driven digital marketing strategies and creative solutions.",
    "footer.links": "Quick Links",
    "footer.services": "Services",
    "footer.contact.title": "Contact Info",
    "footer.contact.email": "hello@xfuse.com",
    "footer.contact.phone": "+1 (555) 123-4567",
    "footer.rights": "© 2025 XFUSE — All rights reserved",
    "footer.service.social": "Social Media Management",
    "footer.service.content": "Creative Content",
    "footer.service.mediaBuying": "Media Buying", 
    "footer.service.dataAnalysis": "Data Analysis",
    "footer.legal.privacy": "Privacy Policy",
    "footer.legal.terms": "Terms of Service",
    "footer.legal.cookies": "Cookie Policy",
  },
  ar: {
    // Navbar
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.services": "خدماتنا",
    "nav.portfolio": "أعمالنا",
    "nav.testimonials": "آراء العملاء",
    "nav.contact": "تواصل معنا",
    "nav.main": "التنقل الرئيسي",
    "nav.logo": "شعار XFUSE - انتقل إلى الصفحة الرئيسية",
    "nav.goto": "انتقل إلى",
    "nav.section": "قسم",
    "nav.language": "قم بتغيير اللغة إلى",

    // Hero
    "hero.title.start": "حوّل علامتك التجارية بـ",
    "hero.title.highlight": "التميز الرقمي",
    "hero.subtitle":
      "نصمم استراتيجيات تسويق رقمي مبتكرة تحقق النمو والتفاعل ونتائج قابلة للقياس لأعمالك.",
    "hero.cta.primary": "استكشف أعمالنا",
    "hero.cta.secondary": "ابدأ رحلتك",
    "hero.stats.projects": "مشروع ناجح",
    "hero.stats.clients": "عميل راضٍ",
    "hero.stats.growth": "متوسط النمو",
    "hero.stats.campaigns": "حملة ناجحة",
    "hero.stats.adSpend": "إنفاق إعلاني مُدار",
    "hero.stats.roas": "متوسط عائد الإنفاق الإعلاني",
    "hero.stats.satisfaction": "رضا العملاء",

    // About
    "about.title.prefix": "من",
    "about.title.highlight": "نحن",
    "about.tagline": "شريكك في التسويق الرقمي",
    "about.description":
      "في XFUSE، نؤمن بقوة التسويق الرقمي الاستراتيجي في إحداث نقلة نوعية للشركات. يجمع فريق خبرائنا بين الإبداع والرؤى المبنية على البيانات لتقديم نتائج استثنائية تدفع النمو وتبني علاقات دائمة مع جمهورك.",
    "about.visionMissionTitle": "رؤيتنا ورسالتنا",
    "about.visionMissionDescription":
      "التزامنا بالتميز هو ما يدفعنا في كل ما نقوم به.",
    "about.vision": "رؤيتنا",
    "about.visionContent":
      "أن نصبح وكالة التسويق الرقمي الرائدة التي تحوّل الشركات من خلال استراتيجيات مبتكرة، تميز إبداعي، وحلول نمو مبنية على البيانات لتبني حضوراً دائماً للعلامة التجارية في المشهد الرقمي.",
    "about.mission": "رسالتنا",
    "about.missionContent":
      "تمكين الشركات بخدمات تسويق رقمي شاملة تشمل إدارة وسائل التواصل الاجتماعي، وبناء العلامة التجارية الاستراتيجي، وتحليل البيانات المتقدم لتحقيق نتائج قابلة للقياس ونمو مستدام في سوق اليوم التنافسي.",

    // Core Values
    "values.title": "قيمنا",
    "values.highlight": "الأساسية",
    "values.subtitle":
      "المبادئ التي توجه عملنا وتحدد التزامنا بالتميز",
    "values.innovation.title": "الابتكار",
    "values.innovation.desc":
      "نبقى في صدارة الاتجاهات الرقمية ونتبنى أحدث التقنيات.",
    "values.results.title": "التركيز على النتائج",
    "values.results.desc":
      "كل استراتيجية مصممة لتقديم تأثير وعائد استثمار قابل للقياس.",
    "values.collaboration.title": "التعاون",
    "values.collaboration.desc":
      "نعمل عن كثب مع عملائنا كشركاء في نجاحه.",
    "values.transparency.title": "الشفافية",
    "values.transparency.desc":
      "تواصل واضح وتقارير صادقة في كل ما نقوم به.",

    // Services
    "services.title": "خدماتنا",
    "services.highlight": "خدمتنا",
    "services.subtitle":
      "حلول تسويق رقمي شاملة مصممة خصيصاً لاحتياجات أعمالك",
    "services.strategy.title": "الاستراتيجية الرقمية",
    "services.strategy.desc":
      "التخطيط الشامل وتطوير خارطة الطريق",
    "services.social.title": "وسائل التواصل الاجتماعي",
    "services.social.desc": "محتوى جذاب وإدارة المجتمع",
    "services.content.title": "تسويق المحتوى",
    "services.content.desc": "إنشاء وتوزيع المحتوى الاستراتيجي",
    "services.analytics.title": "التحليلات والرؤى",
    "services.analytics.desc":
      "تحسين الأداء المستند إلى البيانات",

    // Portfolio
    "portfolio.title": "معرض",
    "portfolio.highlight": "الأعمال",
    "portfolio.subtitle":
      "استكشف حملاتنا الناجحة والحلول الإبداعية التي حققت نتائج استثنائية",

    // Client Journey - Updated
    "journey.title": "رحلتك نحو النجاح الرقمي",
    "journey.subtitle":
      "من الفهم الأولي إلى النمو المستمر، نوجهك في كل مرحلة من مراحل رحلتك في التسويق الرقمي.",
    "journey.step1.title": "الاكتشاف",
    "journey.step1.desc":
      "نبدأ بفهم عميق لعلامتك التجارية وأهدافك وجمهورك المستهدف لوضع الأساس لشراكة ناجحة.",
    "journey.step2.title": "الاستراتيجية",
    "journey.step2.desc":
      "يتم صياغة خطة تسويق مخصصة ومدفوعة بالبيانات خصيصًا لعملك لتحقيق أهدافك.",
    "journey.step3.title": "التنفيذ",
    "journey.step3.desc":
      "ينفذ فريقنا الاستراتيجية عبر جميع القنوات الرقمية المختارة، محولين خطتنا إلى عمل.",
    "journey.step4.title": "المراقبة",
    "journey.step4.desc":
      "نتتبع أداء الحملة في الوقت الفعلي، مما يسمح لنا بجمع رؤى قيمة والاستجابة بسرعة.",
    "journey.step5.title": "التقارير",
    "journey.step5.desc":
      "تتلقى تقارير مفصلة وشفافة حول المقاييس الرئيسية وتقدم الحملة، حتى تكون دائمًا على اطلاع.",
    "journey.step6.title": "التحسين",
    "journey.step6.desc":
      "نحسن نهجنا باستمرار بناءً على بيانات الأداء لزيادة عائد استثمار (ROI) ودفع النمو المستدام.",

    // Team Members
    "team.taqy.name": "تقي",
    "team.taqy.role": "منسق",
    "team.taqy.desc": "تقي يضمن بداية سلسة ومرحبة لرحلتك.",
    "team.madonna.name": "مادونا",
    "team.madonna.role": "شريك العلاقات العامة",
    "team.madonna.desc":
      "مادونا هي شريكتك المخصصة، مستعدة لتلبية احتياجاتك داخل الشركة.",
    "team.moaz.name": "معاذ",
    "team.moaz.role": "شريك العلاقات العامة",
    "team.moaz.desc":
      "معاذ ملتزم أيضاً بتلبية طلباتك وضمان رضاك.",
    "team.esraa.name": "إسراء",
    "team.esraa.role": "محلل بيانات وباحث سوق",
    "team.esraa.desc":
      "إسراء تحول الأرقام إلى رؤى قابلة للتنفيذ لدفع استراتيجيتك.",
    "team.nour.name": "نور",
    "team.nour.role": "منشئ محتوى",
    "team.nour.desc":
      "نور تصنع استراتييات مبتكرة وتنشئ محتوى جذاب.",
    "team.ibrahim.name": "إبراهيم",
    "team.ibrahim.role": "مصمم جرافيك",
    "team.ibrahim.desc":
      "إبراهيم يحول رؤيتك إلى واقع بمرئيات قوية ومذهلة.",
    "team.khalifa.name": "الأستاذ خليفة",
    "team.khalifa.role": "مراجع نهائي",
    "team.khalifa.desc":
      "الأستاذ خليفة يضمن أن كل التفاصيل مثالية قبل الإطلاق.",

    // Testimonials
    "testimonials.title": "ما يقوله عملاؤنا",
    "testimonials.subtitle":
      "آراء حقيقية من الشركات التي ساعدناها على التحول",

    // Testimonial Data
    "testimonials.hadeer.quote":
      "لقد غيّرت XFUSE حضورنا الرقمي بالكامل. نهجهم المبني على البيانات زاد عملاءنا المحتملين بنسبة 340% في 6 أشهر فقط. إبداع الفريق وتفكيرهم الاستراتيجي فاق كل توقعاتنا.",
    "testimonials.hadeer.author": "هدير محفوظ",
    "testimonials.hadeer.role": "مساعد المدير التنفيذي",
    "testimonials.hadeer.company": "CVeeez",
    "testimonials.mohamed.quote":
      "العمل مع XFUSE كان نقطة تحول لأعمالنا. خبرتهم ثنائية اللغة وفهمهم للأسواق المحلية والدولية ساعدنا على التوسع بنجاح عبر المنطقة.",
    "testimonials.mohamed.author": "د.محمد",
    "testimonials.mohamed.role": "المؤسس",
    "testimonials.mohamed.company": "عيادة دنتي",

    // Contact
    "contact.title": "لنبدأ",
    "contact.highlight": "رحلتك الرقمية",
    "contact.subtitle":
      "مستعد لتحويل علامتك التجارية؟ تواصل مع فريقنا اليوم.",
    "contact.form.title": "نموذج التواصل",
    "contact.form.name": "الاسم الكامل",
    "contact.form.email": "عنوان البريد الإلكتروني",
    "contact.form.company": "اسم الشركة",
    "contact.form.message": "أخبرنا عن مشروعك",
    "contact.form.submit": "إرسال الرسالة",

    // Contact Info Labels
    "contact.info.mail": "البريد الإلكتروني",
    "contact.info.phone": "الهاتف",

    // Why Choose XFUSE
    "whyChoose.title.start": "لماذا تختار",
    "whyChoose.title.highlight": "XFUSE؟",
    "whyChoose.subtitle":
      "ثلاث ركائز أساسية تميزنا في مشهد التسويق الرقمي",
    "whyChoose.strategy.title": "الاستراتيجية",
    "whyChoose.strategy.desc":
      "نهج مبني على البيانات ومصمم خصيصاً لأهدافك.",
    "whyChoose.creativity.title": "الإبداع",
    "whyChoose.creativity.desc": "مرئيات مذهلة تجذب الانتباه.",
    "whyChoose.roi.title": "التركيز على العائد",
    "whyChoose.roi.desc": "نتائج قابلة للقياس تنمو أعمالك.",
    "whyChoose.cta": "ابدأ رحلتك الرقمية",

    // Trusted Partners
    "trustedPartners.title.start": "نحن موثوقون من قبل",
    "trustedPartners.title.highlight": "رواد الصناعة",
    "trustedPartners.subtitle":
      "انضم إلى القائمة المتنامية من الشركات الناجحة التي تثق بـ XFUSE",
    "trustedPartners.stats.campaigns": "حملة ناجحة",
    "trustedPartners.stats.adSpend": "إنفاق إعلاني مُدار",
    "trustedPartners.stats.roas": "متوسط عائد الإنفاق الإعلاني",
    "trustedPartners.stats.satisfaction": "رضا العملاء",

    // Footer
    "footer.description":
      "تحويل العلامات التجارية من خلال حلول التسويق الرقمي المبتكرة.",
    "footer.links": "روابط سريعة",
    "footer.services": "خدماتنا",
    "footer.contact.title": "معلومات الاتصال",
    "footer.contact.email": "hello@xfuse.com",
    "footer.contact.phone": "+1 (555) 123-4567",
    "footer.rights": "© 2025 XFUSE — جميع الحقوق محفوظة",
    "footer.service.social": "إدارة وسائل التواصل الاجتماعي",
    "footer.service.content": "المحتوى الإبداعي",
    "footer.service.mediaBuying": "شراء الوسائط",
    "footer.service.dataAnalysis": "تحليل البيانات",
    "footer.legal.privacy": "سياسة الخصوصية",
    "footer.legal.terms": "شروط الخدمة",
    "footer.legal.cookies": "سياسة ملفات تعريف الارتباط",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({
  children,
}: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>("en");
  const isRTL = language === "ar";

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Set document direction
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, t, isRTL }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
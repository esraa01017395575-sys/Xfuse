import { useLanguage } from '../contexts/LanguageContext';

export default function Privacy() {
  const { t, isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : ''}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className={`text-4xl mb-8 text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
          
          <div className={`text-sm text-gray-500 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'آخر تحديث: 11 سبتمبر 2025' : 'Last updated: September 11, 2025'}
          </div>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '1. جمع المعلومات' : '1. Information Collection'}
            </h2>
            <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'نحن في XFUSE نجمع المعلومات التي تقدمها لنا طوعاً عند استخدام خدماتنا، بما في ذلك:'
                : 'We at XFUSE collect information you voluntarily provide when using our services, including:'
              }
            </p>
            <ul className={`list-disc pl-6 text-gray-700 space-y-2 mt-4 ${isRTL ? 'pr-6 pl-0 list-none' : ''}`}>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• معلومات الاتصال (الاسم، البريد الإلكتروني، رقم الهاتف)'
                  : 'Contact information (name, email, phone number)'
                }
              </li>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• معلومات الشركة أو المؤسسة'
                  : 'Company or organization information'
                }
              </li>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• تفاصيل المشروع والمتطلبات'
                  : 'Project details and requirements'
                }
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '2. استخدام المعلومات' : '2. Use of Information'}
            </h2>
            <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'نستخدم المعلومات التي نجمعها لـ:'
                : 'We use the information we collect to:'
              }
            </p>
            <ul className={`list-disc pl-6 text-gray-700 space-y-2 mt-4 ${isRTL ? 'pr-6 pl-0 list-none' : ''}`}>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• تقديم خدماتنا التسويقية والإبداعية'
                  : 'Provide our marketing and creative services'
                }
              </li>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• التواصل معك بشأن مشاريعك'
                  : 'Communicate with you about your projects'
                }
              </li>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• تحسين خدماتنا وتطويرها'
                  : 'Improve and develop our services'
                }
              </li>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• إرسال تحديثات مهمة حول الخدمات'
                  : 'Send important service updates'
                }
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '3. مشاركة المعلومات' : '3. Information Sharing'}
            </h2>
            <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'نحن لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة باستثناء:'
                : 'We do not sell, rent, or share your personal information with third parties except:'
              }
            </p>
            <ul className={`list-disc pl-6 text-gray-700 space-y-2 mt-4 ${isRTL ? 'pr-6 pl-0 list-none' : ''}`}>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• عند الحصول على موافقتك الصريحة'
                  : 'With your explicit consent'
                }
              </li>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• عند الحاجة لتقديم الخدمات المطلوبة'
                  : 'When necessary to provide requested services'
                }
              </li>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• عند الطلب القانوني من السلطات المختصة'
                  : 'When legally required by competent authorities'
                }
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '4. حماية البيانات' : '4. Data Protection'}
            </h2>
            <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'نتخذ تدابير أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير.'
                : 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
              }
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '5. حقوقك' : '5. Your Rights'}
            </h2>
            <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'لديك الحق في:'
                : 'You have the right to:'
              }
            </p>
            <ul className={`list-disc pl-6 text-gray-700 space-y-2 mt-4 ${isRTL ? 'pr-6 pl-0 list-none' : ''}`}>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• الوصول إلى معلوماتك الشخصية'
                  : 'Access your personal information'
                }
              </li>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• تصحيح أو تحديث معلوماتك'
                  : 'Correct or update your information'
                }
              </li>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• طلب حذف معلوماتك'
                  : 'Request deletion of your information'
                }
              </li>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• الاعتراض على معالجة معلوماتك'
                  : 'Object to processing of your information'
                }
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '6. تواصل معنا' : '6. Contact Us'}
            </h2>
            <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا على:'
                : 'If you have any questions about this privacy policy, please contact us at:'
              }
            </p>
            <div className={`mt-4 text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
              <p>Email: info@xfuse.online</p>
              <p>Phone: +20 150 855 7715</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
import { useLanguage } from '../contexts/LanguageContext';

export default function Terms() {
  const { t, isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : ''}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className={`text-4xl mb-8 text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'الشروط والأحكام' : 'Terms & Conditions'}
          </h1>
          
          <div className={`text-sm text-gray-500 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'آخر تحديث: 11 سبتمبر 2025' : 'Last updated: September 11, 2025'}
          </div>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '1. قبول الشروط' : '1. Acceptance of Terms'}
            </h2>
            <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'باستخدام خدمات XFUSE، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا.'
                : 'By using XFUSE services, you agree to be bound by these terms and conditions. If you do not agree to any of these terms, please do not use our services.'
              }
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '2. استخدام الخدمات' : '2. Use of Services'}
            </h2>
            <p className={`text-gray-700 leading-relaxed mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'خدماتنا مخصصة للاستخدام التجاري والشخصي القانوني فقط. يجب عليك:'
                : 'Our services are intended for lawful commercial and personal use only. You must:'
              }
            </p>
            <ul className={`list-disc pl-6 text-gray-700 space-y-2 ${isRTL ? 'pr-6 pl-0 list-none' : ''}`}>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• تقديم معلومات دقيقة وحديثة'
                  : 'Provide accurate and current information'
                }
              </li>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• احترام حقوق الملكية الفكرية'
                  : 'Respect intellectual property rights'
                }
              </li>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• عدم استخدام الخدمات لأنشطة غير قانونية'
                  : 'Not use services for illegal activities'
                }
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '3. حدود المسؤولية' : '3. Limitation of Liability'}
            </h2>
            <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'XFUSE غير مسؤولة عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية قد تنشأ عن استخدام خدماتنا أو عدم القدرة على استخدامها.'
                : 'XFUSE shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of or inability to use our services.'
              }
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '4. إنهاء الخدمة' : '4. Service Termination'}
            </h2>
            <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'نحتفظ بالحق في إنهاء أو تعليق الوصول إلى خدماتنا في أي وقت دون إشعار مسبق في حالة انتهاك هذه الشروط.'
                : 'We reserve the right to terminate or suspend access to our services at any time without prior notice in case of violation of these terms.'
              }
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '5. القانون المطبق' : '5. Governing Law'}
            </h2>
            <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'تخضع هذه الشروط والأحكام للقوانين المصرية وتفسر وفقاً لها.'
                : 'These terms and conditions are governed by and construed in accordance with Egyptian law.'
              }
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '6. تواصل معنا' : '6. Contact Us'}
            </h2>
            <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى التواصل معنا على:'
                : 'If you have any questions about these terms and conditions, please contact us at:'
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
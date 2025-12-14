import { useLanguage } from '../contexts/LanguageContext';

export default function Cookies() {
  const { t, isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : ''}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className={`text-4xl mb-8 text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'سياسة ملفات تعريف الارتباط' : 'Cookie Policy'}
          </h1>
          
          <div className={`text-sm text-gray-500 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'آخر تحديث: 11 سبتمبر 2025' : 'Last updated: September 11, 2025'}
          </div>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '1. ما هي ملفات تعريف الارتباط؟' : '1. What are Cookies?'}
            </h2>
            <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة موقعنا الإلكتروني. تساعدنا هذه الملفات في تحسين تجربة المستخدم وتقديم خدمات أفضل.'
                : 'Cookies are small text files that are stored on your device when you visit our website. These files help us improve user experience and provide better services.'
              }
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '2. أنواع ملفات تعريف الارتباط التي نستخدمها' : '2. Types of Cookies We Use'}
            </h2>
            
            <div className="mb-6">
              <h3 className={`text-xl mb-3 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'ملفات تعريف الارتباط الأساسية' : 'Essential Cookies'}
              </h3>
              <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL 
                  ? 'هذه الملفات ضرورية لتشغيل الموقع بشكل صحيح وتمكين الوظائف الأساسية مثل الأمان والتنقل.'
                  : 'These cookies are necessary for the website to function properly and enable basic features like security and navigation.'
                }
              </p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl mb-3 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'ملفات تعريف الارتباط التحليلية' : 'Analytics Cookies'}
              </h3>
              <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL 
                  ? 'تساعدنا في فهم كيفية تفاعل المستخدمين مع موقعنا من خلال جمع معلومات حول الصفحات المزارة ومصادر الزيارات.'
                  : 'Help us understand how users interact with our website by collecting information about pages visited and traffic sources.'
                }
              </p>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl mb-3 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'ملفات تعريف الارتباط الوظيفية' : 'Functional Cookies'}
              </h3>
              <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL 
                  ? 'تخزن تفضيلاتك مثل اللغة المفضلة وإعدادات أخرى لتحسين تجربة الاستخدام.'
                  : 'Store your preferences such as language selection and other settings to enhance user experience.'
                }
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '3. الغرض من استخدام ملفات تعريف الارتباط' : '3. Purpose of Using Cookies'}
            </h2>
            <p className={`text-gray-700 leading-relaxed mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'نستخدم ملفات تعريف الارتباط لـ:'
                : 'We use cookies to:'
              }
            </p>
            <ul className={`list-disc pl-6 text-gray-700 space-y-2 ${isRTL ? 'pr-6 pl-0 list-none' : ''}`}>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• تذكر تفضيلاتك وإعداداتك'
                  : 'Remember your preferences and settings'
                }
              </li>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• تحليل أداء الموقع وحركة الزيارات'
                  : 'Analyze website performance and traffic'
                }
              </li>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• تحسين تجربة المستخدم'
                  : 'Improve user experience'
                }
              </li>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• ضمان أمان الموقع'
                  : 'Ensure website security'
                }
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '4. إدارة ملفات تعريف الارتباط' : '4. Managing Cookies'}
            </h2>
            <p className={`text-gray-700 leading-relaxed mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'يمكنك التحكم في ملفات تعريف الارتباط من خلال:'
                : 'You can control cookies through:'
              }
            </p>
            <ul className={`list-disc pl-6 text-gray-700 space-y-2 ${isRTL ? 'pr-6 pl-0 list-none' : ''}`}>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• إعدادات المتصفح الخاص بك'
                  : 'Your browser settings'
                }
              </li>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• حذف ملفات تعريف الارتباط الموجودة'
                  : 'Deleting existing cookies'
                }
              </li>
              <li className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL 
                  ? '• منع قبول ملفات تعريف الارتباط الجديدة'
                  : 'Preventing acceptance of new cookies'
                }
              </li>
            </ul>
            <p className={`text-gray-700 leading-relaxed mt-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'ملاحظة: تعطيل ملفات تعريف الارتباط قد يؤثر على وظائف الموقع وتجربة الاستخدام.'
                : 'Note: Disabling cookies may affect website functionality and user experience.'
              }
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '5. الطرف الثالث' : '5. Third-Party Cookies'}
            </h2>
            <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'قد نستخدم خدمات الطرف الثالث مثل Google Analytics لتحليل استخدام الموقع. هذه الخدمات قد تضع ملفات تعريف الارتباط الخاصة بها.'
                : 'We may use third-party services like Google Analytics to analyze website usage. These services may set their own cookies.'
              }
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '6. تحديثات السياسة' : '6. Policy Updates'}
            </h2>
            <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'قد نقوم بتحديث سياسة ملفات تعريف الارتباط من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة.'
                : 'We may update this cookie policy from time to time. Any changes will be posted on this page.'
              }
            </p>
          </section>

          <section className="mb-8">
            <h2 className={`text-2xl mb-4 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? '7. تواصل معنا' : '7. Contact Us'}
            </h2>
            <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL 
                ? 'إذا كان لديك أي أسئلة حول سياسة ملفات تعريف الارتباط، يرجى التواصل معنا على:'
                : 'If you have any questions about this cookie policy, please contact us at:'
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
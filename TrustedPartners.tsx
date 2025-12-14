import { useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import dentalClinicLogo from "figma:asset/ebfb84df0d89a46cc14d2d990c00200576f52c07.png";

interface TrustedPartnersProps {}

export function TrustedPartners({}: TrustedPartnersProps) {
  const [isPaused, setIsPaused] = useState(false);
  const { t, isRTL } = useLanguage();

  // Partner logos - corrected the file path issue
  const partners = [
    {
      id: 1,
      name: "Maka Store",
      logo: "https://i.postimg.cc/F1t5T3MP/Maka-store.webp",
    },
    {
      id: 2,
      name: "Partner 2",
      logo: "https://i.postimg.cc/XvgjXHRn/21.png",
    },
    {
      id: 3,
      name: "Partner 3",
      logo: "https://i.postimg.cc/3Nz7zPvF/assets-task-01k4k8gd2jerb85xknncvrdcdw-1757288170-img-0.webp",
    },
    {
      id: 4,
      name: "Partner 4",
      logo: "https://i.postimg.cc/1Rd9gNjV/assets-client-upload-media-d2fd7fcc80738333a5b45fe779a648cd00926f3d-media-01k4k8r7a1f9681qf1j8d4h1n7.jpg",
    },
    {
      id: 5,
      name: "Dr. Moataz Alkendary Dental Clinic",
      logo: "https://i.postimg.cc/L4JJ0Rdf/assets-task-01k4k8by8ve8qb2ee5gf487em5-1757288061-img-1.webp",
    },
  ];

  // Duplicate partners for seamless loop
  const duplicatedPartners = [
    ...partners,
    ...partners,
    ...partners,
  ];

  return (
    <section className={`py-16 bg-white ${isRTL ? 'rtl' : ''}`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-4">
            {t("trustedPartners.title.start")}{" "}
            <span className="gradient-text">
              {t("trustedPartners.title.highlight")}
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            {t("trustedPartners.subtitle")}
          </p>
        </motion.div>

        {/* Partners marquee */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for smooth fade effect */}
          <div className={`absolute top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 ${isRTL ? 'right-0 left-auto bg-gradient-to-l' : 'left-0 right-auto'}`}></div>
          <div className={`absolute top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 ${isRTL ? 'left-0 right-auto bg-gradient-to-r' : 'right-0 left-auto'}`}></div>

          <motion.div
            className={`flex space-x-8 ${isRTL ? "space-x-reverse" : ""}`}
            animate={{
              x: isPaused ? 0 : isRTL ? "66.66%" : "-66.66%",
            }}
            transition={{
              duration: isPaused ? 0 : 30,
              ease: "linear",
              repeat: isPaused ? 0 : Infinity,
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {duplicatedPartners.map((partner, index) => (
              <motion.div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 group cursor-pointer"
                whileHover={{
                  y: -2,
                  transition: { duration: 0.17 },
                }}
              >
                <div className="w-40 h-28 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center group-hover:border-purple-200 p-4">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl gradient-text mb-2">
              150+
            </div>
            <div className="text-gray-600">
              {t("trustedPartners.stats.campaigns")}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl gradient-text mb-2">
              $1M+
            </div>
            <div className="text-gray-600">
              {t("trustedPartners.stats.adSpend")}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl gradient-text mb-2">
              3.2x
            </div>
            <div className="text-gray-600">
              {t("trustedPartners.stats.roas")}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl gradient-text mb-2">
              98%
            </div>
            <div className="text-gray-600">
              {t("trustedPartners.stats.satisfaction")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
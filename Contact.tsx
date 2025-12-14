import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import {
  useScrollAnimation,
  fadeInUpVariants,
  slideInFromLeftVariants,
  slideInFromRightVariants,
  staggerChildrenVariants,
} from "../hooks/useScrollAnimation";

interface ContactProps {}

export function Contact({}: ContactProps) {
  const { t, isRTL } = useLanguage();
  const headerAnimation = useScrollAnimation();
  const formAnimation = useScrollAnimation();
  const infoAnimation = useScrollAnimation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className={`py-24 bg-gradient-to-br from-purple-50 via-white to-pink-50 ${isRTL ? "rtl" : ""}`}
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={headerAnimation.ref}
          initial="hidden"
          animate={headerAnimation.controls}
          variants={fadeInUpVariants}
          className="text-center mb-16"
        >
          <h2 id="contact-heading" className="text-4xl md:text-5xl mb-6">
            {t("contact.title")}{" "}
            <span className="gradient-text">
              {t("contact.highlight")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            ref={formAnimation.ref}
            initial="hidden"
            animate={formAnimation.controls}
            variants={slideInFromLeftVariants}
          >
            <motion.div
              variants={staggerChildrenVariants}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <h3 className="text-2xl mb-8 text-gray-900">
                {t("contact.form.title")}
              </h3>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
                aria-label={t("contact.form.title") || "Contact form"}
              >
                <motion.div variants={fadeInUpVariants}>
                  <label
                    htmlFor="contact-name"
                    className="block text-gray-700 mb-2 font-medium"
                  >
                    {t("contact.form.name")}
                    <span className="text-red-500 ml-1" aria-label="Required field">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                    aria-required="true"
                    aria-describedby="name-error"
                    placeholder={t("contact.form.name") || "Your full name"}
                  />
                  <div id="name-error" className="sr-only" aria-live="polite"></div>
                </motion.div>

                <motion.div variants={fadeInUpVariants}>
                  <label
                    htmlFor="contact-email"
                    className="block text-gray-700 mb-2 font-medium"
                  >
                    {t("contact.form.email")}
                    <span className="text-red-500 ml-1" aria-label="Required field">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                    aria-required="true"
                    aria-describedby="email-error"
                    placeholder={t("contact.form.email") || "your.email@example.com"}
                  />
                  <div id="email-error" className="sr-only" aria-live="polite"></div>
                </motion.div>

                <motion.div variants={fadeInUpVariants}>
                  <label
                    htmlFor="contact-company"
                    className="block text-gray-700 mb-2 font-medium"
                  >
                    {t("contact.form.company")}
                  </label>
                  <input
                    type="text"
                    id="contact-company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder={t("contact.form.company") || "Your company name"}
                  />
                </motion.div>

                <motion.div variants={fadeInUpVariants}>
                  <label
                    htmlFor="contact-message"
                    className="block text-gray-700 mb-2 font-medium"
                  >
                    {t("contact.form.message")}
                    <span className="text-red-500 ml-1" aria-label="Required field">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                    required
                    aria-required="true"
                    aria-describedby="message-error"
                    placeholder={t("contact.form.message") || "Tell us about your project..."}
                  />
                  <div id="message-error" className="sr-only" aria-live="polite"></div>
                </motion.div>

                <motion.div variants={fadeInUpVariants}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                    aria-describedby="submit-description"
                  >
                    <Send className="w-5 h-5" aria-hidden="true" />
                    {t("contact.form.submit")}
                  </Button>
                  <div id="submit-description" className="sr-only">
                    {t("contact.form.submit") || "Send your message to XFUSE team"}
                  </div>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            ref={infoAnimation.ref}
            initial="hidden"
            animate={infoAnimation.controls}
            variants={slideInFromRightVariants}
            className="space-y-8"
          >
            <motion.div
              variants={staggerChildrenVariants}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <h3 className="text-2xl mb-8 text-gray-900">
                {t("footer.contact.title")}
              </h3>

              <div className="space-y-6">
                <motion.div
                  variants={fadeInUpVariants}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">
                      {t("contact.info.mail")}
                    </h4>
                    <a
                      href="mailto:info@xfuse.com"
                      className="text-gray-600 hover:text-purple-600 transition-colors duration-200 underline-offset-2 hover:underline"
                      aria-label={`${t("contact.info.mail") || "Send email to"} info@xfuse.com`}
                    >
                      info@xfuse.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUpVariants}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">
                      {t("contact.info.phone")}
                    </h4>
                    <a
                      href="https://wa.me/201508557715"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-purple-600 transition-colors duration-200 underline-offset-2 hover:underline"
                      aria-label={`${t("contact.info.phone") || "Call or WhatsApp"} +20 150 855 7715 - Opens in new window`}
                    >
                      +20 150 855 7715
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUpVariants}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">
                      Office
                    </h4>
                    <p className="text-gray-600">Girga-Sohag</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
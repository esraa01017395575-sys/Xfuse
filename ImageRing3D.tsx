"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, easeOut, animate } from "motion/react";
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

// دالة مساعدة بسيطة للتعامل مع أسماء الفئات
const cn = (...classNames) => classNames.filter(Boolean).join(' ');

// هذا هو المكون الأساسي الجديد لحلقة الصور ثلاثية الأبعاد
function ThreeDImageRing({
  images,
  width = 300,
  perspective = 2000,
  imageDistance = 500,
  initialRotation = 180,
  animationDuration = 1.5,
  staggerDelay = 0.1,
  hoverOpacity = 0.5,
  containerClassName,
  ringClassName,
  imageClassName,
  backgroundColor,
  draggable = true,
  ease = "easeOut",
  mobileBreakpoint = 768,
  mobileScaleFactor = 0.8,
  inertiaPower = 0.8,
  inertiaTimeConstant = 300,
  inertiaVelocityMultiplier = 20,
}) {
  const containerRef = useRef(null);
  const ringRef = useRef(null);

  const rotationY = useMotionValue(initialRotation);
  const startX = useRef(0);
  const currentRotationY = useRef(initialRotation);
  const isDragging = useRef(false);
  const velocity = useRef(0);

  const [currentScale, setCurrentScale] = useState(1);
  const [showImages, setShowImages] = useState(false);

  const angle = useMemo(() => 360 / images.length, [images.length]);

  const getBgPos = (imageIndex, currentRot, scale) => {
    const scaledImageDistance = imageDistance * scale;
    const effectiveRotation = currentRot - 180 - imageIndex * angle;
    const parallaxOffset = ((effectiveRotation % 360 + 360) % 360) / 360;
    return `${-(parallaxOffset * (scaledImageDistance / 1.5))}px 0px`;
  };

  useEffect(() => {
    const unsubscribe = rotationY.on("change", (latestRotation) => {
      if (ringRef.current) {
        Array.from(ringRef.current.children).forEach((imgElement, i) => {
          (imgElement).style.backgroundPosition = getBgPos(
            i,
            latestRotation,
            currentScale
          );
        });
      }
      currentRotationY.current = latestRotation;
    });
    return () => unsubscribe();
  }, [rotationY, images.length, imageDistance, currentScale, angle]);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const newScale = viewportWidth <= mobileBreakpoint ? mobileScaleFactor : 1;
      setCurrentScale(newScale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint, mobileScaleFactor]);

  useEffect(() => {
    setShowImages(true);
  }, []);

  const handleDragStart = (event) => {
    if (!draggable) return;
    isDragging.current = true;
    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    startX.current = clientX;
    rotationY.stop();
    velocity.current = 0;
    if (ringRef.current) {
      ringRef.current.style.cursor = "grabbing";
    }
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDrag = (event) => {
    if (!draggable || !isDragging.current) return;

    const clientX = "touches" in event ? (event).touches[0].clientX : (event).clientX;
    const deltaX = clientX - startX.current;

    velocity.current = -deltaX * 0.5;

    rotationY.set(currentRotationY.current + velocity.current);

    startX.current = clientX;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (ringRef.current) {
      ringRef.current.style.cursor = "grab";
      currentRotationY.current = rotationY.get();
    }

    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("touchend", handleDragEnd);

    const initial = rotationY.get();
    const velocityBoost = velocity.current * inertiaVelocityMultiplier;
    const target = initial + velocityBoost;

    animate(initial, target, {
      type: "inertia",
      velocity: velocityBoost,
      power: inertiaPower,
      timeConstant: inertiaTimeConstant,
      restDelta: 0.5,
      modifyTarget: (target) => Math.round(target / angle) * angle,
      onUpdate: (latest) => {
        rotationY.set(latest);
      },
    });

    velocity.current = 0;
  };

  const imageVariants = {
    hidden: { y: 200, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full overflow-hidden select-none relative",
        containerClassName
      )}
      style={{
        backgroundColor,
        transform: `scale(${currentScale})`,
        transformOrigin: "center center",
      }}
      onMouseDown={draggable ? handleDragStart : undefined}
      onTouchStart={draggable ? handleDragStart : undefined}
      role="region"
      aria-label="Interactive 3D portfolio gallery - Drag to rotate"
      tabIndex={0}
      onKeyDown={(e) => {
        if (!draggable) return;
        // Add keyboard support for accessibility
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          rotationY.set(currentRotationY.current - 30);
          currentRotationY.current = rotationY.get();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          rotationY.set(currentRotationY.current + 30);
          currentRotationY.current = rotationY.get();
        }
      }}
    >
      <div
        style={{
          perspective: `${perspective}px`,
          width: `${width}px`,
          height: `${width * 1.33}px`,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          ref={ringRef}
          className={cn(
            "w-full h-full absolute",
            ringClassName
          )}
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotationY,
            cursor: draggable ? "grab" : "default",
          }}
          role="group"
          aria-label="Portfolio items in 3D ring"
        >
          <AnimatePresence>
            {showImages && images.map((image, index) => (
              <motion.div
                key={index}
                className={cn(
                  "w-full h-full absolute",
                  imageClassName
                )}
                style={{
                  transformStyle: "preserve-3d",
                  rotateY: index * -angle,
                  z: -imageDistance * currentScale,
                  transformOrigin: `50% 50% ${imageDistance * currentScale}px`,
                  backgroundPosition: getBgPos(index, currentRotationY.current, currentScale),
                  backfaceVisibility: "hidden",
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={imageVariants}
                custom={index}
                transition={{
                  delay: index * staggerDelay,
                  duration: animationDuration,
                  ease: easeOut,
                }}
                whileHover={{ opacity: 1, transition: { duration: 0.15 } }}
                onHoverStart={() => {
                  if (isDragging.current) return;
                  if (ringRef.current) {
                    Array.from(ringRef.current.children).forEach((imgEl, i) => {
                      if (i !== index) {
                        (imgEl).style.opacity = `${hoverOpacity}`;
                      }
                    });
                  }
                }}
                onHoverEnd={() => {
                  if (isDragging.current) return;
                  if (ringRef.current) {
                    Array.from(ringRef.current.children).forEach((imgEl) => {
                      (imgEl).style.opacity = 1;
                    });
                  }
                }}
                role="img"
                aria-label={`Portfolio item ${index + 1}: ${image.title}`}
                tabIndex={0}
              >
                <div
                  className={`relative w-full h-full rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${imageClassName}`}
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={`Portfolio showcase: ${image.title}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// المكون الرئيسي للتصدير
export function ImageRing3D({ className = '', id }: { className?: string; id?: string }) {
  const { t, isRTL } = useLanguage();
  
  const images = [
    { src: "https://i.postimg.cc/C5hfQrVN/Instagram-Post.png", title: "Social Media Platform Analysis" },
    { src: "https://i.postimg.cc/9Md00B6x/6.png", title: "Performance Analytics Dashboard" },
    { src: "https://i.postimg.cc/bJP6dLqc/68486.png", title: "Corporate Branding - Mintaz" },
    { src: "https://i.postimg.cc/g08SY1FH/14.png", title: "Content Strategy" },
    { src: "https://i.postimg.cc/P5Djdqsy/530390404-1059564409540517-2902563206887170841-n.jpg", title: "Brand Identity" },
    { src: "https://i.postimg.cc/bJCMxXfd/1.png", title: "UX/UI Design" },
    { src: "https://i.postimg.cc/GmszQ62n/529825527-1088314220149320-4480823482770196394-n.jpg", title: "Corporate Branding - Xfuse" },
    { src: "https://i.postimg.cc/TYWSDH7Y/10.png", title: "UI/UX Design" },
    { src: "https://i.postimg.cc/KcNrFBjV/Gemini-Generated-Image-f9dq6tf9dq6tf9dq.png", title: "Brand Identity - Cveez" },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section 
      className={`py-24 bg-gradient-to-br from-purple-50 via-white to-pink-50 overflow-hidden ${className} ${isRTL ? 'rtl' : ''}`} 
      id={id}
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="portfolio-heading" className="text-4xl md:text-5xl mb-6">
            <span className="gradient-text">
              {isRTL ? 'معرض أعمالنا' : 'Portfolio Showcase'}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isRTL 
              ? 'استكشف حملاتنا الناجحة والحلول الإبداعية التي حققت نتائج استثنائية.'
              : 'Explore our successful campaigns and creative solutions that delivered exceptional results.'
            }
          </p>
        </motion.div>
      </div>

      <div className="w-full h-[80vh] min-h-[600px] max-h-[800px] flex items-center justify-center relative">
        <ThreeDImageRing images={images} width={isMobile ? 250 : 300} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
          aria-live="polite"
          aria-label="Portfolio navigation instructions"
        >
          <p className="text-sm text-gray-500 mb-2" id="interaction-hint">
            {isMobile 
              ? (isRTL ? 'اسحب للتدوير أو استخدم الأسهم' : 'Swipe to rotate or use arrow keys')
              : (isRTL ? 'اسحب للتدوير أو استخدم الأسهم' : 'Drag to rotate or use arrow keys')
            }
          </p>
          <div className="flex items-center justify-center space-x-2" role="presentation" aria-hidden="true">
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-purple-300 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
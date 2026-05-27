'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import FloatingPetals from './FloatingPetals';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
  const { t, isRTL } = useLanguage();
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Dark mode background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 dark:block hidden" />
        {/* Light mode background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 dark:hidden block" />

        {/* Cinematic overlay pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #D4AF37 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, #EC4899 0%, transparent 50%)`,
          }}
        />

        {/* Large decorative flower */}
        <div className="absolute -right-20 -top-20 w-96 h-96 opacity-5 dark:opacity-10">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="20" fill="#D4AF37" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <ellipse
                key={i}
                cx="100"
                cy="60"
                rx="15"
                ry="35"
                fill="#EC4899"
                transform={`rotate(${angle} 100 100)`}
              />
            ))}
          </svg>
        </div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 opacity-5 dark:opacity-10">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="20" fill="#D4AF37" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <ellipse
                key={i}
                cx="100"
                cy="60"
                rx="15"
                ry="35"
                fill="#F9A8D4"
                transform={`rotate(${angle} 100 100)`}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Floating Petals */}
      <FloatingPetals />

      {/* Content */}
      <div className={`relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* Decorative line */}
        <div
          className={`flex items-center justify-center gap-4 mb-8 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400" />
          <span className="text-gold-400 text-sm font-medium tracking-[0.3em] uppercase">
            {isRTL ? 'براند نوز' : 'Brand Nouz'}
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400" />
        </div>

        {/* Main Title */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '0.3s' }}
        >
          <span className="shimmer-text block">
            {t.hero.title}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.5s' }}
        >
          {t.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${isRTL ? 'sm:flex-row-reverse' : ''}`}
          style={{ transitionDelay: '0.7s' }}
        >
          <Link
            href="/products"
            className="group relative px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-white dark:text-gray-900 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/30 hover:scale-105 min-w-[180px] text-center"
          >
            <span className="relative z-10">{t.hero.cta}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          <Link
            href="/products"
            className="px-8 py-4 border-2 border-gold-400 text-gold-400 font-semibold rounded-full transition-all duration-300 hover:bg-gold-400/10 hover:scale-105 min-w-[180px] text-center"
          >
            {t.hero.ctaSecondary}
          </Link>
        </div>

        {/* Stats */}
        <div
          className={`mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.9s' }}
        >
          {[
            { num: '500+', label: isRTL ? 'عميل سعيد' : 'Happy Clients' },
            { num: '12+', label: isRTL ? 'مجموعة' : 'Collections' },
            { num: '5★', label: isRTL ? 'تقييم' : 'Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-gold-400">{stat.num}</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold-400/50 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-3 bg-gold-400 rounded-full animate-float" />
        </div>
      </div>
    </section>
  );
}

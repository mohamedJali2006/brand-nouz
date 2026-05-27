'use client';

import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const testimonials = [
  {
    name: { en: 'Sara Ahmed', ar: 'سارة أحمد' },
    role: { en: 'Bride', ar: 'عروسة' },
    text: {
      en: 'BRAND NOUZ made my wedding day absolutely magical. The floral arrangements were beyond anything I imagined. Every guest was in awe!',
      ar: 'براند نوز جعل يوم زفافي سحرياً تماماً. تنسيقات الزهور كانت أبعد مما تخيلت. كل ضيف كان مبهوراً!',
    },
    rating: 5,
    avatar: 'S',
    color: 'from-pink-400 to-rose-500',
  },
  {
    name: { en: 'Mohamed Ali', ar: 'محمد علي' },
    role: { en: 'Groom', ar: 'عريس' },
    text: {
      en: 'I ordered the engagement box for my proposal and she said YES! The quality and presentation were absolutely stunning. Highly recommend!',
      ar: 'طلبت صندوق الخطوبة لطلب يدها وقالت نعم! الجودة والتقديم كانا رائعين تماماً. أنصح بشدة!',
    },
    rating: 5,
    avatar: 'M',
    color: 'from-gold-400 to-gold-500',
  },
  {
    name: { en: 'Nour Hassan', ar: 'نور حسن' },
    role: { en: 'Regular Customer', ar: 'عميلة دائمة' },
    text: {
      en: 'I\'ve been ordering dried flower arrangements for my home for months. The quality never disappoints and the delivery is always on time.',
      ar: 'أطلب تنسيقات الورد الجاف لمنزلي منذ أشهر. الجودة لا تخيب أبداً والتوصيل دائماً في الوقت المحدد.',
    },
    rating: 5,
    avatar: 'N',
    color: 'from-pink-300 to-pink-500',
  },
  {
    name: { en: 'Layla Mostafa', ar: 'ليلى مصطفى' },
    role: { en: 'Event Planner', ar: 'منظمة أحداث' },
    text: {
      en: 'As an event planner, I trust BRAND NOUZ for all my clients\' floral needs. Professional, creative, and always delivers perfection.',
      ar: 'كمنظمة أحداث، أثق في براند نوز لجميع احتياجات الزهور لعملائي. محترف، مبدع، ودائماً يقدم الكمال.',
    },
    rating: 5,
    avatar: 'L',
    color: 'from-gold-300 to-pink-400',
  },
];

export default function TestimonialsSection() {
  const { t, isRTL, language } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400" />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">
              {isRTL ? 'آراء العملاء' : 'Reviews'}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-gold-400/20 transition-all duration-700 hover:-translate-y-1 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              } ${isRTL ? 'text-right' : 'text-left'}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              {/* Stars */}
              <div className={`flex gap-1 mb-4 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 italic">
                &ldquo;{item.text[language]}&rdquo;
              </p>

              {/* Author */}
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {item.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {item.name[language]}
                  </p>
                  <p className="text-xs text-gray-400">{item.role[language]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

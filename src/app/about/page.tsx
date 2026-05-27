'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t, isRTL } = useLanguage();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { num: '500+', label: { en: 'Happy Clients', ar: 'عميل سعيد' } },
    { num: '12+', label: { en: 'Collections', ar: 'مجموعة' } },
    { num: '3+', label: { en: 'Years Experience', ar: 'سنوات خبرة' } },
    { num: '5★', label: { en: 'Average Rating', ar: 'متوسط التقييم' } },
  ];

  const values = [
    {
      title: { en: 'Our Story', ar: 'قصتنا' },
      text: { en: t.about.story, ar: t.about.story },
      icon: '🌸',
    },
    {
      title: { en: t.about.mission, ar: t.about.mission },
      text: {
        en: 'To bring joy and beauty into every home and celebration through exceptional floral artistry, using only the finest materials and most creative designs.',
        ar: 'إدخال البهجة والجمال في كل منزل واحتفال من خلال فن الزهور الاستثنائي، باستخدام أفضل المواد وأكثر التصاميم إبداعاً.',
      },
      icon: '💫',
    },
    {
      title: { en: t.about.vision, ar: t.about.vision },
      text: {
        en: 'To become Egypt\'s most beloved luxury floral brand, known for transforming ordinary moments into extraordinary memories.',
        ar: 'أن نصبح أكثر براند زهور فاخر محبوب في مصر، معروف بتحويل اللحظات العادية إلى ذكريات استثنائية.',
      },
      icon: '✨',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 50%, #EC4899 0%, transparent 50%)`,
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400" />
              <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">
                {isRTL ? 'من نحن' : 'About Us'}
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {t.about.title}
            </h1>
            <p className="text-xl text-gold-400 font-medium mb-6">{t.about.subtitle}</p>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {t.about.story}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 0.1 + 0.3}s` }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-gold-400 mb-2">{stat.num}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{isRTL ? stat.label.ar : stat.label.en}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-gold-400/30 transition-all duration-700 hover:-translate-y-2 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                } ${isRTL ? 'text-right' : 'text-left'}`}
                style={{ transitionDelay: `${i * 0.2 + 0.5}s` }}
              >
                <span className="text-4xl mb-4 block">{val.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {isRTL ? val.title.ar : val.title.en}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                  {isRTL ? val.text.ar : val.text.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {isRTL ? 'جاهز تطلب؟' : 'Ready to Order?'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {isRTL
              ? 'اكتشف مجموعاتنا الفاخرة واطلب الآن'
              : 'Explore our luxury collections and order now'}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-white font-semibold rounded-full hover:from-gold-400 hover:to-gold-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold-400/30"
          >
            {isRTL ? 'تسوق الآن' : 'Shop Now'}
            <svg className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

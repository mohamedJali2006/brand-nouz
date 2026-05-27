'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';

export default function CategoriesSection() {
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

  const categoryIcons: Record<string, string> = {
    'dried-flowers': '🌾',
    'bouquets': '💐',
    'engagement': '💍',
    'wedding': '🤍',
    'valentine': '❤️',
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400" />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">
              {isRTL ? 'تصفح' : 'Browse'}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.categories.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            {t.categories.subtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className={`group relative overflow-hidden rounded-2xl aspect-[3/4] cinematic-card transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={cat.image}
                  alt={cat.name[language]}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-gold-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
                <span className="text-2xl mb-2">{categoryIcons[cat.id]}</span>
                <h3 className="text-white font-semibold text-sm sm:text-base leading-tight">
                  {cat.name[language]}
                </h3>
                <span className="text-gold-400 text-xs mt-1 opacity-80">
                  {cat.count} {isRTL ? 'منتج' : 'items'}
                </span>
                {/* Arrow */}
                <div className="mt-3 w-8 h-8 rounded-full border border-gold-400/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <svg className="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

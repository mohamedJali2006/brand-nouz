'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

function ProductCard({ product, index, visible }: { product: Product; index: number; visible: boolean }) {
  const { t, isRTL, language } = useLanguage();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className={`group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden cinematic-card border border-gray-100 dark:border-gray-800 hover:border-gold-400/30 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Badge */}
      {product.badge && (
        <div className={`absolute top-3 z-10 ${isRTL ? 'right-3' : 'left-3'}`}>
          <span className="px-2.5 py-1 bg-gradient-to-r from-gold-500 to-gold-400 text-white text-xs font-semibold rounded-full">
            {product.badge[language]}
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name[language]}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Quick view overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Link
            href={`/products/${product.id}`}
            className="px-4 py-2 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white text-xs font-semibold rounded-full backdrop-blur-sm hover:bg-white transition-colors"
          >
            {t.products.viewDetails}
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        <p className="text-xs text-gold-400 font-medium uppercase tracking-wider mb-1">
          {product.category.replace('-', ' ')}
        </p>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base leading-tight mb-2 line-clamp-2">
          {product.name[language]}
        </h3>
        <div className={`flex items-center justify-between mt-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-lg font-bold text-gold-400">
            {product.price.toLocaleString()} {t.products.egp}
          </span>
          <button
            onClick={handleAdd}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
              added
                ? 'bg-green-500 text-white scale-95'
                : 'bg-gradient-to-r from-gold-500 to-gold-400 text-white hover:from-gold-400 hover:to-gold-300 hover:shadow-md hover:shadow-gold-400/20 hover:scale-105'
            }`}
          >
            {added ? (isRTL ? '✓ تمت الإضافة' : '✓ Added') : t.products.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400" />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">
              {isRTL ? 'مختارة بعناية' : 'Handpicked'}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.products.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            {t.products.subtitle}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} visible={visible} />
          ))}
        </div>

        {/* View All */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold-400 text-gold-400 font-semibold rounded-full hover:bg-gold-400 hover:text-white dark:hover:text-gray-900 transition-all duration-300 hover:scale-105 group"
          >
            {isRTL ? 'عرض كل المنتجات' : 'View All Products'}
            <svg
              className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

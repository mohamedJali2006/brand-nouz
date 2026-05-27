'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products, categories } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

function ProductCard({ product }: { product: Product }) {
  const { t, isRTL, language } = useLanguage();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-gold-400/30 cinematic-card transition-all duration-500">
      {/* Badge */}
      {product.badge && (
        <div className={`absolute top-3 z-10 ${isRTL ? 'right-3' : 'left-3'}`}>
          <span className="px-2.5 py-1 bg-gradient-to-r from-gold-500 to-gold-400 text-white text-xs font-semibold rounded-full">
            {product.badge[language]}
          </span>
        </div>
      )}

      <div className="relative">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name[language]}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Link
              href={`/products/${product.id}`}
              className="px-4 py-2 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white text-xs font-semibold rounded-full backdrop-blur-sm"
            >
              {t.products.viewDetails}
            </Link>
          </div>
        </div>
      </div>

      <div className={`p-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        <p className="text-xs text-gold-400 font-medium uppercase tracking-wider mb-1">
          {product.category.replace('-', ' ')}
        </p>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight mb-2 line-clamp-2">
          {product.name[language]}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
          {product.description[language]}
        </p>
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-base font-bold text-gold-400">
            {product.price.toLocaleString()} {t.products.egp}
          </span>
          <button
            onClick={handleAdd}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
              added
                ? 'bg-green-500 text-white'
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

function ProductsContent() {
  const { t, isRTL, language } = useLanguage();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const allCategories = [
    { id: 'all', name: { en: 'All Products', ar: 'كل المنتجات' } },
    ...categories,
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-center gap-4 mb-4 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400" />
            <span className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase">
              {isRTL ? 'تسوق' : 'Shop'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.products.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">{t.products.subtitle}</p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap gap-2 mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {allCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-white shadow-md shadow-gold-400/20'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gold-400/10 hover:text-gold-400'
              }`}
            >
              {cat.name[language]}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">{t.products.noProducts}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}

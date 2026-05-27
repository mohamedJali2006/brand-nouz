'use client';

import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const { t, isRTL, language } = useLanguage();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const product = products.find((p) => p.id === params.id);
  if (!product) return notFound();

  const images = product.images || [product.image];
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `مرحباً، أريد طلب: ${product.name.ar}\nالكمية: ${quantity}\nالسعر: ${(product.price * quantity).toLocaleString()} ج.م`
    );
    window.open(`https://wa.me/201122011089?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className={`flex items-center gap-2 text-sm text-gray-400 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Link href="/" className="hover:text-gold-400 transition-colors">{t.nav.home}</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gold-400 transition-colors">{t.nav.products}</Link>
          <span>/</span>
          <span className="text-gray-600 dark:text-gray-300 line-clamp-1">{product.name[language]}</span>
        </nav>

        {/* Product Detail */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900">
              <Image
                src={images[activeImage]}
                alt={product.name[language]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.badge && (
                <div className={`absolute top-4 z-10 ${isRTL ? 'right-4' : 'left-4'}`}>
                  <span className="px-3 py-1.5 bg-gradient-to-r from-gold-500 to-gold-400 text-white text-sm font-semibold rounded-full">
                    {product.badge[language]}
                  </span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === i ? 'border-gold-400' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <p className="text-sm text-gold-400 font-medium uppercase tracking-widest mb-2">
              {product.category.replace('-', ' ')}
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {product.name[language]}
            </h1>
            <p className="text-3xl font-bold text-gold-400 mb-6">
              {product.price.toLocaleString()} {t.products.egp}
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              {product.description[language]}
            </p>

            {/* Quantity */}
            <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.cart.quantity}:</span>
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gold-400 hover:bg-gold-400/10 transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 font-semibold text-gray-900 dark:text-white min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gold-400 hover:bg-gold-400/10 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <div className={`flex items-center gap-2 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm text-gray-500">{isRTL ? 'الإجمالي:' : 'Total:'}</span>
              <span className="text-xl font-bold text-gold-400">
                {(product.price * quantity).toLocaleString()} {t.products.egp}
              </span>
            </div>

            {/* Buttons */}
            <div className={`flex flex-col sm:flex-row gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <button
                onClick={handleAdd}
                className={`flex-1 py-4 rounded-full font-semibold text-sm transition-all duration-300 ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-gold-500 to-gold-400 text-white hover:from-gold-400 hover:to-gold-300 hover:shadow-lg hover:shadow-gold-400/30 hover:scale-105'
                }`}
              >
                {added ? (isRTL ? '✓ تمت الإضافة للسلة' : '✓ Added to Cart') : t.products.addToCart}
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex-1 py-4 rounded-full font-semibold text-sm border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t.checkout.orderViaWhatsapp}
              </button>
            </div>

            {/* Features */}
            <div className={`mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              {[
                { icon: '🚚', text: isRTL ? 'توصيل سريع' : 'Fast Delivery' },
                { icon: '✨', text: isRTL ? 'جودة مضمونة' : 'Quality Guaranteed' },
                { icon: '🎁', text: isRTL ? 'تغليف فاخر' : 'Luxury Packaging' },
                { icon: '💬', text: isRTL ? 'دعم 24/7' : '24/7 Support' },
              ].map((f) => (
                <div key={f.text} className={`flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className={`text-2xl font-bold text-gray-900 dark:text-white mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'منتجات مشابهة' : 'Related Products'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-gold-400/30 cinematic-card"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name[language]}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="25vw"
                    />
                  </div>
                  <div className={`p-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{p.name[language]}</p>
                    <p className="text-sm font-bold text-gold-400 mt-1">{p.price.toLocaleString()} {t.products.egp}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { t, isRTL, language } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center px-4 bg-white dark:bg-gray-950">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.cart.empty}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {isRTL ? 'لم تضف أي منتجات بعد' : 'You haven\'t added any products yet'}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-white font-semibold rounded-full hover:from-gold-400 hover:to-gold-300 transition-all duration-300 hover:scale-105"
          >
            {t.cart.continueShopping}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className={`flex items-center justify-between mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {t.cart.title}
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-red-400 hover:text-red-500 transition-colors"
          >
            {isRTL ? 'مسح الكل' : 'Clear All'}
          </button>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className={`flex gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {/* Image */}
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name[language]}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                {/* Info */}
                <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base line-clamp-2">
                    {item.product.name[language]}
                  </h3>
                  <p className="text-gold-400 font-bold mt-1">
                    {item.product.price.toLocaleString()} {t.products.egp}
                  </p>

                  <div className={`flex items-center gap-3 mt-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-500 hover:text-gold-400 hover:bg-gold-400/10 transition-colors text-sm"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-sm font-semibold text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-500 hover:text-gold-400 hover:bg-gold-400/10 transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      = {(item.product.price * item.quantity).toLocaleString()} {t.products.egp}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-400 hover:text-red-500 transition-colors ml-auto"
                      aria-label="Remove"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h2 className={`text-lg font-bold text-gray-900 dark:text-white mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {t.checkout.orderSummary}
              </h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className={`flex justify-between text-sm text-gray-600 dark:text-gray-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="line-clamp-1 flex-1">{item.product.name[language]} × {item.quantity}</span>
                    <span className="font-medium shrink-0 ml-2">
                      {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className={`border-t border-gray-200 dark:border-gray-700 pt-4 mb-6 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="font-bold text-gray-900 dark:text-white">{t.cart.total}</span>
                <span className="text-xl font-bold text-gold-400">
                  {totalPrice.toLocaleString()} {t.products.egp}
                </span>
              </div>

              <Link
                href="/checkout"
                className="block w-full py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-white font-semibold rounded-full text-center hover:from-gold-400 hover:to-gold-300 transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/30 hover:scale-105"
              >
                {t.cart.checkout}
              </Link>

              <Link
                href="/products"
                className="block w-full py-3 mt-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium rounded-full text-center hover:border-gold-400/50 hover:text-gold-400 transition-all duration-300 text-sm"
              >
                {t.cart.continueShopping}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function SuccessPage() {
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4 bg-white dark:bg-gray-950">
      <div className="text-center max-w-md">
        {/* Success animation */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center animate-scaleIn">
          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {isRTL ? 'تم تأكيد طلبك! 🌸' : 'Order Confirmed! 🌸'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          {isRTL
            ? 'شكراً لطلبك من براند نوز. سنتواصل معك قريباً لتأكيد التوصيل.'
            : 'Thank you for your order from BRAND NOUZ. We\'ll contact you soon to confirm delivery.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-white font-semibold rounded-full hover:from-gold-400 hover:to-gold-300 transition-all duration-300 hover:scale-105"
          >
            {isRTL ? 'مواصلة التسوق' : 'Continue Shopping'}
          </Link>
          <Link
            href="/"
            className="px-8 py-4 border-2 border-gold-400 text-gold-400 font-semibold rounded-full hover:bg-gold-400/10 transition-all duration-300"
          >
            {isRTL ? 'الرئيسية' : 'Home'}
          </Link>
        </div>
      </div>
    </div>
  );
}

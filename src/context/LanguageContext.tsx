'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/types';

interface Translations {
  nav: {
    home: string;
    products: string;
    about: string;
    cart: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
  };
  categories: {
    title: string;
    subtitle: string;
    driedFlowers: string;
    bouquets: string;
    engagement: string;
    wedding: string;
    valentine: string;
    all: string;
  };
  products: {
    title: string;
    subtitle: string;
    addToCart: string;
    orderNow: string;
    viewDetails: string;
    egp: string;
    filter: string;
    noProducts: string;
  };
  cart: {
    title: string;
    empty: string;
    total: string;
    checkout: string;
    remove: string;
    continueShopping: string;
    quantity: string;
  };
  checkout: {
    title: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    paymentMethod: string;
    creditCard: string;
    whatsapp: string;
    orderSummary: string;
    placeOrder: string;
    orderViaWhatsapp: string;
  };
  about: {
    title: string;
    subtitle: string;
    story: string;
    mission: string;
    vision: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    contact: string;
    followUs: string;
    rights: string;
    newsletter: string;
    newsletterPlaceholder: string;
    subscribe: string;
  };
  whyUs: {
    title: string;
    subtitle: string;
    quality: string;
    qualityDesc: string;
    delivery: string;
    deliveryDesc: string;
    custom: string;
    customDesc: string;
    support: string;
    supportDesc: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      about: 'About',
      cart: 'Cart',
    },
    hero: {
      title: 'The Most Beautiful Flowers for the Most Beautiful Moments',
      subtitle: 'Luxury floral arrangements crafted with passion and elegance',
      cta: 'Shop Now',
      ctaSecondary: 'Explore Collections',
    },
    categories: {
      title: 'Our Collections',
      subtitle: 'Discover our curated floral collections for every occasion',
      driedFlowers: 'Dried Flowers',
      bouquets: 'Bouquets',
      engagement: 'Engagement Gifts',
      wedding: 'Wedding',
      valentine: "Valentine's Day",
      all: 'All Products',
    },
    products: {
      title: 'Featured Products',
      subtitle: 'Handpicked arrangements for the most special moments',
      addToCart: 'Add to Cart',
      orderNow: 'Order Now',
      viewDetails: 'View Details',
      egp: 'EGP',
      filter: 'Filter',
      noProducts: 'No products found in this category.',
    },
    cart: {
      title: 'Your Cart',
      empty: 'Your cart is empty',
      total: 'Total',
      checkout: 'Proceed to Checkout',
      remove: 'Remove',
      continueShopping: 'Continue Shopping',
      quantity: 'Quantity',
    },
    checkout: {
      title: 'Checkout',
      name: 'Full Name',
      phone: 'Phone Number',
      address: 'Delivery Address',
      city: 'City',
      paymentMethod: 'Payment Method',
      creditCard: 'Credit Card',
      whatsapp: 'Order via WhatsApp',
      orderSummary: 'Order Summary',
      placeOrder: 'Place Order',
      orderViaWhatsapp: 'Order via WhatsApp',
    },
    about: {
      title: 'About BRAND NOUZ',
      subtitle: 'Where Flowers Tell Stories',
      story: 'Born from a passion for beauty and elegance, BRAND NOUZ has been crafting extraordinary floral experiences since our founding. We believe every flower tells a story, and every arrangement is a work of art.',
      mission: 'Our Mission',
      vision: 'Our Vision',
    },
    footer: {
      tagline: 'Luxury floral arrangements for life\'s most beautiful moments',
      quickLinks: 'Quick Links',
      contact: 'Contact Us',
      followUs: 'Follow Us',
      rights: 'All rights reserved',
      newsletter: 'Newsletter',
      newsletterPlaceholder: 'Enter your email',
      subscribe: 'Subscribe',
    },
    whyUs: {
      title: 'Why Choose Us',
      subtitle: 'We deliver more than flowers — we deliver emotions',
      quality: 'Premium Quality',
      qualityDesc: 'Only the finest flowers, carefully selected and arranged by expert florists',
      delivery: 'Fast Delivery',
      deliveryDesc: 'Same-day delivery available across Cairo and Giza',
      custom: 'Custom Orders',
      customDesc: 'Personalized arrangements tailored to your exact vision and occasion',
      support: '24/7 Support',
      supportDesc: 'Our team is always here to help you create the perfect floral moment',
    },
    testimonials: {
      title: 'What Our Customers Say',
      subtitle: 'Real stories from real customers who experienced the BRAND NOUZ difference',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      products: 'المنتجات',
      about: 'عن البراند',
      cart: 'السلة',
    },
    hero: {
      title: 'أجمل الورود لأجمل اللحظات',
      subtitle: 'تنسيقات زهور فاخرة مصنوعة بشغف وأناقة',
      cta: 'تسوق الآن',
      ctaSecondary: 'استكشف المجموعات',
    },
    categories: {
      title: 'مجموعاتنا',
      subtitle: 'اكتشف مجموعاتنا الزهرية المنتقاة لكل مناسبة',
      driedFlowers: 'ورد جاف',
      bouquets: 'بوكيهات',
      engagement: 'هدايا خطوبة',
      wedding: 'أفراح',
      valentine: 'عيد الحب',
      all: 'كل المنتجات',
    },
    products: {
      title: 'المنتجات المميزة',
      subtitle: 'تنسيقات مختارة بعناية لأكثر اللحظات خصوصية',
      addToCart: 'أضف للسلة',
      orderNow: 'اطلب الآن',
      viewDetails: 'عرض التفاصيل',
      egp: 'ج.م',
      filter: 'تصفية',
      noProducts: 'لا توجد منتجات في هذه الفئة.',
    },
    cart: {
      title: 'سلة التسوق',
      empty: 'سلتك فارغة',
      total: 'الإجمالي',
      checkout: 'إتمام الشراء',
      remove: 'حذف',
      continueShopping: 'مواصلة التسوق',
      quantity: 'الكمية',
    },
    checkout: {
      title: 'إتمام الطلب',
      name: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      address: 'عنوان التوصيل',
      city: 'المدينة',
      paymentMethod: 'طريقة الدفع',
      creditCard: 'بطاقة ائتمان',
      whatsapp: 'طلب عبر واتساب',
      orderSummary: 'ملخص الطلب',
      placeOrder: 'تأكيد الطلب',
      orderViaWhatsapp: 'اطلب عبر واتساب',
    },
    about: {
      title: 'عن براند نوز',
      subtitle: 'حيث تحكي الزهور القصص',
      story: 'وُلد براند نوز من شغف بالجمال والأناقة، وقد كنا نصنع تجارب زهرية استثنائية منذ تأسيسنا. نؤمن بأن كل زهرة تحكي قصة، وكل تنسيق هو عمل فني.',
      mission: 'مهمتنا',
      vision: 'رؤيتنا',
    },
    footer: {
      tagline: 'تنسيقات زهور فاخرة لأجمل لحظات الحياة',
      quickLinks: 'روابط سريعة',
      contact: 'تواصل معنا',
      followUs: 'تابعنا',
      rights: 'جميع الحقوق محفوظة',
      newsletter: 'النشرة البريدية',
      newsletterPlaceholder: 'أدخل بريدك الإلكتروني',
      subscribe: 'اشترك',
    },
    whyUs: {
      title: 'لماذا تختارنا',
      subtitle: 'نقدم أكثر من مجرد زهور — نقدم مشاعر',
      quality: 'جودة فائقة',
      qualityDesc: 'أفضل الزهور فقط، مختارة بعناية ومرتبة من قبل خبراء',
      delivery: 'توصيل سريع',
      deliveryDesc: 'توصيل في نفس اليوم متاح في القاهرة والجيزة',
      custom: 'طلبات مخصصة',
      customDesc: 'تنسيقات شخصية مصممة وفق رؤيتك ومناسبتك',
      support: 'دعم على مدار الساعة',
      supportDesc: 'فريقنا دائماً هنا لمساعدتك في خلق اللحظة الزهرية المثالية',
    },
    testimonials: {
      title: 'ماذا يقول عملاؤنا',
      subtitle: 'قصص حقيقية من عملاء حقيقيين عاشوا تجربة براند نوز',
    },
  },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  toggleLanguage: () => {},
  t: translations.en,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const stored = localStorage.getItem('brand-nouz-lang') as Language | null;
    if (stored) {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('brand-nouz-lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        t: translations[language],
        isRTL: language === 'ar',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

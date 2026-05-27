'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

type PaymentMethod = 'card' | 'whatsapp' | 'cash';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { t, isRTL, language } = useLanguage();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });
  const [payment, setPayment] = useState<PaymentMethod>('card');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4 bg-white dark:bg-gray-950">
        <div className="text-center">
          <p className="text-gray-500 mb-4">{t.cart.empty}</p>
          <Link href="/products" className="text-gold-400 hover:underline">{t.cart.continueShopping}</Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = isRTL ? 'الاسم مطلوب' : 'Name is required';
    if (!form.phone.trim()) newErrors.phone = isRTL ? 'رقم الهاتف مطلوب' : 'Phone is required';
    if (!form.address.trim()) newErrors.address = isRTL ? 'العنوان مطلوب' : 'Address is required';
    if (!form.city.trim()) newErrors.city = isRTL ? 'المدينة مطلوبة' : 'City is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWhatsApp = () => {
    if (!validate()) return;
    const orderLines = items.map(
      (item) => `• ${item.product.name.ar} × ${item.quantity} = ${(item.product.price * item.quantity).toLocaleString()} ج.م`
    ).join('\n');
    const msg = encodeURIComponent(
      `🌸 طلب جديد من براند نوز\n\n` +
      `👤 الاسم: ${form.name}\n` +
      `📞 الهاتف: ${form.phone}\n` +
      `📍 العنوان: ${form.address}، ${form.city}\n\n` +
      `🛒 الطلب:\n${orderLines}\n\n` +
      `💰 الإجمالي: ${totalPrice.toLocaleString()} ج.م\n` +
      (form.notes ? `📝 ملاحظات: ${form.notes}` : '')
    );
    window.open(`https://wa.me/201122011089?text=${msg}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (payment === 'whatsapp') {
      handleWhatsApp();
      return;
    }

    setLoading(true);
    // Simulate order processing
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    router.push('/checkout/success');
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-colors ${
      errors[field]
        ? 'border-red-400 focus:border-red-400'
        : 'border-gray-200 dark:border-gray-700 focus:border-gold-400'
    } ${isRTL ? 'text-right' : 'text-left'}`;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto">
        <h1 className={`text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-10 ${isRTL ? 'text-right' : 'text-left'}`}>
          {t.checkout.title}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Info */}
              <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h2 className={`text-lg font-bold text-gray-900 dark:text-white mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'بيانات التوصيل' : 'Delivery Information'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t.checkout.name} *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={isRTL ? 'الاسم الكامل' : 'Full Name'}
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t.checkout.phone} *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="01xxxxxxxxx"
                      className={inputClass('phone')}
                      dir="ltr"
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t.checkout.address} *
                    </label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder={isRTL ? 'الشارع، الحي' : 'Street, District'}
                      className={inputClass('address')}
                    />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t.checkout.city} *
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder={isRTL ? 'القاهرة' : 'Cairo'}
                      className={inputClass('city')}
                    />
                    {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? 'ملاحظات (اختياري)' : 'Notes (optional)'}
                    </label>
                    <input
                      type="text"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder={isRTL ? 'أي تعليمات خاصة...' : 'Special instructions...'}
                      className={inputClass('notes')}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h2 className={`text-lg font-bold text-gray-900 dark:text-white mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t.checkout.paymentMethod}
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      id: 'card' as PaymentMethod,
                      label: { en: 'Credit / Debit Card', ar: 'بطاقة ائتمان / خصم' },
                      icon: '💳',
                      desc: { en: 'Visa, Mastercard, Meeza', ar: 'فيزا، ماستركارد، ميزة' },
                    },
                    {
                      id: 'cash' as PaymentMethod,
                      label: { en: 'Cash on Delivery', ar: 'الدفع عند الاستلام' },
                      icon: '💵',
                      desc: { en: 'Pay when you receive your order', ar: 'ادفع عند استلام طلبك' },
                    },
                    {
                      id: 'whatsapp' as PaymentMethod,
                      label: { en: 'Order via WhatsApp', ar: 'طلب عبر واتساب' },
                      icon: '💬',
                      desc: { en: 'Send order details via WhatsApp', ar: 'أرسل تفاصيل الطلب عبر واتساب' },
                    },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                        payment === method.id
                          ? 'border-gold-400 bg-gold-400/5'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gold-400/40'
                      } ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={payment === method.id}
                        onChange={() => setPayment(method.id)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        payment === method.id ? 'border-gold-400' : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {payment === method.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-gold-400" />
                        )}
                      </div>
                      <span className="text-xl">{method.icon}</span>
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{method.label[language]}</p>
                        <p className="text-xs text-gray-400">{method.desc[language]}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h2 className={`text-lg font-bold text-gray-900 dark:text-white mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t.checkout.orderSummary}
                </h2>

                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <Image src={item.product.image} alt="" fill className="object-cover" sizes="48px" />
                      </div>
                      <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <p className="text-xs font-medium text-gray-900 dark:text-white line-clamp-1">
                          {item.product.name[language]}
                        </p>
                        <p className="text-xs text-gray-400">× {item.quantity}</p>
                        <p className="text-xs font-bold text-gold-400">
                          {(item.product.price * item.quantity).toLocaleString()} {t.products.egp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`border-t border-gray-200 dark:border-gray-700 pt-4 mb-6 flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="font-bold text-gray-900 dark:text-white">{t.cart.total}</span>
                  <span className="text-xl font-bold text-gold-400">
                    {totalPrice.toLocaleString()} {t.products.egp}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-white font-semibold rounded-full hover:from-gold-400 hover:to-gold-300 transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {isRTL ? 'جاري المعالجة...' : 'Processing...'}
                    </>
                  ) : payment === 'whatsapp' ? (
                    t.checkout.orderViaWhatsapp
                  ) : (
                    t.checkout.placeOrder
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

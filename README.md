# البوابة الجمالية الدقهلية

منصة عربية RTL مبنية على Next.js 14 مع App Router وتكامل Supabase وFacebook API.

## الإعداد السريع

1. انسخ ملف البيئة:

```bash
cp .env.example .env.local
```

2. حدث المتغيرات في `.env.local`.

## ربط قاعدة البيانات وتهيئة الجداول (Supabase)

1. افتح مشروعك في Supabase ثم ادخل إلى **SQL Editor**.
2. لتحديث كامل مع حذف البيانات القديمة، انسخ محتوى الملف `supabase/migrations/0002_full_reset.sql` والصقه ثم شغله.
3. (بديل) إذا كنت تريد البداية بدون حذف بيانات قديمة استخدم `supabase/migrations/0001_init.sql`.
4. أنشئ مستخدم Admin عبر لوحة Auth في Supabase.
5. أضف `user.id` في جدول `admins` لتفعيل صلاحيات الإدارة.
6. حدث بيانات الاتصال في `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://bklvrbxsdzrxqwiuokpx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_5GWqAh43tHgkQ1BiBGr9MA_aUme2O
```

7. أضف متغيرات إعلان فيسبوك (بدون أسرار):

```env
NEXT_PUBLIC_FB_AD_URL=https://facebook.com
NEXT_PUBLIC_FB_AD_IMAGE=https://images.unsplash.com/photo-1524504388940-b1c1722653e1
NEXT_PUBLIC_FB_AD_TEXT=Kids Dental Clinic - رمضان كريم
```

3. شغل المشروع:

```bash
npm install
npm run dev
```

## الروابط الأساسية

- `/` الصفحة الرئيسية
- `/sections/[slug]` صفحة قسم الخدمات
- `/sections/[slug]/[serviceSlug]` صفحة تفاصيل الخدمة
- `/ads/request` نموذج طلب إعلان

## روابط لوحة التحكم

- `/admin/login` تسجيل الدخول
- `/admin` لوحة التحكم
- `/admin/sections` إدارة الأقسام
- `/admin/services` إدارة الخدمات
- `/admin/ads` إدارة الإعلانات
- `/admin/announcements` إدارة الإشعارات
- `/admin/ad-requests` مراجعة طلبات الإعلانات

## النشر بنطاق مجاني

- استخدم [Vercel](https://vercel.com) للنشر المجاني.
- اربط المشروع بمستودع Git ثم اختر نطاق Vercel المجاني.
- يمكنك ربط نطاق مجاني مثل `portal-aljamaliah.vercel.app`.

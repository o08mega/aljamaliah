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
2. انسخ محتوى الملف `supabase/schema.sql` والصقه ثم شغله لإنشاء الجداول الأساسية.
3. حدث بيانات الاتصال في `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://bklvrbxsdzrxqwiuokpx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_5GWqAh43tHgkQ1BiBGr9MA_aUme2O
```

4. لتحديث بيانات التواصل في القاعدة، عدل سجل `site_settings` بعد إنشاء الجداول (البريد، الهاتف، العنوان).

3. شغل المشروع:

```bash
npm install
npm run dev
```

## النشر بنطاق مجاني

- استخدم [Vercel](https://vercel.com) للنشر المجاني.
- اربط المشروع بمستودع Git ثم اختر نطاق Vercel المجاني.
- يمكنك ربط نطاق مجاني مثل `portal-aljamaliah.vercel.app`.

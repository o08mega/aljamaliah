import { Facebook } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <div className="container mx-auto px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm text-brand-700">
              منصة رقمية لخدمات الدقهلية الجمالية
            </span>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              البوابة الجمالية الدقهلية
            </h1>
            <p className="text-lg text-slate-600">
              منصة شاملة لإدارة المحتوى والخدمات، تتضمن مصادقة عبر Supabase، تكامل مباشر مع فيسبوك،
              ولوحة تحكم للمشرفين، مع تجربة عربية كاملة.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="rounded-full bg-brand-600 px-6 py-3 text-white shadow hover:bg-brand-700">
                ابدأ الآن
              </button>
              <button className="rounded-full border border-slate-200 px-6 py-3 text-slate-700 hover:border-brand-300">
                جولة في النظام
              </button>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <Facebook className="h-4 w-4" />
              تكامل مباشر مع Facebook API لنشر المحتوى تلقائياً.
            </div>
          </div>
          <div className="relative">
            <div className="card p-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800">لوحة متابعة سريعة</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-brand-50 p-4">
                    <p className="text-sm text-slate-500">الخدمات النشطة</p>
                    <p className="text-2xl font-bold text-slate-900">128</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">تقييمات اليوم</p>
                    <p className="text-2xl font-bold text-slate-900">57</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">مقالات حديثة</p>
                    <p className="text-2xl font-bold text-slate-900">32</p>
                  </div>
                  <div className="rounded-xl bg-brand-50 p-4">
                    <p className="text-sm text-slate-500">مستخدمون جدد</p>
                    <p className="text-2xl font-bold text-slate-900">214</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

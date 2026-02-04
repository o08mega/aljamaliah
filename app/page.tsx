import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import ServiceHighlights from '@/components/sections/ServiceHighlights'
import Reviews from '@/components/sections/Reviews'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <ServiceHighlights />
      <Reviews />
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="card grid gap-6 p-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="section-title">لوحة تحكم للمشرفين</h2>
              <p className="mt-3 text-slate-600">
                تابع المحتوى، راجع التعليقات، وراقب الإحصائيات عبر لوحة مخصصة مع صلاحيات متعددة.
              </p>
            </div>
            <div className="flex flex-col gap-4 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <span>طلبات نشر جديدة</span>
                <span className="font-semibold text-slate-900">12</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <span>تعليقات قيد المراجعة</span>
                <span className="font-semibold text-slate-900">7</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                <span>مزامنة فيسبوك</span>
                <span className="font-semibold text-brand-700">مفعلة</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

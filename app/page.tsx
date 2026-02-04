import Link from 'next/link'
import { Sparkles, Star, Megaphone, WandSparkles } from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = createServerClient()

  const [{ data: announcement }, { data: sections }, { data: ads }, { data: services }] =
    await Promise.all([
      supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from('sections')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true }),
      supabase
        .from('ads')
        .select('*')
        .eq('is_active', true)
        .order('start_at', { ascending: false }),
      supabase
        .from('services')
        .select('*, section:sections(slug)')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .limit(6)
    ])

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-night-600 via-night-700 to-ocean-600 px-6 py-12 text-white shadow-xl">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-10 top-6 h-32 w-32 rounded-full bg-brand-400 blur-3xl" />
          <div className="absolute bottom-6 right-10 h-40 w-40 rounded-full bg-amber-300 blur-3xl" />
        </div>
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4" />
              رمضان كريم — كل عام وأنتم بخير
            </div>
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              بوابة مدينة الجمالية - الدقهلية
            </h2>
            <p className="mt-4 text-base text-white/80">
              اكتشف أفضل الخدمات، الإعلانات، والعروض الرمضانية في مدينة الجمالية بسهولة وسرعة.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#sections"
                className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-brand-600"
              >
                استعرض الأقسام
              </a>
              <Link
                href="/ads/request"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                اطلب إعلان
              </Link>
            </div>
          </div>
          <div className="glass-panel relative rounded-3xl p-6 text-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">أجواء رمضانية</span>
              <WandSparkles className="h-5 w-5 text-brand-500" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">زينة، فوانيس، ونجوم مضيئة</h3>
            <p className="mt-2 text-sm text-slate-600">
              عروض محلية مميزة وخدمات أساسية للعائلة خلال الشهر المبارك.
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-brand-500" />
                خدمات موثوقة
              </div>
              <div className="flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-brand-500" />
                إعلانات يومية
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-slate-600">
              <div className="rounded-2xl bg-white p-3 shadow-sm">🌙 هلال</div>
              <div className="rounded-2xl bg-white p-3 shadow-sm">🏮 فوانيس</div>
              <div className="rounded-2xl bg-white p-3 shadow-sm">✨ نجوم</div>
            </div>
          </div>
        </div>
      </section>

      {announcement && (
        <section className="mt-6 rounded-2xl bg-amber-100/70 p-4 text-sm text-amber-900">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <span className="font-semibold">{announcement.title}</span>
            <span className="text-amber-900/80">{announcement.body}</span>
          </div>
        </section>
      )}

      <section id="sections" className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="section-title">الأقسام</h3>
          <span className="text-sm text-slate-500">اختر القسم المناسب لك</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(sections ?? []).map((section) => (
            <Link
              key={section.id}
              href={`/sections/${section.slug}`}
              className="group rounded-2xl border border-white/60 bg-white/80 p-5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ${section.color || 'bg-amber-100 text-amber-700'}`}>
                <span>{section.icon || '✨'}</span>
                {section.title}
              </div>
              <p className="mt-4 text-sm text-slate-600">{section.description}</p>
              <span className="mt-6 inline-flex text-sm font-semibold text-night-600">
                عرض الخدمات
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="ads" className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="section-title">الإعلانات</h3>
          <Link className="text-sm text-night-600" href="/ads/request">
            أضف إعلانك
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(ads ?? []).map((ad) => (
            <a
              key={ad.id}
              href={ad.link_url || '#'}
              target="_blank"
              rel="noreferrer"
              className="card flex flex-col gap-3 p-5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="rounded-2xl bg-amber-50 p-4 text-sm font-semibold text-amber-700">
                {ad.title}
              </div>
              <p className="text-sm text-slate-600">{ad.body}</p>
              <span className="text-xs text-night-600">عرض التفاصيل</span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="section-title">خدمات مميزة</h3>
          <span className="text-sm text-slate-500">مختارة بعناية لهذا الأسبوع</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(services ?? []).map((service) => (
            <Link
              key={service.id}
              href={`/sections/${service.section?.slug}/${service.slug}`}
              className="card p-5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h4 className="text-lg font-semibold text-slate-800">{service.title}</h4>
              <p className="mt-2 text-sm text-slate-600">{service.description}</p>
              <div className="mt-4 text-xs text-night-600">
                {service.address || 'الجمالية - الدقهلية'}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-16 rounded-3xl bg-night-700 px-6 py-10 text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h4 className="text-xl font-semibold">بوابة الجمالية</h4>
            <p className="text-sm text-white/70">منصة رمضانية تجمع خدمات المدينة وإعلاناتها.</p>
          </div>
          <div className="flex gap-4 text-sm">
            <a className="hover:text-brand-200" href="/admin">
              لوحة التحكم
            </a>
            <a className="hover:text-brand-200" href="/ads/request">
              اطلب إعلان
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

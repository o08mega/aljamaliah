import Link from 'next/link'
import { requireAdmin } from '@/lib/supabase/admin'

export default async function AdminPage() {
  const { supabase } = await requireAdmin()

  const [
    { count: sectionsCount },
    { count: servicesCount },
    { count: adsCount },
    { count: requestsCount }
  ] = await Promise.all([
    supabase.from('sections').select('*', { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('ads').select('*', { count: 'exact', head: true }),
    supabase.from('ad_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending')
  ])

  async function signOut() {
    'use server'
    const { supabase: serverSupabase } = await requireAdmin()
    await serverSupabase.auth.signOut()
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">لوحة التحكم</h1>
          <p className="mt-2 text-slate-600">إدارة الأقسام والخدمات والإعلانات.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/sections" className="rounded-full bg-night-600 px-5 py-2 text-white">
            إدارة الأقسام
          </Link>
          <form action={signOut}>
            <button type="submit" className="rounded-full border border-slate-200 px-5 py-2 text-slate-700">
              تسجيل الخروج
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'الأقسام', value: sectionsCount ?? 0 },
          { label: 'الخدمات', value: servicesCount ?? 0 },
          { label: 'الإعلانات', value: adsCount ?? 0 },
          { label: 'طلبات الإعلانات', value: requestsCount ?? 0 }
        ].map((stat) => (
          <div key={stat.label} className="card p-6">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-3 text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Link href="/admin/ads" className="card p-6 transition hover:-translate-y-1 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-slate-800">إدارة الإعلانات</h2>
          <p className="mt-2 text-sm text-slate-600">تحديث الإعلانات والمواعيد النشطة.</p>
        </Link>
        <Link
          href="/admin/ad-requests"
          className="card p-6 transition hover:-translate-y-1 hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold text-slate-800">قائمة مراجعة الطلبات</h2>
          <p className="mt-2 text-sm text-slate-600">اعتماد أو رفض طلبات الإعلانات.</p>
        </Link>
        <Link
          href="/admin/services"
          className="card p-6 transition hover:-translate-y-1 hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold text-slate-800">إدارة الخدمات</h2>
          <p className="mt-2 text-sm text-slate-600">تحديث الخدمات والمعلومات.</p>
        </Link>
        <Link
          href="/admin/announcements"
          className="card p-6 transition hover:-translate-y-1 hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold text-slate-800">إدارة الإشعارات</h2>
          <p className="mt-2 text-sm text-slate-600">تحديث رسائل الشريط والإعلانات.</p>
        </Link>
      </div>
    </div>
  )
}

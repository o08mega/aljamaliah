import Link from 'next/link'
import { requireAdmin } from '@/lib/supabase/admin'

export default async function AdminAdsPage() {
  const { supabase } = await requireAdmin()
  const { data: ads } = await supabase.from('ads').select('*').order('created_at', {
    ascending: false
  })

  async function createAd(formData: FormData) {
    'use server'
    const { supabase: serverSupabase } = await requireAdmin()
    const payload = {
      title: String(formData.get('title') ?? '').trim(),
      body: String(formData.get('body') ?? '').trim(),
      link_url: String(formData.get('link_url') ?? '').trim() || null,
      image_url: String(formData.get('image_url') ?? '').trim() || null,
      start_at: String(formData.get('start_at') ?? '').trim() || null,
      end_at: String(formData.get('end_at') ?? '').trim() || null
    }
    if (!payload.title) return
    await serverSupabase.from('ads').insert(payload)
  }

  async function deleteAd(formData: FormData) {
    'use server'
    const { supabase: serverSupabase } = await requireAdmin()
    const id = String(formData.get('id'))
    await serverSupabase.from('ads').delete().eq('id', id)
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <Link href="/admin" className="text-sm text-night-600">
        العودة للوحة التحكم
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">إدارة الإعلانات</h1>

      <form action={createAd} className="card mt-6 grid gap-4 p-6 md:grid-cols-3">
        <input
          name="title"
          placeholder="عنوان الإعلان"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        />
        <input
          name="link_url"
          placeholder="رابط الإعلان"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        />
        <input
          name="image_url"
          placeholder="رابط الصورة"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        />
        <input
          name="start_at"
          type="datetime-local"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        />
        <input
          name="end_at"
          type="datetime-local"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        />
        <textarea
          name="body"
          placeholder="وصف الإعلان"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm md:col-span-3"
        />
        <button
          type="submit"
          className="rounded-full bg-night-600 px-6 py-2 text-sm font-semibold text-white md:col-span-3"
        >
          إضافة إعلان
        </button>
      </form>

      <div className="mt-8 grid gap-4">
        {(ads ?? []).map((ad) => (
          <div key={ad.id} className="card flex flex-col gap-3 p-5 md:flex-row md:items-center">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-800">{ad.title}</h3>
              <p className="text-sm text-slate-500">{ad.body}</p>
            </div>
            <form action={deleteAd}>
              <input type="hidden" name="id" value={ad.id} />
              <button className="rounded-full border border-rose-200 px-4 py-2 text-xs text-rose-600">
                حذف
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}

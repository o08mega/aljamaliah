import Link from 'next/link'
import { requireAdmin } from '@/lib/supabase/admin'

export default async function AdminServicesPage() {
  const { supabase } = await requireAdmin()
  const { data: sections } = await supabase.from('sections').select('id, title')
  const { data: services } = await supabase
    .from('services')
    .select('*, sections:section_id (title)')
    .order('created_at', { ascending: false })

  async function createService(formData: FormData) {
    'use server'
    const { supabase: serverSupabase } = await requireAdmin()
    const payload = {
      title: String(formData.get('title') ?? '').trim(),
      slug: String(formData.get('slug') ?? '').trim(),
      description: String(formData.get('description') ?? '').trim(),
      details: String(formData.get('details') ?? '').trim(),
      section_id: String(formData.get('section_id') ?? '').trim() || null,
      contact_phone: String(formData.get('contact_phone') ?? '').trim() || null,
      contact_whatsapp: String(formData.get('contact_whatsapp') ?? '').trim() || null,
      address: String(formData.get('address') ?? '').trim() || null,
      is_featured: formData.get('is_featured') === 'on'
    }
    if (!payload.title || !payload.slug) return
    await serverSupabase.from('services').insert(payload)
  }

  async function deleteService(formData: FormData) {
    'use server'
    const { supabase: serverSupabase } = await requireAdmin()
    const id = String(formData.get('id'))
    await serverSupabase.from('services').delete().eq('id', id)
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <Link href="/admin" className="text-sm text-night-600">
        العودة للوحة التحكم
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">إدارة الخدمات</h1>

      <form action={createService} className="card mt-6 grid gap-4 p-6 md:grid-cols-3">
        <input
          name="title"
          placeholder="اسم الخدمة"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        />
        <input
          name="slug"
          placeholder="slug"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        />
        <select
          name="section_id"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        >
          <option value="">اختر القسم</option>
          {(sections ?? []).map((section) => (
            <option key={section.id} value={section.id}>
              {section.title}
            </option>
          ))}
        </select>
        <input
          name="contact_phone"
          placeholder="هاتف التواصل"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        />
        <input
          name="contact_whatsapp"
          placeholder="واتساب"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        />
        <input
          name="address"
          placeholder="العنوان"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        />
        <textarea
          name="description"
          placeholder="وصف مختصر"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm md:col-span-3"
        />
        <textarea
          name="details"
          placeholder="تفاصيل الخدمة"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm md:col-span-3"
        />
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" name="is_featured" className="h-4 w-4" />
          خدمة مميزة
        </label>
        <button
          type="submit"
          className="rounded-full bg-night-600 px-6 py-2 text-sm font-semibold text-white md:col-span-3"
        >
          إضافة خدمة
        </button>
      </form>

      <div className="mt-8 grid gap-4">
        {(services ?? []).map((service) => (
          <div key={service.id} className="card flex flex-col gap-3 p-5 md:flex-row md:items-center">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-800">{service.title}</h3>
              <p className="text-sm text-slate-500">{service.sections?.title}</p>
            </div>
            <form action={deleteService}>
              <input type="hidden" name="id" value={service.id} />
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

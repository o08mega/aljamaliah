import Link from 'next/link'
import { requireAdmin } from '@/lib/supabase/admin'

export default async function AdminSectionsPage() {
  const { supabase } = await requireAdmin()
  const { data: sections } = await supabase.from('sections').select('*').order('sort_order', {
    ascending: true
  })

  async function createSection(formData: FormData) {
    'use server'
    const { supabase: serverSupabase } = await requireAdmin()
    const payload = {
      title: String(formData.get('title') ?? '').trim(),
      slug: String(formData.get('slug') ?? '').trim(),
      description: String(formData.get('description') ?? '').trim(),
      icon: String(formData.get('icon') ?? '').trim() || null,
      color: String(formData.get('color') ?? '').trim() || null,
      sort_order: Number(formData.get('sort_order') ?? 0)
    }
    if (!payload.title || !payload.slug) return
    await serverSupabase.from('sections').insert(payload)
  }

  async function toggleSection(formData: FormData) {
    'use server'
    const { supabase: serverSupabase } = await requireAdmin()
    const id = String(formData.get('id'))
    const isActive = formData.get('is_active') === 'true'
    await serverSupabase.from('sections').update({ is_active: !isActive }).eq('id', id)
  }

  async function deleteSection(formData: FormData) {
    'use server'
    const { supabase: serverSupabase } = await requireAdmin()
    const id = String(formData.get('id'))
    await serverSupabase.from('sections').delete().eq('id', id)
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <Link href="/admin" className="text-sm text-night-600">
        العودة للوحة التحكم
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">إدارة الأقسام</h1>

      <form action={createSection} className="card mt-6 grid gap-4 p-6 md:grid-cols-3">
        <input
          name="title"
          placeholder="اسم القسم"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        />
        <input
          name="slug"
          placeholder="slug"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        />
        <input
          name="icon"
          placeholder="رمز/أيقونة"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        />
        <input
          name="color"
          placeholder="CSS لون الخلفية"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm md:col-span-2"
        />
        <input
          name="sort_order"
          type="number"
          placeholder="ترتيب"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        />
        <textarea
          name="description"
          placeholder="وصف مختصر"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm md:col-span-3"
        />
        <button
          type="submit"
          className="rounded-full bg-night-600 px-6 py-2 text-sm font-semibold text-white md:col-span-3"
        >
          إضافة قسم
        </button>
      </form>

      <div className="mt-8 grid gap-4">
        {(sections ?? []).map((section) => (
          <div key={section.id} className="card flex flex-col gap-3 p-5 md:flex-row md:items-center">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
              <p className="text-sm text-slate-500">{section.slug}</p>
            </div>
            <div className="flex gap-2">
              <form action={toggleSection}>
                <input type="hidden" name="id" value={section.id} />
                <input type="hidden" name="is_active" value={String(section.is_active)} />
                <button className="rounded-full border border-slate-200 px-4 py-2 text-xs">
                  {section.is_active ? 'تعطيل' : 'تفعيل'}
                </button>
              </form>
              <form action={deleteSection}>
                <input type="hidden" name="id" value={section.id} />
                <button className="rounded-full border border-rose-200 px-4 py-2 text-xs text-rose-600">
                  حذف
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

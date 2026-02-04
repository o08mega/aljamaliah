import Link from 'next/link'
import { requireAdmin } from '@/lib/supabase/admin'

export default async function AdminAnnouncementsPage() {
  const { supabase } = await requireAdmin()
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })

  async function createAnnouncement(formData: FormData) {
    'use server'
    const { supabase: serverSupabase } = await requireAdmin()
    const payload = {
      title: String(formData.get('title') ?? '').trim(),
      body: String(formData.get('body') ?? '').trim()
    }
    if (!payload.title) return
    await serverSupabase.from('announcements').insert(payload)
  }

  async function toggleAnnouncement(formData: FormData) {
    'use server'
    const { supabase: serverSupabase } = await requireAdmin()
    const id = String(formData.get('id'))
    const isActive = formData.get('is_active') === 'true'
    await serverSupabase.from('announcements').update({ is_active: !isActive }).eq('id', id)
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <Link href="/admin" className="text-sm text-night-600">
        العودة للوحة التحكم
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">إدارة الإشعارات</h1>

      <form action={createAnnouncement} className="card mt-6 grid gap-4 p-6 md:grid-cols-3">
        <input
          name="title"
          placeholder="عنوان الإشعار"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm md:col-span-3"
        />
        <textarea
          name="body"
          placeholder="محتوى الإشعار"
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm md:col-span-3"
        />
        <button
          type="submit"
          className="rounded-full bg-night-600 px-6 py-2 text-sm font-semibold text-white md:col-span-3"
        >
          إضافة إشعار
        </button>
      </form>

      <div className="mt-8 grid gap-4">
        {(announcements ?? []).map((announcement) => (
          <div
            key={announcement.id}
            className="card flex flex-col gap-3 p-5 md:flex-row md:items-center"
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-800">{announcement.title}</h3>
              <p className="text-sm text-slate-500">{announcement.body}</p>
            </div>
            <form action={toggleAnnouncement}>
              <input type="hidden" name="id" value={announcement.id} />
              <input type="hidden" name="is_active" value={String(announcement.is_active)} />
              <button className="rounded-full border border-slate-200 px-4 py-2 text-xs">
                {announcement.is_active ? 'تعطيل' : 'تفعيل'}
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}

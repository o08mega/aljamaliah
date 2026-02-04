import Link from 'next/link'
import { requireAdmin } from '@/lib/supabase/admin'

export default async function AdminAdRequestsPage() {
  const { supabase } = await requireAdmin()
  const { data: requests } = await supabase
    .from('ad_requests')
    .select('*')
    .order('created_at', { ascending: false })

  async function updateStatus(formData: FormData) {
    'use server'
    const { supabase: serverSupabase } = await requireAdmin()
    const id = String(formData.get('id'))
    const status = String(formData.get('status'))
    await serverSupabase.from('ad_requests').update({ status }).eq('id', id)
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <Link href="/admin" className="text-sm text-night-600">
        العودة للوحة التحكم
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">طلبات الإعلانات</h1>
      <p className="mt-2 text-slate-600">مراجعة واعتماد أو رفض الطلبات الجديدة.</p>

      <div className="mt-8 grid gap-4">
        {(requests ?? []).map((request) => (
          <div key={request.id} className="card p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">{request.title}</h3>
                <p className="text-sm text-slate-500">{request.body}</p>
                <p className="text-xs text-slate-400">
                  {request.name} • {request.phone}
                </p>
              </div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-700">
                {request.status}
              </span>
            </div>
            <div className="mt-4 flex gap-3">
              <form action={updateStatus}>
                <input type="hidden" name="id" value={request.id} />
                <input type="hidden" name="status" value="approved" />
                <button className="rounded-full bg-emerald-500 px-4 py-2 text-xs text-white">
                  اعتماد
                </button>
              </form>
              <form action={updateStatus}>
                <input type="hidden" name="id" value={request.id} />
                <input type="hidden" name="status" value="rejected" />
                <button className="rounded-full bg-rose-500 px-4 py-2 text-xs text-white">
                  رفض
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

type PageProps = {
  params: { slug: string; serviceSlug: string }
}

export default async function ServicePage({ params }: PageProps) {
  const supabase = createServerClient()

  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', params.serviceSlug)
    .maybeSingle()

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <Link href={`/sections/${params.slug}`} className="text-sm text-night-600">
        العودة للقسم
      </Link>
      <div className="mt-6 card p-8">
        <h1 className="text-3xl font-bold text-slate-800">{service?.title}</h1>
        <p className="mt-3 text-slate-600">{service?.description}</p>
        <p className="mt-4 text-sm text-slate-500">{service?.details}</p>
        {service?.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {service.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-6 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
          <div>
            <span className="font-semibold text-slate-800">العنوان:</span>{' '}
            {service?.address || 'الجمالية - الدقهلية'}
          </div>
          <div>
            <span className="font-semibold text-slate-800">الهاتف:</span>{' '}
            {service?.contact_phone || 'غير متوفر'}
          </div>
          <div>
            <span className="font-semibold text-slate-800">واتساب:</span>{' '}
            {service?.contact_whatsapp || 'غير متوفر'}
          </div>
        </div>
        {service?.contact_whatsapp && (
          <a
            href={`https://wa.me/${service.contact_whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white"
          >
            تواصل عبر واتساب
          </a>
        )}
      </div>
    </div>
  )
}

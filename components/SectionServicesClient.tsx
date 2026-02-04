'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

type Service = {
  id: string
  title: string
  slug: string
  description: string | null
  address: string | null
  section_slug: string
}

export default function SectionServicesClient({ services }: { services: Service[] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query) return services
    const lower = query.toLowerCase()
    return services.filter((service) =>
      [service.title, service.description, service.address].some((field) =>
        field?.toLowerCase().includes(lower)
      )
    )
  }, [query, services])

  return (
    <div>
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h3 className="section-title">الخدمات داخل القسم</h3>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ابحث عن خدمة..."
          className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-night-500 md:max-w-xs"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((service) => (
          <Link
            key={service.id}
            href={`/sections/${service.section_slug}/${service.slug}`}
            className="card p-5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h4 className="text-lg font-semibold text-slate-800">{service.title}</h4>
            <p className="mt-2 text-sm text-slate-600">{service.description}</p>
            <span className="mt-4 inline-flex text-xs text-night-600">
              {service.address || 'الجمالية - الدقهلية'}
            </span>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-6 text-center text-sm text-slate-500">لا توجد نتائج مطابقة.</p>
      )}
    </div>
  )
}

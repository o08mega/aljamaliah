import { createServerClient } from '@/lib/supabase/server'
import SectionServicesClient from '@/components/SectionServicesClient'
import Link from 'next/link'

type PageProps = {
  params: { slug: string }
}

export default async function SectionPage({ params }: PageProps) {
  const supabase = createServerClient()

  const { data: section } = await supabase
    .from('sections')
    .select('*')
    .eq('slug', params.slug)
    .maybeSingle()

  const { data: services } = await supabase
    .from('services')
    .select('id, title, slug, description, address, sections:section_id (slug)')
    .eq('section_id', section?.id ?? '')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  const normalizedServices =
    services?.map((service) => {
      const relation = (service as { sections?: { slug?: string } | { slug?: string }[] }).sections
      const sectionSlug = Array.isArray(relation) ? relation[0]?.slug : relation?.slug

      return {
        id: service.id,
        title: service.title,
        slug: service.slug,
        description: service.description,
        address: service.address,
        section_slug: sectionSlug || params.slug
      }
    }) ?? []

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="mb-10 flex flex-col gap-4">
        <Link href="/" className="text-sm text-night-600">
          العودة للرئيسية
        </Link>
        <h2 className="text-3xl font-bold text-slate-800">{section?.title ?? 'قسم'}</h2>
        <p className="text-slate-600">{section?.description}</p>
      </div>
      <SectionServicesClient services={normalizedServices} />
    </div>
  )
}

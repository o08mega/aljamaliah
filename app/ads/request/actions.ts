'use server'

import { createServerClient } from '@/lib/supabase/server'

type State = {
  message?: string
  error?: string
}

export async function submitAdRequest(_: State, formData: FormData): Promise<State> {
  const supabase = createServerClient()

  const payload = {
    name: String(formData.get('name') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    title: String(formData.get('title') ?? '').trim(),
    body: String(formData.get('body') ?? '').trim(),
    link_url: String(formData.get('link_url') ?? '').trim() || null,
    image_url: String(formData.get('image_url') ?? '').trim() || null
  }

  if (!payload.name || !payload.phone || !payload.title) {
    return { error: 'يرجى تعبئة الحقول الأساسية.' }
  }

  const { error } = await supabase.from('ad_requests').insert(payload)

  if (error) {
    return { error: 'تعذر إرسال الطلب، حاول مرة أخرى.' }
  }

  return { message: 'تم إرسال طلب الإعلان بنجاح.' }
}

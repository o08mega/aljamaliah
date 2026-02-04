'use server'

import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

type State = {
  error?: string
}

export async function signIn(_: State, formData: FormData): Promise<State> {
  const supabase = createServerClient()

  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '').trim()

  if (!email || !password) {
    return { error: 'يرجى إدخال البريد الإلكتروني وكلمة المرور.' }
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: 'تعذر تسجيل الدخول، تحقق من البيانات.' }
  }

  redirect('/admin')
}

import { redirect } from 'next/navigation'
import { createServerClient } from './server'

export async function requireUser() {
  const supabase = createServerClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return { supabase, user }
}

export async function requireAdmin() {
  const { supabase, user } = await requireUser()
  const { data: admin } = await supabase.from('admins').select('id').eq('id', user.id).maybeSingle()

  if (!admin) {
    redirect('/')
  }

  return { supabase, user }
}

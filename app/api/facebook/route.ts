import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()
    const { data: settings, error } = await supabase
      .from('site_settings')
      .select('facebook_page_id, facebook_access_token')
      .single()

    if (error || !settings?.facebook_page_id || !settings?.facebook_access_token) {
      return NextResponse.json(
        { error: 'إعدادات Facebook غير مكتملة' },
        { status: 400 }
      )
    }

    const response = await fetch(
      `https://graph.facebook.com/v19.0/${settings.facebook_page_id}/posts?fields=id,message,created_time,full_picture,permalink_url&access_token=${settings.facebook_access_token}`,
      { next: { revalidate: 0 } }
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: 'تعذر جلب بيانات Facebook' },
        { status: 502 }
      )
    }

    const payload = await response.json()

    return NextResponse.json({
      synced: payload?.data?.length ?? 0,
      message: 'تمت المزامنة بنجاح'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'حدث خطأ أثناء المزامنة' },
      { status: 500 }
    )
  }
}

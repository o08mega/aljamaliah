import './globals.css'
import type { Metadata } from 'next'
import RamadanWelcomeModal from '@/components/RamadanWelcomeModal'
import TopBannerAd from '@/components/TopBannerAd'

export const metadata: Metadata = {
  title: 'البوابة الجمالية الدقهلية',
  description: 'منصة خدمات جمالية وإدارية متكاملة لمحافظة الدقهلية.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen">
        <div className="mx-auto flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 bg-white/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4">
              <TopBannerAd />
              <div className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                <div>
                  <p className="text-sm text-slate-500">بوابة مدينة الجمالية</p>
                  <h1 className="text-lg font-bold text-slate-900">الدقهلية</h1>
                </div>
                <nav className="flex items-center gap-4 text-sm text-slate-600">
                  <a className="transition hover:text-night-600" href="#sections">
                    الأقسام
                  </a>
                  <a className="transition hover:text-night-600" href="#ads">
                    الإعلانات
                  </a>
                  <a className="transition hover:text-night-600" href="/ads/request">
                    اطلب إعلان
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
        <RamadanWelcomeModal />
      </body>
    </html>
  )
}

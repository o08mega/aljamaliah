import './globals.css'
import type { Metadata } from 'next'

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
      <body className="min-h-screen bg-slate-50">
        {children}
      </body>
    </html>
  )
}

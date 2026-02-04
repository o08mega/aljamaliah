import Link from 'next/link'
import AdRequestForm from './AdRequestForm'

export default function AdRequestPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <Link href="/" className="text-sm text-night-600">
        العودة للرئيسية
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-800">طلب إعلان جديد</h1>
      <p className="mt-2 text-slate-600">
        املأ البيانات التالية وسيتواصل معك فريقنا لمراجعة الإعلان.
      </p>
      <AdRequestForm />
    </div>
  )
}

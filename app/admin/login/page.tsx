import Link from 'next/link'
import LoginForm from './LoginForm'

export default function AdminLoginPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <Link href="/" className="text-sm text-night-600">
        العودة للرئيسية
      </Link>
      <div className="mt-6 rounded-3xl bg-gradient-to-br from-night-600 via-night-700 to-ocean-600 px-6 py-10 text-white shadow-xl">
        <h1 className="text-3xl font-bold">تسجيل دخول المشرفين</h1>
        <p className="mt-2 text-white/80">
          أهلاً بك! أدخل بيانات حسابك للوصول إلى لوحة التحكم الرمضانية.
        </p>
      </div>
      <LoginForm />
    </div>
  )
}

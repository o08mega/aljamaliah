const stats = [
  { label: 'المستخدمون', value: '1,240' },
  { label: 'المقالات', value: '86' },
  { label: 'الخدمات', value: '312' },
  { label: 'التعليقات', value: '1,502' }
]

const tasks = [
  'مراجعة 5 تعليقات جديدة',
  'نشر تقرير أسبوع الجمال',
  'تحديث عروض العيادات',
  'تأكيد مزامنة فيسبوك'
]

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">لوحة التحكم</h1>
            <p className="mt-2 text-slate-600">إدارة شاملة للمحتوى، المراجعات، والصلاحيات.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-brand-600 px-5 py-2 text-white">إضافة خدمة</button>
            <button className="rounded-full border border-slate-200 px-5 py-2 text-slate-700">
              مزامنة فيسبوك
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="card p-6">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-3 text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <section className="card p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-slate-800">آخر التعليقات</h2>
            <div className="mt-6 space-y-4">
              {['عيادة النور', 'صالون لافندر', 'مركز رويال'].map((item) => (
                <div key={item} className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <p className="font-semibold text-slate-800">{item}</p>
                    <p className="text-sm text-slate-500">تعليق جديد بانتظار الموافقة</p>
                  </div>
                  <button className="rounded-full border border-brand-200 px-4 py-2 text-sm text-brand-700">
                    مراجعة
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-6">
            <h2 className="text-xl font-semibold text-slate-800">مهام اليوم</h2>
            <ul className="mt-4 space-y-3 text-slate-600">
              {tasks.map((task) => (
                <li key={task} className="flex items-center justify-between">
                  <span>{task}</span>
                  <span className="text-xs text-brand-600">معلق</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}

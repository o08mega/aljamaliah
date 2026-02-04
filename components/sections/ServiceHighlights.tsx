const services = [
  {
    title: 'مراكز التجميل المعتمدة',
    description: 'قاعدة بيانات محدثة بالمراكز والعيادات في الدقهلية.'
  },
  {
    title: 'خدمات صحية وجمالية',
    description: 'تصنيفات متنوعة تساعد الزوار على اختيار الخدمة المناسبة.'
  },
  {
    title: 'عروض وخصومات',
    description: 'قسم مخصص للعروض الموسمية مع إمكانية الحجز.'
  }
]

export default function ServiceHighlights() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="section-title">خدمات متكاملة للزوار</h2>
            <p className="mt-2 text-slate-600">
              تقديم محتوى غني بالخدمات مع إمكانية إضافة تقييمات وتعليقات مباشرة.
            </p>
          </div>
          <button className="rounded-full border border-brand-200 px-6 py-3 text-brand-700 hover:bg-brand-50">
            استعرض كل الخدمات
          </button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="card p-6">
              <h3 className="text-lg font-semibold text-slate-800">{service.title}</h3>
              <p className="mt-3 text-slate-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

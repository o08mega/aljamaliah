const reviews = [
  {
    name: 'سارة محمود',
    rating: '5/5',
    comment: 'النظام سهل الاستخدام، وساعدنا في متابعة المراكز المعتمدة بسرعة.'
  },
  {
    name: 'عمر السيد',
    rating: '4.8/5',
    comment: 'تكامل الفيسبوك وفر علينا وقتاً كبيراً في النشر والمتابعة.'
  },
  {
    name: 'هبة صالح',
    rating: '5/5',
    comment: 'لوحة التحكم رائعة وتوفر إحصائيات واضحة للمشرفين.'
  }
]

export default function Reviews() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="container mx-auto px-6">
        <h2 className="section-title mb-10 text-center">آراء المستخدمين</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="card p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">{review.name}</h3>
                <span className="rounded-full bg-brand-100 px-3 py-1 text-sm text-brand-700">
                  {review.rating}
                </span>
              </div>
              <p className="mt-4 text-slate-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

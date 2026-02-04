const features = [
  {
    title: 'نظام إدارة محتوى كامل',
    description: 'تحكم في الأخبار والمقالات والخدمات مع سير عمل للمراجعة والنشر.'
  },
  {
    title: 'مصادقة آمنة عبر Supabase',
    description: 'تسجيل دخول سريع مع أدوار متعددة للمشرفين والمحررين.'
  },
  {
    title: 'نظام تعليقات وتقييمات',
    description: 'تفعيل المراجعات مع سياسات موافقة مرنة ولوحة متابعة.'
  },
  {
    title: 'تكامل Facebook API',
    description: 'مزامنة تلقائية للمنشورات وربطها بنظام المحتوى الداخلي.'
  },
  {
    title: 'مكونات عربية RTL',
    description: 'واجهة مصممة خصيصًا للغة العربية وتجربة مستخدم مريحة.'
  },
  {
    title: 'جاهزية للنشر',
    description: 'خطوات واضحة للنشر على نطاق مجاني مثل Vercel.'
  }
]

export default function Features() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="section-title mb-10 text-center">ماذا تقدم البوابة؟</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="card p-6">
              <h3 className="text-lg font-semibold text-slate-800">{feature.title}</h3>
              <p className="mt-3 text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

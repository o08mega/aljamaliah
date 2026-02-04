import Image from 'next/image'

const fallback = {
  url: 'https://facebook.com',
  image:
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  text: 'Kids Dental Clinic - رمضان كريم'
}

export default function TopBannerAd() {
  const url = process.env.NEXT_PUBLIC_FB_AD_URL || fallback.url
  const image = process.env.NEXT_PUBLIC_FB_AD_IMAGE || fallback.image
  const text = process.env.NEXT_PUBLIC_FB_AD_TEXT || fallback.text

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="block w-full"
    >
      <div className="ramadan-gradient mx-auto flex w-full max-w-6xl items-center gap-4 rounded-2xl px-5 py-4 shadow-lg transition hover:scale-[1.01]">
        <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white/30">
          <Image
            src={image}
            alt={text}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">{text}</p>
          <p className="text-xs text-white/80">زوروا صفحتنا لمزيد من العروض.</p>
        </div>
        <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white">
          زيارة صفحة الفيسبوك
        </span>
      </div>
    </a>
  )
}

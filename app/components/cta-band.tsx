import Link from 'next/link'
import { ctaClass } from '@/app/components/home/styles'

export default function CtaBand({
  title,
  text,
  cta,
}: {
  title: string
  text?: string
  cta: string
}) {
  return (
    <section className="bg-[color:var(--site-brand)] text-white">
      <div className="mx-auto max-w-4xl space-y-4 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        {text && <p className="text-lg text-white/90">{text}</p>}
        <Link href="/contact" className={ctaClass}>
          {cta}
        </Link>
      </div>
    </section>
  )
}
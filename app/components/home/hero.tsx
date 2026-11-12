import Image from 'next/image'
import Link from 'next/link'
import { ctaClass } from './styles'

type Stat = { value: string; label: string; text?: string }

export default function Hero({
  title,
  subtitle,
  cta,
  stats,
  testimonial,
  image,
}: {
  title: string
  subtitle: string
  cta: string
  stats: Stat[]
  testimonial: { name: string; text: string }
  image?: string
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[color:var(--site-brand)] text-white">
      {image && (
        <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      )}
      <div className="absolute inset-0 -z-10 bg-[color:var(--site-brand)]/70" />

      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
        <p className="mt-4 max-w-xl text-lg">{subtitle}</p>
        <Link href="/contact" className={`${ctaClass} mt-8`}>
          {cta}
        </Link>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.value} className="rounded-xl bg-white/10 p-5 backdrop-blur">
              <p className="text-4xl font-bold text-[color:var(--site-accent)]">{stat.value}</p>
              <p className="font-semibold">{stat.label}</p>
              {stat.text && <p className="mt-1 text-sm">{stat.text}</p>}
            </div>
          ))}
          <div className="rounded-xl bg-white p-5 text-gray-900">
            <p className="text-sm italic">{testimonial.text}</p>
            <p className="mt-2 text-sm font-semibold">{testimonial.name}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
import Link from 'next/link'
import { ctaClass } from './styles'

type Step = { number: string; title: string; text: string }

export default function Steps({
  title,
  subtitle,
  items,
  cta,
}: {
  title: string
  subtitle: string
  items: Step[]
  cta: string
}) {
  return (
    <section className="bg-[color:var(--site-soft)]">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-[color:var(--site-brand)] md:text-4xl">{title}</h2>
        <p className="mt-2 text-lg text-gray-600">{subtitle}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((step) => (
            <div key={step.number} className="rounded-xl bg-white p-6 text-left shadow-sm">
              <p className="text-4xl font-bold text-[color:var(--site-accent)]">{step.number}</p>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{step.text}</p>
            </div>
          ))}
        </div>

        <Link href="/contact" className={`${ctaClass} mt-10`}>
          Planifier un appel
        </Link>
      </div>
    </section>
  )
}
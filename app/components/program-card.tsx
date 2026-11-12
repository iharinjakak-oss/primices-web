import Link from 'next/link'
import CheckList from '@/app/components/home/check-list'
import { ctaClass } from '@/app/components/home/styles'

export default function ProgramCard({
  name,
  description,
  points,
  cta,
}: {
  name: string
  description: string
  points: string[]
  cta: string
}) {
  return (
    <article className="flex h-full flex-col rounded-xl bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-[color:var(--site-brand)]">{name}</h3>
      <p className="mt-3 text-gray-600">{description}</p>
      <div className="mt-5 flex-1 text-sm text-gray-700">
        <CheckList items={points} />
      </div>
      <Link href="/contact" className={`${ctaClass} mt-6`}>
        {cta}
      </Link>
    </article>
  )
}
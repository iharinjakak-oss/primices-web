import Image from 'next/image'
import Link from 'next/link'
import CheckList from './check-list'
import { ctaClass } from './styles'

type Props = {
  title: string
  subtitle?: string
  points: string[]
  cta: string
  image?: string
  reverse?: boolean
  soft?: boolean
  columns?: boolean
}

export default function FeatureSection({
  title,
  subtitle,
  points,
  cta,
  image,
  reverse = false,
  soft = false,
  columns = false,
}: Props) {
  return (
    <section className={soft ? 'bg-[color:var(--site-soft)]' : 'bg-white'}>
      <div
        className={`mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 ${
          image ? 'md:grid-cols-2' : ''
        }`}
      >
        {image && (
          <div
            className={`relative h-72 overflow-hidden rounded-xl md:h-96 ${
              reverse ? 'md:order-2' : ''
            }`}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-[color:var(--site-brand)] md:text-4xl">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
          <CheckList items={points} columns={columns && !image} />
          <Link href="/contact" className={ctaClass}>
            {cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
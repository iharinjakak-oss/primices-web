import Image from 'next/image'
import Link from 'next/link'
import { ctaLightClass } from './styles'

export default function Closing({
  title,
  subtitle,
  text,
  cta,
  image,
}: {
  title: string
  subtitle: string
  text: string
  cta: string
  image?: string
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gray-900 text-white">
      {image && <Image src={image} alt="" fill sizes="100vw" className="-z-10 object-cover" />}
      <div className="absolute inset-0 -z-10 bg-gray-900/80" />

      <div className="mx-auto max-w-4xl space-y-5 px-6 py-20">
        <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
        <h3 className="text-xl text-[color:var(--site-accent)]">{subtitle}</h3>
        <p className="leading-relaxed">{text}</p>
        <Link href="/contact" className={ctaLightClass}>
        </Link>
      </div>
    </section>
  )
}
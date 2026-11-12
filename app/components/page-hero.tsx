import Image from 'next/image'

export default function PageHero({
  title,
  intro,
  image,
}: {
  title: string
  intro?: string
  image?: string
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[color:var(--site-brand)] text-white">
      {image && (
        <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      )}
      <div className="absolute inset-0 -z-10 bg-[color:var(--site-brand)]/75" />

      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-white/90">{intro}</p>}
      </div>
    </section>
  )
}
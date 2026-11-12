export default function Section({
  title,
  intro,
  soft = false,
  children,
}: {
  title?: string
  intro?: string
  soft?: boolean
  children: React.ReactNode
}) {
  return (
    <section className={soft ? 'bg-[color:var(--site-soft)]' : 'bg-white'}>
      <div className="mx-auto max-w-6xl px-6 py-16">
        {title && (
          <h2 className="text-3xl font-bold text-[color:var(--site-brand)] md:text-4xl">{title}</h2>
        )}
        {intro && <p className="mt-3 max-w-3xl text-lg text-gray-600">{intro}</p>}
        <div className={title || intro ? 'mt-10' : ''}>{children}</div>
      </div>
    </section>
  )
}
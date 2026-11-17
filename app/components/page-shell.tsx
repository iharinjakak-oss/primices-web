export default function PageShell({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <>
      <section className="bg-[color:var(--site-brand)] py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-6 py-12">{children}</section>
    </>
  )
}
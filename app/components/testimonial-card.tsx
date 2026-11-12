export default function TestimonialCard({
  name,
  role,
  text,
}: {
  name: string
  role: string
  text: string
}) {
  return (
    <figure className="flex h-full flex-col rounded-xl bg-white p-6 shadow-sm">
      <blockquote className="flex-1 text-gray-700">“{text}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--site-soft)] font-semibold text-[color:var(--site-brand)]">
          {name.charAt(0).toUpperCase()}
        </span>
        <span>
          <span className="block font-semibold">{name}</span>
          <span className="block text-sm text-gray-500">{role}</span>
        </span>
      </figcaption>
    </figure>
  )
}
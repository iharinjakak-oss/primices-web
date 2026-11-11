import { CheckIcon } from '@/app/components/icons'

export default function CheckList({
  items,
  columns = false,
}: {
  items: string[]
  columns?: boolean
}) {
  return (
    <ul className={columns ? 'grid gap-3 md:grid-cols-2' : 'space-y-3'}>
      {items.map((item, i) => (
        <li key={`${i}-${item}`} className="flex gap-3">
          <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--site-accent)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
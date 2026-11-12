import Link from 'next/link'
import { ChevronDownIcon } from '@/app/components/icons'

export type FaqItem = {
  question: string
  answer: string
  link?: { href: string; label: string }
}

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-gray-200 rounded-xl bg-white shadow-sm">
      {items.map((item) => (
        <details key={item.question} className="group p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[color:var(--site-brand)] [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDownIcon className="h-5 w-5 shrink-0 transition group-open:rotate-180" />
          </summary>
          <div className="mt-3 space-y-3 text-gray-600">
            <p>{item.answer}</p>
            {item.link && (
              <Link
                href={item.link.href}
                className="inline-block font-medium text-[color:var(--site-brand)] underline"
              >
                {item.link.label}
              </Link>
            )}
          </div>
        </details>
      ))}
    </div>
  )
}
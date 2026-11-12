export default function StatRow({
  stats,
}: {
  stats: { value: string; label: string }[]
}) {
  return (
    <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(12rem,1fr))]">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl bg-white p-6 text-center shadow-sm">
          <p className="text-4xl font-bold text-[color:var(--site-accent)]">{stat.value}</p>
          <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
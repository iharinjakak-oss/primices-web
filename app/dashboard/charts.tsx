type Slice = { label: string; value: number; color: string }

export function DonutChart({
  data,
  total,
  caption,
}: {
  data: Slice[]
  total: number
  caption: string
}) {
  const radius = 40
  const circumference = 2 * Math.PI * radius

  const slices = data.reduce<(Slice & { start: number; length: number })[]>((acc, slice) => {
    const start = acc.length ? acc[acc.length - 1].start + acc[acc.length - 1].length : 0
    const length = total > 0 ? (slice.value / total) * circumference : 0
    acc.push({ ...slice, start, length })
    return acc
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <div className="relative h-40 w-40 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" role="img" aria-label={caption}>
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="14" />
          {slices.map((s) => (
            <circle
              key={s.label}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth="14"
              strokeDasharray={`${s.length} ${circumference - s.length}`}
              strokeDashoffset={-s.start}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{total}</span>
          <span className="text-xs text-[color:var(--dash-muted)]">{caption}</span>
        </div>
      </div>

      <ul className="space-y-2 text-sm">
        {data.map((s) => (
          <li key={s.label} className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-[color:var(--dash-muted)]">{s.label}</span>
            <span className="font-semibold">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function BarChart({
  data,
  caption,
}: {
  data: { label: string; value: number }[]
  caption: string
}) {
  const max = Math.max(1, ...data.map((d) => d.value))
  const slot = 40
  const width = data.length * slot

  return (
    <svg viewBox={`0 0 ${width} 110`} role="img" aria-label={caption} className="h-48 w-full">
      {data.map((d, i) => {
        const height = (d.value / max) * 70
        const x = i * slot + 8
        const center = x + (slot - 16) / 2

        return (
          <g key={`${d.label}-${i}`}>
            <rect
              x={x}
              y={90 - height}
              width={slot - 16}
              height={height}
              rx={4}
              style={{ fill: 'var(--dash-primary)' }}
            />
            <text x={center} y={84 - height} textAnchor="middle" fontSize="9" style={{ fill: 'var(--dash-muted)' }}>
              {d.value}
            </text>
            <text x={center} y={104} textAnchor="middle" fontSize="9" style={{ fill: 'var(--dash-muted)' }}>
              {d.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
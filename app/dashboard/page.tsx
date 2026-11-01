import Link from 'next/link'
import { getCurrentUser, getToken, roleLabels, type Role, type User } from '../lib/session'
import { BarChart, DonutChart } from './charts'

export const instant = false

const roleColors: Record<Role, string> = {
  super_admin: '#5d87ff',
  admin: '#ffae1f',
  user: '#13deb9',
}

function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <p className="text-sm text-[color:var(--dash-muted)]">{label}</p>
      <p className="mt-2 truncate text-3xl font-bold">{value}</p>
      {hint && <p className="mt-1 text-xs text-[color:var(--dash-muted)]">{hint}</p>}
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  )
}

function signupsByDay(users: User[], days: number) {
  const now = new Date()

  return Array.from({ length: days }, (_, index) => {
    const day = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - (days - 1 - index)),
    )
    const key = day.toISOString().slice(0, 10)

    return {
      label: day.toLocaleDateString('fr-FR', { weekday: 'short', timeZone: 'UTC' }),
      value: users.filter((u) => u.created_at?.slice(0, 10) === key).length,
    }
  })
}

async function loadUsers(): Promise<User[]> {
  const token = await getToken()
  const res = await fetch(`${process.env.API_URL}/users`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  return res.ok ? res.json() : []
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  const isAdmin = user.role !== 'user'
  const users = isAdmin ? await loadUsers() : []

  const byRole = (['super_admin', 'admin', 'user'] as Role[]).map((role) => ({
    label: roleLabels[role],
    value: users.filter((u) => u.role === role).length,
    color: roleColors[role],
  }))
  const week = isAdmin ? signupsByDay(users, 7) : []
  const newThisWeek = week.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Bonjour, {user.name}</h1>
        <p className="text-sm text-[color:var(--dash-muted)]">Bienvenue sur votre espace Primices.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Votre rôle" value={roleLabels[user.role]} />
        <StatCard label="Votre email" value={user.email} />
        {isAdmin && <StatCard label="Comptes" value={users.length} hint="Tous rôles confondus" />}
        {isAdmin && <StatCard label="Nouveaux cette semaine" value={newThisWeek} hint="7 derniers jours" />}
      </div>

      {isAdmin && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Répartition par rôle">
            <DonutChart data={byRole} total={users.length} caption="comptes" />
          </Card>
          <Card title="Inscriptions des 7 derniers jours">
            <BarChart data={week} caption="Inscriptions par jour" />
          </Card>
        </div>
      )}

      {isAdmin && (
        <Card title="Administration">
          <p className="text-sm text-[color:var(--dash-muted)]">
            Consultez, créez, modifiez et supprimez les comptes des utilisateurs.
          </p>
          <Link
            href="/dashboard/users"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-[color:var(--dash-primary)] px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Gérer les utilisateurs
          </Link>
        </Card>
      )}
    </div>
  )
}
import Link from 'next/link'
import { getCurrentUser, roleLabels } from '../lib/session'

export const instant = false

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 truncate text-lg font-semibold">{value}</p>
    </div>
  )
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  const isAdmin = user.role !== 'user'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Bonjour, {user.name}</h1>
        <p className="text-sm text-gray-600">Bienvenue sur votre espace Primices.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <InfoCard label="Rôle" value={roleLabels[user.role]} />
        <InfoCard label="Adresse email" value={user.email} />
        <InfoCard label="Identifiant" value={`#${user.id}`} />
      </div>

      {isAdmin && (
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
          <h2 className="text-lg font-semibold">Administration</h2>
          <p className="mt-1 text-sm text-gray-600">
            Consultez, créez, modifiez et supprimez les comptes des utilisateurs.
          </p>
          <Link
            href="/dashboard/users"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-[#1A2240] px-6 py-2 font-medium text-white transition hover:bg-[#314077]"
          >
            Gérer les utilisateurs
          </Link>
        </section>
      )}
    </div>
  )
}
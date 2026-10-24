import { Suspense } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { updateUser } from '../../../../actions/users'
import FormError from '../../../../components/form-error'
import PasswordInput from '../../../../components/password-input'
import { getCurrentUser, getToken, type User } from '../../../../lib/session'

export const instant = false

const fieldClass =
  'block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-[#1A2240] focus:outline-none'

export default async function EditUserPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string }>
}) {
  const { id } = await params

  const me = await getCurrentUser()

  if (me.role === 'user') {
    redirect('/dashboard')
  }

  const token = await getToken()
  const res = await fetch(`${process.env.API_URL}/users`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    redirect('/dashboard')
  }

  const users: User[] = await res.json()
  const target = users.find((u) => u.id === Number(id))

  if (!target) {
    redirect('/dashboard/users')
  }
  if (me.role === 'admin' && target.role !== 'user') {
    redirect('/dashboard/users')
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Modifier l'utilisateur</h1>
        <p className="text-sm text-gray-600">Compte n°{target.id}</p>
      </div>

      <Suspense fallback={null}>
        <FormError searchParams={searchParams} />
      </Suspense>

      <form
        action={updateUser}
        className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-md"
      >
        <input type="hidden" name="id" value={target.id} />

        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-sm font-medium">
            Nom
          </label>
          <input id="name" name="name" defaultValue={target.name} required className={fieldClass} />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-medium">
            Adresse email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={target.email}
            required
            className={fieldClass}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-sm font-medium">
            Nouveau mot de passe
          </label>
          <PasswordInput
            id="password"
            name="password"
            placeholder="Laisser vide pour ne pas le changer"
            required={false}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="role" className="block text-sm font-medium">
            Rôle
          </label>
          {me.role === 'super_admin' ? (
            <select id="role" name="role" defaultValue={target.role} className={fieldClass}>
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
              <option value="super_admin">Super administrateur</option>
            </select>
          ) : (
            <>
              <input type="hidden" name="role" value={target.role} />
              <p className="text-sm text-gray-600">
                Le rôle ne peut être modifié que par un super administrateur.
              </p>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="rounded-md bg-[#1A2240] px-6 py-2 font-medium text-white transition hover:bg-[#314077]"
          >
            Enregistrer
          </button>
          <Link href="/dashboard/users" className="text-sm font-medium hover:underline">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  )
}
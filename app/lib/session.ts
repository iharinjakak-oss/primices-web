import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type Role = 'super_admin' | 'admin' | 'user'

export type User = {
  id: number
  name: string
  email: string
  role: Role
}

export const roleLabels: Record<Role, string> = {
  super_admin: 'Super administrateur',
  admin: 'Administrateur',
  user: 'Utilisateur',
}

export async function getToken(): Promise<string> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/login')
  }

  return token
}

export const getCurrentUser = cache(async (): Promise<User> => {
  const token = await getToken()

  const res = await fetch(`${process.env.API_URL}/me`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    redirect('/login')
  }

  return res.json()
})
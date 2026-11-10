'use server'

import { redirect } from 'next/navigation'
import { describeError, NETWORK_ERROR } from '../lib/errors'
import { getToken } from '../lib/session'

function call(method: string, path: string, token: string, body?: unknown) {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  }
  if (body) {
    headers['Content-Type'] = 'application/json'
  }

  return fetch(`${process.env.API_URL}/users${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })
}

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? '')
}

function back(page: string, message: string): never {
  redirect(`${page}?error=${encodeURIComponent(message)}`)
}

export async function createUser(formData: FormData) {
  const token = await getToken()

  let res: Response
  try {
    res = await call('POST', '', token, {
      name: field(formData, 'name'),
      email: field(formData, 'email'),
      password: field(formData, 'password'),
      role: field(formData, 'role') || 'user',
    })
  } catch {
    back('/dashboard/users', NETWORK_ERROR)
  }

  if (res.status === 401) {
    redirect('/login')
  }

  if (!res.ok) {
    const data = await res.json().catch(() => null)
    back('/dashboard/users', describeError(res.status, data, 'Création impossible.'))
  }

  redirect('/dashboard/users')
}

export async function updateUser(formData: FormData) {
  const token = await getToken()
  const id = field(formData, 'id')
  const editPage = `/dashboard/users/${id}/edit`

  let res: Response
  try {
    res = await call('PUT', `/${id}`, token, {
      name: field(formData, 'name'),
      email: field(formData, 'email'),
      password: field(formData, 'password'),
      role: field(formData, 'role') || 'user',
    })
  } catch {
    back(editPage, NETWORK_ERROR)
  }

  if (res.status === 401) {
    redirect('/login')
  }

  if (!res.ok) {
    const data = await res.json().catch(() => null)
    back(editPage, describeError(res.status, data, 'Modification impossible.'))
  }

  redirect('/dashboard/users')
}

export async function deleteUser(formData: FormData) {
  const token = await getToken()
  const id = field(formData, 'id')

  let res: Response
  try {
    res = await call('DELETE', `/${id}`, token)
  } catch {
    back('/dashboard/users', NETWORK_ERROR)
  }

  if (res.status === 401) {
    redirect('/login')
  }

  if (!res.ok) {
    const data = await res.json().catch(() => null)
    back('/dashboard/users', describeError(res.status, data, 'Suppression impossible.'))
  }

  redirect('/dashboard/users')
}
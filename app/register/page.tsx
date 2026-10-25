import { Suspense } from 'react'
import Link from 'next/link'
import { register } from '../actions/auth'
import AuthShell from '../components/auth-shell'
import FormError from '../components/form-error'
import PasswordInput from '../components/password-input'

const fieldClass =
  'block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-[#1A2240] focus:outline-none'

export default function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  return (
    <AuthShell title="Créer votre compte" variant="centered">      <form action={register} className="space-y-6">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-sm font-medium">
            Nom complet
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Votre nom"
            className={fieldClass}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-medium">
            Adresse Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="yourmail@mail.com"
            className={fieldClass}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-sm font-medium">
            Mot de Passe
          </label>
          <PasswordInput id="password" name="password" placeholder="8 caractères minimum" />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password_confirmation" className="block text-sm font-medium">
            Confirmer le mot de passe
          </label>
          <PasswordInput id="password_confirmation" name="password_confirmation" />
        </div>

        <Suspense fallback={null}>
          <FormError searchParams={searchParams} />
        </Suspense>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-[#1A2240] py-2 font-medium text-white transition hover:bg-[#314077] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Créer mon compte
        </button>

        <p className="text-center text-sm text-gray-600">
          Vous avez déjà un compte ?{' '}
          <Link href="/login" className="font-semibold text-[#1A2240] hover:underline">
            Se connecter
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}
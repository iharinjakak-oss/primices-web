import Image from 'next/image'
import Link from 'next/link'
import { login } from '../actions/auth'
import PasswordInput from '../components/password-input'

export const instant = false

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <main className="grid min-h-screen md:grid-cols-2">
      <section className="relative isolate flex min-h-48 items-center justify-center overflow-hidden bg-[#1A2240] px-8 md:min-h-screen">
        <Image
          src="/images/login-bg.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-black/50" />
        <h2 className="max-w-md text-center text-2xl font-medium text-white md:text-3xl">
          Commencez votre migration au Canada
        </h2>
      </section>

      <section className="flex items-center justify-center bg-gray-100 p-6">
        <form
          action={login}
          className="w-full max-w-md space-y-6 rounded-2xl border border-gray-100 bg-white p-10 shadow-xl"
        >
          <Link href="/" aria-label="Accueil" className="flex justify-center">
            <Image
              src="/images/logo.svg"
              alt="Primices Logo"
              width={150}
              height={40}
              priority
              className="h-40 w-auto object-contain hover:opacity-85 transition-opacity"
            />
          </Link>

          <h1 className="text-2xl font-semibold text-[#1A2240] mb-6">
            Connexion à votre compte
          </h1>

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="yourmail@mail.com"
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-[#1A2240] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de Passe
            </label>
            <PasswordInput id="password" name="password" />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[#1A2240] py-2 text-base font-medium text-white transition hover:bg-[#314077] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Se connecter
          </button>

          <p className="text-center text-sm text-gray-600">
            Vous n&apos;avez pas de compte ?{' '}
            <Link href="/register" className="font-semibold text-[#1A2240] hover:underline">
              S&apos;inscrire
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}
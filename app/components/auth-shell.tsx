import Image from 'next/image'
import Link from 'next/link'

type Props = {
  title: string
  children: React.ReactNode
  variant?: 'split' | 'centered'
  image?: string
  heading?: string
}

export default function AuthShell({
  title,
  children,
  variant = 'split',
  image = '/images/login-bg.jpg',
  heading = 'Commencez votre migration au Canada',
}: Props) {
  const card = (
    <div className="w-full max-w-md space-y-6 rounded-2xl border border-gray-100 bg-white p-10 text-[#1A2240] shadow-xl">
      <Link href="/" aria-label="Accueil" className="flex justify-center">
        <Image
          src="/images/logo.svg"
          alt="Primices International"
          width={160}
          height={160}
          priority
          className="h-28 w-auto"
        />
      </Link>

      <h1 className="text-2xl font-semibold">{title}</h1>

      {children}
    </div>
  )

  if (variant === 'centered') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#1A2240] bg-linear-to-br from-[#1A2240] to-[#314077] p-6">
        {card}
      </main>
    )
  }

  return (
    <main className="grid min-h-screen md:grid-cols-2">
      <section className="relative isolate flex min-h-48 items-center justify-center overflow-hidden bg-[#1A2240] px-8 md:min-h-screen">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-black/50" />
        <h2 className="max-w-md text-center text-2xl font-medium text-white md:text-3xl">
          {heading}
        </h2>
      </section>

      <section className="flex items-center justify-center bg-gray-100 p-6">{card}</section>
    </main>
  )
}
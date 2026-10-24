export default async function FormError({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  if (!error) {
    return null
  }

  return (
    <p role="alert" className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
      {error}
    </p>
  )
}
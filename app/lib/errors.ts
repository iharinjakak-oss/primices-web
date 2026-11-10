type ApiBody = { message?: string; errors?: Record<string, string[]> } | null

export const NETWORK_ERROR =
  'Le serveur ne répond pas. Vérifiez votre connexion ou réessayez dans un instant.'

export function describeError(status: number, data: unknown, fallback: string): string {
  const body = data as ApiBody
  const validation = body?.errors ? Object.values(body.errors)[0]?.[0] : undefined

  if (status === 422) {
    return validation ?? body?.message ?? 'Les informations saisies ne sont pas valides.'
  }
  if (status === 401) {
    return body?.message ?? 'Identifiants incorrects ou session expirée.'
  }
  if (status === 403) {
    return body?.message ?? "Vous n'avez pas le droit d'effectuer cette action."
  }
  if (status === 404) {
    return "Cet élément n'existe plus ou a été supprimé."
  }
  if (status === 429) {
    return body?.message ?? 'Trop de tentatives. Réessayez dans une minute.'
  }
  if (status >= 500) {
    return 'Une erreur est survenue de notre côté. Réessayez plus tard.'
  }

  return body?.message ?? fallback
}
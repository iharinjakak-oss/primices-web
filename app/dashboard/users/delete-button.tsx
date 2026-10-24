'use client'

import { deleteUser } from '../../actions/users'

export default function DeleteButton({ id }: { id: number }) {
  return (
    <form
      action={deleteUser}
      onSubmit={(e) => {
        if (!confirm('Supprimer cet utilisateur ?')) {
          e.preventDefault()
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-sm font-medium text-red-600 hover:underline">
        Supprimer
      </button>
    </form>
  )
}
import axios from 'axios'
import { Trash } from 'phosphor-react'
import { toast } from 'sonner'

export function DeleteButton({ id }: { id: string }) {
  async function handleDeleteUser(id: string) {
    const confirmation = confirm('deseja apagar usuário?')

    if (confirmation) {
      const formData = new FormData()
      formData.append('id', id)

      try {
        const response = await axios.post(
          'https://techsoluctionscold.com.br/crud_users/api/v2/user/delete',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )

        console.log('response => ', response.data)
        toast.success(response.data.message)
      } catch (error) {
        toast.error('Erro ao apagar')
      }
    }
  }
  return (
    <button onClick={() => handleDeleteUser(id)}>
      <Trash size={20} />
    </button>
  )
}

import axios from 'axios'
import { Trash, X } from 'phosphor-react'
import { toast } from 'sonner'
import {
  ButtonDelete,
  ButtonsOptions,
  CancelButton,
  CloseButton,
  ConfirmButton,
  Content,
  Overlay,
} from './styles'
import * as Dialog from '@radix-ui/react-dialog'

export function DeleteButton({ id }: { id: string }) {
  async function handleDeleteUser(id: string) {
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
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ButtonDelete>
          <Trash size={20} />
        </ButtonDelete>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Overlay />
        <Content>
          <Dialog.Title>Deseja apagar usuário?</Dialog.Title>
          <CloseButton>
            <X size={24} />
          </CloseButton>

          <ButtonsOptions>
            <ConfirmButton onClick={() => handleDeleteUser(id)}>
              Apagar
            </ConfirmButton>
            <CancelButton>Cancelar</CancelButton>
          </ButtonsOptions>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

import { Trash, X } from 'phosphor-react'
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
import { useContext } from 'react'
import { UsersContext } from '../../contexts/UsersContext'

export function DeleteButton({ id }: { id: string }) {
  const { deleteUser } = useContext(UsersContext)

  async function handleDeleteUser(id: string) {
    await deleteUser(id)
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

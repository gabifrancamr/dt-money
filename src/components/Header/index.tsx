import {
  Buttons,
  HeaderContainer,
  HeaderContent,
  // NewTransactionButton,
  NewUserButton,
} from './styles'
import * as Dialog from '@radix-ui/react-dialog'
import logoImage from '../../assets/Ignite simbol.svg'
// import { NewTransactionModal } from '../NewTransactionModal'
import { NewUser } from '../NewUser'
import { useContext } from 'react'
import { UsersContext } from '../../contexts/UsersContext'

export function Header() {
  const { open, setOpen } = useContext(UsersContext)
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImage} alt="imagem da logo" />
        <Buttons>
          {/* <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewTransactionButton>Nova Transação</NewTransactionButton>
            </Dialog.Trigger>

            <NewTransactionModal />
          </Dialog.Root> */}

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <NewUserButton>Criar usuário</NewUserButton>
            </Dialog.Trigger>

            <NewUser />
          </Dialog.Root>
        </Buttons>
      </HeaderContent>
    </HeaderContainer>
  )
}

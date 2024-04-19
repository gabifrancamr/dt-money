import { Pencil, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { ButtonEdit, CloseButton, Content, Overlay } from './styles'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useState } from 'react'
import {
  EditUserTypes,
  UsersContext,
  UsersProps,
} from '../../contexts/UsersContext'

const editFormSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  email: zod.string(),
  mobile: zod.string(),
  username: zod.string(),
  password: zod.string(),
})

type editFormInputs = zod.infer<typeof editFormSchema>

export function EditButton({ user }: { user: UsersProps }) {
  const [open, setOpen] = useState(false)

  const { editUser } = useContext(UsersContext)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<editFormInputs>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      mobile: user.mobile,
      username: user.username,
      password: user.password,
    },
  })

  async function handleEditUser(formInfo: editFormInputs) {
    const id = user.id

    const data: EditUserTypes = {
      data: {
        formInfo,
        id,
      },
    }

    await editUser(data)

    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <ButtonEdit>
          <Pencil size={20} />
        </ButtonEdit>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Overlay />
        <Content>
          <Dialog.Title>Editar Perfil</Dialog.Title>
          <CloseButton>
            <X size={24} />
          </CloseButton>

          <form onSubmit={handleSubmit(handleEditUser)}>
            <input
              {...register('firstname')}
              type="text"
              placeholder="Nome"
              required
            />
            <input
              {...register('lastname')}
              type="text"
              placeholder="Sobrenome"
              required
            />
            <input
              {...register('email')}
              type="text"
              placeholder="Email"
              required
            />
            <input
              {...register('mobile')}
              type="number"
              placeholder="Telefone"
              required
            />
            <input
              {...register('username')}
              type="text"
              placeholder="Nome de usuário"
              required
            />
            <input
              {...register('password')}
              type="password"
              placeholder="Senha"
              required
            />

            <button type="submit" disabled={isSubmitting}>
              Atualizar
            </button>
          </form>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

import { Pencil, X } from 'phosphor-react'
import axios from 'axios'
import { toast } from 'sonner'
import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay } from './styles'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { UsersProps } from '../../pages/Users'

const editFormSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  email: zod.string(),
  mobile: zod.string(),
  username: zod.string(),
  password: zod.string(),
  id: zod.string(),
})

type editFormInputs = zod.infer<typeof editFormSchema>

export function EditButton({ user }: { user: UsersProps }) {
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

  async function handleEditUser(user: editFormInputs) {
    // console.log('handleEditUser chamado', user)
    // const { firstname, lastname, email, mobile, username, password, id } = user
    // console.log(firstname)
    //     const formData = new FormData()
    //     formData.append('firstname', firstname)
    //     formData.append('lastname', lastname)
    //     formData.append('email', email)
    //     formData.append('mobile', mobile)
    //     formData.append('username', username)
    //     formData.append('password', password)
    //     formData.append('id', id)
    //
    //     try {
    //       const response = await axios.post(
    //         'https://techsoluctionscold.com.br/crud_users/api/v2/user/update',
    //         formData,
    //         {
    //           headers: {
    //             'Content-Type': 'multipart/form-data',
    //           },
    //         },
    //       )
    //
    //       console.log('response => ', response.data)
    //       toast.success(response.data.message)
    //     } catch (error) {
    //       toast.error('Erro ao editar')
    //     }
  }

  async function handleSubmitForm(data: editFormInputs) {
    console.log('Formulário enviado:', data)
    await handleEditUser(data) // Chama a função teste
    // Aqui você pode adicionar o código para lidar com o envio do formulário
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button>
          <Pencil size={20} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Overlay />
        <Content>
          <Dialog.Title>Editar Perfil</Dialog.Title>
          <CloseButton>
            <X size={24} />
          </CloseButton>

          <form onSubmit={handleSubmit(handleSubmitForm)}>
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

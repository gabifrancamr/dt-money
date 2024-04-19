import { X } from 'phosphor-react'
import { Content, Overlay, CloseButton, ButtonCreateUser } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'

const newUserFormSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  email: zod.string(),
  mobile: zod.string(),
  username: zod.string(),
  password: zod.string(),
})

type newUserFormInputs = zod.infer<typeof newUserFormSchema>

export function NewUser() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<newUserFormInputs>({
    resolver: zodResolver(newUserFormSchema),
  })

  async function createUser(data: newUserFormInputs) {
    const { firstname, lastname, email, mobile, username, password } = data

    const formData = new FormData()
    formData.append('firstname', firstname)
    formData.append('lastname', lastname)
    formData.append('email', email)
    formData.append('mobile', mobile)
    formData.append('username', username)
    formData.append('password', password)

    try {
      const response = await axios.post(
        'https://techsoluctionscold.com.br/crud_users/api/v2/user/create',
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
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError

        const responseData = axiosError.response?.data as { message: string }

        if (responseData) {
          toast.error(responseData.message)
        } else {
          toast.error('Erro ao criar usuário')
        }
      } else {
        console.error('Error creating user:', error)
        toast.error('Erro ao criar usuário')
      }
    }
  }

  async function handleNewUser(data: newUserFormInputs) {
    const { firstname, lastname, email, mobile, username, password } = data
    await createUser({ firstname, lastname, email, mobile, username, password })
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Criar usuário</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleNewUser)}>
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
            type="text"
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

          <ButtonCreateUser type="submit" disabled={isSubmitting}>
            Criar
          </ButtonCreateUser>
        </form>
      </Content>
    </Dialog.Portal>
  )
}

import { ReactNode, createContext, useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'

export interface UsersProps {
  id: string
  firstname: string
  lastname: string
  email: string
  mobile: string
  username: string
  password: string
  created_at: string
  updated_at: string
  deleted_at: string
}

interface UsersProviderProps {
  children: ReactNode
}

interface NewUsers {
  firstname: string
  lastname: string
  email: string
  mobile: string
  username: string
  password: string
}

interface formInfoTypes {
  firstname: string
  lastname: string
  email: string
  mobile: string
  username: string
  password: string
}

export interface EditUserTypes {
  data: {
    formInfo: formInfoTypes
    id: string
  }
}

interface UsersContextType {
  open: boolean
  setOpen: (value: boolean) => void
  showUsers: UsersProps[]
  createUser: (data: NewUsers) => void
  deleteUser: (id: string) => void
  editUser: (data: EditUserTypes) => void
}

export const UsersContext = createContext({} as UsersContextType)

export function UsersProvider({ children }: UsersProviderProps) {
  const [showUsers, setShowUsers] = useState<UsersProps[]>([])
  const [open, setOpen] = useState(false)

  async function fetchUsers() {
    const response = await axios.post(
      'https://techsoluctionscold.com.br/crud_users/api/v2/users',
    )

    setShowUsers(response.data.data)

    console.log('list users => 14:33', response.data.data)
  }

  async function createUser(data: NewUsers) {
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

      await fetchUsers()

      setOpen(false)

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

  async function deleteUser(id: string) {
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

      await fetchUsers()

      toast.success(response.data.message)
    } catch (error) {
      toast.error('Erro ao apagar')
    }
  }

  async function editUser({ data }: EditUserTypes) {
    const formInfo = data.formInfo
    const id = data.id

    const { firstname, lastname, email, mobile, username, password } = formInfo

    const formData = new FormData()
    formData.append('firstname', firstname)
    formData.append('lastname', lastname)
    formData.append('email', email)
    formData.append('mobile', mobile)
    formData.append('username', username)
    formData.append('password', password)
    formData.append('id', id)

    try {
      const response = await axios.post(
        'https://techsoluctionscold.com.br/crud_users/api/v2/user/update',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      await fetchUsers()

      console.log('response => ', response.data)
      toast.success(response.data.message)
    } catch (error) {
      toast.error('Erro ao editar')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [showUsers])

  return (
    <UsersContext.Provider
      value={{ showUsers, createUser, deleteUser, editUser, open, setOpen }}
    >
      {children}
    </UsersContext.Provider>
  )
}

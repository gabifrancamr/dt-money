import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Pencil } from 'phosphor-react'
import { SearchForm } from '../../components/SearchForm'
import { TransactionsContainer, TransactionsTable } from './styles'

import axios from 'axios'
import { toast } from 'sonner'
import { DeleteButton } from '../../components/DeleteButton'

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

export function CreateNewUser() {
  // const { transactions } = useContext(TransactionsContext)

  const [users, setUsers] = useState<UsersProps[]>([])

  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.post(
        'https://techsoluctionscold.com.br/crud_users/api/v2/users',
      )

      setUsers(response.data.data)

      console.log('list users => 14:33', response.data.data)
    }

    fetchUsers()
  }, [])

  async function handleEditUser(user: UsersProps) {
    console.log(user)
    //     const { firstname, lastname, email, mobile, username, password, id } = user
    //
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

  return (
    <div>
      <Header />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.username}</td>
                <td>
                  <button onClick={() => handleEditUser(user)}>
                    <Pencil size={20} />
                  </button>
                </td>
                <td>
                  <DeleteButton id={user.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}

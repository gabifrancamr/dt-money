import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { SearchForm } from '../../components/SearchForm'
import { TransactionsContainer, TransactionsTable } from './styles'

import axios from 'axios'
import { DeleteButton } from '../../components/DeleteButton'
import { EditButton } from '../../components/EditButton'

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
                  <EditButton user={user} />
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

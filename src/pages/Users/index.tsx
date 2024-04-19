import { useContext } from 'react'
import { Header } from '../../components/Header'
import { SearchForm } from '../../components/SearchForm'
import { TransactionsContainer, TransactionsTable } from './styles'

import { DeleteButton } from '../../components/DeleteButton'
import { EditButton } from '../../components/EditButton'

import { UsersContext } from '../../contexts/UsersContext'

export function CreateNewUser() {
  const { showUsers } = useContext(UsersContext)

  return (
    <div>
      <Header />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {showUsers.map((user) => (
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

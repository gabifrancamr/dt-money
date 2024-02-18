import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import {
  ButtonDelete,
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFromatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'
import { Trash } from 'phosphor-react'

export function Transactions() {
  const { transactions, deleteTransaction } = useContextSelector(
    TransactionsContext,
    (context) => {
      return {
        transactions: context.transactions,
        deleteTransaction: context.deleteTransaction,
      }
    },
  )

  function handleDeleteTransaction(id: number) {
    deleteTransaction(id)
  }
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="40%">{transaction.description}</td>
                <td>
                  <PriceHighLight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFromatter.format(transaction.price)}
                  </PriceHighLight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                <td>
                  <ButtonDelete
                    onClick={() => handleDeleteTransaction(transaction.id)}
                  >
                    <Trash size={24} />
                  </ButtonDelete>
                </td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}

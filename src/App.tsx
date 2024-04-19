import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
// import { Transactions } from './pages/Transactions'
import { TransactionsProvider } from './contexts/TransactionsContext'
import { Toaster } from 'sonner'
import { CreateNewUser } from './pages/Users'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Toaster richColors />
      <TransactionsProvider>
        <CreateNewUser />
      </TransactionsProvider>
    </ThemeProvider>
  )
}

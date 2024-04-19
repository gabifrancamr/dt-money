import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
// import { Transactions } from './pages/Transactions'
// import { TransactionsProvider } from './contexts/TransactionsContext'
import { Toaster } from 'sonner'
import { CreateNewUser } from './pages/Users'
import { UsersProvider } from './contexts/UsersContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Toaster richColors />
      <UsersProvider>
        <CreateNewUser />
      </UsersProvider>
    </ThemeProvider>
  )
}

import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import logoImage from '../../assets/Ignite simbol.svg'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImage} alt="imagem da logo" />
        <NewTransactionButton>Nova Transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}

import styled from 'styled-components'

export const ButtonDelete = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.white};
  border: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme['red-500']};
  }
`

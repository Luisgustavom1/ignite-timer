import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const NavHeader = styled.nav`
  display: flex;
  gap: 0.5rem;

  .link {
    width: 3rem;
    height: 3rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    color: ${(props) => props.theme.colors['gray-100']};

    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;

    &:hover {
      border-bottom: 3px solid ${(props) => props.theme.colors['green-500']};
    }

    &.active {
      color: ${(props) => props.theme.colors['green-500']};
    }
  }
`

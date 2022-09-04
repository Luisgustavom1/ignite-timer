import { Timer, Scroll } from 'phosphor-react'
import { HeaderContainer, NavHeader } from './styles'

import logoIgnite from 'src/assets/Logo.svg'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <HeaderContainer>
      <img
        src={logoIgnite}
        alt="Dois triangulos verdes um pouco opacos um pouco sobrepostos e essa sobreposição com um tom de verde claro sem opacidade"
      />

      <NavHeader>
        <NavLink className="link" to="/" title="timer">
          <Timer size={24} />
        </NavLink>
        <NavLink className="link" to="/history" title="histórico">
          <Scroll size={24} />
        </NavLink>
      </NavHeader>
    </HeaderContainer>
  )
}
export default Header

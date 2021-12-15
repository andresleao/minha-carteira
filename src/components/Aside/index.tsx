import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import Toggle from '../Toggle';
import { MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp, MdClose, MdMenu } from 'react-icons/md';

import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';

import { 
  Container,
  Header,
  Title,
  LogImg, 
  MenuContainer, 
  MenuItemLink, 
  MenuItemButton, 
  ToggleMenu,
  ThemeToggleFooter, 
} from './style';

const Aside: React.FC = () => {
  const [ toggleMenuIsOpened, setToggleMenuIsOpened ] = useState<boolean>(false);
  
  const { signOut } = useAuth();

  const { toggleTheme, theme } = useTheme();
  const [ darkTheme, setDarkTheme ] = useState<boolean>(() => theme.title === 'dark' ? true : false);

  const handleToggleMenu = () => {
    setToggleMenuIsOpened(!toggleMenuIsOpened)
  }

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  }

  return (
    <Container menuIsOpen={toggleMenuIsOpened}>
      <Header>
        <ToggleMenu onClick={handleToggleMenu}>
          { toggleMenuIsOpened ? <MdClose /> : <MdMenu /> }
        </ToggleMenu>

        <LogImg src={logoImg} alt="Logo Minha Carteira" />
        <Title>Minha Carteira</Title>
      </Header>

      <MenuContainer>
        <Link to="/" style={{textDecoration: 'none'}}>
          <MenuItemLink>
            <MdDashboard />Dashboard
          </MenuItemLink>
        </Link>

        <Link to="/list/entry-balance" style={{textDecoration: 'none'}}>
          <MenuItemLink>
            <MdArrowUpward />Entradas
          </MenuItemLink>
        </Link>

        <Link to="/list/exit-balance" style={{textDecoration: 'none'}}>
          <MenuItemLink>
            <MdArrowDownward />Saídas
          </MenuItemLink>
        </Link>

        <MenuItemButton onClick={ signOut }>
          <MdExitToApp />Sair
        </MenuItemButton>
      
      </MenuContainer>

      <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
        <Toggle 
          labelLeft="Light"
          labelRight="Dark"
          checked={darkTheme}
          onChange={handleChangeTheme}
        />
      </ThemeToggleFooter>
    </Container>
  );
}

export default Aside;
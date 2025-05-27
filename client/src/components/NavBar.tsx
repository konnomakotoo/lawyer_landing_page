// NavBar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import type { RootState } from '../redux/store/redux.store';
import styled from 'styled-components';
import Logo from '../Icons/Logo';
import PersonIcon from '../Icons/PersonIcon';

type NavItem = {
  label: React.ReactNode;
  to: string;
  isIcon?: boolean;
};

const NavBarContainer = styled.header`
  position: relative;
  max-height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  font-size: 1rem;
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }

  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
  }
`;

const AuthNav = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }

  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font: inherit;
    padding: 0;
  }
`;

const BurgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  svg { width: 24px; height: 24px; fill: currentColor; }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.primary};
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 1rem;
  padding: ${({ theme }) => theme.space.md};
  z-index: 10;

  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.textOnPrimary};
    text-align: left;
    font: inherit;
    cursor: pointer;
    padding: 0.5rem 0;
  }

  hr {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.2);
    margin: 0.5rem 0;
  }
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BurgerIcon: React.FC = () => (
  <svg viewBox="0 0 24 24">
    <rect y="4" width="24" height="2" />
    <rect y="11" width="24" height="2" />
    <rect y="18" width="24" height="2" />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg viewBox="0 0 24 24">
    <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
    <line x1="20" y1="4" x2="4"  y2="20" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default function NavBar() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: 'О нас',   to: '/aboutus' },
    { label: 'Команда', to: '/team' },
    { label: 'Проекты', to: '/projects' },
    { label: 'Услуги',  to: '/services' },
  ];

  const authItems: NavItem[] = user
    ? [{ label: <PersonIcon />, to: '/profile', isIcon: true }]
    : [
        { label: 'Регистрация', to: '/signup' },
        { label: 'Вход',        to: '/login' },
      ];

  return (
    <NavBarContainer>
      <NavLogo onClick={() => { setMenuOpen(false); navigate('/'); }}>
        <Logo />
      </NavLogo>

      <DesktopNav>
        {navItems.map(item => (
          <button key={item.to} onClick={() => navigate(item.to)}>
            {item.label}
          </button>
        ))}
      </DesktopNav>

      <AuthNav>
        {authItems.map(item => (
          <button
            key={item.to}
            onClick={() => navigate(item.to)}
            style={item.isIcon ? { padding: 0 } : undefined}
          >
            {item.label}
          </button>
        ))}
      </AuthNav>

      <BurgerButton onClick={() => setMenuOpen(o => !o)}>
        {menuOpen ? <CloseIcon /> : <BurgerIcon />}
      </BurgerButton>

      <MobileMenu isOpen={menuOpen}>
        {navItems.map(item => (
          <button key={item.to}
            onClick={() => {
              navigate(item.to);
              setMenuOpen(false);
            }}
          >
            {item.label}
          </button>
        ))}

        <hr />

        {authItems.map(item => (
          <button
            key={item.to}
            onClick={() => {
              navigate(item.to);
              setMenuOpen(false);
            }}
          >
            {item.label}
          </button>
        ))}
      </MobileMenu>
    </NavBarContainer>
  );
}
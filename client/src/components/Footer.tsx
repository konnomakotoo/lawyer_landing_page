// src/components/Footer.tsx
import React from "react";
import styled from "styled-components";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  padding: 3rem 1rem 1rem;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    padding: 2rem 0.5rem 0.5rem;
    font-size: 0.8rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  
  gap: 2rem;
  justify-content: space-between;

  @media (max-width: 992px) {
    gap: 1.5rem;
  }
`;

const Col = styled.div`
  flex: 1 1 200px;

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

const ColNav = styled.div`
  flex: 1 1 200px;

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
  @media (max-width: 600px) {
    display: none;
  }
`;

const Logo = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.textOnPrimary};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 600px) {
    gap: 0.75rem;
    margin-top: 0.75rem;
  }
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.textOnPrimary};
  display: inline-flex;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  & > svg {
    width: 20px;
    height: 20px;

    @media (max-width: 600px) {
      width: 18px;
      height: 18px;
    }
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.blockDark};
  margin-top: 2rem;
  padding-top: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    padding-top: 0.75rem;
  }
`;

const Footer: React.FC = () => (
  <FooterWrapper>
    <Container>
      <Col>
        <Logo>Бакаев & Партнеры</Logo>
        <p>
          Профессиональная команда адвокатов для вашего бизнеса и личных нужд.
        </p>
      </Col>

      <ColNav>
        <h4>Навигация</h4>
        <Nav>
          <NavLink href="/">Главная</NavLink>
          <NavLink href="/about">О нас</NavLink>
          <NavLink href="/services">Услуги</NavLink>
          <NavLink href="/team">Команда</NavLink>
          <NavLink href="/projects">Проекты</NavLink>
          <NavLink href="/contact">Контакты</NavLink>
        </Nav>
      </ColNav>

      <Col>
        <h4>Контакты</h4>
        <p>г. Москва, ул. Арбат, 51с2</p>
        <p>Тел: +7 (937) 464-61-88</p>
        <p>Email: info@bakaevpartners.ru</p>
        <SocialIcons>
          <SocialLink href="#" aria-label="Facebook">
            <Facebook />
          </SocialLink>
          <SocialLink href="#" aria-label="Twitter">
            <Twitter />
          </SocialLink>
          <SocialLink href="#" aria-label="Instagram">
            <Instagram />
          </SocialLink>
          <SocialLink href="#" aria-label="LinkedIn">
            <Linkedin />
          </SocialLink>
        </SocialIcons>
      </Col>
    </Container>

    <BottomBar>
      © {new Date().getFullYear()} БАКАЕВ & ПАРТНЕРЫ. Все права защищены.
    </BottomBar>
  </FooterWrapper>
);

export default Footer;

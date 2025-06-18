// src/components/Footer.tsx
import React from "react";
import styled from "styled-components";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  padding: 3rem 1rem 1rem;
  font-size: 0.9rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
`;

const Col = styled.div`
  flex: 1 1 200px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
  }
`;

const Logo = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.textOnPrimary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.textOnPrimary};
  display: inline-flex;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.blockDark};
  margin-top: 2rem;
  padding-top: 1rem;
  text-align: center;
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

      <Col>
        <h4>Навигация</h4>
        <Nav>
          <NavLink href="/">Главная</NavLink>
          <NavLink href="/about">О нас</NavLink>
          <NavLink href="/services">Услуги</NavLink>
          <NavLink href="/team">Команда</NavLink>
          <NavLink href="/projects">Проекты</NavLink>
          <NavLink href="/contact">Контакты</NavLink>
        </Nav>
      </Col>

      <Col>
        <h4>Контакты</h4>
        <p>г. Москва, ул. Арбат, 51с2</p>
        <p>Тел: +7 (937) 464-61-88</p>
        <p>Email: info@bakaevpartners.ru</p>
        <SocialIcons>
          <SocialLink href="#" aria-label="Facebook">
            <Facebook size={20} />
          </SocialLink>
          <SocialLink href="#" aria-label="Twitter">
            <Twitter size={20} />
          </SocialLink>
          <SocialLink href="#" aria-label="Instagram">
            <Instagram size={20} />
          </SocialLink>
          <SocialLink href="#" aria-label="LinkedIn">
            <Linkedin size={20} />
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

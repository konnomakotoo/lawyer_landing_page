import { useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import AccountIcon from "../Icons/AccountIcon";
import { gsap } from "gsap";

// Fade+slide animation
const slideInFade = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// Container
const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 100vh;
`;

// Background image
const HeroImage = styled.div`
  width: 100%;
  height: 80vh;
  background: url("/booksclose.jpg") center/cover no-repeat;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(24, 24, 31, 0.6);
  }
`;

// Overlay content
const HeroContent = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  max-width: 90%;
  h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  .subtitle {
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
  }
  form {
    display: flex;
    gap: 12px;
    input {
      padding: 10px 14px;
      border: none;
      border-radius: 4px;
      width: 50%;
    }
    button {
      padding: 12px 20px;
      border: none;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.colors.buttons};
      color: ${({ theme }) => theme.colors.textOnPrimary};
      cursor: pointer;
    }
  }
`;

// Squares overlap bottom of image with animation when visible and count up
const SquaresContainer = styled.div`
  position: absolute;
  bottom: 22%;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
  display: flex;
  gap: 30px;
  z-index: 2;
`;

const Square = styled.div<{ delay: number }>`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 400px;
  height: 400px;
  padding: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  ${({ delay }) =>
    css`
      animation: ${slideInFade} 0.8s ease-out ${delay}s forwards;
    `}
  .icon-wrapper {
    margin-bottom: 16px;
    width: 70px;
    height: 70px;
    background-color: ${({ theme }) => theme.colors.textOnPrimary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
  }
  span.number {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  h2 {
    margin: 8px 0 4px;
    font-size: 1.25rem;
  }
`;

export default function StaticHero() {
  const squaresData = [
    { title: "Выигранных дел", value: 200 },
    { title: "Адвокатов", value: 50 },
    { title: "Клиентов", value: 1000 },
  ];

  const refs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    // count up animation when scrolled into view
    const container = refs.current[0]?.parentElement;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            squaresData.forEach((_, idx) => {
              const el = refs.current[idx];
              if (el) {
                const obj = { val: 0 };
                gsap.to(obj, {
                  val: squaresData[idx].value,
                  duration: 1.2,
                  ease: "power1.out",
                  delay: idx * 0.2,
                  onUpdate: () => {
                    el.textContent = Math.floor(obj.val).toLocaleString();
                  },
                });
              }
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <HeroContainer>
      <HeroImage />
      <HeroContent>
        <h2>МЫ НА ВАШЕЙ СТОРОНЕ</h2>
        <div className="subtitle">в решении юридических вопросов любой сожности</div>
        <div className="subtitle">Связаться с нами</div>
        <form>
          <input type="text" placeholder="Введите имя" />
          <input type="text" placeholder="Введите номер" />
          <button type="submit">Отправить</button>
        </form>
      </HeroContent>
      <SquaresContainer>
        {squaresData.map((sq, idx) => (
          <Square key={idx} delay={idx * 0.2}>
            <div className="icon-wrapper">
              <AccountIcon />
            </div>
            <span
              className="number"
              ref={(el) => {
                refs.current[idx] = el;
              }}
            >
              0
            </span>
            <h2>{sq.title}</h2>
          </Square>
        ))}
      </SquaresContainer>
    </HeroContainer>
  );
}

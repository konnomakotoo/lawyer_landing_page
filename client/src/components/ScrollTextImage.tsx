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
z-index: 0;
  width: 100%;
  height: 60vh;
  background: url("/mainpage.jpg") center/cover no-repeat;
  border
  position: relative;
  &::after {
    content: "";
    height: 60vh;
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
  width: 90%;
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
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    gap: 12px;
    width: 85%;
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

const HeroBottomContent = styled.div`
  z-index: 10;
  width: 100%;
  height: 40vh;
  border-radius: 20% 20% 0 0;
  position: relative;
`;

// Squares overlap bottom of image with animation when visible and count up
const SquaresContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1%;
`;

const Square = styled.div<{ delay: number }>`
  background-color: ${({ theme }) => theme.colors.block};
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 250px;
  height: 250px;
  margin-top: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  opacity: 0;
  ${({ delay }) =>
    css`
      animation: ${slideInFade} 0.8s ease-out ${delay}s forwards;
    `}
  span.number {
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  h2 {
    margin: 8px 0 4px;
    font-size: 1.1rem;
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
        <h2>ПРОФЕССИОНАЛЬНАЯ ПОДДЕРЖКА В ЛЮБЫХ ЮРИДИЧЕСКИХ ВОПРОСАХ</h2>
        <div className="subtitle">
          От первичной консультации до полного судебного сопровождения
        </div>
        <form>
          <input type="text" placeholder="Введите имя" />
          <input type="text" placeholder="Введите номер" />
          <button type="submit">Отправить</button>
        </form>
      </HeroContent>
      <HeroBottomContent>
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
      </HeroBottomContent>
    </HeroContainer>
  );
}

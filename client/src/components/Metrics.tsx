import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { gsap } from "gsap";

// Slide in + fade animation
const slideInFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components
const Section = styled.section`
  padding: 4rem 2rem;
  background-color: ${({ theme }) => theme.colors.backgroundAlt || "#f9f9f9"};
  color: ${({ theme }) => theme.colors.text || "#333"};
  text-align: center;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const Counters = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
`;

const CounterBlock = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  ${({ visible }) =>
    visible &&
    css`
      animation: ${slideInFade} 0.8s ease-out forwards;
    `}
`;

const CounterNumber = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary || "#007acc"};
`;

const CounterLabel = styled.span`
  margin-top: 0.25rem;
  font-size: 1rem;
`;

const ImageContainer = styled.div`
  margin-top: 2rem;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// Self-contained metrics and image
const METRICS = [
  { label: "Адвокатов", value: 50, delay: 0 },
  { label: "Выигранных дел", value: 200, delay: 0.2 },
  { label: "Городов", value: 15, delay: 0.4 },
  { label: "Клиентов", value: 1000, delay: 0.6 },
];
const IMAGE_URL = "/images/lawyers-team.jpg";
const IMAGE_ALT = "Наша команда адвокатов";
const TITLE = "О нашей компании";

const MetricsWithImage: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const refs = useRef<Array<HTMLSpanElement | null>>(METRICS.map(() => null));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    METRICS.forEach((metric, idx) => {
      const ref = refs.current[idx];
      if (!ref) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: metric.value,
        duration: 1.2,
        ease: "power1.out",
        delay: metric.delay,
        onUpdate: () => {
          ref.textContent = Math.floor(obj.val).toLocaleString();
        },
      });
    });
  }, [visible]);

  return (
    <Section ref={sectionRef}>
      <Title>{TITLE}</Title>
      <Counters>
        {METRICS.map((metric, idx) => (
          <CounterBlock key={metric.label} visible={visible}>
            <CounterNumber ref={(el) => {
            refs.current[idx] = el}}>
              0
            </CounterNumber>
            <CounterLabel>{metric.label}</CounterLabel>
          </CounterBlock>
        ))}
      </Counters>
      <ImageContainer>
        <StyledImage src={IMAGE_URL} alt={IMAGE_ALT} />
      </ImageContainer>
    </Section>
  );
};

export default MetricsWithImage;

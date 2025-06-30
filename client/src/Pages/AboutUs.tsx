// src/components/AboutUsWave.tsx
import React, { useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { gsap } from "gsap";
import WonCases from "../Icons/WonCases";
import LawyerIcon from "../Icons/LawyerIcon";
import ClientIcon from "../Icons/ClientIcon";
import ConsultationIcon from "../Icons/ConsultationIcon";

const metricsData = [
  {
    title: "выигранных дел",
    value: 200,
    description:
      "Наши юристы успешно завершили более 200 дел различной сложности: от медиации до полного судебного разбирательства.",
    icon: WonCases,
  },
  {
    title: "адвокатов",
    value: 50,
    description:
      "В команде работают 50 сертифицированных адвокатов с опытом от 5 до 20 лет. Каждый специалист регулярно проходит повышение квалификации.",
    icon: LawyerIcon,
  },
  {
    title: "клиентов",
    value: 1000,
    description:
      "Более 1000 клиентов уже доверили нам свои юридические вопросы. Мы оказываем персональные консультации и комплексное сопровождение на каждом этапе.",
    icon: ClientIcon,
  },
  {
    title: "проведенных консультаций",
    value: 1500,
    description:
      "Наши специалисты провели более 1500 консультаций, помогая клиентам разобраться в правовых вопросах и найти оптимальные решения.",
    icon: ConsultationIcon,
  },
];

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

const Section = styled.section`
  position: relative;
  padding: 2rem 0rem;
  background-color: ${({ theme }) => theme.colors.backgroundAlt || "#f9f9f9"};
  color: ${({ theme }) => theme.colors.text || "#333"};
`;

const SectionCircle = styled.section`
  border-top-left-radius: 20%;
  border-top-right-radius: 20%;
  position: relative;
  padding: 0 rem 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text || "#333"};
  @media (max-width: 647px) {
    border-top-left-radius: 15%;
    border-top-right-radius: 15%;
  }
  @media (max-width: 832px) {
    border-top-left-radius: 12%;
    border-top-right-radius: 12%;
  }
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  @media (max-width: 647px) {
    gap: 0.1rem;
  }
  @media (max-width: 583px) {
    flex-direction: column;
    margin: 0 auto;
  }
`;

const ImageWrapper = styled.div`
  flex: 1 1 100px;
  img {
    width: 90%;
    height: auto;
    border-radius: 8px;
    display: block;
  }
  @media (max-width: 583px) {
    img {
      width: 50%;
      margin: 0 auto;
    }
  }
`;

const ContentWrapper = styled.div`
  flex: 1 1 200px;
  padding: 2rem;
  text-align: left;
  @media (max-width: 583px) {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
  @media (max-width: 1035px) {
    font-size: 2.5rem;
  }
  @media (max-width: 922px) {
    font-size: 2.1rem;
  }
  @media (max-width: 791px) {
    font-size: 1.6rem;
  }
  @media (max-width: 582px) {
    font-size: 2.1rem;
  }
  @media (max-width: 470px) {
    font-size: 1.8rem;
  }
`;

const TextBlock = styled.p<{ visible: boolean }>`
  font-size: 1.5rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.buttons};
  opacity: 0;
  ${({ visible }) =>
    visible &&
    css`
      animation: ${slideInFade} 0.8s ease-out forwards;
    `}
  @media (max-width: 1035px) {
    font-size: 1.2rem;
  }
  @media (max-width: 922px) {
    font-size: 1rem;
  }
  @media (max-width: 791px) {
    font-size: 0.9rem;
  }
  @media (max-width: 582px) {
    font-size: 1.1rem;
  }
  @media (max-width: 470px) {
    font-size: 1rem;
  }
`;

const TextBlockSmall = styled.p<{ visible: boolean }>`
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.blockDark};
  opacity: 0;
  ${({ visible }) =>
    visible &&
    css`
      animation: ${slideInFade} 0.8s ease-out forwards;
    `}
  @media (max-width: 922px) {
    font-size: 0.75rem;
  }
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
  @media (max-width: 582px) {
    font-size: 0.8rem;
  }
`;

const Counters = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  padding: 1rem 2rem;
  @media (max-width: 750px) {
    gap: 1rem;
  }
`;

const CounterBlock = styled.div<{ visible: boolean }>`
  flex: 1 1 200px;
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  opacity: 0;
  ${({ visible }) =>
    visible &&
    css`
      animation: ${slideInFade} 0.8s ease-out forwards;
    `}
`;

const CounterNumber = styled.span`
  display: block;
  font-size: 3rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.colors.buttons};
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const CounterLabel = styled.span`
  display: block;
  font-size: 1rem;
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.buttons};
`;

const Description = styled.p<{ visible: boolean }>`
  font-size: 0.9rem;
  line-height: 1.4;
  margin-top: 0.75rem;
  opacity: 0;
  \color: ${({ theme }) => theme.colors.blockDark};
  ${({ visible }) =>
    visible &&
    css`
      animation: ${slideInFade} 0.8s ease-out forwards;
    `}
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export default function AboutUsWave() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const numberRefs = useRef<HTMLSpanElement[]>([]);
  const [textVisible, setTextVisible] = React.useState(false);
  const [countersVisible, setCountersVisible] = React.useState(false);

  useEffect(() => {
    if (textRef.current) setTextVisible(true);

    const timer = setTimeout(() => {
      setCountersVisible(true);
      numberRefs.current.forEach((el, idx) => {
        const endVal = metricsData[idx].value;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: endVal,
          duration: 1.2,
          ease: "power1.out",
          delay: idx * 0.2,
          onUpdate: () => {
            if (el) {
              el.textContent = `${Math.floor(obj.val).toLocaleString()}+`;
            }
          },
        });
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Section>
      <SectionCircle>
        <TopContainer>
          <ImageWrapper>
            <img src="/scale_png.png" alt="О нашей компании" />
          </ImageWrapper>
          <ContentWrapper>
            <Title>О нашей компании</Title>
            <TextBlock ref={textRef} visible={textVisible}>
              Наша коллегия объединяет лучших специалистов и предоставляет
              полный спектр юридических услуг по всей стране.
              <TextBlockSmall ref={textRef} visible={textVisible} l>
                Мы обеспечиваем индивидуальный подход к каждому клиенту,
                оперативно реагируем на все запросы и гарантируем высочайший
                уровень профессионализма. Наша команда сочетает опыт,
                инновационные решения и глубокое знание законодательства.
                Доверие клиентов — наша главная ценность, и мы стремимся к
                безупречным результатам.
              </TextBlockSmall>
            </TextBlock>
          </ContentWrapper>
        </TopContainer>

        <Counters>
          {metricsData.map((metric, idx) => {
            const IconComp = metric.icon;
            return (
              <CounterBlock key={metric.title} visible={countersVisible}>
                <IconComp width={40} height={40} />
                <CounterNumber
                  ref={(el) => {
                    numberRefs.current[idx] = el!;
                  }}
                >
                  0+
                </CounterNumber>
                <CounterLabel>{metric.title}</CounterLabel>
                <Description visible={countersVisible}>
                  {metric.description}
                </Description>
              </CounterBlock>
            );
          })}
        </Counters>
      </SectionCircle>
    </Section>
  );
}

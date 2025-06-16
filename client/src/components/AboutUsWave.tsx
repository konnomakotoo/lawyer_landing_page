import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Hook: IntersectionObserver, запускается анимация при появлении
function useInView<T extends Element>(ref: React.RefObject<T>): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

// Стили
const BackgroundSection = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 2rem 1rem;
`;

const SectionWrapper = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Divider = styled.hr`
  width: 4rem;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.buttons};
  border: none;
  margin: 0 auto 1rem;

  @media (max-width: 480px) {
    width: 3rem;
    height: 3px;
    margin-bottom: 0.75rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 0.5rem;
  }
  @media (max-width: 480px) {
    gap: 0.8rem;
  }
`;

const CardBase = styled.div<{ inView: boolean }>`
  position: relative;
  background-color: ${({ theme }) => theme.colors.block};
  border-radius: 8px;
  overflow: hidden;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  opacity: ${({ inView }) => (inView ? 1 : 0)};
  transform: translateY(${({ inView }) => (inView ? "0" : "20px")});
  transition: opacity 0.5s ease, transform 0.5s ease;

  @media (max-width: 900px) {
    padding: 0.6rem;
  }
  @media (max-width: 768px) {
    padding: 0.6rem;
  }
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
  @media (max-width: 375px) {
    padding: 0.4rem;
  }
`;

const CardImage = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 0.75rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    margin-bottom: 0.5rem;
  }
`;

const CardLabel = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0.5rem 0;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const CardDesc = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  line-height: 1.4;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MoreButton = styled.button`
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textOnPrimary};
  background-color: ${({ theme }) => theme.colors.buttons};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.3rem 0.8rem;
  }
`;

interface Service {
  title: string;
  desc: string;
  img: string;
}

const services: Service[] = [
  {
    title: "Судебная защита бизнеса",
    desc: "Сопровождение споров в арбитражных и гражданских судах.",
    img: "/law_protect.jpg",
  },
  {
    title: "Налоговое консультирование",
    desc: "Оптимизация налогов и представительство при проверках.",
    img: "/taxes_consult.jpg",
  },
  {
    title: "Защита при проверках",
    desc: "Защита при камеральных и выездных проверках.",
    img: "/protection_government.jpg",
  },
  {
    title: "Сопровождение юр. отдела",
    desc: "Аутсорсинг договорной работы и compliance.",
    img: "/assistance_law.jpg",
  },
  {
    title: "Личная защита менеджмента",
    desc: "Поддержка руководителей в уголовных и административных делах.",
    img: "/managers_assist.jpg",
  },
  {
    title: "Корпоративные споры",
    desc: "Разрешение конфликтов участников и защита прав миноритариев.",
    img: "/corporate_disputes.jpg",
  },
];

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>);
  return (
    <CardBase ref={ref} inView={inView}>
      <CardImage>
        <img src={service.img} alt={service.title} loading="lazy" />
      </CardImage>
      <CardLabel>{service.title}</CardLabel>
      <CardDesc>{service.desc}</CardDesc>
      <MoreButton>Подробнее</MoreButton>
    </CardBase>
  );
};

export const AboutUsSection: React.FC = () => (
  <BackgroundSection>
    <SectionWrapper>
      <Divider />
      <SectionTitle>Наши услуги</SectionTitle>
    </SectionWrapper>
    <Grid>
      {services.map((service, idx) => (
        <ServiceCard key={idx} service={service} />
      ))}
    </Grid>
  </BackgroundSection>
);

export default AboutUsSection;

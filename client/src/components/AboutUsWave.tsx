import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import LawProtectIcon from "../Icons/LawProtectIcon";
import TaxesConsultIcon from "../Icons/TaxesConsultIcon";
import ProtectionGovernmentIcon from "../Icons/ProtectionGovernmentIcon";
import AssistanceLawIcon from "../Icons/AssistanceLawIcon";
import ManagersAssistIcon from "../Icons/ManagersAssistIcon";
import CorporateDisputesIcon from "../Icons/CorporateDisputesIcon";

// Hook: IntersectionObserver — анимация при появлении
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
  padding: 2rem;
  @media (max-width: 900px) {
    margin-top: 10%;
  }
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const SectionWrapper = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  @media (max-width: 900px) {
    margin-bottom: 1rem;
  }
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const SmallTitle = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  @media (max-width: 900px) {
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
  }
`;

const BigTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0 0 0.6rem;
  text-transform: uppercase;

  @media (max-width: 900px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Divider = styled.hr`
  width: 4rem;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: none;
  margin: 0 auto 2rem;

  @media (max-width: 900px) {
    margin-bottom: 0.6rem;
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
    gap: 1rem;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 0 0.5rem;
  }
`;

const CardBase = styled.div<{ inView: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.block};
  border-radius: 8px;
  padding: 0.75rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  opacity: ${({ inView }) => (inView ? 1 : 0)};
  transform: translateY(${({ inView }) => (inView ? "0" : "20px")});
  transition: opacity 0.5s ease, transform 0.5s ease;

  
`;

const CardIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 0.75rem;
  border: 0.5px solid ${({ theme }) => theme.colors.block};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 50%;
    height: 50%;
  }

  @media (max-width: 1000px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 900px) {
    width: 50px;
    height: 50px;
    margin: 0 auto 0.3rem;
  }
  @media (max-width: 375px) {
    display: none;
  }
`;

const CardLabel = styled.h3`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0.1rem 0;
  font-weight: bold;

  @media (max-width: 1000px) {
    font-size: 1.2rem;
  }
  @media (max-width: 580px) {
    font-size: 1rem;
  }
`;

const CardDesc = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.blockDark};
  margin-bottom: 1rem;
  line-height: 1.4;

  @media (max-width: 900px) {
    font-size: 0.8rem;
  }

  @media (max-width: 653px) {
    display: none;
  }
`;

const MoreButton = styled.button`
  margin-top: auto;
  align-self: center;

  width: auto;
  min-width: 120px;
  max-width: 160px;
  padding: 10px 18px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.buttons};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  cursor: pointer;
  font-size: 1rem;

  @media (max-width: 1000px) {
    padding: 9px 16px;
    font-size: 0.9rem;
  }
  @media (max-width: 580px) {
    padding: 7px 13px;
    font-size: 0.8rem;
  }
`;

interface Service {
  title: string;
  desc: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const services: Service[] = [
  {
    title: "Судебная защита бизнеса",
    desc: "Сопровождение споров в арбитражных и гражданских судах.",
    Icon: LawProtectIcon,
  },
  {
    title: "Налоговое консультирование",
    desc: "Оптимизация налогов и представительство при проверках.",
    Icon: TaxesConsultIcon,
  },
  {
    title: "Защита при проверках",
    desc: "Защита при камеральных и выездных проверках.",
    Icon: ProtectionGovernmentIcon,
  },
  {
    title: "Сопровождение юр. отдела",
    desc: "Аутсорсинг договорной работы и compliance.",
    Icon: AssistanceLawIcon,
  },
  {
    title: "Личная защита менеджмента",
    desc: "Поддержка руководителей в уголовных и административных делах.",
    Icon: ManagersAssistIcon,
  },
  {
    title: "Корпоративные споры",
    desc: "Разрешение конфликтов участников и защита прав миноритариев.",
    Icon: CorporateDisputesIcon,
  },
];

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>);
  return (
    <CardBase ref={ref} inView={inView}>
      <CardIconWrapper>
        <service.Icon />
      </CardIconWrapper>
      <CardLabel>{service.title}</CardLabel>
      <CardDesc>{service.desc}</CardDesc>
      <MoreButton>Подробнее</MoreButton>
    </CardBase>
  );
};

export const AboutUsSection: React.FC = () => (
  <BackgroundSection>
    <SectionWrapper>
      <SmallTitle>Наши услуги</SmallTitle>
      <BigTitle>Сферы практики</BigTitle>
      <Divider />
    </SectionWrapper>
    <Grid>
      {services.map((service, idx) => (
        <ServiceCard key={idx} service={service} />
      ))}
    </Grid>
  </BackgroundSection>
);

export default AboutUsSection;

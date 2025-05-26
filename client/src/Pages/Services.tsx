// src/components/Services.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

type Service = {
  id: string;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    id: 'consult',
    title: 'Юридическая консультация',
    description: 'Подробный анализ вашей ситуации с выдачей письменного заключения и рекомендациями по дальнейшим шагам.',
  },
  {
    id: 'contracts',
    title: 'Составление договоров',
    description: 'Разработка и проверка договоров любой сложности с учётом ваших интересов и актуального законодательства.',
  },
  {
    id: 'representation',
    title: 'Судебное представительство',
    description: 'Представительство в судах всех инстанций: подготовка процессуальных документов и защита ваших прав в зале суда.',
  },
  {
    id: 'family',
    title: 'Семейные споры',
    description: 'Разводы, споры о детях, разделе имущества — комплексная поддержка в любых семейно-правовых вопросах.',
  },
  {
    id: 'criminal',
    title: 'Уголовная защита',
    description: 'Защита прав на этапах проверки, дознания и в суде при обвинениях в уголовных преступлениях.',
  },
  {
    id: 'inheritance',
    title: 'Наследственные дела',
    description: 'Оспаривание и оформление наследства, защита прав наследников в суде.',
  },
];

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
`;

const ServicesSection = styled.section`
  padding: ${({ theme }) => theme.space.lg};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space.md};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: ${({ theme }) => theme.space.md};
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    animation: ${float} 2.5s ease-in-out infinite;
  }
`;

const Title = styled.h3`
  margin: 0 0 ${({ theme }) => theme.space.sm} 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;

const Services: React.FC = () => {
  return (
    <ServicesSection>
      <Grid>
        {services.map((svc) => (
          <Card key={svc.id}>
            <Title>{svc.title}</Title>
            <Description>{svc.description}</Description>
          </Card>
        ))}
      </Grid>
    </ServicesSection>
  );
};

export default Services;




// src/components/ProjectBoard.tsx
import React from 'react';
import styled from 'styled-components';

type Project = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

const projects: Project[] = [
  { id: '1', title: 'Арбитраж для IT-компании',   description: 'Выиграли спор на 12 млн ₽ в Москве.',     icon: '/law.jpg' },
  { id: '2', title: 'Семейное дело',              description: 'Раздел имущества в трёх странах.',      icon: '/law.jpg' },
  { id: '3', title: 'Уголовная защита',           description: 'Дело закрыто на этапе следствия.',      icon: '/law.jpg' },
  { id: '4', title: 'Медиация',                   description: 'Мирное урегулирование конфликта.',     icon: '/law.jpg' },
  { id: '5', title: 'Корпоративные споры',        description: 'Урегулирование споров акционеров.',    icon: '/law.jpg' },
  { id: '6', title: 'Наследственные дела',        description: 'Защита прав наследников.',             icon: '/law.jpg' },
  { id: '7', title: 'Сделки с недвижимостью',     description: 'Сопровождение сделок с жильём.',       icon: '/law.jpg' },
  { id: '8', title: 'Антимонопольные споры',      description: 'Представляли интересы в ФАС.',          icon: '/law.jpg' },
];

const Section = styled.section`
  overflow-x: hidden; /* запрещаем горизонтальный скролл страницы */
  background: ${({ theme }) => theme.colors.backgroundAlt || 'hsl(200,20%,95%)'};
`;

const Container = styled.div`
  box-sizing: border-box;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;

  @media (max-width: 1024px) {
    padding: 3rem 1rem;
  }
  @media (max-width: 600px) {
    padding: 3rem 0.5rem;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary || '#0C253F'};
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Member = styled.div`
  flex: 0 0 auto;
  scroll-snap-align: start;
  width: 140px; /* фиксируем ширину карточки */
  text-align: center;
`;

const Avatar = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primary || '#0C253F'};
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text || '#222'};
  margin-bottom: 0.25rem;
`;

const Role = styled.small`
  display: block;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.secondary || '#666'};
  line-height: 1.2;
`;

const ProjectBoard: React.FC = () => (
  <Section>
    <Container>
      <Title>Наши проекты</Title>
      <ScrollContainer>
        {projects.map(proj => (
          <Member key={proj.id}>
            <Avatar src={proj.icon} alt={proj.title} />
            <Name>{proj.title}</Name>
            <Role>{proj.description}</Role>
          </Member>
        ))}
      </ScrollContainer>
    </Container>
  </Section>
);

export default ProjectBoard;
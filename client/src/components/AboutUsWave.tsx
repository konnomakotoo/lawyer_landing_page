import React from "react";
import styled, { keyframes } from "styled-components";

// Animations
const slideInDown = keyframes`
  from { opacity: 0; transform: translateY(-30px); }
  to   { opacity: 1; transform: translateY(0);     }
`;
const slideInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

// Wrapper for title section without background
const SectionWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 2rem 1rem; /* Текст повыше */
`;

// Title and description
const Title = styled.h2`
  font-size: 2.5rem;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 0;
  animation: ${slideInDown} 0.8s ease-out forwards;
`;
const Desc = styled.p`
  margin: 1rem auto 2rem;
  max-width: 800px;
  font-size: 1.2rem;
  line-height: 1.5;
  opacity: 0;
  animation: ${slideInDown} 0.8s ease-out 0.2s forwards;
`;

// Background with diagonal split for specialization section
const BackgroundSection = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.textOnPrimary} 50%,
    #f4f4f4 50%
  );
  padding: 2rem 1rem;
`;

// Grid for specializations
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Larger circle image with full black overlay
const CardImage = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  opacity: 0;
  animation: ${slideInUp} 0.6s ease-out forwards;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; /* Полностью */
    background: rgba(0, 0, 0, 0.6); /* Черное наложение */
  }
`;

const CardLabel = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.icons};
  opacity: 0;
  animation: ${slideInUp} 0.6s ease-out 0.2s forwards;
  text-align: center;
`;

// Data
const specializations = [
  "Судебная защита бизнеса",
  "Налоговое консультирование",
  "Защита при проверках органов власти",
  "Сопровождение юридического отдела",
  "Личная защита владельцев и топ-менеджмента",
  "Корпоративные споры",
];
const images = [
  "/law_protect.jpg",
  "/taxes_consult.jpg",
  "/protection_government.jpg",
  "/assistance_law.jpg",
  "/managers_assist.jpg",
  "/corporate_disputes.jpg",
];

export const AboutUsSection: React.FC = () => (
  <>
    <SectionWrapper>
      <Title>О партнерстве</Title>
      <Desc>
        Партнёрство «Бакаев и Партнеры» объединяет адвокатов-профессионалов
        Москвы, Московской области и регионов России со стажем более 10 лет.
      </Desc>
    </SectionWrapper>
    <BackgroundSection>
      <Grid>
        {specializations.map((label, idx) => (
          <Card key={idx}>
            <CardImage>
              <img src={images[idx]} alt={label} />
            </CardImage>
            <CardLabel>{label}</CardLabel>
          </Card>
        ))}
      </Grid>
    </BackgroundSection>
  </>
);

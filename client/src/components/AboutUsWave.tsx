import React from "react";
import styled, { keyframes } from "styled-components";
import BrushIcon from "../Icons/BrushIcon";

// Slide-in animations
const slideInDown = keyframes`
  from { opacity: 0; transform: translateY(-30px); }
  to   { opacity: 1; transform: translateY(0);     }
`;
const slideInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

// Wrapper for entire section
const SectionWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: visible;
`;

// Top part
const TopSection = styled.section`
  display: flex;
  margin: 0 auto;
  width: 50%;
  height: 45%;
  padding-top: 4rem;
  align-items: center;
  justify-content: center;
  gap: 40px;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    width: 90%;
  }
`;
const TextContainer = styled.div`
  flex: 1;
`;
const Title = styled.h2`
  font-size: 2rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.secondary};
  position: relative;
  display: inline-block;
  opacity: 0;
  animation: ${slideInDown} 0.8s ease-out 0.1s forwards;
  & .icon {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -40%);
    z-index: -1;
    opacity: 0.5;
  }
`;
const Desc = styled.p`
  margin: 1rem 0 0;
  font-size: 1.1rem;
  line-height: 1.4;
  opacity: 0;
  animation: ${slideInDown} 0.8s ease-out 0.3s forwards;
`;
const ButtonAboutUs = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  margin-top: 4%;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  background-color: ${({ theme }) => theme.colors.buttons};
  &:hover {
    opacity: 0.9;
  }
`;
const RightImage = styled.img`
  flex: 1;
  max-width: 300px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 10px 10px #d4a15b;
  opacity: 0;
  animation: ${slideInDown} 0.8s ease-out 0.5s forwards;
`;

// Bottom part with 6 specialization cards in 2 rows
const BottomSection = styled.section`
  
  text-align: center;
  padding: 1.4rem;
  height: 55%;
`;
const Subtitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 0;
  animation: ${slideInDown} 0.8s ease-out 0.7s forwards;
`;

// Grid layout without gap, using borders as separators
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0;
  max-width: 1000px;
  margin: 0 auto;
`;

const Card = styled.div<{ delay?: number }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 2rem;
  opacity: 0;
  animation: ${slideInUp} 0.6s ease-out ${(props) => props.delay || 0}s forwards;

  border-right: 2px solid rgba(226, 23, 23, 0.3);
  border-bottom: 2px solid rgba(177, 16, 16, 0.3);
  &:nth-child(3n) {
    border-right: none;
  }
  &:nth-child(n + 4) {
    border-bottom: none;
  }
`;
const CardImage = styled.img<{ delay?: number }>`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 0.75rem;
  opacity: 0;
  animation: ${slideInDown} 0.8s ease-out
    ${(props) => (props.delay || 0) + 0.1}s forwards;
`;
const CardLabel = styled.span<{ delay?: number }>`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.icons};
  opacity: 0;
  animation: ${slideInUp} 0.6s ease-out ${(props) => (props.delay || 0) + 0.2}s
    forwards;
  transition: color 0.2s;
  ${Card}:hover & {
    color: ${({ theme }) => theme.colors.icons};
  }
`;

// Data array with 6 items
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
  <SectionWrapper>
    <TopSection>
      <TextContainer>
        <Title>
          О партнерстве
          <div className="icon">
            <BrushIcon />
          </div>
        </Title>
        <Desc>
          Партнёрство «Бакаев и Партнеры» объединяет адвокатов-профессионалов
          Москвы, Московской области и регионов России со стажем более 10 лет.
        </Desc>
        <ButtonAboutUs>Подробнее</ButtonAboutUs>
      </TextContainer>
      <RightImage src="/statue.jpeg" alt="О партнерстве" />
    </TopSection>

    <BottomSection>
      <Subtitle>Наши специализации</Subtitle>
      <Grid>
        {specializations.map((label, idx) => (
          <Card key={idx} delay={idx * 0.2}>
            <CardImage src={images[idx]} alt={label} delay={idx * 0.2} />
            <CardLabel delay={idx * 0.2}>{label}</CardLabel>
          </Card>
        ))}
      </Grid>
    </BottomSection>
  </SectionWrapper>
);

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Генератор случайного номера
const generatePhone = () => {
  const rand = () => Math.floor(Math.random() * 900) + 100;
  const part2 = () => Math.floor(Math.random() * 90) + 10;
  const part3 = () => Math.floor(Math.random() * 90) + 10;
  return `+7 (${rand()}) ${rand()}-${part2()}-${part3()}`;
};

// Данные команды
interface Lawyer {
  firstName: string;
  lastName: string;
  img: string;
}
const TEAM: Lawyer[] = [
  { firstName: "Иван", lastName: "Иванов", img: "/law.jpg" },
  { firstName: "Мария", lastName: "Петрова", img: "/law.jpg" },
  { firstName: "Алексей", lastName: "Сидоров", img: "/law.jpg" },
  { firstName: "Ольга", lastName: "Кузнецова", img: "/law.jpg" },
  { firstName: "Дмитрий", lastName: "Смирнов", img: "/law.jpg" },
];

// Анимация появления
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

// Стили
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const TopSection = styled.div`
  position: relative;
  height: 40%;
  background: url("/call.jpg") center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5%;
  color: ${({ theme }) => theme.colors.textOnPrimary};
  text-align: center;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: ${({ theme }) => theme.colors.secondary};
    opacity: 0.8;
  }
`;
const CallText = styled.div`
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 1s ease-out;
`;

const TitleCallSmall = styled.h2`
  margin: 0;
  font-size: 1rem;
`;
const TitleCall = styled.h2`
  margin: 0;
  font-size: 2.5rem;
`;
const Phone = styled.p`
  color: ${({ theme }) => theme.colors.buttons};
  margin: 0 auto;
  padding: 20px 20px;
  font-size: 1.5rem;
  border: 0.5px solid white;
  width: 40%;
`;

//BOTTOM
const BottomSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  height: 50vh;
  width: 75%;
  margin: 0 auto;
`;
const Controls = styled.div`
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6rem;
`;
const TeamTitle = styled.h3`
  margin: 0;
  font-size: 2rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const TeamText = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  animation: ${fadeIn} 0.8s ease-out;
`;
const Arrows = styled.div`
  display: flex;
  gap: .5rem;
`;
const ArrowButton = styled.button`
  width: 20%;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  border: 0.5px solid black;
  padding-bottom: 5px;
  background-color: ${({ theme }) => theme.colors.icons};
`;
const SliderContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;
const Slides = styled.div<{ translateX: number }>`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${(props) => -props.translateX}px);
`;
const Slide = styled.div`
  flex: 0 0 200px;
  margin: 0 10px;
  position: relative;
  animation: ${fadeIn} 0.5s ease-out;
`;
const SlideImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;
const NameOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 0.5rem;
  text-align: center;
  font-size: 1rem;
  border-radius: 0 0 8px 8px;
`;

export const CallAndTeamSlider: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [index, setIndex] = useState(0);
  const visibleCount = 3;
  const step = 200 + 20; // slide width (200) + margin (2*10)
  const maxIndex = TEAM.length;

  useEffect(() => {
    setPhone(generatePhone());
  }, []);

  const prev = () => {
    setIndex((i) => (i - 1 + maxIndex) % maxIndex);
  };
  const next = () => {
    setIndex((i) => (i + 1) % maxIndex);
  };

  // Build array of visible slides wrapping around
  const visibleSlides: Lawyer[] = [];
  for (let i = 0; i < visibleCount; i++) {
    visibleSlides.push(TEAM[(index + i) % maxIndex]);
  }

  return (
    <Wrapper>
      <TopSection>
        <CallText>
          <TitleCallSmall>Хотите обсудить ваш случай в деталях?</TitleCallSmall>
          <TitleCall>Позвоните Нам - Наши Юристы Помогут Вам</TitleCall>
          <Phone>{phone}</Phone>
        </CallText>
      </TopSection>

      <BottomSection>
        <Controls>
          <TeamTitle>Наша команда</TeamTitle>
          <TeamText>
            Наши адвокаты — опытные профессионалы с индивидуальным подходом и
            решимостью защищать ваши права на высшем уровне.
          </TeamText>
          <Arrows>
            <ArrowButton onClick={prev}>&#8249;</ArrowButton>
            <ArrowButton onClick={next}>&#8250;</ArrowButton>
          </Arrows>
        </Controls>
        <SliderContainer>
          <Slides translateX={step * 0 /* always show from 0 */}>
            {visibleSlides.map((member, idx) => (
              <Slide key={idx}>
                <SlideImage
                  src={member.img}
                  alt={`${member.firstName} ${member.lastName}`}
                />
                <NameOverlay>
                  {member.firstName} {member.lastName}
                </NameOverlay>
              </Slide>
            ))}
          </Slides>
        </SliderContainer>
      </BottomSection>
    </Wrapper>
  );
};

export default CallAndTeamSlider
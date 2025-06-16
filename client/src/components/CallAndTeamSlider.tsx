import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Генератор случайного номера
const generatePhone = () => {
  const rand = () => Math.floor(Math.random() * 900) + 100;
  const part2 = () => Math.floor(Math.random() * 90) + 10;
  const part3 = () => Math.floor(Math.random() * 90) + 10;
  return `+7 (${rand()}) ${rand()}-${part2()}-${part3()}`;
};

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
  { firstName: "Екатерина", lastName: "Лебедева", img: "/law.jpg" },
];

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  height: 100vh;
`;

const UpContainer = styled.div`
  width: 100%;
  text-align: center;
  height: 55vh;
  margin-top: 7%;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin: 2rem 0 1rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const SliderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

const ArrowButton = styled.button<{ side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondary};
  ${({ side }) =>
    side === "left" ? "left: calc(50% - 200px);" : "right: calc(50% - 200px);"}
  z-index: 2;
`;

const Slides = styled.div`
  display: flex;
  justify-content: center;
  min-height: 300px;
  align-items: flex-end;
  gap: 3rem;
`;

// Слайд с плавным переходом размеров и прозрачности
const Slide = styled.div<{ isCenter: boolean }>`
  flex: 0 0 auto;
  width: ${({ isCenter }) => (isCenter ? "300px" : "200px")};
  height: ${({ isCenter }) => (isCenter ? "300px" : "200px")};
  position: relative;
  opacity: ${({ isCenter }) => (isCenter ? 1 : 0.6)};
  transition: width 0.4s ease, height 0.4s ease, opacity 0.4s ease;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const NameOverlay = styled.div<{ isCenter: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, ${({ isCenter }) => (isCenter ? 0.6 : 0.8)});
  color: #fff;
  padding: 0.5rem;
  text-align: center;
  font-size: ${({ isCenter }) => (isCenter ? "1.1rem" : "0.9rem")};
  border-radius: 0 0 8px 8px;
  transition: background 0.4s ease, font-size 0.4s ease;
`;

const CallSection = styled.div`
  background: url("/call.jpg") center/cover no-repeat;
  color: #fff;
  padding: 2rem 1rem;
  position: relative;
  height: 32.7vh;
`;

const CallOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const CallContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto;
`;

const CallText = styled.p`
  font-size: 1.2rem;
  margin: 0;
`;

const Phone = styled.h3`
  font-size: 2rem;
  margin: 1rem 0 0;
`;

export const CallAndTeamSlider: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [index, setIndex] = useState(0);
  const count = TEAM.length;

  useEffect(() => {
    setPhone(generatePhone());
  }, []);

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  const center = index;
  const left = (index - 1 + count) % count;
  const right = (index + 1) % count;
  const visible = [left, center, right];

  return (
    <Wrapper>
      <UpContainer>
        <SectionTitle>Наша команда профессионалов</SectionTitle>

        <SliderContainer>
          <ArrowButton side="left" onClick={prev}>
            &#8249;
          </ArrowButton>

          <Slides>
            {visible.map((idx, pos) => {
              const isCenter = pos === 1;
              const member = TEAM[idx];
              return (
                <Slide key={idx} isCenter={isCenter}>
                  <SlideImage
                    src={member.img}
                    alt={`${member.firstName} ${member.lastName}`}
                  />
                  <NameOverlay isCenter={isCenter}>
                    {member.firstName} {member.lastName}
                  </NameOverlay>
                </Slide>
              );
            })}
          </Slides>

          <ArrowButton side="right" onClick={next}>
            &#8250;
          </ArrowButton>
        </SliderContainer>
      </UpContainer>

      <CallSection>
        <CallOverlay />
        <CallContent>
          <CallText>
            Хотите обсудить ваш случай в деталях? Позвоните нам — наши юристы
            помогут вам.
          </CallText>
          <Phone>{phone}</Phone>
        </CallContent>
      </CallSection>
    </Wrapper>
  );
};

export default CallAndTeamSlider;

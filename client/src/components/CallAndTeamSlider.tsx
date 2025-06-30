import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchTeam } from "../redux/slices/teamSlice";
import type { AppDispatch, RootState } from "../redux/store/redux.store";
const API = import.meta.env.VITE_API_URL;

// ====== СТИЛИ ======

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const UpContainer = styled.div`
  flex: 1; /* весь «гибкий» остаток */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem; /* отступ вместо margin-top */
  box-sizing: border-box;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin: 4rem 0 1rem;
  color: ${({ theme }) => theme.colors.secondary};
  @media (max-width: 909px) {
    font-size: 2.2rem;
  }
  @media (max-width: 780px) {
    font-size: 2rem;
  }
  @media (max-width: 500px) {
    font-size: 1.8rem;
  }
  @media (max-width: 440px) {
    font-size: 1.5rem;
  }
  @media (max-width: 375px) {
    font-size: 1.1rem;
  }
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
  font-size: 4rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondary};
  ${({ side }) =>
    side === "left" ? "left: calc(50% - 190px);" : "right: calc(50% - 190px);"}
  z-index: 2;
  @media (max-width: 944px) {
    font-size: 3rem;
    ${({ side }) =>
      side === "left"
        ? "left: calc(50% - 165px);"
        : "right: calc(50% - 165px);"}
  }

  @media (max-width: 780px) {
    font-size: 2.4rem;
    ${({ side }) =>
      side === "left"
        ? "left: calc(50% - 140px);"
        : "right: calc(50% - 140px);"}
  }
  @media (max-width: 650px) {
    font-size: 1.9rem;
    ${({ side }) =>
      side === "left"
        ? "left: calc(50% - 125px);"
        : "right: calc(50% - 125px);"}
  }
  @media (max-width: 600px) {
    font-size: 1.9rem;
    ${({ side }) =>
      side === "left"
        ? "left: calc(50% - 100px);"
        : "right: calc(50% - 100px);"}
  }
  @media (max-width: 500px) {
    font-size: 1.9rem;
    ${({ side }) =>
      side === "left"
        ? "left: calc(50% - 76px);"
        : "right: calc(50% - 76px);"}
  }
`;

const Slides = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 3rem;
  min-height: 300px;
  @media (max-width: 909px) {
    gap: 2rem;
    min-height: 240px;
  }

  @media (max-width: 600px) {
    gap: 1.2rem;
    min-height: 180px;
  }
`;

const Slide = styled.div<{ isCenter: boolean }>`
  flex: 0 0 auto;
  width: ${({ isCenter }) => (isCenter ? "300px" : "250px")};
  height: ${({ isCenter }) => (isCenter ? "300px" : "250px")};
  position: relative;
  opacity: ${({ isCenter }) => (isCenter ? 1 : 0.6)};
  transition: width 0.4s ease, height 0.4s ease, opacity 0.4s ease;

  @media (max-width: 944px) {
    width: ${({ isCenter }) => (isCenter ? "260px" : "200px")};
    height: ${({ isCenter }) => (isCenter ? "300px" : "250px")};
  }

  @media (max-width: 780px) {
    width: ${({ isCenter }) => (isCenter ? "220px" : "160px")};
    height: ${({ isCenter }) => (isCenter ? "300px" : "250px")};
  }
  @media (max-width: 650px) {
    width: ${({ isCenter }) => (isCenter ? "200px" : "140px")};
    height: ${({ isCenter }) => (isCenter ? "280px" : "230px")};
  }
  @media (max-width: 600px) {
    width: ${({ isCenter }) => (isCenter ? "160px" : "130px")};
    height: ${({ isCenter }) => (isCenter ? "250px" : "200px")};
  }
  @media (max-width: 500px) {
    width: ${({ isCenter }) => (isCenter ? "110px" : "90px")};
    height: ${({ isCenter }) => (isCenter ? "250px" : "200px")};
  }
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
  background: rgba(0, 0, 0, ${({ isCenter }) => (isCenter ? 0.4 : 0.6)});
  color: #fff;
  text-align: center;
  font-size: ${({ isCenter }) => (isCenter ? "1.1rem" : "0.9rem")};
  border-radius: 0 0 8px 8px;
  padding: 0.5rem;
  transition: background 0.4s ease, font-size 0.4s ease;

  & > p {
    margin: 0.25rem 0 0;
  }
  @media (max-width: 909px) {
    font-size: ${({ isCenter }) => (isCenter ? "1rem" : "0.8rem")};
  }

  @media (max-width: 600px) {
    font-size: ${({ isCenter }) => (isCenter ? "0.9rem" : "0.7rem")};
  }
`;

const CallSection = styled.div`
  position: relative;
  flex: 0 0 35vh;
  background: url("/call_us.jpg") center/cover no-repeat;
  border-radius: 10% 10% 0 0;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(24, 24, 31, 0.7);
    border-radius: 10% 10% 0 0;
  }
  @media (max-width: 414px) {
    flex: 0 0 46vh;
  }
`;

const CallContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const CallText = styled.p`
  font-size: 2.3rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
  @media (max-width: 909px) {
    font-size: 2rem;
  }
  @media (max-width: 780px) {
    font-size: 1.7rem;
  }
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
  @media (max-width: 410px) {
    font-size: 1.05rem;
  }
  @media (max-width: 375px) {
    font-size: 0.96rem;
  }
`;

const CallSubText = styled.p`
  font-size: 1.5rem;
  margin: 0.5rem 0 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.buttons};
  @media (max-width: 909px) {
    font-size: 1.3rem;
  }
  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
  @media (max-width: 500px) {
    font-size: 0.9rem;
  }
`;

const Phone = styled.h3`
  font-size: 2rem;
  margin: 1rem 0 0;
  @media (max-width: 909px) {
    font-size: 1.8rem;
  }
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

// ====== КОМПОНЕНТ ======

export const CallAndTeamSlider: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { team } = useSelector((state: RootState) => state.team);
  const [index, setIndex] = useState(0);

  // Загружаем команду
  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  // Сбрасываем индекс, если команда обновилась
  useEffect(() => {
    if (team.length && index >= team.length) {
      setIndex(0);
    }
  }, [team.length, index]);

  // Пока не загрузилось — показываем заглушку
  if (team.length === 0) {
    return <Wrapper>Загрузка...</Wrapper>;
  }

  const count = team.length;
  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  const leftIdx = (index - 1 + count) % count;
  const rightIdx = (index + 1) % count;
  const visible = [leftIdx, index, rightIdx];

  const phone = "+7 937 464-61-88";

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
              const member = team[idx];
              return (
                <Slide key={member.id || idx} isCenter={isCenter}>
                  <SlideImage
                    src={`${API}/${member.image}`}
                    alt={member.name}
                  />
                  <NameOverlay isCenter={isCenter}>
                    <div>{member.name}</div>
                    <p>{member.position}</p>
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
        <CallContent>
          <CallText>Хотите обсудить ваш случай в деталях?</CallText>
          <CallSubText>Позвоните нам — наши юристы помогут вам.</CallSubText>
          <Phone>{phone}</Phone>
        </CallContent>
      </CallSection>
    </Wrapper>
  );
};

export default CallAndTeamSlider;

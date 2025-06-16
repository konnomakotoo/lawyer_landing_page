import React from "react";
import styled, { keyframes } from "styled-components";

// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const SectionWrapper = styled.section`
  width: 100%;
  background: url("/projects-bg.jpg") center/cover no-repeat;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.textOnPrimary || "#fff"};
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
  @media (max-width: 375px) {
    font-size: 1.5rem;
  }
`;

const ProjectsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  @media (max-width: 375px) {
    gap: 0.3rem;
  }
`;

interface ProjectCardProps {
  img: string;
  delay: number;
}

const ProjectCard = styled.div<ProjectCardProps>`
  position: relative;
  height: 300px;
  background: url(${(props) => props.img}) center/cover no-repeat;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  opacity: 0;
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${(props) => props.delay}s;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 992px) {
    height: 250px;
    padding: 0.8rem;
  }
  @media (max-width: 768px) {
    height: 200px;
    padding: 0.6rem;
  }
  @media (max-width: 480px) {
    height: 180px;
    padding: 0.5rem;
  }
  @media (max-width: 375px) {
    height: 150px;
    padding: 0.4rem;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const ProjectTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.25rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  @media (max-width: 480px) {
    font-size: 1rem;
  }
  @media (max-width: 375px) {
    font-size: 0.9rem;
  }
`;

const ProjectDesc = styled.p`
  margin: 0 0 1rem;
  font-size: 0.95rem;
  line-height: 1.3;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MoreButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textOnPrimary || "#fff"};
  background-color: ${({ theme }) => theme.colors.buttons || "#007acc"};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary || "#005fa3"};
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.3rem 0.7rem;
  }
  @media (max-width: 375px) {
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
  }
`;

const projects = [
  {
    title: "Проект А",
    img: "/project1.jpg",
    desc: "Краткое описание проекта А: его цели, результаты и ключевые достижения.",
  },
  {
    title: "Проект Б",
    img: "/project2.jpg",
    desc: "Краткое описание проекта Б: задачи, которые решались, и эффект от внедрения.",
  },
  {
    title: "Проект В",
    img: "/project3.jpg",
    desc: "Краткое описание проекта В: специфика, отраслевой контекст, выгоды клиента.",
  },
  {
    title: "Проект Г",
    img: "/project4.jpg",
    desc: "Краткое описание проекта Г: вызовы, решения и итоговые показатели эффективности.",
  },
];

const RecentProjects: React.FC = () => (
  <SectionWrapper>
    <Title>Наши проекты.</Title>
    <ProjectsGrid>
      {projects.map((p, i) => (
        <ProjectCard key={i} img={p.img} delay={0.3 + i * 0.2}>
          <Content>
            <ProjectTitle>{p.title}</ProjectTitle>
            <ProjectDesc>{p.desc}</ProjectDesc>
            <MoreButton>Подробнее</MoreButton>
          </Content>
        </ProjectCard>
      ))}
    </ProjectsGrid>
  </SectionWrapper>
);

export default RecentProjects;

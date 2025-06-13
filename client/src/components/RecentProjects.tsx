import React from "react";
import styled, { keyframes } from "styled-components";

// Simple fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const SectionWrapper = styled.section`
  padding: 4rem 2rem;
  background: #fff;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

const ProjectsGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const ProjectCard = styled.div<{ delay: number }>`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease-out ${(props) => props.delay}s forwards;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const ProjectText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text || "#333"};
  margin: 0 0 1rem;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.primary || "#007acc"};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary || "#005fa3"};
  }
`;

// Dummy data
const projects = [
  { title: "Проект А", img: "/project1.jpg" },
  { title: "Проект Б", img: "/project2.jpg" },
  { title: "Проект В", img: "/project3.jpg" },
];

const RecentProjects: React.FC = () => {
  return (
    <SectionWrapper>
      <Title>Наши недавние проекты</Title>
      <ProjectsGrid>
        {projects.map((project, idx) => (
          <ProjectCard key={idx} delay={0.3 + idx * 0.2}>
            <ProjectImage src={project.img} alt={project.title} />
            <ProjectText>{project.title}</ProjectText>
            <ArrowButton aria-label={`Подробнее о ${project.title}`}>
              стрелка
            </ArrowButton>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </SectionWrapper>
  );
};

export default RecentProjects;

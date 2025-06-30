import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import type { AppDispatch, RootState } from "../redux/store/redux.store";
import { fetchCategories, type Project } from "../redux/slices/categoriesSlice";

// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const SectionWrapper = styled.section`
  width: 100%;
  padding: ${({ theme }) => theme.space.lg};
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.space.lg};
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
  @media (max-width: 780px) {
    font-size: 2rem;
  }
  @media (max-width: 600px) {
    font-size: 2rem;
  }
  @media (max-width: 432px) {
    font-size: 1.5rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 550px;

  @media (max-width: 1024px) {
    height: 300px;
  }
  @media (max-width: 600px) {
    height: 150px;
  }
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.6s ease-out forwards;
`;

const MediaContainer = styled.div<{ image?: string }>`
  position: relative;
  flex: 1;
  background: ${({ image }) =>
    image ? `url(${image}) center/cover no-repeat` : "transparent"};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ image }) => (image ? "rgba(0,0,0,0.4)" : "none")};
  }
`;

const VideoWrapper = styled.div`
  position: absolute;
  inset: 0;
`;

const VideoIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const InfoBlock = styled.div`
  background: ${({ theme }) => theme.colors.block};
  /* фиксированная высота секции под название+кнопку */
  height: 150px;
  padding: ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* заголовок сверху, кнопка снизу */
  align-items: center;
  text-align: center;

  @media (max-width: 1024px) {
    height: 120px;
  }
  @media (max-width: 600px) {
    height: 100px;
    padding: ${({ theme }) => theme.space.sm};
  }
`;

const ProjectTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.secondary};

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const MoreButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textOnPrimary};
  background-color: ${({ theme }) => theme.colors.buttons};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const Loading = styled.div`
  padding: ${({ theme }) => theme.space.lg};
  text-align: center;
`;
const Error = styled.div`
  padding: ${({ theme }) => theme.space.lg};
  color: red;
  text-align: center;
`;

export default function RecentProjects() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, isLoading, error } = useSelector(
    (s: RootState) => s.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoading) return <Loading>Загрузка...</Loading>;
  if (error) return <Error>Ошибка: {error}</Error>;

  const all: Project[] = categories.flatMap((cat) => cat.categories);
  const last4 = all.slice(-4);

  return (
    <SectionWrapper>
      <Title>Наши проекты</Title>
      <ProjectsGrid>
        {last4.map((p, i) => {
          const hasVideo = Boolean(p.urlVideo);
          return (
            <CardWrapper
              key={p.id}
              style={{ animationDelay: `${0.3 + i * 0.2}s` }}
            >
              <MediaContainer image={hasVideo ? undefined : p.urlImage!}>
                {hasVideo && (
                  <VideoWrapper>
                    <VideoIframe
                      src={p.urlVideo!}
                      title={p.title}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </VideoWrapper>
                )}
              </MediaContainer>
              <InfoBlock>
                <ProjectTitle>{p.title}</ProjectTitle>
                <MoreButton>Подробнее</MoreButton>
              </InfoBlock>
            </CardWrapper>
          );
        })}
      </ProjectsGrid>
    </SectionWrapper>
  );
}

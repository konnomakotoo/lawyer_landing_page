import { useState } from 'react';
import styled from 'styled-components';

export type Project = {
  id: string;
  category: 'metro' | 'advokatology';
  title: string;
  description: string;
  date: string;
  mediaType: 'video' | 'image';
  mediaUrl?: string;   // для картинок
  videoId?: string;    // для YouTube
};

const projects: Project[] = [
  {
    id: '1',
    category: 'metro',
    title: 'Беседа в метро #1',
    description: 'Интервью с адвокатом о правах пассажиров.',
    date: '15.05.2024',
    mediaType: 'video',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    id: '2',
    category: 'metro',
    title: 'Беседа в метро #2',
    description: 'Разбор типичных споров в подземке.',
    date: '22.06.2024',
    mediaType: 'image',
    mediaUrl: '/images/metro-case.jpg',
  },
  {
    id: '3',
    category: 'advokatology',
    title: 'Адвокатология: выпуск 1',
    description: 'Научный взгляд на адвокатскую практику.',
    date: '01.07.2024',
    mediaType: 'video',
    videoId: '9bZkp7q19f0',
  },
  {
    id: '4',
    category: 'advokatology',
    title: 'Адвокатология: выпуск 2',
    description: 'Этика и особенности профессии.',
    date: '12.08.2024',
    mediaType: 'image',
    mediaUrl: '/images/advocatology.jpg',
  },
];

const categories = [
  { label: 'Все проекты', value: 'all' },
  { label: 'Беседа в метро', value: 'metro' },
  { label: 'Адвокатология', value: 'advokatology' },
] as const;

export default function Projects() {
  const [filter, setFilter] = useState<typeof categories[number]['value']>('all');

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <Container>
      <Filters>
        {categories.map(cat => (
          <FilterButton
            key={cat.value}
            active={filter === cat.value}
            onClick={() => setFilter(cat.value)}
          >
            {cat.label}
          </FilterButton>
        ))}
      </Filters>

      <Grid>
        {filtered.map(p => (
          <Card key={p.id}>
            <Media>
              {p.mediaType === 'video' ? (
                <iframe
                  src={`https://www.youtube.com/embed/${p.videoId}`}
                  title={p.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img src={p.mediaUrl} alt={p.title} />
              )}
            </Media>
            <Content>
              <Title>{p.title}</Title>
              <Desc>{p.description}</Desc>
              <DateText>{p.date}</DateText>
            </Content>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

// ========== styled-components ==========

const Container = styled.section`
  padding: ${({ theme }) => theme.space.lg};
`;

const Filters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  background: ${({ active, theme }) =>
    active ? theme.colors.secondary : theme.colors.backgroundAlt};
  color: ${({ active, theme }) =>
    active ? theme.colors.textOnPrimary : theme.colors.text};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space.md};

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow:
    0 2px 4px rgba(0,0,0,0.05),
    0 4px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
`;

const Media = styled.div`
  width: 100%;
  height: 0;
  padding-top: 56.25%; /* 16:9 */
  position: relative;
  overflow: hidden;
  background: #000;

  iframe, img {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.space.md};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0 0 ${({ theme }) => theme.space.sm} 0;
`;

const Desc = styled.p`
  flex: 1;
  margin: 0 0 ${({ theme }) => theme.space.sm} 0;
  color: ${({ theme }) => theme.colors.secondary};
`;

const DateText = styled.time`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: right;
`;


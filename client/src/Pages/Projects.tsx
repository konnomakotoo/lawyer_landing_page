import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import type { AppDispatch, RootState } from '../redux/store/redux.store';
import { fetchCategories, type Project } from '../redux/slices/categoriesSlice';

export default function Projects() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, isLoading, error } = useSelector((s: RootState) => s.categories);
  const [filter, setFilter] = useState<number | 'all'>('all');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoading) return <Loading>Загрузка...</Loading>;
  if (error)     return <Error>Ошибка: {error}</Error>;

  // Собираем список проектов в зависимости от фильтра
  const projectsToShow: Project[] =
    filter === 'all'
      ? categories.flatMap(cat => cat.categories)
      : (categories.find(cat => cat.id === filter)?.categories ?? []);

  return (
    <Container>
      <Filters>
        <FilterButton
          active={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          Все проекты
        </FilterButton>
        {categories.map(cat => (
          <FilterButton
            key={cat.id}
            active={filter === cat.id}
            onClick={() => setFilter(cat.id)}
          >
            {cat.title}
          </FilterButton>
        ))}
      </Filters>

      <List>
        {projectsToShow.map(p => (
          <Card key={p.id}>
            <Media>
              {p.urlVideo ? (
                <iframe
                  src={p.urlVideo}
                  title={p.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img src={p.urlImage!} alt={p.title} />
              )}
            </Media>
            <Info>
              <Title>{p.title}</Title>
              <Desc>{p.description}</Desc>
              <DateText>{p.data}</DateText>
            </Info>
          </Card>
        ))}
      </List>
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
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.space.md};
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

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`;

const Card = styled.article`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow:
    0 2px 4px rgba(0,0,0,0.05),
    0 4px 8px rgba(0,0,0,0.05);

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Media = styled.div`
  flex: none;
  width: 200px;
  height: 120px;
  position: relative;
  background: #000;

  iframe, img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 180px;
  }
`;

const Info = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0 0 ${({ theme }) => theme.space.sm} 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Desc = styled.p`
  flex: 1;
  margin: 0 0 ${({ theme }) => theme.space.sm} 0;
  color: ${({ theme }) => theme.colors.secondary};
`;

const DateText = styled.time`
  align-self: flex-end;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
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
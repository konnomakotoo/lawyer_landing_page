// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import styled from 'styled-components';
// import { type AppDispatch, type RootState } from '../redux/store/redux.store';
// import { fetchTeam } from '../redux/slices/teamSlice';

// const Section = styled.section`
//   padding: 3rem 2rem;
//   background-color: ${({ theme }) => theme.colors.backgroundAlt || 'hsl(200, 20%, 95%)'};
// `;

// const Title = styled.h2`
//   font-size: 1.5rem;
//   color: ${({ theme }) => theme.colors.primary || '#0C253F'};
//   margin-bottom: 1.5rem;
//   text-align: center;
// `;

// const ScrollContainer = styled.div`
//   display: flex;
//   overflow-x: auto;
//   gap: 1.5rem;
//   padding-bottom: 0.5rem;
//   scroll-snap-type: x mandatory;

//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

// const Member = styled.div`
//   flex: 0 0 auto;
//   text-align: center;
//   scroll-snap-align: start;
// `;

// const Avatar = styled.img`
//   width: 96px;
//   height: 96px;
//   border-radius: 50%;
//   object-fit: cover;
//   margin-bottom: 0.5rem;
//   border: 2px solid ${({ theme }) => theme.colors.primary || '#0C253F'};
// `;

// const Name = styled.div`
//   font-weight: 600;
//   font-size: 0.95rem;
//   color: ${({ theme }) => theme.colors.text || '#222'};
// `;

// const Role = styled.small`
//   font-size: 0.8rem;
//   color: ${({ theme }) => theme.colors.secondary || '#666'};
// `;

// const TeamStrip: React.FC = () => {
//     const { team } = useSelector((state: RootState) => state.team)
//     const dispatch = useDispatch<AppDispatch>()

//     useEffect(() => {
//         dispatch(fetchTeam())
//     }, [])

//     return (
//     <Section>
//         <Title>Наша команда</Title>
//         <ScrollContainer>
//         {team.map((person) => (
//             <Member key={person.id}>
//             <Avatar src={person?.image} alt={person?.name} />
//             <Name>{person?.name} {person?.lastName}</Name>
//             <Role>{person?.position}</Role>
//             </Member>
//         ))}
//         </ScrollContainer>
//     </Section>
//     )
// };

// export default TeamStrip;


// src/components/TeamStrip.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { type AppDispatch, type RootState } from '../redux/store/redux.store';
import { fetchTeam } from '../redux/slices/teamSlice';

const Section = styled.section`
  padding: 3rem 2rem;
  background-color: ${({ theme }) => theme.colors.backgroundAlt || 'hsl(200, 20%, 95%)'};
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary || '#0C253F'};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LeftPanel = styled.div`
  flex: none;
  width: 260px;
  height: 300px;  /* Показываем ровно три карточки */
  overflow-y: auto;
  scrollbar-gutter: stable both-edges;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.2);
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 260px;
    height: auto;
    max-height: 300px;
  }
`;

const MemberCard = styled.button<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: white;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;

  ${({ selected, theme }) =>
    selected
      ? css`
          background: ${theme.colors.primary || '#0C253F'};
          color: #fff;
          border-color: ${theme.colors.primary || '#75B1CE'};
        `
      : css`
          &:hover {
            background: ${theme.colors.primary || '#75B1CE'};
            color: #fff;
          }
        `}
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.primary || '#0C253F'};
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
`;

const RightPanel = styled.div`
  flex: none;
  width: 400px;
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    width: 100%;
    max-width: 400px;
    margin-top: 1.5rem;
  }
`;

const Role = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary || '#0C253F'};
  margin-bottom: 0.75rem;
`;

const Spec = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary || '#666'};
  margin-bottom: 1.25rem;
  line-height: 1.4;
`;

const MoreButton = styled(Link)`
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background: ${({ theme }) => theme.colors.primary || '#0C253F'};
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary || '#75B1CE'};
  }
`;

const TeamStrip: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const team = useSelector((state: RootState) => state.team.team);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  useEffect(() => {
    if (team.length > 0 && selectedId === null) {
      setSelectedId(team[0]?.id);
    }
  }, [team, selectedId]);

  const selected = team.find(p => p.id === selectedId);

  return (
    <Section>
      <Title>Наша команда</Title>
      <Container>
        <LeftPanel>
          {team.map(person => (
            <MemberCard
              key={person.id}
              selected={person?.id == selectedId}
              onClick={() => setSelectedId(person?.id)}
            >
              <Avatar
                src={person.image}
                alt={`${person.name} ${person.lastName}`}
                />
              <Name>{person.name} {person.lastName}</Name>
            </MemberCard>
          ))}
        </LeftPanel>

        <RightPanel>
          {selected ? (
            <>
              <Role>{selected.position}</Role>
              <Spec>{selected.specialization || 'Специализация не указана'}</Spec>
              <MoreButton to={`/team/${selected.id}`}>Подробнее</MoreButton>
            </>
          ) : (
            <div>Загрузка...</div>
          )}
        </RightPanel>
      </Container>
    </Section>
  );
};

export default TeamStrip;
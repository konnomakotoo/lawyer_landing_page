// src/components/LawyersDirectory.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

interface Lawyer {
  id: number;
  name: string;
  field: string;
  photo: string;
}

const lawyersData: Lawyer[] = [
  { id: 1, name: 'Иван Иванов', field: 'Гражданское право', photo: '/photos/ivan.jpg' },
  { id: 2, name: 'Мария Петрова', field: 'Семейное право', photo: '/photos/maria.jpg' },
  { id: 3, name: 'Сергей Сидоров', field: 'Уголовное право', photo: '/photos/sergey.jpg' },
  { id: 4, name: 'Елена Кузнецова', field: 'Наследственное право', photo: '/photos/elena.jpg' },
  { id: 5, name: 'Дмитрий Орлов', field: 'Трудовое право', photo: '/photos/dmitry.jpg' },
  { id: 6, name: 'Анна Смирнова', field: 'Административное право', photo: '/photos/anna.jpg' },
];

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.space.lg};
`;

const Controls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.lg};

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.space.sm};
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.space.sm};
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space.lg};

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Info = styled.div`
  padding: ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;

const Name = styled.h3`
  margin: 0;
  font-size: 1.125rem;
`;

const Field = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.95rem;
`;

const ContactButton = styled.button`
  margin-top: auto;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  background: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export default function Team() {
  const [search, setSearch] = useState('');
  const [filterField, setFilterField] = useState('');

  const fields = Array.from(new Set(lawyersData.map(l => l.field)));

  const filteredLawyers = lawyersData.filter(lawyer => {
    const matchesName = lawyer.name.toLowerCase().includes(search.toLowerCase());
    const matchesField = filterField ? lawyer.field === filterField : true;
    return matchesName && matchesField;
  });

  return (
    <Wrapper>
      <Controls>
        <SearchInput
          type="text"
          placeholder="Поиск по имени..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Select value={filterField} onChange={e => setFilterField(e.target.value)}>
          <option value="">Все области</option>
          {fields.map(field => (
            <option key={field} value={field}>{field}</option>
          ))}
        </Select>
      </Controls>

      <Grid>
        {filteredLawyers.map(lawyer => (
          <Card key={lawyer.id}>
            <Photo src={lawyer.photo} alt={lawyer.name} />
            <Info>
              <Name>{lawyer.name}</Name>
              <Field>{lawyer.field}</Field>
              <ContactButton>Связаться</ContactButton>
            </Info>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
}





import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import type { AppDispatch, RootState } from "../redux/store/redux.store";
import { fetchTeam } from "../redux/slices/teamSlice";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

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

const FilterSelect = styled.select`
  padding: ${({ theme }) => theme.space.sm};
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space.lg};

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  & > div:last-child img {
    object-position: center center;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  object-position: top center;
`;

const Info = styled.div`
  flex: 1;
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

const ButtonTeam = styled.button`
  margin-top: auto;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  background: ${({ theme }) => theme.colors.buttons};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.2s ease, transform 0.2s ease;
  font-size: 0.95rem;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const areaOptions = [
  "",
  "Гражданское право",
  "Налоговое право",
  "Уголовное право",
  "Корпоративное право",
];

export default function Team() {
  const dispatch = useDispatch<AppDispatch>();
  const { team } = useSelector((state: RootState) => state.team);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterArea, setFilterArea] = useState("");

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  const filtered = team.filter((l) => {
    const fullName = `${l.name} ${l.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(search.toLowerCase());
    const matchesArea = filterArea ? l.area === filterArea : true;
    return matchesSearch && matchesArea;
  });

  const handleCardClick = (id: number) => {
    navigate(`/team/${id}`);
  };

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();
    navigate(`/team/${id}`);
  };

  return (
    <Wrapper>
      <Controls>
        <SearchInput
          type="text"
          placeholder="Поиск по имени или фамилии..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FilterSelect
          value={filterArea}
          onChange={(e) => setFilterArea(e.target.value)}
        >
          {areaOptions.map((area) => (
            <option key={area} value={area}>
              {area || "Все области"}
            </option>
          ))}
        </FilterSelect>
      </Controls>

      <GridWrapper>
        {filtered.map((lawyer) => (
          <Card key={lawyer.id} onClick={() => handleCardClick(lawyer.id)}>
            <Photo
              src={`${API}/${lawyer.image}`}
              alt={`${lawyer.name} ${lawyer.lastName}`}
            />
            <Info>
              <Name>
                {lawyer.name} {lawyer.lastName}
              </Name>
              <Field>{lawyer.position}</Field>
              <Field>
                <strong>Область:</strong> {lawyer.area}
              </Field>
              <ButtonTeam onClick={(e) => handleButtonClick(e, lawyer.id)}>
                Подробнее
              </ButtonTeam>
            </Info>
          </Card>
        ))}
      </GridWrapper>
    </Wrapper>
  );
}

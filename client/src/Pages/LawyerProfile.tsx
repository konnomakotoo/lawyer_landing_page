// LawyerProfile.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import $api from '../services/axios.instance';
import type { Lawyer } from '../redux/slices/teamSlice';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space.lg};
`;

const BackButton = styled.button`
  margin-bottom: ${({ theme }) => theme.space.md};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

const Photo = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  display: block;
  margin: 0 auto ${({ theme }) => theme.space.lg};
`;

// новая секция с personal data
const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAlt || '#f5f5f5'};
  padding: ${({ theme }) => theme.space.md};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const InfoItem = styled.div`
  display: flex;
  & + & {
    margin-top: ${({ theme }) => theme.space.sm};
  }
`;

const Label = styled.span`
  font-weight: bold;
  width: 100px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Value = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.colors.primary};
`;

const Para = styled.p`
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.colors.text};
`;

export function LawyerProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);

  useEffect(() => {
    async function getLawyerProfile() {
      const { data } = await $api.get<Lawyer>(`/team/${id}`);
      setLawyer(data);
    }
    getLawyerProfile();
  }, [id]);

  function renderParagraphs(text?: string) {
    if (!text) return null;
    return text
      .split(/\n{1,}/)            // разделяем по одному или более переносам
      .map((block, i) => (
        <Para key={i}>{block.trim()}</Para>
      ));
  }

  return (
    <Container>
      <BackButton onClick={() => navigate('/team')}>
        ← Назад к команде
      </BackButton>

      <Photo src={lawyer?.image} alt={`${lawyer?.name} ${lawyer?.lastName}`} />

      <InfoCard>
        <InfoItem>
          <Label>Имя:</Label>
          <Value>{lawyer?.name} {lawyer?.lastName}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Телефон:</Label>
          <Value>{lawyer?.phoneNumber}</Value>
        </InfoItem>
        <InfoItem>
          <Label>E-mail:</Label>
          <Value>{lawyer?.email}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Адрес:</Label>
          <Value>{lawyer?.address}</Value>
        </InfoItem>
      </InfoCard>

      <Section>
        <SectionTitle>Образование</SectionTitle>
        {renderParagraphs(lawyer?.education)}
      </Section>

      <Section>
        <SectionTitle>Опыт</SectionTitle>
        {renderParagraphs(lawyer?.experience)}
      </Section>
    </Container>
  );
}

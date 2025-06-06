import React from 'react';
import styled from 'styled-components';
import { services } from '../data/services';

const Section = styled.section`
  padding: 3rem 2rem;
  margin-top: 60px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
  margin-right: 1.25rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary || '#0C253F'};
`;

const ServiceCardsGrid: React.FC = () => {
  return (
    <Section>
      <Grid>
        {services.map((svc) => (
          <Card key={svc.id}>
            <Image src={svc.image} alt={svc.title} />
            <Title>{svc.title}</Title>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default ServiceCardsGrid;
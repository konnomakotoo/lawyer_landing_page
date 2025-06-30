import React, { useState, type FormEvent } from "react";
import styled, { keyframes } from "styled-components";
import { services, type Service } from "../data/services";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
`;

const ServicesSection = styled.section`
  padding: ${({ theme }) => theme.space.lg};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space.md};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    animation: ${float} 2.5s ease-in-out infinite;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  object-position: center;
  display: block;
  background-color: #f0f0f0;
`;

const Title = styled.h3`
  margin: ${({ theme }) => `${theme.space.sm} 0 0 0`};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
  padding: 0rem 1rem;
`;

const Description = styled.p`
  margin: ${({ theme }) => `0 0 ${theme.space.md} 0`};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  font-size: 1rem;
  padding: .5rem;
`;

const OrderButton = styled.button`
  margin-top: auto;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  background: ${({ theme }) => theme.colors.buttons};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s ease;
  margin: 0rem 1rem 1rem 1rem;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: ${({ theme }) => theme.space.lg};
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
`;

const FormField = styled.div`
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.space.sm};
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.space.sm};
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const ServiceCard: React.FC<{
  svc: Service;
  onOrder: (svc: Service) => void;
}> = ({ svc, onOrder }) => (
  <Card>
    <Image src={svc.image} alt={svc.title} loading="lazy" />
    <Title>{svc.title}</Title>
    <Description>{svc.description}</Description>
    <OrderButton onClick={() => onOrder(svc)}>Заказать</OrderButton>
  </Card>
);

const Services: React.FC = () => {
  const [selected, setSelected] = useState<Service | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleOrder = (svc: Service) => setSelected(svc);
  const closeModal = () => setSelected(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Обработка формы (API запрос и т.д.)
    alert(`Спасибо, ${name}! Мы свяжемся по ${email}`);
    setName("");
    setEmail("");
    setMessage("");
    closeModal();
  };

  return (
    <ServicesSection>
      <Grid>
        {services.map((svc, idx) => (
          <ServiceCard
            key={`${svc.title}-${idx}`}
            svc={svc}
            onOrder={handleOrder}
          />
        ))}
      </Grid>

      {selected && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <h3>Заказ услуги: {selected.title}</h3>
            <form onSubmit={handleSubmit}>
              <FormField>
                <Label>Имя</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormField>
              <FormField>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormField>
              <FormField>
                <Label>Комментарий</Label>
                <TextArea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </FormField>
              <SubmitButton type="submit">Отправить</SubmitButton>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </ServicesSection>
  );
};

export default Services;

import React from 'react';
import styled from 'styled-components';

const ParallaxSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;           /* теперь блок на весь экран */
  min-height: 600px;       /* минимум, если экран очень маленький */
  background-image: url('/law.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2rem;

  @media (max-width: 768px) {
    background-attachment: scroll;
    justify-content: center;
    padding: 3rem 1rem;
  }
`;

const FormContainer = styled.form`
  background: rgba(255, 255, 255, 0.95);
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Heading = styled.h3`
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors.primary || '#0C253F'};
  text-align: center;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary || '#75B1CE'};
  }
`;

const Textarea = styled.textarea`
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
  min-height: 100px;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary || '#75B1CE'};
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1rem;
  font-size: 1.05rem;
  background: ${({ theme }) => theme.colors.primary || '#0C253F'};
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary || '#75B1CE'};
  }
`;

const ParallaxContactSection: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    // здесь можно отправить данные на сервер
    alert('Заявка успешно отправлена!');
  };

  return (
    <ParallaxSection>
      <FormContainer onSubmit={handleSubmit}>
        <Heading>Оставьте заявку</Heading>
        <Input type="text" name="name" placeholder="Ваше имя" required />
        <Input type="tel" name="phone" placeholder="Номер телефона" required />
        <Textarea name="comment" placeholder="Комментарий (необязательно)" />
        <SubmitButton type="submit">Отправить заявку</SubmitButton>
      </FormContainer>
    </ParallaxSection>
  );
};

export default ParallaxContactSection;
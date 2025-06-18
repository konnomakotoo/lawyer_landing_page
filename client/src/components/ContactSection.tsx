import React from "react";
import styled, { keyframes } from "styled-components";
import Footer from "./Footer"; // <-- подключаем твой компонент футера

// Анимации
const slideInDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const slideInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const ParallaxSection = styled.section`
  position: relative;
  width: 100%;
  height: 70vh;
  background: url("/contact_us.jpg") center/cover fixed;

  @media (max-width: 1024px) {
    height: 60vh;
  }
  @media (max-width: 768px) {
    height: 50vh;
  }
`;

const ParallaxOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(24, 24, 31, 0.7);
`;

const LeftContent = styled.div`
  position: absolute;
  top: 25%;
  left: 5%;
  max-width: 480px;
  padding: 0 1rem;
  color: #fff;
  animation: ${slideInDown} 0.8s ease-out;

  h2 {
    font-size: 2.25rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1rem;
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    top: 10%;
    h2 {
      font-size: 2rem;
    }
    p {
      font-size: 0.95rem;
    }
  }
`;

const FormContainer = styled.form`
  position: absolute;
  top: 18%;
  right: 10%;
  width: 40%;
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${slideInUp} 0.8s ease-out 0.2s;
  z-index: 2;

  h3 {
    margin: 0 0 1rem;
    font-size: 1.75rem;
    text-align: center;
    color: #0c253f;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    transition: border-color 0.2s, box-shadow 0.2s;
    &:focus {
      outline: none;
      border-color: #75b1ce;
      box-shadow: 0 0 0 3px rgba(117, 177, 206, 0.3);
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }

  button {
    margin-top: 0.5rem;
    padding: 0.75rem;
    font-size: 1.1rem;
    background: #e07a5f;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: #e07a5f;
    }
  }

  @media (max-width: 768px) {
    top: auto;
    bottom: 10%;
    right: 50%;
    transform: translateX(50%);
    width: 90%;
    padding: 1rem;
  }
`;

const ParallaxContactSection: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Заявка отправлена!");
  };

  return (
    <PageWrapper>
      <ParallaxSection>
        <ParallaxOverlay />
        <LeftContent>
          <h2>Хотите обсудить детали?</h2>
          <p>
            Оставьте нам свои контакты и кратко опишите ситуацию — мы перезвоним
            вам в течение часа с первичным предложением.
          </p>
        </LeftContent>
        <FormContainer onSubmit={handleSubmit}>
          <h3>Оставить заявку</h3>
          <input type="text" name="name" placeholder="Ваше имя" required />
          <input type="tel" name="phone" placeholder="Телефон" required />
          <textarea
            name="comment"
            placeholder="Коротко о вопросе (не обязательно)"
          />
          <button type="submit">Отправить заявку</button>
        </FormContainer>
      </ParallaxSection>

      {/* Футер */}
      <Footer />
    </PageWrapper>
  );
};

export default ParallaxContactSection;

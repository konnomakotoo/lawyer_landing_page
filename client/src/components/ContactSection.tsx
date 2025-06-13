import React from "react";
import styled, { keyframes } from "styled-components";

// Fade/slide animations
const slideInDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const slideInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// Wrapper: vertical split top parallax, bottom orange
const SectionWrapper = styled.div`
  position: relative;
  width: 100%;
`;

// Parallax background section
const ParallaxSection = styled.section`
  position: relative;
  width: 100%;
  height: 80vh;
  background-image: url("/law.jpg");
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

// Semi-transparent overlay on parallax only
const ParallaxOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.8;
`;

// Orange background bottom section
const OrangeSection = styled.section`
  width: 100%;
  height: 20vh;
  background-color: ${({ theme }) => theme.colors.buttons};
`;

// Content in parallax: heading and text
const LeftContent = styled.div`
  position: relative;
  top: 20%;
  left: 6%;
  padding: 4rem 2rem;
  z-index: 1;
  max-width: 600px;
  color: #fff;
  animation: ${slideInDown} 0.8s ease-out;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.1rem;
    line-height: 1.4;
  }
`;

// Form floats overlapping both sections
const FormContainer = styled.form`
  position: absolute;
  top: 20%; /* overlaps bottom of parallax and top of orange */
  right: -15%;
  transform: translateX(-50%);
  z-index: 2;
  background: rgba(255, 255, 255, 0.95);
  width: 100%;
  height: 70%;
  max-width: 600px;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  animation: ${slideInUp} 0.8s ease-out 0.2s;

  h3 {
    margin: 0 0 1rem;
    color: ${({ theme }) => theme.colors.primary || "#0C253F"};
    text-align: center;
  }
  input,
  textarea {
    margin-bottom: 1rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary || "#75B1CE"};
    }
  }
  textarea {
    resize: vertical;
    min-height: 100px;
  }
  button {
    padding: 0.75rem 1rem;
    font-size: 1.05rem;
    background: ${({ theme }) => theme.colors.primary || "#0C253F"};
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: ${({ theme }) => theme.colors.secondary || "#E07A5F"};
    }
  }
`;

const ParallaxContactSection: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Заявка успешно отправлена!");
  };

  return (
    <SectionWrapper>
      <ParallaxSection>
        <ParallaxOverlay />
        <LeftContent>
          <h2>Хотите обсудить детали?</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quia culpa necessitatibus repudiandae saepe harum voluptates quisquam esse velit earum iste asperiores unde, veniam quas? Dignissimos quod accusamus, accusantium inventore non autem est debitis eligendi, earum ullam, labore suscipit dolor similique excepturi. Dolor unde commodi architecto iste eaque harum optio.
          </p>
        </LeftContent>
      </ParallaxSection>
      <OrangeSection />
      <FormContainer onSubmit={handleSubmit}>
        <h3>Оставьте заявку</h3>
        <input type="text" name="name" placeholder="Ваше имя" required />
        <input type="tel" name="phone" placeholder="Номер телефона" required />
        <textarea name="comment" placeholder="Комментарий (необязательно)" />
        <button type="submit">Отправить заявку</button>
      </FormContainer>
    </SectionWrapper>
  );
};

export default ParallaxContactSection;

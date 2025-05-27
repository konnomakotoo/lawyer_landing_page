// src/components/AboutUsWave.tsx
import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

type SectionData = {
  id: string;
  title: string;
  text: string;
  image: string;
};

const aboutData: SectionData[] = [
  {
    id: 'intro',
    title: 'О нашем партнёрстве',
    text:
      'Партнёрство «Бакаев и Партнеры» объединяет адвокатов-профессионалов Москвы, Московской области и регионов России со стажем более 10 лет.',
    image: '/law.jpg',
  },
  {
    id: 'expertise',
    title: 'Наши специализации',
    text: `Мы оказываем полный спектр услуг:
1. Судебная защита бизнеса  
2. Налоговое консультирование  
3. Защита при проверках органов власти  
4. Сопровождение юридического отдела  
5. Личная защита владельцев и топ-менеджмента`,
    image: '/law.jpg',
  },
];

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-50px); }
  to   { opacity: 1; transform: translateX(0);    }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(50px); }
  to   { opacity: 1; transform: translateX(0);    }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

const Section = styled.section`
  padding: 4rem 1rem;
  background: ${({ theme }) => theme.colors.backgroundAlt || '#fafafa'};
`;

const Block = styled.div<{ visible: boolean; reverse: boolean }>`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  align-items: center;
  margin-bottom: 4rem;
  opacity: 0;

  ${({ visible, reverse }) =>
    visible &&
    css`
      animation: ${reverse ? slideInRight : slideInLeft} 0.8s ease-out forwards;
    `}

  @media (max-width: 768px) {
    flex-direction: column;

    ${({ visible }) =>
      visible &&
      css`
        animation: ${fadeInUp} 0.8s ease-out forwards;
      `}
  }
`;

const ImageWrapper = styled.div`
  flex: 1;

  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Title = styled.h3`
  margin: 0 0 1rem;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary || '#0C253F'};
`;

const Text = styled.p`
  margin: 0;
  white-space: pre-line;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text || '#333'};
`;

export const AboutUsWave: React.FC = () => {
  const [visible, setVisible] = useState<boolean[]>(
    aboutData.map(() => false)
  );
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = refs.current.findIndex(el => el === entry.target);
            if (idx !== -1 && !visible[idx]) {
              setVisible(v => {
                const copy = [...v];
                copy[idx] = true;
                return copy;
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    refs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [visible]);

  return (
    <Section>
      {aboutData.map((sec, idx) => (
        <Block
          key={sec.id}
          reverse={idx % 2 === 1}
          visible={visible[idx]}
          ref={el => {
            // колбэк должен возвращать void
            refs.current[idx] = el;
          }}
        >
          <ImageWrapper>
            <img src={sec.image} alt={sec.title} />
          </ImageWrapper>
          <Content>
            <Title>{sec.title}</Title>
            <Text>{sec.text}</Text>
          </Content>
        </Block>
      ))}
    </Section>
  );
};
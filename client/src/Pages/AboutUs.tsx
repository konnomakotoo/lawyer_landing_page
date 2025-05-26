// AboutUs.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

const Container = styled.section`
  position: relative;
  width: 100%;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundAlt || '#f9f9f9'};
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
  @media (max-width: 480px) {
    padding: 2rem 1rem;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const AnimateMe = styled.div`
  font-size: 1.125rem;
  line-height: 1.6;
  max-width: 800px;
  text-align: center;
  opacity: 0; /* появится через GSAP */
  perspective: 500px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const SrOnly = styled.p`
  &:not(:focus):not(:active) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

const Counters = styled.div`
  display: flex;
  gap: 2rem;
  margin: 3rem 0;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const CounterBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CounterNumber = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const CounterLabel = styled.span`
  margin-top: 0.25rem;
  font-size: 1rem;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const InfoText = styled.p`
  max-width: 700px;
  text-align: center;
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 2rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animateRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);

  // Сделаем все четыре счётчика рефами, которые могут быть null
  const attorneysRef = useRef<HTMLSpanElement | null>(null);
  const casesRef     = useRef<HTMLSpanElement | null>(null);
  const citiesRef    = useRef<HTMLSpanElement | null>(null);
  const clientsRef   = useRef<HTMLSpanElement | null>(null);

  const TARGETS = {
    attorneys: 50,
    cases:     200,
    cities:    15,
    clients:   1000,
  };

  useEffect(() => {
    const runAnimation = () => {
      if (!containerRef.current || !animateRef.current) return;

      gsap.set(containerRef.current, { opacity: 1 });

      splitRef.current = new SplitText(animateRef.current, {
        type: 'words',
        wordsClass: 'split-word',
      });

      gsap.from(splitRef.current.words, {
        opacity: 0,
        y: 50,
        rotationX: 90,
        duration: 1.2,
        ease: 'sine.out',
        stagger: 0.1,
      });

      // Обновлённая сигнатура: реф может быть null
      const animateNumber = (
        ref: React.RefObject<HTMLSpanElement | null>,
        end: number,
        delay = 0
      ) => {
        if (!ref.current) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: 2,
          ease: 'power1.out',
          delay,
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = Math.floor(obj.val).toLocaleString();
            }
          },
        });
      };

      animateNumber(attorneysRef, TARGETS.attorneys, 1);
      animateNumber(casesRef,     TARGETS.cases,     1.2);
      animateNumber(citiesRef,    TARGETS.cities,    1.4);
      animateNumber(clientsRef,   TARGETS.clients,   1.6);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(runAnimation);
    } else {
      runAnimation();
    }

    return () => {
      splitRef.current?.revert();
    };
  }, []);

  const content = (
    <>
      Наша коллегия объединяет <strong>{TARGETS.attorneys}</strong> опытных адвокатов,
      мы выиграли более <strong>{TARGETS.cases}</strong> дел, работаем в{' '}
      <strong>{TARGETS.cities}</strong> городах и уже помогли{' '}
      <strong>{TARGETS.clients.toLocaleString()}</strong> довольным клиентам.
    </>
  );

  return (
    <Container ref={containerRef}>
      <Title>О нашей компании</Title>
      <AnimateMe ref={animateRef} aria-hidden="true">
        {content}
      </AnimateMe>
      <SrOnly>{content}</SrOnly>

      <Counters>
        <CounterBlock>
          <CounterNumber ref={attorneysRef}>0</CounterNumber>
          <CounterLabel>Адвокатов</CounterLabel>
        </CounterBlock>
        <CounterBlock>
          <CounterNumber ref={casesRef}>0</CounterNumber>
          <CounterLabel>Выигранных дел</CounterLabel>
        </CounterBlock>
        <CounterBlock>
          <CounterNumber ref={citiesRef}>0</CounterNumber>
          <CounterLabel>Городов</CounterLabel>
        </CounterBlock>
        <CounterBlock>
          <CounterNumber ref={clientsRef}>0</CounterNumber>
          <CounterLabel>Клиентов</CounterLabel>
        </CounterBlock>
      </Counters>

      <InfoText>
        Мы предоставляем полный спектр юридических услуг: защита в суде, консультации по недвижимости,
        споры с контрагентами и многое другое. Наша миссия — защищать ваши права на каждом этапе.
      </InfoText>
    </Container>
  );
}

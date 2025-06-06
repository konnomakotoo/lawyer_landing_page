// src/components/AboutUsWave.tsx
import React, { useEffect, useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { gsap } from 'gsap'

const slideInFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Section = styled.section`
  margin-top: 60px;
  padding: 4rem 2rem;
  background-color: ${({ theme }) => theme.colors.backgroundAlt || '#f9f9f9'};
  color: ${({ theme }) => theme.colors.text || '#333'};
  text-align: center;
  overflow: hidden;
`

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`

const TextBlock = styled.p<{ visible: boolean }>`
  font-size: 1.125rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 2rem;
  opacity: 0;

  ${({ visible }) =>
    visible &&
    css`
      animation: ${slideInFade} 0.8s ease-out forwards;
    `}

  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`

const Counters = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
`

const CounterBlock = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;

  ${({ visible }) =>
    visible &&
    css`
      animation: ${slideInFade} 0.8s ease-out forwards;
    `}
`

const CounterNumber = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary || '#007acc'};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`

const CounterLabel = styled.span`
  margin-top: 0.25rem;
  font-size: 1rem;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`

const InfoText = styled.p<{ visible: boolean }>`
  max-width: 700px;
  margin: 2rem auto 0;
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0;

  ${({ visible }) =>
    visible &&
    css`
      animation: ${slideInFade} 0.8s ease-out forwards;
    `}

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`

export default function AboutUsWave() {
  const textRef = useRef<HTMLParagraphElement | null>(null)
  const attorneysRef = useRef<HTMLSpanElement | null>(null)
  const casesRef = useRef<HTMLSpanElement | null>(null)
  const citiesRef = useRef<HTMLSpanElement | null>(null)
  const clientsRef = useRef<HTMLSpanElement | null>(null)
  const infoRef = useRef<HTMLParagraphElement | null>(null)

  const [textVisible, setTextVisible] = React.useState(false)
  const [countersVisible, setCountersVisible] = React.useState(false)
  const [infoVisible, setInfoVisible] = React.useState(false)

  const TARGETS = {
    attorneys: 50,
    cases: 200,
    cities: 15,
    clients: 1000,
  }

  useEffect(() => {
    // Плавно показываем текст
    if (textRef.current) {
      setTextVisible(true)
    }

    // Запускаем анимации чисел с небольшой задержкой
    const animateNumber = (
      ref: React.RefObject<HTMLSpanElement | null>,
      end: number,
      delay = 0
    ) => {
      if (!ref.current) return
      const obj = { val: 0 }
      gsap.to(obj, {
        val: end,
        duration: 1.2,
        ease: 'power1.out',
        delay,
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = Math.floor(obj.val).toLocaleString()
          }
        },
      })
    }

    // Немного задержим показ счётчиков, чтобы текст появился первым
    const timer1 = setTimeout(() => {
      setCountersVisible(true)
      animateNumber(attorneysRef, TARGETS.attorneys, 0)
      animateNumber(casesRef, TARGETS.cases, 0.2)
      animateNumber(citiesRef, TARGETS.cities, 0.4)
      animateNumber(clientsRef, TARGETS.clients, 0.6)
    }, 500)

    // Затем показываем информационный текст
    const timer2 = setTimeout(() => {
      setInfoVisible(true)
    }, 1000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <Section>
      <Title>О нашей компании</Title>

      <TextBlock ref={textRef} visible={textVisible}>
        Наша коллегия объединяет <strong>{TARGETS.attorneys}</strong> опытных
        адвокатов, мы выиграли более <strong>{TARGETS.cases}</strong> дел,
        работаем в <strong>{TARGETS.cities}</strong> городах и уже помогли{' '}
        <strong>{TARGETS.clients.toLocaleString()}</strong> довольным клиентам.
      </TextBlock>

      <Counters>
        <CounterBlock visible={countersVisible}>
          <CounterNumber ref={attorneysRef}>0</CounterNumber>
          <CounterLabel>Адвокатов</CounterLabel>
        </CounterBlock>
        <CounterBlock visible={countersVisible}>
          <CounterNumber ref={casesRef}>0</CounterNumber>
          <CounterLabel>Выигранных дел</CounterLabel>
        </CounterBlock>
        <CounterBlock visible={countersVisible}>
          <CounterNumber ref={citiesRef}>0</CounterNumber>
          <CounterLabel>Городов</CounterLabel>
        </CounterBlock>
        <CounterBlock visible={countersVisible}>
          <CounterNumber ref={clientsRef}>0</CounterNumber>
          <CounterLabel>Клиентов</CounterLabel>
        </CounterBlock>
      </Counters>

      <InfoText ref={infoRef} visible={infoVisible}>
        Мы предоставляем полный спектр юридических услуг: защита в суде,
        консультации по недвижимости, споры с контрагентами и многое другое.
        Наша миссия — защищать ваши права на каждом этапе.
      </InfoText>
    </Section>
  )
}

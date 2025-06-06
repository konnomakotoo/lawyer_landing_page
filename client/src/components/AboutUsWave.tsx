// src/components/AboutUsSection.tsx
import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import BrushIcon from '../Icons/BrushIcon'

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-50px); }
  to   { opacity: 1; transform: translateX(0);      }
`

const slideInDown = keyframes`
  from { opacity: 0; transform: translateY(-30px); }
  to   { opacity: 1; transform: translateY(0);     }
`

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0);    }
`

const SectionContainer = styled.section`
  display: flex;
  gap: 20px;
  width: 90%;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
  }
`

const LeftImageWrapper = styled.div<{ $visible: boolean }>`
  flex: 1;
  position: relative;
  opacity: 0;
  transform: translateX(-50px);

  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${slideInLeft} 0.8s ease-out forwards;
    `}

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 96%;
    height: 90%;
    object-fit: cover;
    border-radius: 8px;

    /* добавляем цветную «тень» справа и ниже */
    box-shadow: 20px 10px 0 ${({ theme }) => theme.colors.icons};
    /* 10px 10px 0 — смещение тени вправо и вниз без размытия */
  }
`


const RightContent = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  height: 90%;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`

const Title = styled.h2<{ $visible: boolean }>`
  margin: 0;
  font-size: 2rem;
  text-align: center;
  color: ${({ theme }) => theme?.colors?.secondary};
  font-weight: 700;
  opacity: 0;
  transform: translateY(-30px);
  position: relative;
  z-index: 10;

   & .icon {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -40%); /* под текстом */
    z-index: -1;                       /* позади заголовка */
    opacity: 0.5;                      /* прозрачность */
  }

  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${slideInDown} 0.7s ease-out forwards;
    `}

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`

const Description = styled.p<{ $visible: boolean }>`
  margin: 16px 0 24px 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme?.colors?.text ?? '#333'};
  line-height: 1.3;
  opacity: 0;
  transform: translateY(-30px);

  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${slideInDown} 0.7s ease-out 0.2s forwards;
    `}

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 12px 0 16px 0;
  }
`

const Divider = styled.div<{ $visible: boolean }>`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme?.colors?.buttons ?? '#0C253F'};
  margin-bottom: 24px;
  opacity: 0;
  transform: scaleX(0);

  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${fadeInUp} 0.5s ease-out 0.4s forwards;
    `}

  @media (max-width: 768px) {
    width: 60px;
    margin-bottom: 16px;
  }
`

const Subtitle = styled.h3<{ $visible: boolean }>`
  margin: 0 0 16px 0;
  text-align: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme?.colors?.primary ?? '#0C253F'};
  font-weight: 600;
  opacity: 0;
  transform: translateY(-20px);

  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${slideInDown} 0.7s ease-out 0.6s forwards;
    `}

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 12px;
  }
`

const SpecializationsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const SpecializationItem = styled.li<{ $visible: boolean; $delay: number }>`
  display: flex;
  align-items: flex-start;
  margin-bottom: 5px;
  opacity: 0;
  transform: translateY(20px);

  ${({ $visible, $delay }) =>
    $visible &&
    css`
      animation: ${fadeInUp} 0.6s ease-out ${$delay}s forwards;
    `}

  @media (max-width: 600px) {
    margin-bottom: 8px;
  }

  .icon {
    flex: 0 0 24px;
    margin-right: 12px;
    color: ${({ theme }) => theme?.colors?.primary ?? '#0C253F'};
    font-size: 1.25rem;
    line-height: 1;
    margin-top: 4px;

    @media (max-width: 600px) {
      font-size: 1.1rem;
      margin-right: 8px;
      margin-top: 2px;
    }
  }

  .text {
    flex: 1;
    font-size: 1.125rem;
    color: ${({ theme }) => theme?.colors?.text ?? '#333'};
    line-height: 1.4;

    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }
`
export const AboutUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [sectionVisible, setSectionVisible] = useState(false)

  const descriptionText =
    'Партнёрство «Бакаев и Партнеры» объединяет адвокатов-профессионалов Москвы, Московской области и регионов России со стажем более 10 лет.'

  const specializations = [
    'Судебная защита бизнеса',
    'Налоговое консультирование',
    'Защита при проверках органов власти',
    'Сопровождение юридического отдела',
    'Личная защита владельцев и топ-менеджмента',
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setSectionVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <SectionContainer ref={sectionRef}>
      <LeftImageWrapper $visible={sectionVisible}>
        <img src="/statue.jpeg" alt="О нашем партнёрстве" />
      </LeftImageWrapper>

      <RightContent>
        <Title $visible={sectionVisible}>О партнерстве <div className='icon'><BrushIcon /></div></Title>
        
        <Description $visible={sectionVisible}>{descriptionText}</Description>
        <Divider $visible={sectionVisible} />
        <Subtitle $visible={sectionVisible}>Наши специализации</Subtitle>
        <SpecializationsList>
          {specializations.map((item, idx) => (
            <SpecializationItem
              key={idx}
              $visible={sectionVisible}
              $delay={(idx + 1) * 0.3}
            >
              <span className="icon">✓</span>
              <span className="text">{item}</span>
            </SpecializationItem>
          ))}
        </SpecializationsList>
      </RightContent>
    </SectionContainer>
  )
}

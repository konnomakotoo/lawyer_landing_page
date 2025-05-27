// src/pages/MainPage.tsx
import { useState } from 'react'
import styled from 'styled-components'
import Slider from '../components/Slider/Slider'
import { Button } from '../ui-kit/Button'
import {ConsultationForm} from './Consultation'
import ServiceCardsRow from '../components/ServiceCardsRow'
import TeamStrip from '../components/TeamStrip'
import CreativeProjectsBoard from '../components/ProjectBoard'
import ParallaxContactSection from '../components/ContactSection'
import  {AboutUsWave}  from '../components/AboutUsWave'

const HomeContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  font-size: 1rem;
`

// Фон-маска
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0; /* top/right/bottom/left = 0 */
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

// Окно
const ModalContent = styled.div`
  background: #fff;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 90%;
  overflow-y: auto;
  padding: ${({ theme }) => theme.space.lg};
  position: relative;

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.space.md};
  }
`

// Кнопка закрыть
const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`

export default function MainPage() {
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <HomeContainer>
      <Slider />
      <Button $variant="secondary" onClick={openModal}>
        Записаться на консультацию
      </Button>

      {isModalOpen && (
        // При клике на Overlay — закроется:
        <ModalOverlay onClick={closeModal}>
          {/* Отмена распространения клика внутрь модалки */}
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton aria-label="Закрыть" onClick={closeModal}>
              &times;
            </CloseButton>
            <ConsultationForm />
          </ModalContent>
        </ModalOverlay>
      )}
      <AboutUsWave />
      <ServiceCardsRow />
      <TeamStrip />
      <CreativeProjectsBoard />
      <ParallaxContactSection />
    </HomeContainer>
  )
}

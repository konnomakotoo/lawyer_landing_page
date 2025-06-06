import { useState } from 'react'
import styled from 'styled-components'
// import Slider from '../components/Slider/Slider'
import { ConsultationForm } from './Consultation'
import ServiceCardsRow from '../components/ServiceCardsRow'
import TeamStrip from '../components/TeamStrip'
import ParallaxContactSection from '../components/ContactSection' 
import ScrollTextImageE from '../components/ScrollTextImage'
import TestimonialSlider from '../components/Reviews'
import WreathIcon from '../Icons/WreathIcon'

// 1) Основной контейнер, в котором будет происходить прокрутка:
const HomeContainer = styled.main`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  /* Убираем отступы, чтобы правильно считались 100vh */
  margin: 0;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;

  /* ВЫСТАВЛЯЕМ scrollable-контейнер */
  overflow-y: auto;
  height: 100vh;                 /* контейнер=100vh всей страницы */
  scroll-snap-type: y mandatory; /* включаем snap-прокрутку по вертикали */
  scroll-behavior: smooth;       /* плавное перелистывание */
  `


// 2) Секция-«экран», которая всегда будет занимать ровно один экран (без NavBar)
const SnapSection = styled.section`
  margin-top: 4rem;
  height: 100vh;  
  scroll-snap-align: start;    
  scroll-snap-stop: always;   

  /* Опционально: центрируем содержимое */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0; /* top:0; bottom:0; left:0; right:0; */
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

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

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`

const ButtonMainPage = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ theme }) => theme.colors.buttons};
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: red;
`

export default function MainPage() {
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <HomeContainer>
 
      <SnapSection>
        {/* <Slider /> */}
        <ScrollTextImageE />
         <ButtonMainPage onClick={openModal}>
          Записаться на консультацию
        </ButtonMainPage>
        {isModalOpen && (
          <ModalOverlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseButton aria-label="Закрыть" onClick={closeModal}>
                &times;
              </CloseButton>
              <ConsultationForm />
            </ModalContent>
          </ModalOverlay>
        )}
      </SnapSection>

      <SnapSection>
        <WreathIcon />
      </SnapSection>

      <SnapSection>
        <ServiceCardsRow />
        <TeamStrip />
      </SnapSection>

      <SnapSection>
        <TestimonialSlider />
      </SnapSection>

      <SnapSection>
        <ParallaxContactSection />
      </SnapSection>
    </HomeContainer>
  )
}
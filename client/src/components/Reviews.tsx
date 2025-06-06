// TestimonialSlider.tsx
import React from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

interface Testimonial {
  id: number
  photo: string
  text: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: `«Я работала с компанией «Бакаев и Партнеры» по делу представительского характера. Их профессионализм и внимательность к деталям помогли мне получить наилучший результат. Рекомендую всем!»`,
  },
  {
    id: 2,
    photo: 'https://randomuser.me/api/portraits/men/43.jpg',
    text: `«Отличная юридическая поддержка! Благодаря их помощи я спокойно вёл бизнес и не беспокоился о проверках и документах. Команда быстро отвечала на все вопросы.»`,
  },
  {
    id: 3,
    photo: 'https://randomuser.me/api/portraits/women/12.jpg',
    text: `«Очень благодарна адвокатам «Бакаев и Партнеры» за своевременную консультацию по налоговым спорам. Всё объяснили понятным языком, и дело было выиграно.»`,
  },
]

const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #001f3f; /* тёмно-синий фон */
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`

const SwiperWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  position: relative; /* чтобы стрелки позиционировались относительно этого контейнера */

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    display: flex !important;
    justify-content: center;
    align-items: center;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: #ff8500; /* оранжевые стрелки */
    top: 50%;
    transform: translateY(-50%);
    --swiper-navigation-size: 32px;
  }

  .swiper-button-prev {
    left: 0;
  }

  .swiper-button-next {
    right: 0;
  }

  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    color: #ffd080;
  }
`

const SlideItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  box-sizing: border-box;
  max-width: 500px;
`

const Photo = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 24px;
  border: 4px solid #ff8500; /* оранжевая рамка для акцента */
`

const Text = styled.p`
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
`

export const TestimonialSlider: React.FC = () => {
  return (
    <SliderContainer>
      <SwiperWrapper>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          navigation
          loop={false}
          spaceBetween={40}
          allowTouchMove={true}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <SlideItem>
                <Photo src={t.photo} alt={`Client ${t.id}`} />
                <Text>{t.text}</Text>
              </SlideItem>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperWrapper>
    </SliderContainer>
  )
}

export default TestimonialSlider
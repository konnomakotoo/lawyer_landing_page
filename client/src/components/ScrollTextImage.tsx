// ScrollTextWithMetrics.tsx
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import AccountIcon from '../Icons/AccountIcon'
import {AboutUsSection} from './AboutUsWave'

const ScrollContainer = styled.div`
  height: 100%;                      /* заполняет родительский контейнер */
  width: 100%;
  margin-bottom: 20px;
  overflow-y: auto;                  /* вертикальная прокрутка */
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
  }
`

const SlideBase = styled.div<{ $visible?: boolean }>`
  height: 100%;                      /* каждый слайд — весь экран */
  scroll-snap-align: start;          /* «прилипает» к верхней границе контейнера */
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  opacity: 1;
  transition: all 0.5s ease;
`

// === Слайд 2 (как был) ===
const Slide2 = styled(SlideBase)`
  flex-direction: column;
  position: relative;

  & .image {
    position: relative;       /* контейнер для картинки и оверлея */
    width: 100vw;
    height: 80%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
      display: block;
    }

    &::after {
      /* полупрозрачный оверлей */
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(24, 24, 31, 0.74);
      pointer-events: none;
      border-radius: 8px;
    }
  }

  & .text {
    position: absolute;
    top: 30%;                  
    left: 50%;
    transform: translateX(-50%);
    width: 80%;                
    color: #fff;               
    z-index: 2;                

    h2 {
      margin: 0 0 16px;
      font-size: 2rem;
    }
    div {
      margin-top: 10%;
      margin-bottom: 12px;
      font-size: 1.125rem;
    }
    form {
      display: flex;
      gap: 15px;

      input {
        width: 50%;
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
      }
      button {
        width: 20%;
        padding: 10px 16px;
        border: none;
        border-radius: 4px;
        background-color: ${({ theme }) => theme.colors.buttons};
        color: ${({ theme }) => theme.colors.textOnPrimary};
        font-size: 1rem;
        cursor: pointer;
      }
    }
  }

  & .squares {
    position: absolute;
    bottom: -50px;                 
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;                
    width: 80%;
    height: 300px;
    display: flex;
    justify-content: center;
    gap: 15px;
    text-align: center;

    .square {
      padding: 20px 40px;
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.textOnPrimary};
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

      div {
        border: 0.5px solid ${({ theme }) => theme.colors.textOnPrimary};
        background-color: ${({ theme }) => theme.colors.textOnPrimary};
        width: 50px;
        height: 50px;
        margin: 0 auto 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      h2 {
        margin: 0 0 8px;
        font-size: 1rem;
      }
      p {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.2;
      }
    }
  }

  @media (max-width: 799px) {
    & .text {
      top: 5%;
      width: 90%;
      h2 {
        font-size: 1.5rem;
      }
      div {
        font-size: 1rem;
      }
      form input {
        font-size: 0.9rem;
      }
      form button {
        font-size: 0.9rem;
      }
    }
    & .squares {
      top: 60%;
      flex-direction: column;
      gap: 10px;
      width: 90%;
      .square {
        padding: 16px 20px;
        h2 {
          font-size: 0.9rem;
        }
        p {
          font-size: 0.8rem;
        }
      }
    }
  }
`

// === Новый слайд-обёртка для AboutUsSection ===
const SlideAbout = styled(SlideBase)<{ $visible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`

export default function ScrollTextWithMetrics() {
  // У нас по-прежнему 2 слайда: Slide2 и SlideAbout
  const refs = useRef<Array<HTMLDivElement | null>>([null, null])
  const [visible, setVisible] = useState<boolean[]>([false, false])

  // Следим, когда слайды попадают в область видимости
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const idx = Number((entry.target as HTMLElement).dataset.index)
          if (entry.isIntersecting && !visible[idx]) {
            setVisible(prev => {
              const copy = [...prev]
              copy[idx] = true
              return copy
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    refs.current.forEach(el => {
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [visible])

  return (
    <ScrollContainer>
      {/* === Слайд 0 (Slide2) === */}
      <Slide2
        ref={el => {
          refs.current[0] = el
        }}
        data-index="0"
        $visible={visible[0]}
      >
        <div className="image">
          <img src="/booksclose.jpg" alt="Секция 2" />
        </div>
        <div className="text">
          <h2>Lorem ipsum dolor sit amet consectetur.</h2>
          <div>Lawyer firm</div>
          <form>
            <input type="text" placeholder="Введите имя" />
            <input type="text" placeholder="Введите номер" />
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="squares">
          <div className="square">
            <div>
              <AccountIcon />
            </div>
            <h2>Competitive Pricing</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus, aperiam!
            </p>
          </div>
          <div className="square">
            <div>
              <AccountIcon />
            </div>
            <h2>Competitive Pricing</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus, aperiam!
            </p>
          </div>
          <div className="square">
            <div>
              <AccountIcon />
            </div>
            <h2>Competitive Pricing</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus, aperiam!
            </p>
          </div>
        </div>
      </Slide2>

      {/* === Слайд 1: AboutUsSection === */}
      <SlideAbout
        ref={el => {
          refs.current[1] = el
        }}
        data-index="1"
        $visible={visible[1] ?? false}
      >
        <AboutUsSection />
      </SlideAbout>
    </ScrollContainer>
  )
}

import { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import PhoneIcon from "../Icons/PhoneIcon";
import PersonIcon from "../Icons/PersonIcon";
import WonCases from "../Icons/WonCases";
import LawyerIcon from "../Icons/LawyerIcon";
import ClientIcon from "../Icons/ClientIcon";
import ConsultationIcon from "../Icons/ConsultationIcon";

// Данные метрик
const metricsData = [
  {
    title: "выигранных дел",
    value: 200,
    description:
      "Наши юристы успешно завершили более 200 дел различной сложности: от медиации до полного судебного разбирательства.",
    icon: WonCases,
  },
  {
    title: "адвокатов",
    value: 50,
    description:
      "В команде работают 50 сертифицированных адвокатов с опытом от 5 до 20 лет. Каждый специалист регулярно проходит повышение квалификации.",
    icon: LawyerIcon,
  },
  {
    title: "клиентов",
    value: 1000,
    description:
      "Более 1000 клиентов уже доверили нам свои юридические вопросы. Мы оказываем персональные консультации и комплексное сопровождение на каждом этапе.",
    icon: ClientIcon,
  },
  {
    title: "проведенных консультаций",
    value: 1500,
    description:
      "Наши специалисты провели более 1500 консультаций, помогая клиентам разобраться в правовых вопросах и найти оптимальные решения.",
    icon: ConsultationIcon,
  },
]

// Контейнер Hero
const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const HeroImage = styled.div`
  width: 100%;
  height: 100vh;
  background: url("/mainpage.jpg") center/cover no-repeat;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(24, 24, 31, 0.7);
  }
`;

// Контент поверх фона
const HeroContent = styled.div`
  position: absolute;
  top: 27%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.colors.textOnPrimary};
  text-align: center;
  width: 70%;
  z-index: 2;

  h2 {
    font-size: 2.3rem;
    margin-bottom: 1rem;
  }

  .subtitle {
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: 93%;
    margin: 0 auto;

    button {
      padding: 12px 20px;
      border: none;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.colors.buttons};
      color: ${({ theme }) => theme.colors.textOnPrimary};
      cursor: pointer;
      font-size: 1rem;
    }
  }

  @media (max-width: 1024px) {
    width: 90%;
    h2 {
      font-size: 2rem;
    }
    .subtitle {
      font-size: 1rem;
    }
    form {
      width: 90%;
    }
  }

  @media (max-width: 768px) {
    top: 33%;
    width: 90%;
    h2 {
      font-size: 1.75rem;
    }
    .subtitle {
      font-size: 0.95rem;
    }
    form {
      flex-direction: column;
      width: 100%;
    }
  }

  @media (max-width: 580px) {
    top: 30%;
    h2 {
      font-size: 1.5rem;
    }
    .subtitle {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 501px) {
    top: 33%;
    h2 {
      font-size: 1.2rem;
    }
    .subtitle {
      font-size: 0.85rem;
    }
  }
`;

export const InputWrapperMainPage = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledInputMainPage = styled.input`
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    font-size: .8rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 90%;
  }
`;

export const IconMainPage = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.secondary};
  pointer-events: none; /* чтобы клик приходил на сам input */

  @media (max-width: 768px) {
    left: 7%;
    top: 50%;
    transform: translateY(-40%);
  }
`;


// Контейнер метрик поверх фона
const MetricsContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 26%;
  transform: translateY(50%);
  z-index: 5;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 10rem;
  /* фиксированная высота для сохранения размера */
  width: 100%;
  height: 53vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 20% 20% 0 0;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    bottom: 26%;
  }

  @media (max-width: 768px) {
    bottom: 21%;
  }

  @media (max-width: 740px) {
    bottom: 20%;
  }

  @media (max-width: 740px) {
    bottom: 18%;
  }

  @media (max-width: 414px) {
    bottom: 20%;
  }

  @media (max-width: 400px) {
    bottom: 13%;
  }
`;



const ResponsiveIconWrapper = styled.div`
  width: 100px;
  height: 100px;

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

// Flex-контейнер для сетки метрик
const MetricsGrid = styled.div`
  display: flex;
  gap: 2rem;
  width: 90%;
  margin: 0 auto;

  @media (max-width: 1100px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    width: 100%;
  }
`;

// Одиночная метрика
const Metric = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1 1 200px;
  max-width: 300px;

  .icon {
    margin-bottom: 0.5rem;

    svg {
      width: 100px;
      height: 100px;
    }
  }

  .number {
    font-size: 2rem;
    font-weight: bold;
    margin: 0.1rem 0;
    color: ${({ theme }) => theme.colors.buttons};
  }

  h2 {
    font-size: 0.9rem;
    margin: 0.1rem 0;
    color: ${({ theme }) => theme.colors.buttons};
  }

  .desc {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.blockDark};
    margin-top: 0.2rem;
  }

  @media (max-width: 1100px) {
    max-width: none;
    width: 100%;
    height: 170px;

    .icon {
      svg {
        width: 50px;
        height: 50px;
      }
    }
  }

  @media (max-width: 833px) {
    .icon {
      margin-bottom: 0.6rem;

      svg {
        width: 50px;
        height: 50px;
      }
    }

    .desc {
      font-size: 0.5rem;
      margin-top: 0.1rem;
    }
  }

  @media (max-width: 750px) {
    align-items: center;
    text-align: center;
    flex: 1 1 200px;
    max-width: 300px;

    .icon {
      margin-bottom: 0.1rem;

      svg {
        width: 100px;
        height: 100px;
      }
    }

    .number {
      font-size: 2rem;
    }

    h2 {
      font-size: 0.6rem;
      margin: 0.1rem 0;
      color: ${({ theme }) => theme.colors.buttons};
    }

    .desc {
      display: none;
    }
  }

  media (max-width: 650px) {
    padding: 0;

    .icon {
      margin-bottom: 0.1rem;

      svg {
        width: 100px;
        height: 100px;
      }
    }

    .number {
      font-size: 2rem;
    }

    h2 {
      font-size: 0.6rem;
      margin: 0.1rem 0;
      color: ${({ theme }) => theme.colors.buttons};
    }

    .desc {
      display: none;
    }
  }
`;

export default function StaticHero() {
  const refs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    metricsData.forEach((metric, idx) => {
      const el = refs.current[idx];
      if (el) {
        el.textContent = `0+`;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: metric.value,
          duration: 1.2,
          ease: "power1.out",
          delay: idx * 0.2,
          onUpdate: () => {
            if (el) el.textContent = `${Math.floor(obj.val).toLocaleString()}+`;
          },
        });
      }
    });
  }, []);

  return (
    <HeroContainer>
      <HeroImage />
      <HeroContent>
        <h2>
          Партнёрство «Бакаев и Партнеры» объединяет адвокатов-профессионалов
          Москвы, Московской области и регионов России со стажем более 10 лет.
        </h2>
        <div className="subtitle">
          Оставьте заявку — наши эксперты свяжутся с вами для консультации.
        </div>
        <form>
          <InputWrapperMainPage>
            <IconMainPage>
              <PersonIcon />
            </IconMainPage>
            <StyledInputMainPage type="text" placeholder="Введите имя" />
          </InputWrapperMainPage>
          <InputWrapperMainPage>
            <IconMainPage>
              <PhoneIcon />
            </IconMainPage>
            <StyledInputMainPage
              type="text"
              placeholder="+7XXXXXXXXXX"
              defaultValue="+7"
            />
          </InputWrapperMainPage>
          <button type="submit">Отправить</button>
        </form>
      </HeroContent>

      <MetricsContainer>
        <MetricsGrid>
          {metricsData.map((metric, idx) => {
            const IconComponent = metric.icon;
            return (
              <Metric key={idx}>
                <ResponsiveIconWrapper className="icon">
                  <IconComponent />
                </ResponsiveIconWrapper>
                <span
                  className="number"
                  ref={(el) => {
                    refs.current[idx] = el;
                  }}
                />
                <h2>{metric.title}</h2>
                <p className="desc">{metric.description}</p>
              </Metric>
            );
          })}
        </MetricsGrid>
      </MetricsContainer>
    </HeroContainer>
  );
}

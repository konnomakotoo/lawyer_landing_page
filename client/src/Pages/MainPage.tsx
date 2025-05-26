import { styled } from 'styled-components';
import Slider from '../components/Slider/Slider'
import { Button } from '../ui-kit/Button'

const HomeContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  font-size: 1rem;
`;

export default function MainPage() {
  return (
    <HomeContainer>
        <Slider />
        <Button $variant='secondary'>Записаться на консультацию</Button>
    </HomeContainer>
  )
}

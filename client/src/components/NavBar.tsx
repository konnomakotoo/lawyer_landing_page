import { useNavigate } from 'react-router-dom'
import { fetchLogoutUser } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from '../redux/store/redux.store';
import styled from 'styled-components';
import Logo from '../Icons/Logo';


const NavBarContainer = styled.header`
  max-height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  font-size: 1rem;
`;

const NavBarMiddle = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const NavBarEnd = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const NavButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
  cursor: pointer;
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  gap: ${({ theme }) => theme.space.sm};
  cursor: pointer;
`;



export default function NavBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user)

    const handleLogout = () => {
         dispatch(fetchLogoutUser());
         navigate("/");
      };
      
  return (
    <NavBarContainer>
      <NavLogo onClick={() => navigate('/')}><Logo /></NavLogo>
      <NavBarMiddle>
         <>
          <NavButtons onClick={() => navigate('/aboutus')}>О нас</NavButtons>
          <NavButtons onClick={() => navigate('/team')}>Команда</NavButtons>
          <NavButtons onClick={() => navigate('/projects')}>Проекты</NavButtons>
          <NavButtons onClick={() => navigate('/services')}>Услуги</NavButtons>
          </>
      </NavBarMiddle>
      <NavBarEnd>
        {!user && (
          <>
          <NavButtons onClick={() => navigate('/signup')}>Регистрация</NavButtons>
          <NavButtons onClick={() => navigate('/login')}>Вход</NavButtons>
          </>
        )}
        {user && (
          <>
          
          <NavButtons onClick={handleLogout}>Log Out</NavButtons>
          </>
        )}
      </NavBarEnd>
    </NavBarContainer>
  )
}


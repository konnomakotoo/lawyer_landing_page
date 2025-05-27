// src/components/Profile.tsx
import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { RootState, AppDispatch } from '../redux/store/redux.store'
import { fetchLogoutUser } from '../redux/slices/userSlice'

const ProfileContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.backgroundAlt || '#fff'};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.5rem;
`

const Title = styled.h1`
  margin: 0;
  font-size: 1.75rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`

const Field = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textOnBackground};
  span {
    font-weight: 600;
  }
`

const LogoutButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user.user)

  const handleLogout = () => {
    dispatch(fetchLogoutUser())
    navigate('/')
  }

  if (!user) {
    // Можно показать заглушку или редирект на страницу входа
    return null
  }

  return (
    <ProfileContainer>
      <Title>Профиль</Title>
      <Field>
        <span>Имя:</span> {user.name}
      </Field>
      <Field>
        <span>Email:</span> {user.email}
      </Field>
      <LogoutButton onClick={handleLogout}>Выйти</LogoutButton>
    </ProfileContainer>
  )
}

export default Profile

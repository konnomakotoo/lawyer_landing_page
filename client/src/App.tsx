// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { theme } from './ui-kit/theme'
import NavBar from './components/NavBar'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import type { AppDispatch, RootState } from './redux/store/redux.store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchCurrentUser } from './redux/slices/userSlice'
import MainPage from './Pages/MainPage'
import AboutUs from './Pages/AboutUs'
import Team from './Pages/Team'
import Projects from './Pages/Projects'
import Services from './Pages/Services'
import { LawyerProfile } from './Pages/LawyerProfile'
import VerifyEmail from './Pages/verifyEmail'
import Profile from './Pages/Profile'
import { ConsultationForm } from './Pages/Consultation'

const GlobalStyle = createGlobalStyle`
  /* 1) Убираем отступы по умолчанию, задаём 100% высоты и блокируем прокрутку */
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  #root {
  padding-top: 58px;
  }

  body {
    font-family: ${props => props.theme.fonts.body};
    background: #F6FAFC;
    color: ${({ theme }) => theme.colors.text};
    max-width: 100vw;
    min-height: 100vh;
  }

  h1, h2, h3 {
    font-family: ${props => props.theme.fonts.heading};
  }
`

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.user.user)

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  if (user) {
    console.log('Пользователь найден')
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:id" element={<LawyerProfile />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/consult" element={<ConsultationForm />} />
          {user
            ? <Route path="/profile" element={<Profile />} />
            : <Route path="/login" element={<Login />} />}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
